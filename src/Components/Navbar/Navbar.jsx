import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function MainNavbar() {
  const location = useLocation();
  
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="serif-font">BookNook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <NavDropdown title="Blogs" id="basic-nav-dropdown" className="nav-link">
              <NavDropdown.Item as={Link} to="/blogs/reviews">Reviews</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/blogs/top10">Top 10</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/blogs/recommendations">
                Recommendations
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/blogs/miscellaneous">
                Miscellaneous
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;