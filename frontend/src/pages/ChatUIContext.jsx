import { createContext, useContext, useState } from "react";

const ChatUIContext = createContext();

export const ChatUIProvider = ({ children }) => {
  const [isDm, setIsDm] = useState(false);
  const [isAddFriend, setIsAddFriend] = useState(false);
  const [isViewProfile, setIsViewProfile] = useState(false);
  const [friendsDM, setFriendsDM] = useState(null);
  const [refreshUsers, setRefreshUsers] = useState(false)

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
    setIsDm(true);
    setIsAddFriend(false);
    setIsViewProfile(true);
  };
  return (
    <ChatUIContext.Provider
      value={{
        isDm,
        isAddFriend,
        isViewProfile,
        friendsDM,
        refreshUsers,
        openDm,
        openAddFriend,
        goHome,
        viewProfile,
        setFriendsDM,
        setRefreshUsers,
      }}
    >
      {children}
    </ChatUIContext.Provider>
  );
};

export const useChatUI = () => useContext(ChatUIContext);
