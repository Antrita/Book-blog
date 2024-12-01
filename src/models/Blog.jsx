import mongoose from 'mongoose';

// Component Schema for UI elements
const componentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['hero', 'navbar', 'footer', 'sidebar', 'carousel', 'custom']
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  styles: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
});

// Theme Schema
const themeSchema = new mongoose.Schema({
  name: String,
  colors: {
    primary: String,
    secondary: String,
    accent: String,
    background: String,
    text: String
  },
  typography: {
    headingFont: String,
    bodyFont: String
  },
  spacing: {
    unit: Number,
    scale: [Number]
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

// Enhanced Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Reviews', 'TopBooks', 'Recommendations', 'Misc']
  },
  // Category-specific fields as before...
  author: String,
  rating: Number,
  quote: String,
  bookLink: String,
  books: [String],
  genre: String,
  coverImage: String,
  
  // SEO fields
  metaTitle: String,
  metaDescription: String,
  keywords: [String],
  
  // Layout and styling
  layout: {
    type: String,
    default: 'default'
  },
  customStyles: {
    type: Map,
    of: String
  },
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create models
export const Blog = mongoose.model('Blog', blogSchema);
export const Component = mongoose.model('Component', componentSchema);
export const Theme = mongoose.model('Theme', themeSchema);

// Utility functions for the CMS
export const getActiveTheme = () => Theme.findOne({ isActive: true });
export const getActiveComponents = () => Component.find({ isActive: true }).sort('order');