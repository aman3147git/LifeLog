// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRE_KEY,
  authDomain: "next1-c9d14.firebaseapp.com",
  projectId: "next1-c9d14",
  storageBucket: "next1-c9d14.appspot.com",
  messagingSenderId: "761884118089",
  appId: "1:761884118089:web:f0055cdfaa865b5adb4398",
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
