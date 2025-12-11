import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import SidebarFriends from "./SidebarFriends";
import SearchBar from "../SearchBar";
import { useSocket } from "../../SocketContext";
import { useAuth } from "../../AuthContext";
import { useChatUI } from "../../ChatUIContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { disconnectSocket } = useSocket();
  const { refreshUsers, goHome, setFriendsDM } = useChatUI();
  const [friends, setFriends] = useState([]);
  const [loadingF, setLoadingF] = useState(true);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const filteredFriends = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((u) => u.fullname.toLowerCase().includes(q));
  }, [filter, friends]);

  const logoutUser = async () => {
    if (user)
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/auth/logout", {
          withCredentials: true,
        });
        if (response.status === 200) {
          disconnectSocket();
          setFriendsDM(null);
          goHome();
          setUser(null);
        }
      } catch (error) {
        console.log("Logout failed", error.message);
      } finally {
        setLoading(false);
      }
    else {
      navigate("/login");
    };
  };

  const fetchFriends = async () => {
    if (user)
      try {
        setLoadingF(true);
        const response = await axios.get("http://localhost:5000/home/friends", {
          withCredentials: true,
        });
        if (response.status === 200) {
          const friends = response.data;
          setFriends(friends);
        }
      } catch (error) {
        console.error("Fetching friends failed, ", error);
      } finally {
        setLoadingF(false);
      }
  };
  useEffect(() => {
    fetchFriends();
  }, [refreshUsers]);
  return (
    <div
      className="flex flex-col w-1/4 px-4 py-5 rounded-2xl h-full 
                   backdrop-blur-xl
                  "
    >
      {/* Search Bar */}
      <div className="mb-3">
        <SearchBar value={filter} onChange={setFilter} />
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        {loadingF ? (
          <div className=" bg-white/20 text-white border border-white/30 w-full my-4 shadow-md h-full min-h-120 rounded-box">
            <div className="max-h-[490px]   overflow-y-scroll text-center">
              <div className="min-h-96 flex items-center justify-center">
                <span class="loading loading-dots loading-lg"></span>
              </div>
            </div>
          </div>
        ) : (
          <SidebarFriends friends={filteredFriends} loading={loadingF} />
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-5">
        {loading ? (
          <button
            className="w-full pointer-events-none flex items-center justify-center
                           bg-white/20 text-white border border-white/30 rounded-xl 
                           py-3 shadow-md"
          >
            <span className="loading loading-dots loading-sm text-white"></span>
          </button>
        ) : (
          <button
            onClick={logoutUser}
            className="btn bg-purple-700 hover:bg-purple-600 border-none text-lg text-white w-full shadow-lg py-2 rounded-xl transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
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
