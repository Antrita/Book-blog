// src/pages/Blogs/Top10/TopBooks.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './TopBooks.css';

function TopBooks() {
  // Sample book data - in a real application, this might come from an API or database
  /*const books = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      coverImage: "/api/placeholder/300/400", // Replace with actual image path
      rating: 4.5,
      genre: "Historical Fiction",
      description: "An aging Hollywood starlet reveals her life story..."
    },
    // Add more books to complete your grid
  ]; */

  // Function to render star ratings
  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <Container className="top-books-container py-5">
      {/* Section Title */}
      <h1 className="text-center mb-5 serif-font">Top Rated Books of 2024</h1>
      
      {/* Books Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {/* We'll map through 9 books to create our 3x3 grid */}
        {Array.from({ length: 9 }).map((_, idx) => (
          <Col key={idx}>
            <Card className="book-card h-100">
              <div className="card-img-wrapper">
                <Card.Img 
                  variant="top" 
                  src="/api/placeholder/300/400"
                  alt="Book cover"
                  className="book-cover"
                />
                {/* Hover overlay */}
                <div className="card-overlay">
                  <button className="read-more-btn">Read More</button>
                </div>
              </div>
              
              <Card.Body>
                <Card.Title className="book-title">Book Title {idx + 1}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author Name</Card.Subtitle>
                <div className="book-rating">
                  <span className="stars">{renderStars(4.5)}</span>
                  <span className="rating-number">4.5/5</span>
                </div>
                <Card.Text className="book-description">
                  A brief description of the book goes here. This should be a short
                  teaser that captures reader interest...
                </Card.Text>
              </Card.Body>
              
              <Card.Footer className="text-muted">
                <small>Genre: Fantasy</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TopBooks;