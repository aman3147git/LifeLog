"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {addDoc,collection,serverTimestamp,getFirestore} from "firebase/firestore";
import { app } from "@/firebase";

const Input = () => {
  const { data: session } = useSession();
  const [text,setText]=useState('');
  const [file, setFile] = useState(null);
  const refer = useRef(null);
  const [formurl, setFormurl] = useState(null);
  const db=getFirestore(app);
  const handlechange = (e) => {
    const files = e.target.files[0];
    if (files) {
      setFile(files);
      setFormurl(URL.createObjectURL(files));
    }
  };
  useEffect(() => {
    if (file) {
      UploadFile();
    }
  }, [file]);
  const UploadFile = () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setFile(null);
        setFormurl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormurl(downloadURL);
        });
      }
    );
  };
  
  const handleSubmit=async()=>{
      const docRef=await addDoc(collection(db,"posts"),{
          name:session.user.name,
          username:session.user.username,
          profileimg:session.user.image,
          userid:session.user.uid,
          postImage:formurl,
          text,
          timestamp:serverTimestamp()

      })
      setText("");
      location.reload();
  }



  if (!session) return null;          //if not loggedin input will not show
  return (
    
    <div className="  border-b w-full text-white">
      <div className="flex items-center mr-[260px]">
        {session && (
          <img
            src={session.user.image}
            alt=""
            className="w-10 h-10 rounded-full ml-2"
          />
        )}
        <input
          type="text"
          placeholder="What is happening?!"
          className="p-3 my-3 outline-none bg-transparent"
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
      </div>
      {file && (
        <img
          src={formurl}
          alt=""
          className="object-cover w-full max-h-[250px]"
        />
      )}
      <div className="flex justify-between">
        <MdOutlinePermMedia
          size={"20px"}
          className="text-blue-500 ml-[60px] mt-4"
          onClick={() => refer.current.click()}
        />
        <input
          type="file"
          accept="/image*"
          ref={refer}
          hidden
          onChange={handlechange}
        />
        <button 
          onClick={handleSubmit}
          disabled={text.trim()===' ' || !formurl}
          className="p-2 w-[70px] bg-blue-400 rounded-full text-white mb-2 hover:brightness-75"
        >
          Post
        </button>
      </div>
      </div>
      
    
  );
};

export default Input;

