// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "amogussocial.firebaseapp.com",
  projectId: "amogussocial",
  storageBucket: "amogussocial.appspot.com",
  messagingSenderId: "65622558602",
  appId: "1:65622558602:web:97a1dc7705f17dfc736a73",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
