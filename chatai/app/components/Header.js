"use client"; // Mark this component as a client component

import React, { useEffect, useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa'; 
import { IoPersonCircle } from "react-icons/io5";
import Link from 'next/link'; 
import { auth } from '../firebase'; // Import auth from your firebase setup
import { signOut } from 'firebase/auth'; // Import signOut

import './Header.css';

const Header = () => {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Update user state
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleLogout = async () => {
        await signOut(auth); // Sign out the user
        // No router call here; user will be redirected to login page via Link
    };

    return (
        <header>
            <div className='icons left'>
                <Link href="/"> <FaHome size={30} /> </Link>
                <Link href="/chatbot"> <FaRobot size={30} /> </Link>
            </div>
            <div className='icons right'>
                <div onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                    <IoPersonCircle size={30} />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            {user ? (
                                <Link href="/login" onClick={handleLogout}>Sign Out</Link>
                            ) : (
                                <Link href="/login">Log In</Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;