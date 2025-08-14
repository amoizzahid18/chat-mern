import React from "react";
import FriendToBe from "./FriendToBe";
import { useState } from "react";
function ShowFriendsToBe() {
  const [users, setUsers] = useState([]);
  return (
    <div className="mx-4 bg-base-300 shadow-md rounded-box ">
      <div className="p-4 grid lg:grid-cols-6 gap-4 max-h-[500px] duration-75 overflow-y-scroll h-full">
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
        <FriendToBe />
      </div>
    </div>
  );
}

export default ShowFriendsToBe;
