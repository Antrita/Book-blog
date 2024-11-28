import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    return isAdmin ? children : <Navigate to="/admin" replace />;
};