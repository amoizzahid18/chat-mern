import React, { useMemo, useState } from "react";
import SBarFriend from "./SBarFriend";

// function SidebarFriends({friends , setIsDm}) {
function SidebarFriends({ friends, loadingF }) {
  return (
    <div className="bg-base-100 h-full min-h-120 rounded-box shadow-sm mb-4 ">
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
            <div className="text-lg font-bold min-h-96 flex items-center justify-center">
              You don't have any friends
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
