import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


const BlogList = ({ category, title }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, [category]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/blogs/category/${category}`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderRating = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar 
                key={index}
                className={index < Math.floor(rating) ? 'text-warning' : 'text-muted'}
            />
        ));
    };

    const renderCategorySpecificContent = (post) => {
        switch(post.category) {
            case 'reviews':
                return (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted">By {post.author}</span>
                            <div>{renderRating(post.bookRating)}</div>
                        </div>
                        {post.quote && (
                            <blockquote className="blockquote mb-2">
                                <small>{post.quote}</small>
                            </blockquote>
                        )}
                    </>
                );
            case 'top10':
                return (
                    <>
                        <div className="d-flex justify-content-between mb-2">
                            <Badge bg="primary">Rank #{post.ranking}</Badge>
                            <Badge bg="secondary">{post.genre}</Badge>
                        </div>
                        {post.criteriaScore && (
                            <div className="small text-muted mb-2">
                                Overall Score: {post.criteriaScore.overall}/10
                            </div>
                        )}
                    </>
                );
            case 'recommendations':
                return (
                    <>
                        {post.books && (
                            <div className="mb-2">
                                <small className="text-muted">
                                    Featured Books: {post.books.length}
                                </small>
                            </div>
                        )}
                        {post.targetAudience && (
                            <Badge bg="info">{post.targetAudience}</Badge>
                        )}
                    </>
                );
            case 'miscellaneous':
                return (
                    <>
                        {post.topic && (
                            <Badge bg="secondary" className="mb-2">{post.topic}</Badge>
                        )}
                        {post.readingTime && (
                            <small className="text-muted d-block">
                                Reading time: {post.readingTime} min
                            </small>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <Container className="py-4">
                <h2 className="mb-4">{title}</h2>
                <div className="text-center">Loading posts...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <h2 className="mb-4">{title}</h2>
                <div className="alert alert-danger">Error: {error}</div>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4">{title}</h2>
            <Row>
                {posts.map(post => (
                    <Col md={4} key={post._id} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            {post.image && (
                                <Card.Img 
                                    variant="top" 
                                    src={post.image} 
                                    alt={post.title}
                                    className="card-img-height"
                                />
                            )}
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                {renderCategorySpecificContent(post)}
                                <Card.Text>
                                    {post.content?.substring(0, 150)}...
                                </Card.Text>
                                <Link 
                                    to={`/blogs/${category}/${post.slug}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Read More
                                </Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <small>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-1">
                                            {post.tags.map(tag => (
                                                <Badge 
                                                    key={tag}
                                                    bg="light" 
                                                    text="dark"
                                                    className="me-1"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

BlogList.propTypes = {
  category: PropTypes.oneOf(['all', 'reviews', 'top10', 'recommendations', 'miscellaneous']).isRequired,
  title: PropTypes.string.isRequired
};

BlogList.defaultProps = {
  title: 'Blog Posts'
};

export default BlogList;