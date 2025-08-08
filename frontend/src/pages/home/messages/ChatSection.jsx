import React from "react";
import ChatBox from "./ChatBox";
import ChatName from "./ChatName";

function ChatSection() {
  const [isDm, setIsDm] = React.useState(false);
  return (
    <div className=" w-full h-auto justify-center items-center ">
      {isDm ? (
        <div className="flex flex-col justify-center  items-center h-full">
          <div className="text-lg">Welcome!</div>
          <div className="text-sm">Chat with your closed ones now</div>
        </div>
      ) : (
        <div>
          <ChatName />
          <ChatBox />
        </div>
      )}
    </div>
  );
}

export default ChatSection;
