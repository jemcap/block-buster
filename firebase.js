import { config } from "./config.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: "block-buster-9bd94.firebaseapp.com",
  projectId: "block-buster-9bd94",
  storageBucket: "block-buster-9bd94.firebasestorage.app",
  messagingSenderId: "249062537446",
  appId: "1:249062537446:web:55bcfa4e1de1bffe94e327",
  measurementId: "G-BBKD3L90M5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
