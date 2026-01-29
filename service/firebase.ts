// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { initializeAuth , getReactNativePersistence } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa6lS3vMspVH5mfz1d1y-r2z4Upus656Q",
  authDomain: "auroria-8d19a.firebaseapp.com",
  projectId: "auroria-8d19a",
  storageBucket: "auroria-8d19a.firebasestorage.app",
  messagingSenderId: "811908747908",
  appId: "1:811908747908:web:8ea65091fe3c2667c828d1",
  measurementId: "G-25ZBVZNK29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
