// frontend/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, getUserRole } from '../services/authService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // POST /api/auth/login - returns JWT and role
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setAuthToken(response.data.token); // Store the JWT
            const userRole = getUserRole(); // Get user role from the token

            // Role-based redirection after login
            if (userRole === 'Admin') {
                navigate('/create-software');
            } else if (userRole === 'Manager') {
                navigate('/pending-requests');
            } else if (userRole === 'Employee') {
                navigate('/request-access');
            } else {
                navigate('/'); // Fallback for undefined roles
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert('Login failed: ' + (error.response?.data?.message || 'Invalid username or password.'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;