// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4wwSmvzi0eccXHbrX1skiKHm84rLLSLQ",
  authDomain: "rentalsystem-48b48.firebaseapp.com",
  projectId: "rentalsystem-48b48",
  storageBucket: "rentalsystem-48b48.firebasestorage.app",
  messagingSenderId: "412175336884",
  appId: "1:412175336884:web:09500aa5eae60e7049dee1",
  measurementId: "G-HLRJSWDSTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };