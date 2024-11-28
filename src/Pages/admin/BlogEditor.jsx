import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Form, Button } from 'react-bootstrap';

function BlogEditor() {
    const [post, setPost] = useState({
        title: '',
        content: '',
        category: 'review'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        });
        if (response.ok) {
            setPost({ title: '', content: '', category: 'review' });
        }
    };

    return (
        <Container className="py-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                        value={post.category}
                        onChange={(e) => setPost({...post, category: e.target.value})}
                    >
                        <option value="review">Review</option>
                        <option value="top10">Top 10</option>
                        <option value="recommendations">Recommendations</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <ReactQuill 
                        theme="snow"
                        value={post.content}
                        onChange={(content) => setPost({...post, content})}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3">
                    Publish Post
                </Button>
            </Form>
        </Container>
    );
}

export default BlogEditor;