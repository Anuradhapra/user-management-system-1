// frontend/src/pages/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // POST /api/auth/signup - default role: Employee
            await axios.post('http://localhost:5000/api/auth/signup', { username, password });
            alert('Sign up successful! Please log in.');
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Sign up error:', error.response?.data || error.message);
            alert('Sign up failed: ' + (error.response?.data?.message || 'An error occurred.'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;