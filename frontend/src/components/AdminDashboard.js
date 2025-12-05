import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUsers, FaUserCheck, FaTrash } from 'react-icons/fa';
import api from '../api';
import '../styles/Admin.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        total_users: 0,
        online_users: 0,
        users: []
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersResponse, postsResponse] = await Promise.all([
                api.get('/auth/users/'),
                api.get('/posts/')
            ]);

            setStats(usersResponse.data);
            setPosts(postsResponse.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${postId}/`);
                setPosts(posts.filter(post => post.id !== postId));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <Link to="/" className="back-btn">
                <FaArrowLeft />
                Back to Feed
            </Link>

            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage users and content</p>
            </div>

            <div className="admin-stats">
                <div className="admin-stat-card">
                    <div className="stat-icon">
                        <FaUsers />
                    </div>
                    <div className="admin-stat-value">{stats.total_users}</div>
                    <div className="admin-stat-label">Total Users</div>
                </div>

                <div className="admin-stat-card online">
                    <div className="stat-icon">
                        <FaUserCheck />
                    </div>
                    <div className="admin-stat-value">{stats.online_users}</div>
                    <div className="admin-stat-label">Online Users</div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-icon">
                        📝
                    </div>
                    <div className="admin-stat-value">{posts.length}</div>
                    <div className="admin-stat-label">Total Posts</div>
                </div>
            </div>

            <div className="admin-section">
                <h2>Users</h2>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>
                                    <span className={`status-badge ${user.is_online ? 'online' : 'offline'}`}>
                                        {user.is_online ? 'Online' : 'Offline'}
                                    </span>
                                </td>
                                <td>
                                    {user.is_staff && <span className="admin-badge">Admin</span>}
                                </td>
                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-section">
                <h2>All Posts</h2>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.author_name}</td>
                                <td>{post.like_count}</td>
                                <td>{post.comment_count}</td>
                                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDeletePost(post.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
