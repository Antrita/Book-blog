import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Misc.css';

function Misc() {
  const articles = [
    {
      title: "The Art of Reading",
      date: "2024-03-15",
      image: "/api/placeholder/400/300",
      content: "Exploring the nuances of deep reading in the digital age..."
    },
    {
      title: "Book Collecting 101",
      date: "2024-03-10",
      image: "/api/placeholder/400/300",
      content: "Essential tips for building your personal library..."
    },
    {
      title: "Literary Podcasts",
      date: "2024-03-05",
      image: "/api/placeholder/400/300",
      content: "Must-listen podcasts for book enthusiasts..."
    }
  ];

  return (
    <Container className="misc-container py-5">
      <h1 className="text-center mb-5 serif-font">Literary Musings</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {articles.map((article, idx) => (
          <Col key={idx}>
            <Card className="h-100 misc-card">
              <Card.Img 
                variant="top" 
                src={article.image} 
                alt={article.title}
                className="article-image"
              />
              <Card.Body>
                <Card.Title className="article-title serif-font">{article.title}</Card.Title>
                <Card.Text className="article-date">{new Date(article.date).toLocaleDateString()}</Card.Text>
                <Card.Text className="article-content">{article.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Misc;