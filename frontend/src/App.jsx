import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./pages/AuthContext";

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
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center gap-6
                bg-gradient-to-br from-gray-900 via-purple-900 to-black"
    >
      <div className="flex gap-3">
        <span className="loading loading-ball bg-white/80 loading-lg"></span>
        <span className="loading loading-ball bg-white/80 loading-lg"></span>
        <span className="loading loading-ball bg-white/80 loading-lg"></span>
      </div>
      <div className="flex gap-3">
        <span className="loading loading-ball bg-white/80 loading-md"></span>
        <span className="loading loading-ball bg-white/80 loading-md"></span>
        <span className="loading loading-ball bg-white/80 loading-md"></span>
        <span className="loading loading-ball bg-white/80 loading-md"></span>
      </div>
      <div className="flex gap-3">
        <span className="loading loading-ball bg-white/80 loading-sm"></span>
        <span className="loading loading-ball bg-white/80 loading-sm"></span>
        <span className="loading loading-ball bg-white/80 loading-sm"></span>
      </div>
    </div>
  );
}

function App() {
  const { user, loading } = useAuth();
  return (
    <Router>
      {/* <div className="bg-gradient-to-b from-purple-700 to-purple-400 min-h-screen w-full flex justify-center items-center"> */}
      <div class="min-h-screen w-full flex justify-center items-center">
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
