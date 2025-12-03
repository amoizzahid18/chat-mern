import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const validateUser = async () => {
    if (!user)
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
      } finally {
        setLoading(false);
      }
  };
  useEffect(() => {
    validateUser();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
