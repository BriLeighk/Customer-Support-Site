import React from 'react';
import { FaRobot } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa'; 
import { IoPersonCircle } from "react-icons/io5";
import Link from 'next/link'; // Import Link for navigation

import './Header.css';

const Header = () => {
    return (
        <header>
            <div className='icons left'>
                <Link href="/home"> {/* Link to home page */}
                    <FaHome size={30} /> {/* Home icon */}
                </Link>

                <Link href="/chatbot">
                    <FaRobot size={30} /> {/* Icon linking to the chatbot */}
                </Link>

            </div>

            <div className='icons right'>
                <Link href="/login">
                    <IoPersonCircle size={30} /> {/* Icon linking to the chatbot */}
                </Link>
            </div>
        </header>
    );
};

export default Header;