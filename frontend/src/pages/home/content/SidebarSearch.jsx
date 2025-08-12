import React from "react";

function SidebarSearch() {
  return (
    <label className="input mb-4 rounded-full border-none">
      <input type="search" required placeholder="Search"  />

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

export default SidebarSearch;
