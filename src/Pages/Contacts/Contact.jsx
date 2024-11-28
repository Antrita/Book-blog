import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaInstagram, FaLinkedin, FaBook } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import './Contact.css';

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="page-wrapper">
        <Container fluid className="contact-container">
            <div className="contact-wrapper">
                <div className="contact-header">
                    <h1 className="serif-font">Get in Touch</h1>
                    <p className="lead">Let's talk about books, writing, and everything in between</p>
                </div>
                
                <div className="contact-content">
                    <div className="personal-info">
                        <div className="info-section">
                            <h2 className="serif-font">Name Namee</h2>
                            <h3>Book Reviewer & Literary Enthusiast</h3>
                            <p>Exploring stories, one page at a time. Join me on this literary journey as we discover new worlds through books.</p>
                        </div>
                        
                        <div className="contact-details">
                            <div className="detail-item">
                                <span className="label">Email:</span>
                                <span className="value">name@bookblog.com</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Phone:</span>
                                <span className="value">(555) 123-4567</span>
                            </div>
                        </div>

                        <div className="social-section">
                            <h3>Connect With Me</h3>
                            <div className="social-icons">
                                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                                    <FaInstagram size={24} />
                                    <span>Instagram</span>
                                </a>
                                <a href="https://yourbookshelf.com/profile" target="_blank" rel="noopener noreferrer" className="social-icon bookshelf">
                                    <FaBook size={24} />
                                    <span>BookShelf</span>
                                </a>
                                <a href="https://threads.net/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon threads">
                                    <SiThreads size={24} />
                                    <span>Threads</span>
                                </a>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                                    <FaLinkedin size={24} />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h3>Send Me a Message</h3>
                        <Form onSubmit={handleSubmit} className="contact-form">
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Your name" required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Your email" required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="What would you like to discuss?" required />
                            </Form.Group>

                            <Button type="submit" className="custom-btn">
                                Send Message
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
        </div>
    );
}

export default Contact;