import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { useChatUI } from "../../../ChatUIContext";
import { useSocket } from "../../../SocketContext";
import axios from "axios";

function TypeMsg({ msgToEdit, setRefreshMessages, conversationId, onMessageSent }) {
  const { user } = useAuth();
  const { friendsDM } = useChatUI();
  const socketValue = useSocket();
  const { id } = friendsDM;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  // Handle typing indicator
  useEffect(() => {
    if (!message.trim() && isTyping) {
      setIsTyping(false);
      socketValue?.sendTyping(id, false);
    } else if (message.trim() && !isTyping) {
      setIsTyping(true);
      socketValue?.sendTyping(id, true);
    }
  }, [message, id, socketValue, isTyping]);

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setIsTyping(false);
      socketValue?.sendTyping(id, false); // Stop typing indicator

      // Create message object to display immediately
      const newMessage = {
        _id: `temp-${Date.now()}`, // Temporary ID until server confirms
        senderId: user._id,
        message: message,
        conversationId: conversationId,
        isAReply: false,
        isForwarded: false,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date(),
      };

      // Add message to UI immediately
      if (onMessageSent) {
        onMessageSent(newMessage);
      }

      // Send message via socket
      socketValue?.sendMessage({
        recipientId: id,
        message: message,
        conversationId: conversationId,
        senderId: user._id,
        createdAt: new Date(),
      });

      setMessage("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editMsg = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const response = await api.put(
        `/messages/dms/message/edit/${msgToEdit.id}`,
        { message: message },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setRefreshMessages(true);
        setMessage("");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mx-4 my-4">
      {/* Message Input */}
      <div
        className="flex items-center w-full bg-white/20 backdrop-blur-md border border-white/30 
                      rounded-full px-4 py-2 shadow-md transition-all duration-200
                      focus-within:ring-2 focus-within:ring-purple-400"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={msgToEdit ? msgToEdit.message : message}
          onChange={handleChange}
          className="w-full bg-transparent text-white placeholder-white/70 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              msgToEdit ? editMsg() : sendMessage();
            }
          }}
        />

        {/* File Upload */}
        <label
          className="cursor-pointer flex items-center justify-center p-2 rounded-full 
                           hover:bg-white/20 transition"
        >
          <input type="file" className="hidden" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6 opacity-70 hover:opacity-100 transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32"
            />
          </svg>
        </label>
      </div>

      {/* Send Button */}
      <button
        className={`flex items-center justify-center p-3 rounded-full 
                   bg-purple-600 hover:bg-purple-700 text-white shadow-md
                   transition-all duration-200 ${
                     loading ? "pointer-events-none" : ""
                   }`}
        onClick={sendMessage}
      >
        {loading ? (
          <span className="loading loading-dots loading-sm text-white"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default TypeMsg;
