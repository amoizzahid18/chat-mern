// import React from "react";
import { useContext, useState } from "react";
import ChatBox from "./userChats/ChatBox";
import ChatName from "./userChats/ChatName";
import WelcomeHome from "./WelcomeHome";
import AddFriend from "./addFriends/AddFriend";
import ViewProfile from "./ViewProfile";
import { useChatUI } from "../../ChatUIContext";

function ChatSection() {
  const {isDm, isAddFriend, isViewProfile} = useChatUI();

  return (
      <div className="  w-full bg-transparent flex flex-col text-white">
      {!isDm && !isAddFriend && !isViewProfile ? (
        <WelcomeHome  />
      ) : isDm && !isAddFriend && !isViewProfile ? (
        <div className="w-full h-full">
          <ChatName  />
          <ChatBox />
        </div>
      ) : 
      !isDm && isAddFriend && !isViewProfile ? (
        <AddFriend />
      ):(
        <ViewProfile />
      )}
    </div>
  );
}

export default ChatSection;
