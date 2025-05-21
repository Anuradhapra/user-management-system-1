// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../services/authService';

const PrivateRoute = ({ children, roles }) => {
    // If not authenticated, redirect to login page
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // If roles are specified and user's role is not among them, redirect to home or unauthorized page
    if (roles && !roles.includes(getUserRole())) {
        alert("You don't have permission to access this page.");
        return <Navigate to="/" replace />; // Redirect to home or an unauthorized page
    }

    // If authenticated and authorized, render the children components
    return children;
};

export default PrivateRoute;