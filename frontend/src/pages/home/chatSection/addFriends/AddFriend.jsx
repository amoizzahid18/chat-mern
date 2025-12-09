import { useState, useEffect, useMemo } from "react";
import SearchBar from "../../SearchBar";
import ShowFriendsToBe from "./ShowFriendsToBe";
import axios from "axios";
import { useChatUI } from "../../../ChatUIContext";

function AddFriend() {
  const { goHome, refreshUsers } = useChatUI();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/home/all-users", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const user = response.data;
        setUsers(user);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const filteredUsers = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.fullname.toLowerCase().includes(q)
    );
  }, [filter, users]);

  useEffect(() => {
    fetchUsers();
  }, [refreshUsers]);
  return (
    <div className="h-full pt-5">
      <div className="w-full flex flex-row">
        <button
          onClick={goHome}
          className="ml-4 hover:bg-white/10 p-2 hover:shadow-md cursor-pointer  rounded-full"
        >
          <svg
            className="h-[1.5em] "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="size-6"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>
      <div className="text-2xl w-full text-center pt-4   font-bold">
        Add Friend
      </div>
      <div className="px-4">
        <SearchBar value={filter} onChange={setFilter} />
      </div>
      <ShowFriendsToBe users={filteredUsers} loading={loading} />
    </div>
  );
}

export default AddFriend;
