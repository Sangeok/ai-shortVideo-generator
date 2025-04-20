// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDI4YCac0DGUJ8s81aFsdCWE61RPxb8Jtw",
  authDomain: "ai-shorts-generator2.firebaseapp.com",
  projectId: "ai-shorts-generator2",
  storageBucket: "ai-shorts-generator2.firebasestorage.app",
  messagingSenderId: "667486963405",
  appId: "1:667486963405:web:5f1bc031e353f09eba0b84",
  measurementId: "G-HKHDMH7RT0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export default app;
