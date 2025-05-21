// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // A simple home page

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container" style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} /> {/* Sign-up form page */}
                    <Route path="/login" element={<Login />} />   {/* Login form page */}

                    {/* Admin only routes */}
                    <Route
                        path="/create-software"
                        element={
                            <PrivateRoute roles={['Admin']}> {/* Admin role required */}
                                <CreateSoftware />
                            </PrivateRoute>
                        }
                    />

                    {/* Employee only routes */}
                    <Route
                        path="/request-access"
                        element={
                            <PrivateRoute roles={['Employee']}> {/* Employee role required */}
                                <RequestAccess />
                            </PrivateRoute>
                        }
                    />

                    {/* Manager only routes */}
                    <Route
                        path="/pending-requests"
                        element={
                            <PrivateRoute roles={['Manager']}> {/* Manager role required */}
                                <PendingRequests />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;