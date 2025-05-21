// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../services/authService';

function Navbar() {
    const navigate = useNavigate();
    const loggedIn = isAuthenticated();
    const role = getUserRole();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/">User Access Management</Link>
            <div className="navbar-links">
                {!loggedIn ? (
                    <>
                        <Link to="/signup">Sign Up</Link> {/* Link to signup page */}
                        <Link to="/login">Login</Link>     {/* Link to login page */}
                    </>
                ) : (
                    <>
                        {role === 'Admin' && <Link to="/create-software">Create Software</Link>} {/* Admin only link */}
                        {role === 'Employee' && <Link to="/request-access">Request Access</Link>} {/* Employee only link */}
                        {role === 'Manager' && <Link to="/pending-requests">Pending Requests</Link>} {/* Manager only link */}
                        <button onClick={handleLogout} style={{ marginLeft: '15px', backgroundColor: '#dc3545', border: 'none' }}>Logout</button>
                        <span className="navbar-user-info">({role})</span>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;