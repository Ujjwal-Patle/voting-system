import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

function AdminLoginPage() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adminId || !password || !key) {
      setError('All fields are required');
      return;
    }

    if (adminId === 'admin123' && password === 'adminpass' && key === 'secretKey2024') {
      setSuccess('Login successful');
      setError('');
      setTimeout(() => navigate('/'), 1500); // redirect to home after 1.5s
    } else {
      setError('Invalid credentials or key');
      setSuccess('');
    }
  };

  return (
    <Container className="admin-login-container">
      <h3 className="text-center">Admin Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="adminId" className="mb-3">
          <Form.Label>Admin Email ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="adminKey" className="mb-3">
          <Form.Label>Admin KEY</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="primary" className="w-100 mb-3">
            Admin Login
          </Button>
          <Button variant="secondary" className="w-100" onClick={() => navigate('/voter/register')}>
            Voter Registration
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AdminLoginPage;
