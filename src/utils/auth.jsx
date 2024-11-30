import React from 'react';
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        authenticated: false, 
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ 
      authenticated: false, 
      message: 'Invalid token' 
    });
  }
};

// Custom hook for token management
export const useToken = () => {
  const getToken = React.useCallback(() => {
    return document.cookie.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
  }, []);

  const setToken = React.useCallback((token) => {
    document.cookie = `token=${token}; path=/; secure; samesite=strict`;
  }, []);

  const removeToken = React.useCallback(() => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }, []);

  return {
    getToken,
    setToken,
    removeToken
  };
};

// Helper function to check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Helper function to get user info from token
export const getUserFromToken = (token) => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};

export default {
  verifyToken,
  useToken,
  isTokenExpired,
  getUserFromToken
};