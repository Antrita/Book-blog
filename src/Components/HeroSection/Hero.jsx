import React from 'react';
import { Card, Container } from 'react-bootstrap';
// If you plan to use BookCarousel later, keep this import ready
// import BookCarousel from '../Carousel/BookCarousel';
import './Hero.css';

function HeroSection() {
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
              <button className="custom-btn">GO TO THE BLOG</button>
            </Card.Body>
          </div>
          <div className="col-md-6">
            {/* This div is currently empty. You might want to add content or remove it if not needed */}
            {/* If you plan to add the carousel later, you would put it here: */}
            {/* <BookCarousel /> */}
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default HeroSection;