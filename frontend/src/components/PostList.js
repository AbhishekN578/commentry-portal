import React, { useState, useEffect } from 'react';
import api from '../api';
import PostCard from './PostCard';
import '../styles/Dashboard.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts/');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    const handleUpdate = () => {
        fetchPosts();
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="posts-grid">
            {posts.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', gridColumn: '1 / -1' }}>
                    No posts yet. Create your first post!
                </p>
            ) : (
                posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            )}
        </div>
    );
};

export default PostList;
