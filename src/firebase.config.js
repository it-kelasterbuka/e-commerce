// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUVwj_CNkiXH666bmTodcLMTk0OokfIww",
  authDomain: "e-commerce-733a2.firebaseapp.com",
  projectId: "e-commerce-733a2",
  storageBucket: "e-commerce-733a2.appspot.com",
  messagingSenderId: "892248629194",
  appId: "1:892248629194:web:3892f6546e3d3320dbf933",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
