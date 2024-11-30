import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
//import { api, useApi } from '../../utils/api';
import './Navbar.css';
import { api, useApi } from '../../utils/api';

function MainNavbar() {
  const location = useLocation();
  const { loading, error, callApi } = useApi(); //use api.jsx in component
  const [categories, setCategories] = useState([
    { path: 'reviews', label: 'Reviews' },
    { path: 'top10', label: 'Top 10' },
    { path: 'recommendations', label: 'Recommendations' },
    { path: 'miscellaneous', label: 'Miscellaneous' }
  ]);
  
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="serif-font">BookNook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <NavDropdown 
              title="Blogs" 
              id="basic-nav-dropdown" 
              className="nav-link"
            >
              {categories.map(category => (
                <NavDropdown.Item 
                  key={category.path}
                  as={Link} 
                  to={`/blogs/${category.path}`}
                  active={location.pathname === `/blogs/${category.path}`}
                >
                  {category.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;