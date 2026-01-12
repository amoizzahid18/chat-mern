import Sidebar from "./home/sidebar/Sidebar.jsx";
import ChatSection from "./home/chatSection/ChatSection.jsx";
import { useState } from "react";
import { useChatUI } from "./ChatUIContext.jsx";


function Home() {
  const {showSideBar, setShowSidebar} = useChatUI();
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-2 ">
      <div
        className="flex flex-col lg:flex-row gap-2 bg-white/10 backdrop-blur-xl border border-white/20 
                  rounded-2xl shadow-[0_0_25px_5px_rgba(255,255,255,0.05)] 
                  p-4  w-4/5   overflow-hidden"
      >
        {/* Mobile: Toggle button */}
        <button
          onClick={() => setShowSidebar(!showSideBar)}
          className="lg:hidden flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-600 text-white px-3 py-2 rounded-xl mb-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {showSideBar ? "Hide Friends" : "Show Friends"}
        </button>

        {/* Sidebar - Hidden on mobile by default, full width on md and above */}
        {showSideBar && (
          <div className="w-full lg:hidden">
            <Sidebar  />
          </div>
        )}
        <div className={`hidden lg:flex w-1/4 min-h-fit min-h-full`}>
          <Sidebar />
        </div>

        {/* Chat Section - Full width on mobile, 3/4 on larger screens */}
        {!showSideBar && (
          <div className="w-full md:hidden">
            <ChatSection />
          </div>
        )}

        {/* Show both on md and larger */}
        {!showSideBar && (
          <div className="hidden md:flex md:flex-1">
            <ChatSection />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
