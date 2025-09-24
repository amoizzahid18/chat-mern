import React from 'react'
import FriendToBe from './addFriends/FriendToBe'

function ViewProfile() {
  return (
    <div className='flex w-full flex-col h-full justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src='https://avatar.iran.liara.run/public/boy?username=moiz' className='rounded-full w-24 h-24 m-3'/>
        <div className='font-medium '>Moiz Zahid</div>
        <div className='font-light'>@ amoizzahid18</div>
      </div>
    <div className='p-5 w-full h-full flex flex-col items-start'>
        <div className='font-bold '>Bio</div>
        <div className='mx-3 mb-3'>Hellp there i am suing chat app</div>
        <div className='font-bold '>Email</div>
        <div className='mx-3'>a.moiz.zahid.18@gmail.com</div>
        <div className='divider'></div>
        <div className='font-bold '>Options</div>
        
    </div>
    </div>
  )
}

export default ViewProfile
