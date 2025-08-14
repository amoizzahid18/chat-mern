import {useState} from 'react'
import Sidebar from './home/sidebar/Sidebar.jsx'
import ChatSection from './home/chatSection/ChatSection.jsx'

function Home() {
  const [isDm, setIsDm] = useState(false);
  const [isAddFriend, setIsAddFriend] = useState(false);
  return (
    <div className='flex flex-row w-4/5 max-h-4/5 bg-base-300 rounded-box shadow-md'>
      <Sidebar setIsDm={setIsDm} />
      <ChatSection setIsDm={setIsDm} setIsAddFriend={setIsAddFriend} />
    </div>
  )
}

export default Home
