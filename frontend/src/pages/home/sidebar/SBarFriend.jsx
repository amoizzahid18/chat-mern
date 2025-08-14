import React from "react";

function SBarFriend({ profilePic, fullname, bio }) {
  return (
    <div className="flex h-16 hover:bg-base-300 duration-75 justify-start items-center">
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
