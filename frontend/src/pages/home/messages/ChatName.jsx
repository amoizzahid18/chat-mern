import React from "react";

function ChatName() {
  return (
    <>
      
        <div className="flex flex-row justify-start bg-white items-center">
          <img
            className="size-10 rounded-4xl mx-3 my-2 "
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
          <div className="w-full h-full flex flex-row justify-between  pr-2">
            <div className="flex flex-col ml-4 justify-center items-start">
              <div className="font-bold text-lg">Dio Lupa</div>
              <div className="text-xs opacity-70">Online</div>
            </div>
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      
    </>
  );
}

export default ChatName;
