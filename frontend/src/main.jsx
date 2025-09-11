import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChatUIProvider } from "./pages/ChatUIContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatUIProvider>
      <App />
    </ChatUIProvider>
  </StrictMode>
);
