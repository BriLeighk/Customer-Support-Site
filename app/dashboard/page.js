'use client'

import Header from '../components/Header';
import Popup from '../components/Popup';
import { useState, useEffect } from 'react';
import { auth, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from '../firebase'; // Ensure correct import path
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import './dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Update user state
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleEditPassword = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentPassword('');
        setNewPassword('');
    };

    const handleSavePassword = async () => {
        if (user) {
            try {
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
                setIsEditing(false);
                setPopupMessage('Password updated successfully');
                setShowPopup(true);
            } catch (error) {
                console.error('Error updating password:', error);
                setPopupMessage('Error updating password');
                setShowPopup(true);
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (user) {
            try {
                await deleteUser(user);
                setPopupMessage('Account deleted successfully');
                setShowPopup(true);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } catch (error) {
                console.error('Error deleting account:', error);
                setPopupMessage('Error deleting account');
                setShowPopup(true);
            }
        }
    };

    return (
        <div className='home-div'>
            <Header />
            <h1>User Dashboard</h1>
            {user && (
                <div>
                    <p> <strong>Email: </strong> {user.email}</p>
                    <p>
                        <strong>Password:</strong>
                        {isEditing ? (
                            <>
                                <div className="input-group">
                                    <label>Current Password:</label>
                                    <input 
                                        type="password" 
                                        placeholder="Current Password"
                                        value={currentPassword} 
                                        onChange={(e) => setCurrentPassword(e.target.value)} 
                                        className="input-text-color"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>New Password:</label>
                                    <input 
                                        type="password" 
                                        placeholder="New Password"
                                        value={newPassword} 
                                        onChange={(e) => setNewPassword(e.target.value)} 
                                        className="input-text-color"
                                    />
                                </div>
                            </>
                        ) : (
                            ' ********'
                        )}
                    </p>
                    {isEditing ? (
                        <>
                            <button onClick={handleSavePassword} className='savePassword-button'>Save</button>
                            <button onClick={handleCancelEdit} className='cancelEdit-button'>Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleEditPassword} className='editPassword-button'>Edit</button>
                    )}
                    <button onClick={handleDeleteAccount} className='deleteAccount-button'>Delete Account</button>
                </div>
            )}
            {showPopup && (
                <Popup 
                    message={popupMessage} 
                    onClose={() => setShowPopup(false)} 
                />
            )}
        </div>
    );
}