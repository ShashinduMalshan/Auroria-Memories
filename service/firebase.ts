// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8pEjWOC_n_v9zNPCNg7UbyYyJH9Rb4pU",
  authDomain: "auroria-8e768.firebaseapp.com",
  projectId: "auroria-8e768",
  storageBucket: "auroria-8e768.firebasestorage.app",
  messagingSenderId: "524448048957",
  appId: "1:524448048957:web:e885a5b0686450ad3a4754",
  measurementId: "G-2JWRKNPZGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);