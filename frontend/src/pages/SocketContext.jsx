import { createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const connectSocket = () => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:4500", {
        withCredentials: true,
        reconnection: true,
        autoConnect: true,
      });
    }
    return socketRef.current;
  };
  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null; // allow new socket on next login
    }
  };

    const value = {
    socket: socketRef.current,
    connectSocket,
    disconnectSocket,
  };
  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
