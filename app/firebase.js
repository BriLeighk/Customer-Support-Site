import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth
import dotenv from 'dotenv'; // Add this line
dotenv.config(); // Add this line to load .env.local

// Debugging: Log environment variables
console.log('Environment Variables:', process.env); // Check if variables are loaded

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // Ensure prefix if using Next.js
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Debugging: Log the firebaseConfig
console.log('Firebase Config:', firebaseConfig); // Check if config is populated

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth

let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

export { app, analytics, auth }; // Export auth