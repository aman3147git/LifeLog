"use client";
import { app } from "@/firebase";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Feed = () => {
  const [data, setData] = useState([]);  

  useEffect(() => {
    const fetchPosts = async () => {
      const db = getFirestore(app);
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc")); // Fetch posts ordered by timestamp
      let posts = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setData(posts);  
    };

    fetchPosts();
  }, []); 

  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;



