import { createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const connectSocket = () => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:4500", {
        withCredentials: true,
        autoConnect: true,
      });
    }
    return socketRef.current;
  };
    const value = {
    socket: socketRef.current,
    connectSocket,
  };
  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
