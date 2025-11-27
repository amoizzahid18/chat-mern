import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChatUIProvider } from "./pages/ChatUIContext.jsx";
import { SocketProvider } from "./pages/SocketContext.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <SocketProvider>
      <ChatUIProvider>
        <App />
      </ChatUIProvider>
    </SocketProvider>
  // </StrictMode>
);
