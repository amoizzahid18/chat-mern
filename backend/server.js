import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import msgRoutes from "./routes/msgRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({ debug: false }); // it will not log the config loading process of variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
import { connectDB } from "./util/connectDB.js";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-mern-lake.vercel.app", // your frontend URL
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/messages", msgRoutes);
app.use("/home", userRoutes);

const socketUserMap = new Map();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("New Client connected: ", socket.id);
  
  socket.on("register", (userId) => {
    socket.userId = userId;
    socketUserMap.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
    // Notify all connected clients that user is online
    io.emit("userOnline", { userId, socketId: socket.id });
  });

  socket.on("sendMessage", async (data) => {
    const { recipientId, message, conversationId, senderId } = data;
    const recipientSocketId = socketUserMap.get(recipientId);
    
    console.log(`Message from ${senderId} to ${recipientId}:`, message);
    
    try {
      // Save message to database
      const Message = (await import("./models/msgModel.js")).default;
      const Convo = (await import("./models/convoModel.js")).default;
      
      let conversation = await Convo.findById(conversationId);
      
      if (!conversation) {
        conversation = await Convo.findOne({
          participants: { $all: [senderId, recipientId].sort() },
        });
        if (!conversation) {
          conversation = await Convo.create({
            participants: [senderId, recipientId].sort(),
            isGroup: false,
          });
        }
      }
      
      const newMessage = await Message.create({
        senderId: senderId,
        receiverId: recipientId,
        message: message,
        isAReply: false,
        isForwarded: false,
      });
      
      conversation.messages.push(newMessage._id);
      await conversation.save();
      
      // Send message to recipient if they're online
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", {
          _id: newMessage._id,
          senderId: senderId,
          message: message,
          conversationId: conversationId,
          timestamp: newMessage.createdAt,
          isAReply: false,
          isForwarded: false,
          isEdited: false,
          isDeleted: false,
        });
      }
      
      // Send acknowledgment to sender
      socket.emit("messageSent", { 
        conversationId, 
        success: true,
        timestamp: newMessage.createdAt 
      });
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("messageSent", { 
        conversationId, 
        success: false,
        error: error.message
      });
    }
  });

  socket.on("typing", (data) => {
    const { recipientId, isTyping } = data;
    const recipientSocketId = socketUserMap.get(recipientId);
    
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("userTyping", {
        userId: socket.userId,
        isTyping: isTyping,
      });
    }
  });

  socket.on("logout", () => {
    // Remove user mapping for this socket
    if (socket.userId) {
      socketUserMap.delete(socket.userId);
      console.log("User logged out:", socket.userId);
      io.emit("userOffline", { userId: socket.userId });
    }
  });

  socket.on("disconnect", () => {
    if (socket.userId) {
      socketUserMap.delete(socket.userId);
      console.log("User disconnect: ", socket.userId);
      io.emit("userOffline", { userId: socket.userId });
    }
  });
});

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Socket.io is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
