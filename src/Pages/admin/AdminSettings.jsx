import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { api, useApi } from '../../utils/api';
import './AdminSettings.css';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        siteName: '',
        siteDescription: '',
        contactEmail: '',
        socialLinks: {
            instagram: '',
            threads: '',
            linkedin: '',
            bookshelf: ''
        },
        seoDefaults: {
            metaTitle: '',
            metaDescription: '',
            keywords: ''
        },
        appearance: {
            colors: {
                black: '#030303',
                brown: '#8d6a48',
                purple: '#615160',
                beige: '#d9c6ba',
                gray: '#d1d1d1',
                brownLight: '#a17b57',
                purpleLight: '#726271',
                beigeLight: '#e5d6cc'
            },
            fonts: {
                serif: 'var(--serif-font)',
                sans: 'var(--sans-serif-font)',
                script: 'var(--script-font)'
            }
        }
    });

    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const { loading, callApi } = useApi(); 

    useEffect(() => {
        fetchSettings();
    }, [callApi]); 

    const fetchSettings = async () => {
        try {
            const data = await callApi(api.get, '/api/admin/settings');
            if (data) {
                setSettings(data);
            }
        } catch (err) {
            console.error('Failed to load settings:', err);
            setFeedback({
                type: 'danger',
                message: 'Failed to load settings'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await callApi(api.put, '/api/admin/settings', settings);
            setFeedback({
                type: 'success',
                message: 'Settings updated successfully'
            });
        } catch (err) {
            console.error('Failed to update settings:', err);
            setFeedback({
                type: 'danger',
                message: 'Failed to update settings'
            });
        }
    };

    const handleChange = (section, field, value) => {
        if (section === 'appearance' && field.includes('.')) {
            // Handle nested appearance properties (colors and fonts)
            const [category, subField] = field.split('.');
            setSettings(prev => ({
                ...prev,
                appearance: {
                    ...prev.appearance,
                    [category]: {
                        ...prev.appearance[category],
                        [subField]: value
                    }
                }
            }));
        } else if (section) {
            // Handle other sectioned properties
            setSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            // Handle top-level properties
            setSettings(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    // Rest of your render code remains the same...

    return (
        <Container fluid>
            <h2 className="serif-font mb-4">Site Settings</h2>
            {feedback.message && (
                <Alert variant={feedback.type} dismissible 
                       onClose={() => setFeedback({ type: '', message: '' })}>
                    {feedback.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Row>
                    {/* General Settings */}
                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Header className="bg-beige">
                                <h3 className="h5 mb-0 serif-font">General Settings</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Site Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={settings.siteName}
                                        onChange={(e) => handleChange(null, 'siteName', e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Site Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={settings.siteDescription}
                                        onChange={(e) => handleChange(null, 'siteDescription', e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contact Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={settings.contactEmail}
                                        onChange={(e) => handleChange(null, 'contactEmail', e.target.value)}
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Social Links */}
                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Header className="bg-beige">
                                <h3 className="h5 mb-0 serif-font">Social Links</h3>
                            </Card.Header>
                            <Card.Body>
                                {Object.keys(settings.socialLinks).map(platform => (
                                    <Form.Group className="mb-3" key={platform}>
                                        <Form.Label>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Form.Label>
                                        <Form.Control
                                            type="url"
                                            value={settings.socialLinks[platform]}
                                            onChange={(e) => handleChange('socialLinks', platform, e.target.value)}
                                        />
                                    </Form.Group>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Color Settings */}
                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Header className="bg-beige">
                                <h3 className="h5 mb-0 serif-font">Theme Colors</h3>
                            </Card.Header>
                            <Card.Body>
                                {Object.entries(settings.appearance.colors).map(([name, value]) => (
                                    <Form.Group className="mb-3" key={name}>
                                        <Form.Label className="d-flex justify-content-between">
                                            <span>{name.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                                            <code>{value}</code>
                                        </Form.Label>
                                        <div className="d-flex align-items-center">
                                            <Form.Control
                                                type="color"
                                                value={value}
                                                onChange={(e) => handleChange('appearance', `colors.${name}`, e.target.value)}
                                                className="me-2"
                                            />
                                            <div 
                                                className="color-preview"
                                                style={{
                                                    backgroundColor: value,
                                                    width: '100px',
                                                    height: '30px',
                                                    border: '1px solid #ddd'
                                                }}
                                            ></div>
                                        </div>
                                    </Form.Group>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Font Settings */}
                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Header className="bg-beige">
                                <h3 className="h5 mb-0 serif-font">Typography</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Serif Font (Headings)</Form.Label>
                                    <Form.Select
                                        value={settings.appearance.fonts.serif}
                                        onChange={(e) => handleChange('appearance', 'fonts.serif', e.target.value)}
                                        className="serif-font"
                                    >
                                        <option value="Playfair Display">Playfair Display</option>
                                        <option value="Merriweather">Merriweather</option>
                                        <option value="Lora">Lora</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sans-serif Font (Body)</Form.Label>
                                    <Form.Select
                                        value={settings.appearance.fonts.sans}
                                        onChange={(e) => handleChange('appearance', 'fonts.sans', e.target.value)}
                                        className="sans-serif-font"
                                    >
                                        <option value="Inter">Inter</option>
                                        <option value="Open Sans">Open Sans</option>
                                        <option value="Roboto">Roboto</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Script Font (Accents)</Form.Label>
                                    <Form.Select
                                        value={settings.appearance.fonts.script}
                                        onChange={(e) => handleChange('appearance', 'fonts.script', e.target.value)}
                                        className="script-font"
                                    >
                                        <option value="Dancing Script">Dancing Script</option>
                                        <option value="Great Vibes">Great Vibes</option>
                                        <option value="Pacifico">Pacifico</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className="typography-preview mt-4 p-3 border rounded">
                                    <h4 className="serif-font">Typography Preview</h4>
                                    <p className="script-font mb-2">Hello book lovers!</p>
                                    <h5 className="serif-font mb-2">This is a heading in serif font</h5>
                                    <p className="sans-serif-font">This is body text in sans-serif font. It should be clear and readable.</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end mb-4">
                    <Button 
                        type="submit" 
                        className="custom-btn"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AdminSettings;