import Sidebar from "./home/sidebar/Sidebar.jsx";
import ChatSection from "./home/chatSection/ChatSection.jsx";

function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div
        className="flex flex-row gap-2 bg-white/10 backdrop-blur-xl border border-white/20 
                  rounded-2xl shadow-[0_0_25px_5px_rgba(255,255,255,0.05)] 
                  p-4 w-4/5 max-h-[90vh] overflow-hidden"
      >
        <Sidebar />
        <ChatSection />
      </div>
    </div>
  );
}

export default Home;
