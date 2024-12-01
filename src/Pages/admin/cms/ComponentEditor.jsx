import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { api, useApi } from '../../../utils/api';

const ComponentEditor = () => {
    const [components, setComponents] = useState({
        hero: {
            title: '',
            subtitle: '',
            buttonText: '',
            buttonLink: '',
        },
        navbar: {
            links: [{ label: '', url: '' }]
        },
        blogSections: {
            reviews: {
                title: 'Book Reviews',
                description: '',
                layout: 'grid', // or 'list'
                featuredCount: 3,
                showRatings: true
            },
            top10: {
                title: 'Top 10 Books',
                description: '',
                layout: 'grid',
                showRanking: true,
                showGenre: true
            },
            recommendations: {
                title: 'Book Recommendations',
                description: '',
                layout: 'grid',
                showTargetAudience: true,
                booksPerRow: 3
            },
            misc: {
                title: 'Literary Musings',
                description: '',
                layout: 'grid',
                showReadingTime: true
            }
        }
    });

    const [activeComponent, setActiveComponent] = useState('hero');
    const [activeSection, setActiveSection] = useState(null);
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const { loading, callApi } = useApi();

    const fetchComponents = useCallback(async () => {
        try {
            const data = await callApi(api.get, '/api/admin/components');
            if (data) {
                setComponents(data);
            }
        } catch (err) {
            console.error('Failed to load components:', err);
            setFeedback({
                type: 'danger',
                message: 'Failed to load components'
            });
        }
    }, [callApi]);

    useEffect(() => {
        fetchComponents();
    }, [fetchComponents]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const componentToUpdate = activeSection 
                ? components.blogSections[activeSection]
                : components[activeComponent];

            const endpoint = activeSection 
                ? `/api/admin/components/blogSections/${activeSection}`
                : `/api/admin/components/${activeComponent}`;

            await callApi(api.put, endpoint, componentToUpdate);
            
            setFeedback({
                type: 'success',
                message: 'Component updated successfully'
            });
        } catch (err) {
            setFeedback({
                type: 'danger',
                message: 'Failed to update component'
            });
        }
    };

    const handleChange = (field, value) => {
        if (activeSection) {
            setComponents(prev => ({
                ...prev,
                blogSections: {
                    ...prev.blogSections,
                    [activeSection]: {
                        ...prev.blogSections[activeSection],
                        [field]: value
                    }
                }
            }));
        } else {
            setComponents(prev => ({
                ...prev,
                [activeComponent]: {
                    ...prev[activeComponent],
                    [field]: value
                }
            }));
        }
    };

    const renderBlogSectionForm = (section) => {
        const sectionData = components.blogSections[section];
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Section Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={sectionData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={sectionData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Layout Style</Form.Label>
                    <Form.Select
                        value={sectionData.layout}
                        onChange={(e) => handleChange('layout', e.target.value)}
                    >
                        <option value="grid">Grid</option>
                        <option value="list">List</option>
                    </Form.Select>
                </Form.Group>

                {section === 'reviews' && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                label="Show Ratings"
                                checked={sectionData.showRatings}
                                onChange={(e) => handleChange('showRatings', e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Featured Reviews Count</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="6"
                                value={sectionData.featuredCount}
                                onChange={(e) => handleChange('featuredCount', parseInt(e.target.value))}
                            />
                        </Form.Group>
                    </>
                )}

                {section === 'top10' && (
    <>
        <Form.Group className="mb-3">
            <Form.Check
                type="switch"
                label="Show Ranking Numbers"
                checked={sectionData.showRanking}
                onChange={(e) => handleChange('showRanking', e.target.checked)}
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Check
                type="switch"
                label="Show Genre Tags"
                checked={sectionData.showGenre}  // Fixed the syntax
                onChange={(e) => handleChange('showGenre', e.target.checked)}
            />
        </Form.Group>
    </>
)}

                {section === 'recommendations' && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                label="Show Target Audience"
                                checked={sectionData.showTargetAudience}
                                onChange={(e) => handleChange('showTargetAudience', e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Books Per Row</Form.Label>
                            <Form.Control
                                type="number"
                                min="2"
                                max="4"
                                value={sectionData.booksPerRow}
                                onChange={(e) => handleChange('booksPerRow', parseInt(e.target.value))}
                            />
                        </Form.Group>
                    </>
                )}

                {section === 'misc' && (
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            label="Show Reading Time"
                            checked={sectionData.showReadingTime}
                            onChange={(e) => handleChange('showReadingTime', e.target.checked)}
                        />
                    </Form.Group>
                )}

                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </Form>
        );
    };

    return (
        <Container fluid>
            <h2 className="mb-4">Component Editor</h2>
            {feedback.message && (
                <Alert 
                    variant={feedback.type} 
                    dismissible 
                    onClose={() => setFeedback({ type: '', message: '' })}
                >
                    {feedback.message}
                </Alert>
            )}
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Header>Components</Card.Header>
                        <Card.Body>
                            <div className="list-group">
                                {Object.keys(components)
                                    .filter(key => key !== 'blogSections')
                                    .map(comp => (
                                    <button
                                        key={comp}
                                        className={`list-group-item list-group-item-action ${
                                            activeComponent === comp && !activeSection ? 'active' : ''
                                        }`}
                                        onClick={() => {
                                            setActiveComponent(comp);
                                            setActiveSection(null);
                                        }}
                                    >
                                        {comp.charAt(0).toUpperCase() + comp.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="list-group mt-3">
                                <div className="list-group-item bg-light">Blog Sections</div>
                                {Object.keys(components.blogSections).map(section => (
                                    <button
                                        key={section}
                                        className={`list-group-item list-group-item-action ${
                                            activeSection === section ? 'active' : ''
                                        }`}
                                        onClick={() => {
                                            setActiveSection(section);
                                            setActiveComponent('blogSections');
                                        }}
                                    >
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={9}>
                    <Card>
                        <Card.Header>
                            {activeSection ? 
                                `Edit ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section` :
                                `Edit ${activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}`
                            }
                        </Card.Header>
                        <Card.Body>
                            {activeSection ? 
                                renderBlogSectionForm(activeSection) :
                                renderComponentForm()
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};


export default ComponentEditor;