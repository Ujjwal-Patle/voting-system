import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with actual API/auth check
    if (id === 'admin123' && password === 'pass123' && key === 'secretKey') {
      alert('Login successful!');
      // navigate to dashboard or set auth state
    } else {
      setError('Invalid credentials or key.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Admin Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formId">
          <Form.Label>Enter Aadhar No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Aadhar No:"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
           
            placeholder="Enter DOB"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

      

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
