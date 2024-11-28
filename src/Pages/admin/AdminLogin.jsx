// src/Pages/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
                credentials: 'include'
            });
            
            if (response.ok) {
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/posts');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <Container className="admin-login py-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Admin Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default AdminLogin;

// src/utils/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    return isAdmin ? children : <Navigate to="/admin" replace />;
};



