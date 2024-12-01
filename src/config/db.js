import mongoose from 'mongoose';

// common fields
const baseFields = {
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Reviews', 'TopBooks', 'Recommendations', 'Misc'],
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  image: String,
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true,
    index: true
  }
};

// Category-specific field definitions
const categoryFields = {
  Reviews: {
    author: {
      type: String,
      required: function() { return this.category === 'Reviews'; }
    },
    bookRating: {
      type: Number,
      min: 0,
      max: 5,
      required: function() { return this.category === 'Reviews'; }
    },
    quote: String,
    bookLink: String,
    reviewSummary: {
      type: String,
      maxlength: 500
    }
  },
  TopBooks: {
    genre: {
      type: String,
      required: function() { return this.category === 'TopBooks'; }
    },
    coverImage: {
      type: String,
      required: function() { return this.category === 'TopBooks'; }
    },
    ranking: {
      type: Number,
      required: function() { return this.category === 'TopBooks'; }
    },
    previousRanking: Number,
    criteriaScore: {
      plot: { type: Number, min: 0, max: 10 },
      characters: { type: Number, min: 0, max: 10 },
      writing: { type: Number, min: 0, max: 10 },
      overall: { type: Number, min: 0, max: 10 }
    }
  },
  Recommendations: {
    books: {
      type: [{
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: String,
        whyRecommended: String
      }],
      required: function() { return this.category === 'Recommendations'; },
      validate: [array => array.length > 0, 'At least one book recommendation is required']
    },
    targetAudience: String,
    difficultyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    }
  },
  Misc: {
    topic: String,
    readingTime: Number,
    resources: [{
      title: String,
      url: String,
      description: String
    }]
  }
};

// Combine base fields with category-specific fields
const blogSchema = new mongoose.Schema({
  ...baseFields,
  ...categoryFields.Reviews,
  ...categoryFields.TopBooks,
  ...categoryFields.Recommendations,
  ...categoryFields.Misc
});

// Middleware to validate category-specific required fields
blogSchema.pre('save', function(next) {
  const categoryRequirements = categoryFields[this.category];
  if (!categoryRequirements) {
    return next(new Error('Invalid category'));
  }

  // Validate required fields for the specific category
  Object.entries(categoryRequirements).forEach(([field, schema]) => {
    if (schema.required && typeof schema.required === 'function' && schema.required.call(this)) {
      if (!this[field]) {
        next(new Error(`${field} is required for category ${this.category}`));
      }
    }
  });

  next();
});

// Index strategy for efficient queries
blogSchema.index({ category: 1, createdAt: -1 });
blogSchema.index({ category: 1, 'books.genre': 1 });
blogSchema.index({ category: 1, author: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ slug: 1 }, { unique: true });

// Virtual for formatted date
blogSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Method to check if a post can be featured
blogSchema.methods.canBeFeatured = function() {
  switch(this.category) {
    case 'Reviews':
      return this.bookRating >= 4;
    case 'TopBooks':
      return this.ranking <= 5;
    case 'Recommendations':
      return this.books.length >= 3;
    default:
      return false;
  }
};

// Static method for featured posts
blogSchema.statics.getFeatured = function(category) {
  const query = category ? { category } : {};
  return this.find({
    ...query,
    isPublished: true
  })
  .sort({ createdAt: -1 })
  .limit(5);
};

export const Blog = mongoose.model('Blog', blogSchema);