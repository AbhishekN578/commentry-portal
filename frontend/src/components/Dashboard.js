import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PostList from './PostList';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handlePostCreated = () => {
        // Trigger post list refresh
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="dashboard">
            <Sidebar onPostCreated={handlePostCreated} />

            <div className="main-content">
                <div className="main-header">
                    <h1>Feed</h1>
                    <p>Discover what's happening in your community</p>
                </div>

                <PostList key={refreshKey} />
            </div>
        </div>
    );
};

export default Dashboard;
