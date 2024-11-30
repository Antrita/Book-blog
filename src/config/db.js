import mongoose from 'mongoose';

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
  // Fields for Reviews
  author: String,
  rating: Number,
  quote: String,
  bookLink: String,
  
  // Fields for Recommendations
  books: [String],
  
  // Fields for TopBooks
  genre: String,
  coverImage: String,
  rating: Number,
  
  // Common fields
  date: {
    type: Date,
    default: Date.now
  },
  image: String,
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
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

// Pre-save middleware to generate slug
blogSchema.pre('save', function(next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export const Blog = mongoose.model('Blog', blogSchema);