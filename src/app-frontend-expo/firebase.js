import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyA7uSYQaJ6YZ2VAt5ATyFJIvJE_8dI_6lw",
  authDomain: "smart-home-project-backend.firebaseapp.com",
  projectId: "smart-home-project-backend",
  storageBucket: "smart-home-project-backend.appspot.com",
  messagingSenderId: "28119524954",
  appId: "1:28119524954:web:1c0c14bd686849a1b75a63",
  measurementId: "G-EZ9CWM7GQ5",
};

const app = initializeApp(config);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
