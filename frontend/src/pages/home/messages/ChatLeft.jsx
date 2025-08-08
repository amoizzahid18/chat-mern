import React from "react";

function ChatLeft() {
  return (
    <div className="chat chat-start mx-6">
      <div className="chat-bubble chat-bubble-neutral text-wrap max-w-2/3">
        <span>Put me on the Council and not make me a Master!??</span>
        <span className="w-12 flex flex-col justify-end">
          <time className="text-xs opacity-50">2 hour ago</time>
        </span>
      </div>
    </div>
  );
}

export default ChatLeft;
