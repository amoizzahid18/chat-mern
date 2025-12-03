import React, { useMemo, useState } from "react";
import SBarFriend from "./SBarFriend";

// function SidebarFriends({friends , setIsDm}) {
function SidebarFriends({ friends, loadingF }) {
  return (
    <div className=" bg-white/20 text-white border border-white/30 w-full my-4 shadow-md h-full min-h-120 rounded-box">
      <div
        className="max-h-[490px] pt-2  overflow-y-scroll text-center"
        // onClick={() => setIsDm(true)}
      >
        {loadingF ? (
          <div className="min-h-96 flex items-center justify-center">
            <span class="loading loading-dots loading-lg"></span>
          </div>
        ) : !friends || friends.length === 0 ? (
          <>
            <div className="text-2xl text-wrap font-bold min-h-96 flex items-center justify-center">
              You don't have any friends yet.
            </div>
          </>
        ) : (
          friends.map((friend) => (
            <SBarFriend
              // setIsDm={setIsDm}
              // key={friend._id} // always add a unique key in map
              fullname={friend.fullname}
              bio={friend.bio}
              profilePic={friend.profilePic}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SidebarFriends;
