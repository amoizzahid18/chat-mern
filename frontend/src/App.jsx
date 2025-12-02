import React from "react";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ user, children }) {
  if (user) return <Navigate to="/home" replace />;
  return children;
}
function Loader() {
  return (
    <div className="bg-gradient-to-b from-purple-700 to-purple-400 min-h-screen w-full flex flex-col justify-center items-center gap-6">
      <div className="flex gap-3">
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
      <div className="flex gap-3">
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-md"></span>
      </div>
      <div className="flex gap-3">
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-sm"></span>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const validateUser = async () => {
    try {
      setLoading(true);
      setUser(null);
      const response = await axios.get("http://localhost:5000/auth/validate", {
        withCredentials: true,
      });

      if (response.data?.authenticated) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    validateUser();
  }, []);
  return (
    <Router>
      <div className="bg-gradient-to-b from-purple-700 to-purple-400 min-h-screen w-full flex justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute user={user}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute user={user}>
                  <Signup />
                </PublicRoute>
              }
            />

            {/* Protected Route */}
            <Route
              path="/home"
              element={
                <ProtectedRoute user={user}>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to={user ? "/home" : "/login"} replace />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
