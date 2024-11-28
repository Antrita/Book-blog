// src/config/db.jsx
import mongoose from 'mongoose';

const connectDB = async () => {
   try {
       await mongoose.connect(process.env.MONGODB_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       });
       console.log('MongoDB connected successfully');
   } catch (error) {
       console.error('MongoDB connection error:', error);
       process.exit(1);
   }
};

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
       enum: ['review', 'top10', 'recommendations', 'miscellaneous']
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

export const Blog = mongoose.model('Blog', blogSchema);
export default connectDB;