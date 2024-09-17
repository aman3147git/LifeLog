import { app } from "@/firebase";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import React from "react";
import Post from "./Post";

const Feed = async () => {
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));     //accessing data from firestore
  let data = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
