import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import './Recom.css';
import BlogList from '../../admin/BlogList';

function Recommendations() {
    const articles = [
        {
            title: "Top 5 Books in Historical Fiction",
            content: "Dive into these masterfully crafted historical narratives that bring the past to life...",
            image: "/api/placeholder/400/300",
            books: [
                "Wolf Hall by Hilary Mantel",
                "The Book Thief by Markus Zusak",
                "Pachinko by Min Jin Lee",
                "All the Light We Cannot See by Anthony Doerr",
                "The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid"
            ]
        },
        {
            title: "Top 5 Books in Contemporary Literature",
            content: "Explore modern storytelling at its finest with these compelling contemporary reads...",
            image: "/api/placeholder/400/300",
            books: [
                "A Little Life by Hanya Yanagihara",
                "Normal People by Sally Rooney",
                "Verity by Colleen Hoover",
                "Tomorrow Will Be Different by Sarah McBride",
                "The Midnight Library by Matt Haig"
            ]
        },
        {
            title: "Top 5 Books in Fantasy",
            content: "Journey through magical realms and epic adventures with these fantasy masterpieces...",
            image: "/api/placeholder/400/300",
            books: [
                "The Name of the Wind by Patrick Rothfuss",
                "The Way of Kings by Brandon Sanderson",
                "Piranesi by Susanna Clarke",
                "The Atlas Six by Olivie Blake",
                "The House in the Cerulean Sea by TJ Klune"
            ]
        },
        {
            title: "Top 5 Books in Mystery Thriller",
            content: "Keep yourself on the edge with these gripping mystery thrillers...",
            image: "/api/placeholder/400/300",
            books: [
                "The Silent Patient by Alex Michaelides",
                "The Thursday Murder Club by Richard Osman",
                "The It Girl by Ruth Ware",
                "The Paris Apartment by Lucy Foley",
                "The Push by Ashley Audrain"
            ]
        }
    ];

    return (
        <>
            <Container className="recommendations-container py-5">
                <h1 className="text-center mb-5 serif-font">Featured Recommendations</h1>
                <Row xs={1} md={2} className="g-4">
                    {articles.map((article, idx) => (
                        <Col key={idx}>
                            <Card className="h-100 recommendation-card">
                                <Card.Img variant="top" src={article.image} alt={article.title} />
                                <Card.Body>
                                    <Card.Title className="recommendation-title serif-font">
                                        {article.title}
                                    </Card.Title>
                                    <Card.Text>{article.content}</Card.Text>
                                    <ListGroup variant="flush">
                                        {article.books.map((book, bookIdx) => (
                                            <ListGroup.Item key={bookIdx} className="book-item">
                                                {book}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            
            <BlogList 
                category="recommendations" 
                title="All Book Recommendations"
            />
        </>
    );
}

export default Recommendations;