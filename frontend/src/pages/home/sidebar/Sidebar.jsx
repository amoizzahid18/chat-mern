import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import SidebarFriends from "./SidebarFriends";
import SearchBar from "../SearchBar";
import { useSocket } from "../../SocketContext";
import { useAuth } from "../../AuthContext";

function Sidebar() {
  const { connectSocket } = useSocket();
  const [friends, setFriends] = useState([]);
  const [loadingF, setLoadingF] = useState(false);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  const filteredFriends = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((u) => u.fullname.toLowerCase().includes(q));
  }, [filter]);

  const logoutUser = async () => {
    if (user)
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/auth/logout", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setLoading(false);
          const sock = connectSocket();
          sock.disconnect();
        }
      } catch (error) {
        console.log("Logout failed", error.message);
      } finally {
        setUser(null);
      }
    else setUser(null);
  };
  const fetchFriends = async () => {
    try {
      setLoadingF(true);
      const response = await axios.get("http://localhost:5000/home/friends", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const friends = response.data;
        setFriends(friends);
        setLoadingF(false);
      }
    } catch (error) {
      console.error("Fetching friends failed, ", error);
    }
  };
  useEffect(() => {
    fetchFriends();
  }, []);
  return (
    <div className="flex flex-col w-1/4 px-4 py-4   rounded-2xl  h-full">
      {/* Search Bar */}
      <SearchBar value={filter} onChange={setFilter} />

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        <SidebarFriends
          friends={filteredFriends}
          loading={loadingF}
          className="space-y-2"
        />
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        {loading ? (
          <button className="btn bg-white/20 text-white shadow-sm shadow-white w-full pointer-events-none border-2 flex justify-center">
            <span className="loading loading-dots loading-sm text-white"></span>
          </button>
        ) : (
          <button
            onClick={logoutUser}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2 transition duration-200 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
