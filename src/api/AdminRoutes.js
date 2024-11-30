import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/auth';

const router = express.Router();

// Check authentication status
router.get('/check-auth', verifyToken, (req, res) => {
  try {
    res.json({ authenticated: true });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ authenticated: false });
  }
});

export { router as adminRoutes };