import Sidebar from "./home/sidebar/Sidebar.jsx";
import ChatSection from "./home/chatSection/ChatSection.jsx";
import { useState } from "react";

function Home() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-2 md:p-4">
      <div
        className="flex flex-col md:flex-row gap-2 bg-white/10 backdrop-blur-xl border border-white/20 
                  rounded-2xl shadow-[0_0_25px_5px_rgba(255,255,255,0.05)] 
                  p-2 md:p-4 w-full md:w-4/5 max-h-[90vh] overflow-hidden"
      >
        {/* Mobile: Toggle button */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-600 text-white px-3 py-2 rounded-xl mb-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {showSidebar ? "Hide Chats" : "Show Chats"}
        </button>

        {/* Sidebar - Hidden on mobile by default, full width on md and above */}
        {showSidebar && (
          <div className="w-full md:w-1/4 min-h-fit md:min-h-full">
            <Sidebar />
          </div>
        )}
        
        {/* Chat Section - Full width on mobile, 3/4 on larger screens */}
        {!showSidebar && (
          <div className="w-full md:flex-1">
            <ChatSection />
          </div>
        )}
        
        {/* Show both on md and larger */}
        <div className="hidden md:flex md:flex-1">
          <ChatSection />
        </div>
      </div>
    </div>
  );
}

export default Home;
