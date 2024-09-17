"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { PiDotsThreeBold } from "react-icons/pi";

// import Image from 'next/image';
const Sidebar = () => {
  const { data: session } = useSession()
  
  
  return (
    <div className='flex flex-col items-center justify-between min-h-screen fixed'>
      <div className='flex flex-col gap-6'>
        
      <Link href="/" className='text-3xl mr-[120px]  rounded-full text-white font-bold hover:scale-105 '>LifeLog</Link>
      
        {session?
        <button onClick={()=>signOut()} className='p-3 w-auto bg-gradient-to-r from-orange-500 to-red-300 rounded-full text-white font-bold hover:brightness-75'>SignOut</button>:
        <button onClick={()=>signIn()} className='p-3 bg-gradient-to-tr from-orange-700 to-red-300 rounded-full text-white font-bold hover:brightness-75'>Continue with Google</button>
        }
      </div>
      
      <div className=" hover:bg-gray-700 rounded-full mb-6 p-3 ml-6 items-center text-white">
        {
          session&&(
            <div className='flex justify-between gap-11 items-center '>
            <div className="flex gap-2">
              <img src={session.user.image} 
               className='h-12 w-12 rounded-full' alt="image" />
              <div className="flex flex-col">
              <p>{session.user.name}</p>
              <h1 className='text-gray-400'>{session.user.username}</h1>
              </div>
            </div>
            <PiDotsThreeBold />
            </div>
          )
        }
      </div>
      
      
      
    </div>
  )
}

export default Sidebar