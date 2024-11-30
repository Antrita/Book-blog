// src/Pages/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <ul>
          <li>
            <Link 
              to="/admin/dashboard" 
              className={location.pathname === '/admin/dashboard' ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/posts" 
              className={location.pathname === '/admin/posts' ? 'active' : ''}
            >
              All Posts
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/editor" 
              className={location.pathname === '/admin/editor' ? 'active' : ''}
            >
              New Post
            </Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;