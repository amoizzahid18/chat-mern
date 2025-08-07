import React from "react";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import TypeMsg from "./TypeMsg";

function ChatBox() {
  return (
    <div className="flex flex-col gap-y-3 bg-gradient-to-br from-blue-300 to-blue-100  ">
      <div className="">
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
