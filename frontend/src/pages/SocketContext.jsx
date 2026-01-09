import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // create socket ONCE for app lifetime
    socketRef.current = io("http://localhost:4500", {
      withCredentials: true,
      reconnection: true,
      autoConnect: true,
    });

    // optional debug
    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      // cleanup only when app fully unmounts
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
