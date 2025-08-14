import React from "react";

function FriendToBe( {fullname, username, profilePic} ) {
  return (
    <div className="h-54 cursor-default bg-base-200 hover:shadow-sm duration-100 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center w-full p-1  justify-evenly">
        <div className="flex  justify-center w-full mt-1">
          <img
            className="rounded-full m-2"
            width={80}
            src={profilePic}
          />
        </div>
        <div className="text-md font-bold">{fullname}</div>
        <div className="text-md font-light">{username}</div>
      </div>

      <div className="btn btn-neutral btn-square w-full  mx-1 px-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
        <span className="text-md ml-4 font-bold ">Add to Friends</span>
      </div>
    </div>
  );
}

export default FriendToBe;
