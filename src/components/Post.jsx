import React from 'react'
import { PiDotsThreeBold } from "react-icons/pi";
import Icons from './Icons';
import Image from 'next/image';
const Post = ({post,id}) => {
  return (
    <div className='p-3 border-b w-full '>
        <div className="flex justify-between">
            <div className="flex gap-2">
                <img className='h-12 w-12 rounded-full' src={post?.profileimg} alt="No image" />
                <h1 className='font-semibold text-white'>{post?.name}</h1>
                <p className='text-gray-400'>{post?.username}</p>
            </div>
            <div className="font-bold text-white">
                <PiDotsThreeBold/> 
            </div>
        </div>
        <h1 className='ml-11 text-gray-200'>{post?.text}</h1>
        

        
        <img className="object-cover w-full max-h-[250px] border border-gray-300 rounded-xl hover:brightness-75" src={post?.postImage} alt="" />
        <Icons id={id} userid={post.userid}/>
    </div>
  )
}

export default Post
