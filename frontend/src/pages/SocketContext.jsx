import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [typingUsers, setTypingUsers] = useState(new Set());

  useEffect(() => {
    // create socket ONCE for app lifetime
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
      reconnection: true,
      autoConnect: true,
    });

    // Connection events
    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Message events
    socketRef.current.on("receiveMessage", (data) => {
      console.log("New message received:", data);
      setIncomingMessage(data);
    });

    socketRef.current.on("messageSent", (data) => {
      console.log("Message sent successfully:", data);
    });

    // User online/offline events
    socketRef.current.on("userOnline", (data) => {
      console.log("User online:", data.userId);
      setOnlineUsers((prev) => new Set([...prev, data.userId]));
    });

    socketRef.current.on("userOffline", (data) => {
      console.log("User offline:", data.userId);
      setOnlineUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(data.userId);
        return updated;
      });
    });

    // Typing indicator events
    socketRef.current.on("userTyping", (data) => {
      console.log("User typing:", data.userId, data.isTyping);
      if (data.isTyping) {
        setTypingUsers((prev) => new Set([...prev, data.userId]));
      } else {
        setTypingUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(data.userId);
          return updated;
        });
      }
    });

    return () => {
      // cleanup only when app fully unmounts
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Helper functions to emit events
  const registerUser = useCallback((userId) => {
    if (socketRef.current) {
      socketRef.current.emit("register", userId);
    }
  }, []);

  const sendMessage = useCallback((data) => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", data);
    }
  }, []);

  const sendTyping = useCallback((recipientId, isTyping) => {
    if (socketRef.current) {
      socketRef.current.emit("typing", { recipientId, isTyping });
    }
  }, []);

  const logout = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit("logout");
    }
  }, []);

  const socketValue = {
    socket: socketRef.current,
    onlineUsers,
    incomingMessage,
    typingUsers,
    registerUser,
    sendMessage,
    sendTyping,
    logout,
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
