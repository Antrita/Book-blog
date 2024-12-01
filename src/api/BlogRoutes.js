import express from 'express';
import { Blog } from '../models/Blog';

const router = express.Router();

const CATEGORIES = {
    REVIEWS: 'reviews',
    TOP_BOOKS: 'top10',
    RECOMMENDATIONS: 'recommendations',
    MISC: 'miscellaneous'
};

// Helper function for category-specific projections
const getCategoryProjection = (category) => {
    const baseFields = {
        title: 1,
        content: 1,
        slug: 1,
        createdAt: 1,
        image: 1,
        tags: 1,
        isPublished: 1
    };

    switch(category) {
        case CATEGORIES.REVIEWS:
            return {
                ...baseFields,
                author: 1,
                bookRating: 1,
                quote: 1,
                bookLink: 1,
                reviewSummary: 1
            };
        case CATEGORIES.TOP_BOOKS:
            return {
                ...baseFields,
                genre: 1,
                coverImage: 1,
                ranking: 1,
                criteriaScore: 1
            };
        case CATEGORIES.RECOMMENDATIONS:
            return {
                ...baseFields,
                books: 1,
                targetAudience: 1,
                difficultyLevel: 1
            };
        case CATEGORIES.MISC:
            return {
                ...baseFields,
                topic: 1,
                readingTime: 1,
                resources: 1
            };
        default:
            return baseFields;
    }
};

// Create new blog post
router.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            slug: req.body.title.toLowerCase().replace(/\s+/g, '-'),
            category: req.body.category.toLowerCase()
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/blogs/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        let query = {};
        
        // If category is not 'all', filter by category
        if (category !== 'all') {
            query.category = category;
        }
        
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Category-specific routes with optimized queries
router.get('/blogs/reviews', async (req, res) => {
    try {
        const reviews = await Blog.find({ 
            category: CATEGORIES.REVIEWS,
            isPublished: true 
        })
        .select(getCategoryProjection(CATEGORIES.REVIEWS))
        .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blogs/top10', async (req, res) => {
    try {
        const topBooks = await Blog.find({ 
            category: CATEGORIES.TOP_BOOKS,
            isPublished: true 
        })
        .select(getCategoryProjection(CATEGORIES.TOP_BOOKS))
        .sort({ ranking: 1 });
        res.json(topBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blogs/recommendations', async (req, res) => {
    try {
        const recommendations = await Blog.find({ 
            category: CATEGORIES.RECOMMENDATIONS,
            isPublished: true 
        })
        .select(getCategoryProjection(CATEGORIES.RECOMMENDATIONS))
        .sort({ createdAt: -1 });
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blogs/misc', async (req, res) => {
    try {
        const misc = await Blog.find({ 
            category: CATEGORIES.MISC,
            isPublished: true 
        })
        .select(getCategoryProjection(CATEGORIES.MISC))
        .sort({ createdAt: -1 });
        res.json(misc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;