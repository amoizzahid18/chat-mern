import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
import { useChatUI } from "./ChatUIContext";
import api from "../../api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const socketValue = useSocket();
  const { goHome, setFriendsDM } = useChatUI();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Validate user on app load / refresh
  const validateUser = async () => {
    try {
      const response = await api.get(
        "/auth/validate",
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

  // 🔑 Register authenticated user with socket
  useEffect(() => {
    if (socketValue && user) {
      socketValue.registerUser(user._id);
      console.log("User registered with socket:", user._id);
    }
  }, [user]);

  // 🔌 Logout handler
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      // Clear state regardless of API call success
      if (socketValue) {
        socketValue.logout();
      }
      
      setUser(null);
      setFriendsDM(null);
      goHome();
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, validateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
