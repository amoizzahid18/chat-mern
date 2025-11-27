import {useState} from 'react'
import Sidebar from './home/sidebar/Sidebar.jsx'
import ChatSection from './home/chatSection/ChatSection.jsx'
import { useSocket } from './SocketContext.jsx'
import { useEffect } from 'react';

function Home() {
  const socket = useSocket();
  useEffect(()=>{
    if(!socket) return;

    socket.emit("hello", {
      message: "Hello from user",
      id: socket.id
    })
    
  }, [])
  // const [isDm, setIsDm] = useState(false);
  // const [isAddFriend, setIsAddFriend] = useState(false);
  return (
    <div className='flex flex-row w-4/5 max-h-4/5 bg-base-300 rounded-box shadow-md'>
      {/* <Sidebar setIsDm={setIsDm} /> */}
      <Sidebar />
      {/* <ChatSection isDm={isDm} setIsDm={setIsDm} isAddFriend={isAddFriend} setIsAddFriend={setIsAddFriend} /> */}
      <ChatSection />
    </div>
  )
}

export default Home
