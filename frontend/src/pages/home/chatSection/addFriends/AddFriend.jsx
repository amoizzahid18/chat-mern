import { useState, useEffect, useMemo } from "react";
import SearchBar from "../../SearchBar";
import ShowFriendsToBe from "./ShowFriendsToBe";
import axios from "axios";

function AddFriend() {
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
        console.log(user);
        setUsers(user);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const filteredUsers = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.fullname.toLowerCase().includes(q)
    );
  }, [filter, users]);
  return (
    <div className="h-full">
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
