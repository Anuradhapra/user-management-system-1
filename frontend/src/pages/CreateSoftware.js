// frontend/src/pages/CreateSoftware.js
import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../services/authService';

function CreateSoftware() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [accessLevels, setAccessLevels] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAccessLevelChange = (e) => {
        const value = e.target.value;
        setAccessLevels(
            e.target.checked
                ? [...accessLevels, value]
                : accessLevels.filter((level) => level !== value)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = getAuthToken();
            // POST /api/software - Add new software
            await axios.post(
                'http://localhost:5000/api/software',
                { name, description, accessLevels },
                {
                    headers: {
                        Authorization: Bearer ${token}
                    }
                }
            );
            alert('Software created successfully!');
            setName('');
            setDescription('');
            setAccessLevels([]);
        } catch (error) {
            console.error('Create software error:', error.response?.data || error.message);
            alert('Failed to create software: ' + (error.response?.data?.message || 'An error occurred.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Software</h2>
            <div>
                <label htmlFor="name">Software Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Access Levels:</label>
                <div>
                    <input
                        type="checkbox"
                        id="read"
                        value="Read"
                        checked={accessLevels.includes('Read')}
                        onChange={handleAccessLevelChange}
                    />
                    <label htmlFor="read" style={{ display: 'inline', marginLeft: '5px', marginRight: '15px' }}>Read</label>

                    <input
                        type="checkbox"
                        id="write"
                        value="Write"
                        checked={accessLevels.includes('Write')}
                        onChange={handleAccessLevelChange}
                    />
                    <label htmlFor="write" style={{ display: 'inline', marginLeft: '5px', marginRight: '15px' }}>Write</label>

                    <input
                        type="checkbox"
                        id="admin"
                        value="Admin"
                        checked={accessLevels.includes('Admin')}
                        onChange={handleAccessLevelChange}
                    />
                    <label htmlFor="admin" style={{ display: 'inline', marginLeft: '5px' }}>Admin</label>
                </div>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Software'}
            </button>
        </form>
    );
}

export default CreateSoftware;