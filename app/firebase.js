import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, signOut, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"; // Ensure all necessary imports
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth

let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

export { app, analytics, auth, signOut, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider }; // Ensure all necessary exports