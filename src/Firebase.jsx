// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDL6TP3qjNHzglWdVgHzKq2pdgF3FCFaSg",
    authDomain: "my-react-app",
    projectId: "my-react-app-8b1f9",
    appId: "1022557792723",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

