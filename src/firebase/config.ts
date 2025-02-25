// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "bunoapp-021023.firebaseapp.com",
  projectId: "bunoapp-021023",
  storageBucket: "bunoapp-021023.appspot.com",
  messagingSenderId: "873293604307",
  appId: "1:873293604307:web:35f9d2a25206f11efa3b26",
  measurementId: "G-6FZDPK3S29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
