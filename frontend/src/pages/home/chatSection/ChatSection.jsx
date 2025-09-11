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
    <div className=" w-full bg-gradient-to-tl  from-teal-300 to-pink-300 flex flex-col justify-center ">
      {!isDm && !isAddFriend && !isViewProfile ? (
        // <WelcomeHome setIsAddFriend={setIsAddFriend} />
        <WelcomeHome  />
      ) : isDm && !isAddFriend && !isViewProfile ? (
        <div className="w-full h-full">
          {/* <ChatName setIsDm={setIsDm} /> */}
          <ChatName  />
          <ChatBox />
        </div>
      ) : !isDm && isAddFriend && !isViewProfile ? (
        <AddFriend />
      ):(
        <ViewProfile />
      )}
    </div>
  );
}

export default ChatSection;
