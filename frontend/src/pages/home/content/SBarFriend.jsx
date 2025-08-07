import React from "react";

function SBarFriend() {
  return (
    <>
      <li className="list-row">
        <div>
          <img
            className="size-6 rounded-4xl"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-col ml-4 justify-start items-center">
            <div className="font-bold">Dio Lupa</div>
            <div className="text-xs opacity-60">Online</div>
          </div>

        </div>
      </li>
    </>
  );
}

export default SBarFriend;
