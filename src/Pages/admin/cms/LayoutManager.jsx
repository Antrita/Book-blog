import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { api, useApi } from '../../../utils/api';

const LayoutManager = () => {
    const [layouts, setLayouts] = useState({
        reviews: {
            sections: [
                { id: 'featured-reviews', name: 'Featured Reviews', order: 1 },
                { id: 'latest-reviews', name: 'Latest Reviews', order: 2 },
                { id: 'category-reviews', name: 'Reviews by Category', order: 3 }
            ]
        },
        top10: {
            sections: [
                { id: 'current-top10', name: 'Current Top 10', order: 1 },
                { id: 'genre-top10', name: 'Top 10 by Genre', order: 2 },
                { id: 'historical-top10', name: 'Previous Top 10s', order: 3 }
            ]
        },
        recommendations: {
            sections: [
                { id: 'featured-recs', name: 'Featured Recommendations', order: 1 },
                { id: 'genre-recs', name: 'Genre-based Recommendations', order: 2 },
                { id: 'audience-recs', name: 'Recommendations by Reader Type', order: 3 }
            ]
        },
        misc: {
            sections: [
                { id: 'reading-tips', name: 'Reading Tips', order: 1 },
                { id: 'book-news', name: 'Book News', order: 2 },
                { id: 'literature-articles', name: 'Literature Articles', order: 3 }
            ]
        }
    });

    const [activePage, setActivePage] = useState('reviews');
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const { loading, callApi } = useApi();

    const fetchLayouts = useCallback(async () => {
        try {
            const data = await callApi(api.get, '/api/admin/layouts');
            if (data) {
                setLayouts(data);
            }
        } catch (err) {
            console.error('Failed to load layouts:', err);
            setFeedback({
                type: 'danger',
                message: 'Failed to load layouts'
            });
        }
    }, [callApi]);

    useEffect(() => {
        fetchLayouts();
    }, [fetchLayouts]);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(layouts[activePage].sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update order numbers
        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index + 1
        }));

        setLayouts(prev => ({
            ...prev,
            [activePage]: {
                ...prev[activePage],
                sections: updatedItems
            }
        }));

        try {
            await callApi(api.put, '/api/admin/layouts/order', {
                page: activePage,
                sections: updatedItems
            });
            setFeedback({
                type: 'success',
                message: 'Layout updated successfully'
            });
        } catch (err) {
            setFeedback({
                type: 'danger',
                message: 'Failed to update layout'
            });
        }
    };

    const getSectionStyle = (isDragging) => ({
        padding: '1rem',
        marginBottom: '0.5rem',
        background: isDragging ? 'var(--color-beige-light)' : 'white',
        border: '1px solid var(--color-gray)',
        borderRadius: '4px',
        boxShadow: isDragging ? '0 5px 10px rgba(0,0,0,0.15)' : 'none'
    });

    return (
        <Container fluid>
            <h2 className="serif-font mb-4">Layout Manager</h2>
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
                        <Card.Header className="bg-beige">
                            <h3 className="h5 mb-0 serif-font">Blog Sections</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="list-group">
                                {Object.keys(layouts).map(page => (
                                    <button
                                        key={page}
                                        className={`list-group-item list-group-item-action ${
                                            activePage === page ? 'active' : ''
                                        }`}
                                        onClick={() => setActivePage(page)}
                                    >
                                        {page.charAt(0).toUpperCase() + page.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={9}>
                    <Card>
                        <Card.Header className="bg-beige">
                            <h3 className="h5 mb-0 serif-font">
                                Layout for {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId={activePage}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="layout-components"
                                        >
                                            {layouts[activePage].sections.map((section, index) => (
                                                <Draggable
                                                    key={section.id}
                                                    draggableId={section.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...getSectionStyle(snapshot.isDragging),
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span>{section.name}</span>
                                                                <small className="text-muted">
                                                                    Order: {section.order}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LayoutManager;