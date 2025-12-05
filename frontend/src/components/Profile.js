import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import '../styles/Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        bio: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                bio: user.bio || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await api.patch('/auth/profile/', formData);
            updateUser(response.data);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <Link to="/" className="back-btn">
                <FaArrowLeft />
                Back to Feed
            </Link>

            <div className="profile-header">
                <h1>My Profile</h1>
            </div>

            <div className="profile-card">
                <div className="profile-avatar-section">
                    <div className="profile-avatar-large">
                        {user.username ? user.username[0].toUpperCase() : 'U'}
                    </div>
                    <div className="profile-username">{user.username}</div>
                    <div className="profile-email">{user.email}</div>
                </div>

                <div className="profile-stats">
                    <div className="stat-item">
                        <div className="stat-value">{user.post_count || 0}</div>
                        <div className="stat-label">Posts</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{user.is_staff ? 'Yes' : 'No'}</div>
                        <div className="stat-label">Admin</div>
                    </div>
                </div>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
