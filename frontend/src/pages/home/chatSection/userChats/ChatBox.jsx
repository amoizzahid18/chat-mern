import React from "react";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import TypeMsg from "./TypeMsg";

function ChatBox() {
  return (
    <div className="flex flex-col justify-around  bg-gradient-to-br from-blue-300 to-blue-100 pt-2">
      <div className="py-4 max-h-[500px] overflow-y-scroll mt-2">
        <ChatLeft />
        <ChatLeft />
        <ChatRight />
        <ChatLeft />
        <ChatRight />
        <ChatRight />
        <ChatLeft />
        <ChatLeft />
        <ChatRight />
        <ChatLeft />
        <ChatRight />
        <ChatRight />
      </div>
      <TypeMsg />
    </div>
  );
}

export default ChatBox;
