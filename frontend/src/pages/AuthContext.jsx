import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSocket } from "./SocketContext";
import { useChatUI } from "./ChatUIContext";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const socket = useSocket(); // ✅ socket instance (Model 1)
  const { goHome, setFriendsDM } = useChatUI();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Validate user on app load / refresh
  const validateUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/validate",
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      setFriendsDM(null);
      goHome();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run validation ONCE on mount
  useEffect(() => {
    validateUser();
  }, []);

  // 🔑 Register authenticated user with existing socket
  useEffect(() => {
    if (socket && user) {
      socket.emit("register", user.id);
    }
  }, [socket, user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, validateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
