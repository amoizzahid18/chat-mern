import React from "react";
import { useChatUI } from "../../ChatUIContext.jsx";

function SBarFriend({ profilePic, fullname, bio }) {
  const { openDm } = useChatUI();
  return (
    <div
      className="flex h-16 hover:bg-base-300 duration-75 justify-start items-center"
      onClick={openDm}
    >
      <div>
        <img className="size-8 rounded-4xl m-2" src={profilePic} />
      </div>

      <div className="flex flex-col ml-2 items-start">
        <div className="font-bold">{fullname}</div>
        <div className="text-xs opacity-60">{bio}</div>
      </div>
    </div>
  );
}

export default SBarFriend;
