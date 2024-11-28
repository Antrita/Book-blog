import express from 'express';
import Blog from '../models/Blog';

const router = express.Router();

const CATEGORIES = {
    REVIEWS: 'reviews',
    TOP_BOOKS: 'top10',
    RECOMMENDATIONS: 'recommendations',
    MISC: 'miscellaneous'
};

router.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            slug: req.body.title.toLowerCase().replace(/\s+/g, '-')
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get blogs by category
router.get('/blogs/category/:category', async (req, res) => {
    try {
        const blogs = await Blog.find({ category: req.params.category })
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Category-specific routes
router.get('/blogs/reviews', async (req, res) => {
    try {
        const reviews = await Blog.find({ category: CATEGORIES.REVIEWS })
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blogs/top10', async (req, res) => {
    try {
        const topBooks = await Blog.find({ category: CATEGORIES.TOP_BOOKS })
            .sort({ createdAt: -1 });
        res.json(topBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blogs/recommendations', async (req, res) => {
    try {
        const recommendations = await Blog.find({ category: CATEGORIES.RECOMMENDATIONS })
            .sort({ createdAt: -1 });
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blogs/misc', async (req, res) => {
    try {
        const misc = await Blog.find({ category: CATEGORIES.MISC })
            .sort({ createdAt: -1 });
        res.json(misc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;