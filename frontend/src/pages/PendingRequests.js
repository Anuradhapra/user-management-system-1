// frontend/src/pages/PendingRequests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../services/authService';

function PendingRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        try {
            const token = getAuthToken();
            const response = await axios.get('http://localhost:5000/api/requests/pending', {
                headers: {
                    Authorization: Bearer ${token}
                }
            });
            setRequests(response.data);
        } catch (err) {
            console.error('Error fetching pending requests:', err.response?.data || err.message);
            setError('Failed to load pending requests.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (requestId, status) => {
        try {
            const token = getAuthToken();
            // PATCH /api/requests/:id - Approve or reject
            await axios.patch(
                http://localhost:5000/api/requests/${requestId},
                { status },
                {
                    headers: {
                        Authorization: Bearer ${token}
                    }
                }
            );
            alert(Request ${status.toLowerCase()} successfully!);
            fetchRequests(); // Refresh the list
        } catch (err) {
            console.error(Error ${status.toLowerCase()} request:, err.response?.data || err.message);
            alert(`Failed to ${status.toLowerCase()} request: ` + (err.response?.data?.message || 'An error occurred.'));
        }
    };

    if (loading) return <div>Loading pending requests...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (requests.length === 0) return <div>No pending requests.</div>;

    return (
        <div>
            <h2>Pending Access Requests</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        <div>
                            <strong>User:</strong> {request.user?.username || 'N/A'} <br />
                            <strong>Software:</strong> {request.software?.name || 'N/A'} <br />
                            <strong>Access Type:</strong> {request.accessType} <br />
                            <strong>Reason:</strong> {request.reason} <br />
                            <strong>Status:</strong> {request.status}
                        </div>
                        <div>
                            <button
                                onClick={() => handleAction(request.id, 'Approved')}
                                style={{ backgroundColor: '#28a745', marginRight: '10px' }}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleAction(request.id, 'Rejected')}
                                style={{ backgroundColor: '#dc3545' }}
                            >
                                Reject
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PendingRequests;