import React, { useMemo, useState } from "react";
import SBarFriend from "./SBarFriend";


// function SidebarFriends({friends , setIsDm}) {
function SidebarFriends({friends }) {  
  
  return (
    <div className="bg-base-100 h-full rounded-box shadow-sm mb-4 ">
      <div className="max-h-[490px] pt-2  overflow-y-scroll"
      onClick={()=>setIsDm(true)}>
        {friends.map((friend) => (
          <SBarFriend
            
            // setIsDm={setIsDm}
            fullname={friend.fullname}
            bio={friend.bio}
            profilePic={friend.profilePic}
          />
        ))}
      </div>
    </div>
  );
}

export default SidebarFriends;
