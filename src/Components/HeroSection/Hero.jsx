import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function HeroSection() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/blogs/reviews');
  };

  return (
    <Container fluid className="p-0">
      <Card className="border-0 hero-card">
        <div className="row no-gutters">
          <div className="col-md-6 d-flex align-items-center">
            <Card.Body className="hero-content">
              <h2 className="script-font">hello book lovers!</h2>
              <h1 className="serif-font mb-4">the story never ends here.</h1>
              <p className="sans-serif-font mb-4">
                Whether you're searching for an stories, 
                sci-fi or epic fantasies... You're in the right place. Better run.
              </p> 
              <button className="custom-btn" onClick={handleNavigate}>GO TO THE BLOG</button>
            </Card.Body>
          </div>
          <div className="col-md-6">
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default HeroSection;