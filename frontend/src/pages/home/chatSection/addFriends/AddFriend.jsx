import React from "react";
import SearchBar from "../../SearchBar";
import SidebarFriends from "../../sidebar/SidebarFriends";
import ShowFriendsToBe from "./ShowFriendsToBe";

function AddFriend() {
  return (
    <div>
      <div className="p-4">
        <SearchBar />
      </div>
      <ShowFriendsToBe />
    </div>
  );
}

export default AddFriend;
