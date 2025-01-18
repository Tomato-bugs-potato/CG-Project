// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGrpC9X0vd_5_eyWPO1XsSRfyOyEKtGfc",
  authDomain: "cg-project-68f16.firebaseapp.com",
  projectId: "cg-project-68f16",
  storageBucket: "cg-project-68f16.firebasestorage.app",
  messagingSenderId: "482124642407",
  appId: "1:482124642407:web:3fb18f5e3b2bf1fd627cc2",
  measurementId: "G-WPL43FJ72Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


export {auth, app, provider, db};