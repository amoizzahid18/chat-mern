import React from "react";

function SBarFriend() {
  return (
    <div className="flex h-16 hover:bg-base-300 duration-75 justify-start items-center">
      <div>
        <img
          className="size-8 rounded-4xl m-2"
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />
      </div>

      <div className="flex flex-col ml-2 items-start">
        <div className="font-bold">Dio Lupa</div>
        <div className="text-xs opacity-60">Hi there how are you </div>
      </div>
    </div>
  );
}

export default SBarFriend;
