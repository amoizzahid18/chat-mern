import React from 'react'
import Sidebar from './home/content/Sidebar'
import ChatSection from './home/messages/ChatSection'

function Home() {
  return (
    <div className='flex flex-row w-4/5 max-h-4/5 bg-base-300 rounded-box shadow-md'>
      <Sidebar />
      <ChatSection />
    </div>
  )
}

export default Home
