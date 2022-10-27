// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJFjWtmU-zYIbfdYVKPxJwPYH4SAwuENo",
  authDomain: "netflix-clone-el.firebaseapp.com",
  projectId: "netflix-clone-el",
  storageBucket: "netflix-clone-el.appspot.com",
  messagingSenderId: "837902155922",
  appId: "1:837902155922:web:0ca7bcc5e1d9a762f5664b",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
