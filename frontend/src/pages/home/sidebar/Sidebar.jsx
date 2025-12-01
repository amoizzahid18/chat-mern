import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarFriends from "./SidebarFriends";
import SearchBar from "../SearchBar";
import { mockFriends } from "../chatSection/addFriends/mockFriends";
import { useSocket } from "../../SocketContext";

// function Sidebar( {setIsDm} ) {
function Sidebar() {
  const { connectSocket } = useSocket();
  const [friends, setFriends] = useState([]);
  const [loadingF, setLoadingF] = useState(false);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const filterFriends = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return mockFriends;
    return mockFriends.filter((u) => u.fullname.toLowerCase().includes(q));
  }, [filter]);

  const logoutUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
        const sock = connectSocket();
        sock.disconnect();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const fetchFriends = async () => {
    try {
      setLoadingF(true);
      const response = await axios.get("http://localhost:5000/home",{
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
    <div className="flex flex-col w-1/4  p-4">
      <SearchBar value={filter} onChange={setFilter} />

      {/* <SidebarFriends friends={filterFriends} setIsDm={setIsDm} /> */}
      <SidebarFriends friends={friends} />

      <div className="flex justify-start p-">
        <button className="btn btn-neutral ml-10 ">
          {loading ? (
            <button className="cursor-not-allowed px-10">
              <span class="loading loading-dots loading-sm bg-white"></span>
            </button>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <button onClick={logoutUser} className="cursor-pointer">
                Logout
              </button>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
