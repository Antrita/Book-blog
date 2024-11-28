import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogList = ({ category, title }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, [category]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/blogs/category/${category}`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4">{title}</h2>
            <Row>
                {posts.map(post => (
                    <Col md={4} key={post._id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.description}</Card.Text>
                                <Link to={`/blogs/${post.category}/${post.slug}`} 
                                    className="btn btn-primary">
                                    Read More
                                </Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogList;