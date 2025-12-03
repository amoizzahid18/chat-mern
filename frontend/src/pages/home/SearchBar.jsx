import React, { useEffect, useState } from "react";
import { mockFriends } from "./chatSection/addFriends/mockFriends.js";

function SearchBar({ value = "", onChange = () => {} }) {
  const [filter, setFilter] = useState("");
  // const [newUsers, setNewUsers] = useState(mockFriends);
  const new_users = () => {
  }
  return (
    <label className="input mb-4 bg-white/10 border outline-none border-white/30 rounded-xl focus-within:border-purple-400 transition   w-full my-4  shadow-md">
      <input
        type="search"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent w-full placeholder-white/60 text-white outline-none"
      />

      <button className="hover:cursor-pointer scale-115 p-2  flex justify-center items-center rounded-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </button>
    </label>
  );
}

export default SearchBar;
