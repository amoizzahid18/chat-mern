import React, { useEffect } from "react";
import FriendToBe from "./FriendToBe.jsx";
import { useState } from "react";
import { mockFriends } from "./mockFriends.js";
function ShowFriendsToBe({ users }) {
  //   useEffect(()=>{},[users, filteredUsers]);
  return users.length === 0 ? (
    <div className=" text-3xl w-full font-bold h-[500px] flex justify-center items-center ">
      No users found
    </div>
  ) : (
    <div className="mx-4 bg-base-300 shadow-md rounded-box ">
      <div className="p-4 grid   md:grid-cols-3 lg:grid-cols-5   gap-6 max-h-[500px] duration-75 overflow-y-scroll h-full">
        {users.map((user) => (
          <FriendToBe
            // key={user.username}
            fullname={user.fullname}
            username={user.username}
            profilePic={user.profilePic}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowFriendsToBe;
