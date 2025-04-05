// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "buno-app.firebaseapp.com",
  projectId: "buno-app",
  storageBucket: "buno-app.firebasestorage.app",
  messagingSenderId: "557650584399",
  appId: "1:557650584399:web:24bfa1255a712eff511b3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
