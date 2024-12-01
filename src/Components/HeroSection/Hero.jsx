import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api, useApi } from '../../utils/api'; // 1. Import API utilities
import './Hero.css';

function HeroSection() {
  const navigate = useNavigate();
  // 2. Use the API hook
  const { loading, error, callApi } = useApi();
  const [featuredBooks, setFeaturedBooks] = useState([]);

  // 3. Make API calls using useEffect
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
  try {
    // Update the endpoint to match your server route
    const data = await callApi(api.get, '/api/blogs/category/reviews');
    setFeaturedBooks(data.slice(0, 3)); 
  } catch (err) {
    console.error('Error fetching featured books:', err);
  }
};

    fetchFeaturedBooks();
  }, [callApi]);

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
              
              {/* 4. Handle loading and error states */}
              {loading ? (
                <p>Loading featured books...</p>
              ) : error ? (
                <p>Unable to load featured books. Please try again later.</p>
              ) : (
                <>
                  <p className="sans-serif-font mb-4">
                    Whether you're searching for stories, 
                    sci-fi or epic fantasies... You're in the right place. Better run.
                  </p>
                  
                  {/* Display featured books if available */}
                  {featuredBooks.length > 0 && (
                    <div className="featured-books mb-4">
                      <h3 className="h6 mb-3">Latest Reviews:</h3>
                      {featuredBooks.map((book, index) => (
                        <div key={index} className="featured-book">
                          {book.title}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button className="custom-btn" onClick={handleNavigate}>
                    GO TO THE BLOG
                  </button>
                </>
              )}
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