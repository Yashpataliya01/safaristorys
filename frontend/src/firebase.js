import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-f5b3c.firebaseapp.com",
  projectId: "blogapp-f5b3c",
  storageBucket: "blogapp-f5b3c.appspot.com",
  messagingSenderId: "86750949464",
  appId: "1:86750949464:web:3131094318d6fbe48e9a2d",
  measurementId: "G-ZKJ682X7HD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);