import React from "react";
import ChatBox from "./ChatBox";

function ChatSection() {
  const [isDm, setIsDm] = React.useState(false);
  return (
    <div className=" w-full h-full justify-center items-center rounded-box shadow-md">
      {isDm ?
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-lg">Welcome!</div>
        <div className="text-sm">Chat with your closed ones now</div>
      </div>
      :
      <div className="h-full w-full">
         <ChatBox  />
      </div>}
    </div>
  );
}

export default ChatSection;
