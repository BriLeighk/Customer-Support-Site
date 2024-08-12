"use client"; // Mark this component as a client component

import React, { useEffect, useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa'; 
import { IoPersonCircle } from "react-icons/io5";
import Link from 'next/link'; 
import { auth, signOut } from '../firebase'; // Ensure auth is imported
import { FaTimes } from 'react-icons/fa'; // Import FaTimes for x icon

import './Header.css';

const Header = () => {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Update user state
            setIsLoggedIn(!!user); // Update login status
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleLogout = async () => {
        await signOut(auth); // Sign out the user
        // No router call here; user will be redirected to login page via Link
    };

    const handleChatbotClick = (event) => {
        if (!isLoggedIn) {
            event.preventDefault(); // Prevent navigation
            setShowPopup(true); // Show popup if not logged in
        }
    };

    return (
        <header>
            <div className='icons left'>
                <Link href="/"> <FaHome size={30} /> </Link>
                <Link href="/chatbot" onClick={handleChatbotClick}> <FaRobot size={30} /> </Link>
            </div>
            <div className='icons right'>
                <div onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                    <IoPersonCircle size={30} />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            {user ? (
                                <>
                                    <Link href="/dashboard">Dashboard</Link>
                                    <Link href="/login" onClick={handleLogout}>Sign Out</Link>
                                </>
                            ) : (
                                <Link href="/login">Log In</Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <p>You must be logged in to use the chatbot feature. <Link href="/login">Log in here.</Link></p>
                    <button onClick={() => setShowPopup(false)} className="closeButton"><FaTimes /></button>
                </div>
            )}
        </header>
    );
};

export default Header;