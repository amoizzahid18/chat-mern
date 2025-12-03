import Sidebar from './home/sidebar/Sidebar.jsx'
import ChatSection from './home/chatSection/ChatSection.jsx'

function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500 p-4">
    <div className='flex flex-row bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl  shadow-2xl p-4 w-4/5 max-h-4/5'>
      <Sidebar />
      <ChatSection />
    </div>
    </div>
  )
}

export default Home
