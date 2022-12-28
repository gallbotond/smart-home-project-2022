import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6bWXHxFGSas-TQ9fdPC1-dIwgCEFkvYM",
  authDomain: "smart-home-2699f.firebaseapp.com",
  databaseURL: "https://smart-home-2699f-default-rtdb.firebaseio.com",
  projectId: "smart-home-2699f",
  storageBucket: "smart-home-2699f.appspot.com",
  messagingSenderId: "1082549870371",
  appId: "1:1082549870371:web:6c05662eeaae8e748a7696",
  measurementId: "G-MDEHVPRYTY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const realtimeDb = getDatabase();

export default app;
