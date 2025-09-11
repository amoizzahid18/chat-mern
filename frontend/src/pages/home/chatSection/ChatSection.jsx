// import React from "react";
import { useState } from "react";
import ChatBox from "./userChats/ChatBox";
import ChatName from "./userChats/ChatName";
import WelcomeHome from "./WelcomeHome";
import AddFriend from "./addFriends/AddFriend";

function ChatSection({ isDm, setIsDm, isAddFriend, setIsAddFriend }) {
  return (
    <div className=" w-full bg-gradient-to-tl  from-teal-300 to-pink-300 flex flex-col justify-center ">
      {!isDm && !isAddFriend ? (
        // <WelcomeHome setIsAddFriend={setIsAddFriend} />
        <WelcomeHome  />
      ) : !isAddFriend && isDm ? (
        <div className="w-full h-full">
          {/* <ChatName setIsDm={setIsDm} /> */}
          <ChatName  />
          <ChatBox />
          
        </div>
      ) : (
        <AddFriend />
      )}
    </div>
  );
}

export default ChatSection;
