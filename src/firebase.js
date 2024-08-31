

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvBp6DyUiYQxug_tcC3TLB8epDtMu9-Mk",
  authDomain: "podcast-react-rec.firebaseapp.com",
  projectId: "podcast-react-rec",
  storageBucket: "podcast-react-rec.appspot.com",
  messagingSenderId: "18470788393",
  appId: "1:18470788393:web:198fa09bc26fd72aa76b38",
  measurementId: "G-DT9K7QF87K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


export { auth, db, storage};