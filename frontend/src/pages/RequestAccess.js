// frontend/src/pages/RequestAccess.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../services/authService';

function RequestAccess() {
    const [softwareList, setSoftwareList] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState('');
    const [accessType, setAccessType] = useState('Read'); // Default access type
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSoftware = async () => {
            try {
                const token = getAuthToken();
                const response = await axios.get('http://localhost:5000/api/software', {
                    headers: {
                        Authorization: Bearer ${token}
                    }
                });
                setSoftwareList(response.data);
                if (response.data.length > 0) {
                    setSelectedSoftware(response.data[0].id); // Select the first software by default
                }
            } catch (err) {
                console.error('Error fetching software list:', err.response?.data || err.message);
                setError('Failed to load software list.');
            } finally {
                setLoading(false);
            }
        };
        fetchSoftware();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const token = getAuthToken();
            // POST /api/requests - Submit request
            await axios.post(
                'http://localhost:5000/api/requests',
                {
                    softwareId: selectedSoftware,
                    accessType,
                    reason
                },
                {
                    headers: {
                        Authorization: Bearer ${token}
                    }
                }
            );
            alert('Access request submitted successfully!');
            setReason(''); // Clear form
        } catch (err) {
            console.error('Submit request error:', err.response?.data || err.message);
            setError('Failed to submit request: ' + (err.response?.data?.message || 'An error occurred.'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading software list...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (softwareList.length === 0) return <div>No software available to request access for.</div>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Request Software Access</h2>
            <div>
                <label htmlFor="software">Select Software:</label>
                <select
                    id="software"
                    value={selectedSoftware}
                    onChange={(e) => setSelectedSoftware(e.target.value)}
                    required
                >
                    {softwareList.map((software) => (
                        <option key={software.id} value={software.id}>
                            {software.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="accessType">Access Type:</label>
                <select
                    id="accessType"
                    value={accessType}
                    onChange={(e) => setAccessType(e.target.value)}
                    required
                >
                    <option value="Read">Read</option>
                    <option value="Write">Write</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <div>
                <label htmlFor="reason">Reason for Request:</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
        </form>
    );
}

export default RequestAccess;