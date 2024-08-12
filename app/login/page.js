"use client"; // Mark this component as a client component

import { useEffect, useState } from 'react'; // Import useEffect and useState
import { auth } from '../firebase'; // Import auth from your firebase setup
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import Header from '../components/Header';
import "./login.css";
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Check if user is already logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, redirect to home or another page
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // User is logged in, redirect to home page
            window.location.href = '/'; // Navigate to home page
        } catch (err) {
            setError('Error logging in'); // Handle errors
        }
    };

    return (
        <div className='login'>
            <Header />
            <form onSubmit={handleLogin}>
                
                <h1>Login Form</h1>
                <label htmlFor="username">Email</label>
                <input type="text" placeholder="Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="error">{error}</p>}
                <button type="submit">Log In</button>
                
                <div className="social">
                    <Link href="/register" style={{ textDecoration: 'none' }}>
                        <div className="register-btn"> Create an Account</div>
                    </Link>
                </div>
            </form>
        </div>
    );
}