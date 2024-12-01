import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/auth';
import { Blog, Component, Theme } from '../models/Blog';

const router = express.Router();

// Auth routes
router.get('/check-auth', verifyToken, (req, res) => {
  try {
    res.json({ authenticated: true });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ authenticated: false });
  }
});

// Blog Management Routes
router.get('/posts', verifyToken, async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/posts', verifyToken, async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/posts/:id', verifyToken, async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/posts/:id', verifyToken, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// CMS Component Routes
router.get('/components', verifyToken, async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/components', verifyToken, async (req, res) => {
  try {
    const component = new Component(req.body);
    await component.save();
    res.status(201).json(component);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/components/:id', verifyToken, async (req, res) => {
  try {
    const component = await Component.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    res.json(component);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/components/:id', verifyToken, async (req, res) => {
  try {
    await Component.findByIdAndDelete(req.params.id);
    res.json({ message: 'Component deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Theme Management Routes
router.get('/theme', verifyToken, async (req, res) => {
  try {
    const theme = await Theme.findOne({ isActive: true });
    res.json(theme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/theme', verifyToken, async (req, res) => {
  try {
    // Deactivate current active theme
    await Theme.updateMany({}, { isActive: false });
    
    // Create or update new theme
    const theme = await Theme.findOneAndUpdate(
      { _id: req.body._id || new mongoose.Types.ObjectId() },
      { ...req.body, isActive: true },
      { new: true, upsert: true }
    );
    res.json(theme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Layout Routes
router.get('/layouts', verifyToken, async (req, res) => {
  try {
    const components = await Component.find().sort('order');
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/layouts/order', verifyToken, async (req, res) => {
  try {
    const { components } = req.body;
    
    // Update each component's order
    await Promise.all(
      components.map(async (comp) => {
        await Component.findByIdAndUpdate(comp._id, { order: comp.order });
      })
    );
    
    const updatedComponents = await Component.find().sort('order');
    res.json(updatedComponents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Media Upload Route (placeholder - implement file upload middleware)
router.post('/media', verifyToken, async (req, res) => {
  try {
    // Implement file upload logic here
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Settings Routes
router.get('/settings', verifyToken, async (req, res) => {
  try {
    // Implement settings retrieval logic
    res.json({ settings: 'Settings data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/settings', verifyToken, async (req, res) => {
  try {
    // Implement settings update logic
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as adminRoutes };