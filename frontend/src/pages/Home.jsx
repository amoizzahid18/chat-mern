import React from 'react'
import Sidebar from './home/content/Sidebar'
import ChatSection from './home/messages/ChatSection'

function Home() {
  return (
    <div className='flex flex-row w-4/5 h-11/12 bg-base-100 rounded-box shadow-md'>
      <Sidebar />
      <ChatSection />
    </div>
  )
}

export default Home
