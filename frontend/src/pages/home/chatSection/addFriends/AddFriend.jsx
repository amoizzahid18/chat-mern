import { useState, useEffect, useMemo } from "react";
import SearchBar from "../../SearchBar";
import ShowFriendsToBe from "./ShowFriendsToBe";
import { mockFriends } from "./mockFriends.js";

function AddFriend() {
  const [filter, setFilter] = useState("");
  const filteredUsers = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return mockFriends;
    return mockFriends.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.fullname.toLowerCase().includes(q)
    );
  }, [filter]);
  
  return (
    <div className="h-full">
      <div className="text-2xl w-full text-center pt-4   font-bold">Add Friend</div>
      <div className="px-4">
        <SearchBar value={filter} onChange={setFilter} />
      </div>
      <ShowFriendsToBe users={filteredUsers} />
    </div>
  );
}

export default AddFriend;
