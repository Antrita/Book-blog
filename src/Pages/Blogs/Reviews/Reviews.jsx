import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './Reviews.css';
import BlogList from '../../admin/BlogList'

function Reviews() {
    const staticReviews = [
        {
            title: "Tomorrow, and Tomorrow, and Tomorrow",
            author: "Gabrielle Zevin",
            date: "2024-03-15",
            rating: 5,
            quote: "What is a game? It's tomorrow, and tomorrow, and tomorrow. It's the possibility of infinite rebirth, infinite redemption.",
            review: "A masterful exploration of friendship, love, and creative partnership spanning three decades. Zevin crafts a narrative that's both a love letter to gaming and a profound meditation on human connection.",
            bookLink: "https://bookstore.com/tomorrow",
        },
        {
            title: "Demon Copperhead",
            author: "Barbara Kingsolver",
            date: "2024-03-10",
            rating: 4,
            quote: "First, I got myself born. A decent crowd turned out to see it, mainly on account of nobody having better entertainment options on a Thursday night in January.",
            review: "Kingsolver's modern retelling of David Copperfield sets the Victorian classic in contemporary Appalachia, delivering a powerful commentary on America's opioid crisis through the eyes of an unforgettable narrator.",
            bookLink: "https://bookstore.com/demon-copperhead",
        },
        {
            title: "The House of Flame and Shadow",
            author: "Sarah J. Maas",
            date: "2024-03-05",
            rating: 4,
            quote: "The city had become a battlefield. But then again, it had always been one.",
            review: "The latest installment in the Crescent City series delivers on its promises with intense action sequences, complex political intrigue, and deeply emotional character development.",
            bookLink: "https://bookstore.com/house-flame-shadow",
        },
        {
            title: "Iron Flame",
            author: "Rebecca Yarros",
            date: "2024-02-28",
            rating: 5,
            quote: "Dragons don't forgive. Neither do I.",
            review: "The sequel to Fourth Wing raises the stakes with more intense dragon riding sequences, complicated political machinations, and a romance that burns even hotter than its predecessor.",
            bookLink: "https://bookstore.com/iron-flame",
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar key={index} className={index < rating ? 'star-filled' : 'star-empty'} />
        ));
    };

    return (
        <>
            <Container className="reviews-container py-5">
                <h1 className="text-center mb-5 serif-font">Featured Reviews</h1>
                <Row xs={1} lg={2} className="g-4">
                    {staticReviews.map((review, idx) => (
                        <Col key={idx}>
                            <Card className="review-card">
                                <Card.Body>
                                    <div className="review-meta mb-3">
                                        <span className="review-date">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                        <span className="review-rating">
                                            {renderStars(review.rating)}
                                        </span>
                                    </div>
                                    <Card.Title className="review-title serif-font">
                                        {review.title}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">
                                        by {review.author}
                                    </Card.Subtitle>
                                    <figure>
                                        <blockquote className="blockquote">
                                            <p>{review.quote}</p>
                                        </blockquote>
                                    </figure>
                                    <Card.Text className="review-content">
                                        {review.review}
                                    </Card.Text>
                                    <a 
                                        href={review.bookLink} 
                                        className="book-link" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Read More →
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            
            <BlogList 
                category="reviews" 
                title="All Book Reviews"
            />
        </>
    );
}

export default Reviews;