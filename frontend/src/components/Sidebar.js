import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUser, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import api from '../api';

const Sidebar = ({ onPostCreated }) => {
    const {  logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('content', formData.content);
            if (formData.image) {
                data.append('image', formData.image);
            }

            await api.post('/posts/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormData({ title: '', content: '', image: null });
            if (onPostCreated) onPostCreated();
        } catch (err) {
            setError('Failed to create post');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Social Platform</h2>
            </div>

            <div className="sidebar-nav">
                <Link to="/" className="nav-item">
                    <FaHome />
                    <span>Home</span>
                </Link>

                <Link to="/profile" className="nav-item">
                    <FaUser />
                    <span>Profile</span>
                </Link>

                {isAdmin && (
                    <Link to="/admin" className="nav-item">
                        <FaUserShield />
                        <span>Admin Dashboard</span>
                    </Link>
                )}

                <button onClick={handleLogout} className="nav-item">
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>

            <div className="create-post-section">
                <h3>Create Post</h3>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="create-post-form">
                    <div className="input-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Image (optional)</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Sidebar;
