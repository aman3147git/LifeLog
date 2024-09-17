

"use client";
import { app } from '@/firebase';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc, addDoc, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { signIn, useSession } from 'next-auth/react';
import { HiHeart } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";

const Icons = ({id, userid}) => {
    const [show,setShow]=useState(false);
    const [likes, setLikes] = useState([]);
    const [isliked, setIsliked] = useState(false);
    const [comments, setComments] = useState([]);    
    const [commentText, setCommentText] = useState("");  
    const { data: session } = useSession();
    const db = getFirestore(app);

    const postDelete = () => {
        deleteDoc(doc(db, "posts", id)).then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    const postLike = async () => {
        if (session) {
            if (isliked) {
                await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))   //if already liked then delete
            } else {
                await setDoc(doc(db, "posts", id, "likes", session.user.uid), {     //else like
                    username: session.user.username,
                    timestamp: serverTimestamp()
                })
            }
        } else {
            signIn();
        }
    }

    const addComment = async () => {
        if (!session) {
            signIn();   
            return;
        }

        if (commentText.trim() === "") return;  

        
        await addDoc(collection(db, "posts", id, "comments"), {
            username: session.user.username,
            commentText: commentText,
            timestamp: serverTimestamp(),
        });

        setCommentText("");  
    }

    const deleteComment = async (commentId) => {
        await deleteDoc(doc(db, "posts", id, "comments", commentId));
    }

    useEffect(() => {
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
            setLikes(snapshot.docs);
        })
    }, [db]);

    useEffect(() => {
        setIsliked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
    }, [likes]);

    
    useEffect(() => {
        const q = query(collection(db, "posts", id, "comments"), orderBy("timestamp", "asc"));  
        onSnapshot(q, (snapshot) => {
            setComments(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
    }, [db]);

    return (
        <div className='text-white flex flex-col gap-4 text-2xl mt-2 '>
            <div className='flex gap-12'>
                <FaRegComment onClick={()=>setShow(!show)}/>
                <div className='flex gap-1 items-center hover:text-red-600'>
                    {isliked ?
                        <HiHeart onClick={postLike} className='text-red-600 ' /> :
                        <HiOutlineHeart onClick={postLike} className='' />
                    }
                    {likes.length > 0 && <span>{likes.length}</span>}
                </div>

                {session?.user?.uid === userid &&
                    <MdOutlineDelete onClick={postDelete} className='hover:scale-90 ' />
                }
            </div>

            
            {show &&
            <div className='flex flex-col mt-4'>
            <input
                type="text"
                placeholder="Add a comment..."
                className="p-2 bg-gray-800 text-white rounded"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={addComment} className='mt-2 bg-red-700 text-white p-2 rounded'>
                Post
            </button>
        </div>
            }
            

            {show &&
            <div className='mt-4'>
            {comments.map((comment) => (
                <div key={comment.id} className='flex justify-between items-center mb-2'>
                    <div>
                        <span className="font-semibold">{comment.username}: </span>
                        <span>{comment.commentText}</span>
                    </div>
                    {session?.user?.username === comment.username && (
                        <MdOutlineDelete onClick={() => deleteComment(comment.id)} className='hover:scale-90' />
                    )}
                </div>
            ))}
        </div>
            }
            
        </div>
    );
}

export default Icons;
