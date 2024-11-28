import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

function BookCarousel() {
  return (
    <Carousel className="book-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/api/placeholder/800/600"
          alt="Latest Reviews"
        />
        <Carousel.Caption>
          <h5>Latest Reviews</h5>
          <p>Discover our most recent book recommendations</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Add more Carousel.Items as needed */}
    </Carousel>
  );
}

export default BookCarousel;