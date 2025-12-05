import React, { useState } from 'react';
import { FaHeart, FaComment, FaTrash, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import '../styles/PostCard.css';

const PostCard = ({ post, onDelete, onUpdate }) => {
    const { user, isAdmin } = useAuth();
    const [liked, setLiked] = useState(post.user_has_liked);
    const [likeCount, setLikeCount] = useState(post.like_count);
    const [comments, setComments] = useState(post.comments || []);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLike = async () => {
        try {
            const response = await api.post(`/posts/${post.id}/like/`);
            setLiked(response.data.liked);
            setLikeCount(response.data.like_count);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setLoading(true);
        try {
            const response = await api.post('/comments/', {
                post: post.id,
                content: commentText
            });

            setComments([...comments, response.data]);
            setCommentText('');
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${post.id}/`);
                if (onDelete) onDelete(post.id);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const canDelete = user && (user.id === post.author || isAdmin);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="post-card">
            {post.image && (
                <img src={post.image} alt={post.title} className="post-image" />
            )}

            <div className="post-content">
                <div className="post-header">
                    <div className="post-avatar">
                        {post.author_name ? post.author_name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="post-author-info">
                        <h4>{post.author_name || 'Unknown'}</h4>
                        <p>{formatDate(post.created_at)}</p>
                    </div>
                </div>

                <h3 className="post-title">{post.title}</h3>
                <p className="post-text">{post.content}</p>

                <div className="post-actions">
                    <button
                        className={`action-btn ${liked ? 'liked' : ''}`}
                        onClick={handleLike}
                    >
                        {liked ? <FaHeart /> : <FaRegHeart />}
                        <span>{likeCount}</span>
                    </button>

                    <button
                        className="action-btn"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <FaComment />
                        <span>{comments.length}</span>
                    </button>

                    {canDelete && (
                        <button className="action-btn delete-btn" onClick={handleDelete}>
                            <FaTrash />
                        </button>
                    )}
                </div>

                {showComments && (
                    <div className="comments-section">
                        <h5>Comments</h5>

                        <form onSubmit={handleComment} className="comment-form">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Posting...' : 'Post'}
                            </button>
                        </form>

                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <div className="comment-author">{comment.author_name}</div>
                                    <div className="comment-text">{comment.content}</div>
                                    <div className="comment-time">{formatDate(comment.created_at)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;
