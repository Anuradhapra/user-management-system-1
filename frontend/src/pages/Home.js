// frontend/src/pages/Home.js
import React from 'react';
import { isAuthenticated, getUserRole } from '../services/authService';

function Home() {
    const loggedIn = isAuthenticated();
    const role = getUserRole();

    return (
        <div>
            <h1>Welcome to the User Access Management System</h1>
            <p>This system allows users to register, log in, request software access, and for managers to approve or reject those requests. Admins can manage software entries.</p>
            {!loggedIn ? (
                <p>Please <a href="/login">Login</a> or <a href="/signup">Sign Up</a> to continue.</p>
            ) : (
                <p>You are logged in as a <strong>{role}</strong>. Use the navigation bar to access features relevant to your role.</p>
            )}
        </div>
    );
}

export default Home;