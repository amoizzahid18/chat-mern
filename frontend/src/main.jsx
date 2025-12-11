import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChatUIProvider } from "./pages/ChatUIContext.jsx";
import { SocketProvider } from "./pages/SocketContext.jsx";
import { AuthProvider } from "./pages/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SocketProvider>
    <ChatUIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChatUIProvider>
  </SocketProvider>
  // </StrictMode>
);
