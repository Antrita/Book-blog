import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';
import { Blog } from '../models/Blog';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) return res.status(401).json({ error: 'Access denied' });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(verified.adminId);
        if (!admin) throw new Error();

        req.admin = admin;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin logout
router.post('/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.json({ success: true });
});

// Create blog post
router.post('/blogs', verifyToken, async (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            author: req.admin._id
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update blog post
router.put('/blogs/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, author: req.admin._id },
            req.body,
            { new: true }
        );
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete blog post
router.delete('/blogs/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,
            author: req.admin._id
        });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get admin's blog posts
router.get('/blogs', verifyToken, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.admin._id })
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as adminRoutes, verifyToken };