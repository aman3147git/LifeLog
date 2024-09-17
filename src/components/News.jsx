"use client"
import React, { useEffect, useState } from 'react'


const News = () => {
  const [data,setData]=useState([]);
  const [num,setNum]=useState(4);
  useEffect(()=>{
    
      fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json")
      .then((res)=>res.json()).then((ans)=>{
        setData(ans.articles);
       
        
      })
     
  },[]);
                            //style={{background:(index+1)%2===0?"#1111":"white"}}
  return (
    <div className='p-3 text-white '>
      <h1 className='font-bold text-2xl my-3 text-center'>
        What&#39;s happening
      </h1>
      <div className='flex flex-col gap-3 text-gray-400 '>
      {
         data.slice(0,num).map((item,index)=>(
          <div key={item.url} style={{background:(index+1)%2===0?"gray":""}} >
            <a href={item.url} target='_blank' className='flex gap-2'>
            <h1 >{item.title}</h1>
            <img src={item.urlToImage} alt="image" className='w-8 h-8 '/>
            </a>
            
          </div>
         ))
      }
      </div>
      <button onClick={()=>setNum(num+4)} className='mt-6 bg-gradient-to-tr from-yellow-800 to-orange-300 p-3 rounded-full text-white font-bold hover:scale-105'>More</button>

    </div>
  )
}

export default News