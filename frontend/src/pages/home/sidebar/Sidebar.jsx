import { useState, useMemo } from "react";
import SidebarFriends from "./SidebarFriends";
import SearchBar from "../SearchBar";
import { mockFriends } from "../chatSection/addFriends/mockFriends";

// function Sidebar( {setIsDm} ) {
function Sidebar(  ) {
  const [filter, setFilter] = useState("");
  const filterFriends = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return mockFriends;
    return mockFriends.filter(
      (u) =>
        u.fullname.toLowerCase().includes(q)
    );
  }, [filter]);

  return (
    <div className="flex flex-col w-1/4  p-4">
      <SearchBar value={filter} onChange={setFilter} />

      {/* <SidebarFriends friends={filterFriends} setIsDm={setIsDm} /> */}
      <SidebarFriends friends={filterFriends} />

      <div className="flex justify-start p-">
        <button className="btn btn-neutral ml-10 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          <span className="ml-4">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
