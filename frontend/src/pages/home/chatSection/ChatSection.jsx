// import React from "react";
import { useState } from "react";
import ChatBox from "./userChats/ChatBox";
import ChatName from "./userChats/ChatName";
import WelcomeHome from "./WelcomeHome";
import AddFriend from "./addFriends/AddFriend";

function ChatSection() {
  const [isDm, setIsDm] = useState(false);
  return (
    <div className=" w-full bg-gradient-to-tl from-teal-300 to-pink-300 flex flex-col justify-center ">
      {isDm ? (
        // <WelcomeHome />
        <AddFriend />
      ) : (
        <div className="w-full h-full">
          {/* <ChatName setIsDm={setIsDm} />
          <ChatBox /> */}
          <AddFriend />
        </div>
      )}
    </div>
  );
}

export default ChatSection;
