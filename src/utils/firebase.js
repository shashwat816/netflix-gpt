// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflixgpt-3541c.firebaseapp.com",
  projectId: "netflixgpt-3541c",
  storageBucket: "netflixgpt-3541c.firebasestorage.app",
  messagingSenderId: "704925207536",
  appId: "1:704925207536:web:6356ae22ddea1f60392b35",
  measurementId: "G-QSR39B7P56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);