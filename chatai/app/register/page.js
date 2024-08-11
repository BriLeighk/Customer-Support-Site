"use client"; // Add this line at the top

import Header from '../components/Header';
import "../login/login.css";
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '../firebase'; // Change this line to point to the correct path
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./register.css";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Redirect to login page after successful account creation
            window.location.href = '/'; // Navigate to login page
        } catch (err) {
            // Check if the error message is blank
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already associated with another account');
            } else if (err.message) { // Check if there's a specific error message
                setError(err.message);
            } else {
                setError('Error creating account'); // Fallback error message
            }
        }
    };

    return (
        <div className='register'>
            <Header />
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>Register Form</h1>
                <label htmlFor="username">Email</label>
                <input type="text" placeholder="Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                {error && <p className="error">{error}</p>}
                
                
                <button type="submit">Create Account</button>
                <div className="social">
                    <Link href="/login" style={{ textDecoration: 'none' }}>
                        <div className="login-btn"> Already have an account? Log In</div>
                    </Link>
                </div>
            </form>
        </div>
    );
}