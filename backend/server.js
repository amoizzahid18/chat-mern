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
import { connectDB } from "./database/connectDB.js";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/messages", msgRoutes);
app.use("/home", userRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow all origins for now
  },
});
io.on("connection", (socket) => {
  console.log("Socket server running: ", socket.id);
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  })
  .then(() =>
    httpServer.listen(4500, () =>
      console.log("Socket Server running on port 4500")
    )
  );

app.get("/", (req, res) => {
  res.send("Hello World!");
});
