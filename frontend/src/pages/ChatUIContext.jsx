import { createContext, useContext, useState } from "react";

const ChatUIContext = createContext();

export const ChatUIProvider = ({ children }) => {
  const [isDm, setIsDm] = useState(false);
  const [isAddFriend, setIsAddFriend] = useState(false);
  const [isViewProfile, setIsViewProfile] = useState(false);

  const openDm = () => {
    setIsDm(true);
    setIsAddFriend(false);
    setIsViewProfile(false);
  };
  const openAddFriend = () => {
    setIsDm(false);
    setIsAddFriend(true);
    setIsViewProfile(false);
  };
  const goHome = () => {
    setIsDm(false);
    setIsAddFriend(false);
    setIsViewProfile(false);
  };
  const viewProfile = () => {
    setIsDm(false);
    setIsAddFriend(false);
    setIsViewProfile(true);
  };
  return (
    <ChatUIContext.Provider
      value={{
        isDm,
        isAddFriend,
        isViewProfile,
        openDm,
        openAddFriend,
        goHome,
        viewProfile,
      }}
    >
      {children}
    </ChatUIContext.Provider>
  );
};

export const useChatUI = () => useContext(ChatUIContext);
