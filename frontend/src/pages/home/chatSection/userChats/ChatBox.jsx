import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import TypeMsg from "./TypeMsg";
import { useAuth } from "../../../AuthContext";
import { Loader } from "../../../../App";
import { useChatUI } from "../../../ChatUIContext";
import { useSocket } from "../../../SocketContext";
import api from "@/api/api";

function ChatBox() {
  const [refreshMessages, setRefreshMessages] = useState(false);
  const { user, setUser } = useAuth();
  const { friendsDM } = useChatUI();
  const { id } = friendsDM;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgToEdit, setMsgToEdit] = useState(null);
  const socketValue = useSocket();
  const navigate = useNavigate();

  const getMessages = async () => {
    if (!user) {
      setUser(null);
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const response = await api.get(
        `/messages/dms/get/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const msgs = response.data;
        console.log(msgs);
        setMessages(msgs);
        setRefreshMessages(false);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatChatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (isYesterday) {
      return "Yesterday";
    }
    return date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Load initial messages
  useEffect(() => {
    getMessages();
  }, [refreshMessages === true, id]);

  // Listen for incoming messages from socket
  useEffect(() => {
    if (!socketValue?.incomingMessage) return;

    const incoming = socketValue.incomingMessage;
    
    // Only add message if it's from the current conversation partner
    if (incoming.senderId === id) {
      setMessages((prev) => [...prev, incoming]);
    }
  }, [socketValue?.incomingMessage, id]);

  // Handle when message is sent by user
  const handleMessageSent = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col justify-around bg-transparent">
      <div        
        className={`py-4 h-[500px] overflow-y-auto flex flex-col ${
          !loading ? "justify-end" : "justify-center items-center"
        }`}
      >
        {loading ? (
          <span className="loading loading-dots loading-xl text-white"></span>
        ) : messages.length !== 0 ? (
          messages.map((message) => {
            if (message.senderId === user._id) {
              return (
                <ChatRight
                  key={message._id}
                  id={message._id}
                  message={message.message}
                  isAReply={message.isAReply}
                  isDeleted={message.isDeleted}
                  isForwarded={message.isForwarded}
                  isEdited={message.isEdited}
                  replyTo={message.replyTo}
                  timestamp={formatChatTimestamp(message.updatedAt || message.createdAt)}
                  setRefreshMessages={setRefreshMessages}
                  setMsgToEdit={setMsgToEdit}
                />
              );
            } else {
              return (
                <ChatLeft
                  key={message._id}
                  id={message._id}
                  message={message.message}
                  isAReply={message.isAReply}
                  isDeleted={message.isDeleted}
                  isForwarded={message.isForwarded}
                  isEdited={message.isEdited}
                  replyTo={message.replyTo}
                  timestamp={formatChatTimestamp(message.updatedAt || message.createdAt)}
                  setRefreshMessages={setRefreshMessages}
                />
              );
            }
          })
        ) : (
          <p className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>
      <TypeMsg msgToEdit={msgToEdit} setRefreshMessages={setRefreshMessages} conversationId={friendsDM?.conversationId} onMessageSent={handleMessageSent} />
    </div>
  );
}

export default ChatBox;
