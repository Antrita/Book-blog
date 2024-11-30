import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Blog } from './config/db.js';
import process from 'process';

// Load environment variables first
dotenv.config();

// Debug environment variables
console.log('Environment Check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');
console.log('Actual URI value:', process.env.MONGODB_URI); // Debug actual value
console.log('Port:', process.env.PORT || 5000);
console.log('Node ENV:', process.env.NODE_ENV);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection with detailed logging and validation
const connectDB = async () => {
  try {
    console.log('Attempting MongoDB connection...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      heartbeatFrequencyMS: 2000 // Check server every 2 seconds
    });
    
    console.log('✅ MongoDB connected successfully');
    
    // Test the connection
    await mongoose.connection.db.admin().ping();
    console.log('Database ping successful');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Full error:', error);
    console.error('Connection details:', {
      uri: process.env.MONGODB_URI ? 'URI exists' : 'URI missing',
      nodeEnv: process.env.NODE_ENV
    });
    process.exit(1);
  }
};

// API Routes

// Health check endpoint (place this first for easy testing)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Get blogs by category
app.get('/api/blogs/:category', async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`Fetching blogs for category: ${category}`);
    
    const blogs = await Blog.find({ category })
      .sort({ createdAt: -1 });
    
    console.log(`Found ${blogs.length} blogs in category ${category}`);
    res.json(blogs);
  } catch (error) {
    console.error(`Error fetching blogs for category ${req.params.category}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Create new blog post
app.post('/api/blogs', async (req, res) => {
  try {
    console.log('Creating new blog post:', req.body);
    const blog = new Blog(req.body);
    await blog.save();
    console.log('Blog post created successfully:', blog._id);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update blog post
app.put('/api/blogs/:id', async (req, res) => {
  try {
    console.log(`Updating blog post ${req.params.id}`);
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!blog) {
      console.log(`Blog post ${req.params.id} not found`);
      return res.status(404).json({ error: 'Blog not found' });
    }
    console.log('Blog post updated successfully');
    res.json(blog);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete blog post
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    console.log(`Deleting blog post ${req.params.id}`);
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      console.log(`Blog post ${req.params.id} not found`);
      return res.status(404).json({ error: 'Blog not found' });
    }
    console.log('Blog post deleted successfully');
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Starting server...');
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`✨ Server running on port ${PORT}`);
      console.log(`🌐 Frontend URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
      console.log(`🔌 API URL: http://localhost:${PORT}/api`);
    });

    // Graceful shutdown handler
    const shutdown = async () => {
      console.log('Shutting down gracefully...');
      server.close(async () => {
        try {
          await mongoose.connection.close();
          console.log('MongoDB connection closed.');
          process.exit(0);
        } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    };

    // Handle termination signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();

export default app;