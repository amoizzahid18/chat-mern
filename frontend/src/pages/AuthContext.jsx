import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSocket } from "./SocketContext";
import { useChatUI } from "./ChatUIContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { disconnectSocket } = useSocket();
  const {goHome ,setFriendsDM} = useChatUI();
  const validateUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/validate",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.user)
          setUser(response.data.user);
      } catch (error) {
        console.log(error.message);
        disconnectSocket();
        setUser(null);
        setFriendsDM(null);
        goHome();
      } finally {
        setLoading(false);
      }
  };
  useEffect(() => {
    validateUser();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, validateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
