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

    if (adminId === 'admin123' && password === 'adminpass') {
      setSuccess('Login successful');
      setError('');
      setTimeout(() => navigate('/'), 1500); // redirect to home after 1.5s
    } else {
      setError('Invalid credentials or key');
      setSuccess('');
    }
  };

  return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="p-4 shadow rounded bg-white" style={{ maxWidth: '420px', width: '100%' }}>
      <h3 className="text-center">Admin Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="adminId" className="mb-3">
          <Form.Label>Admin Email ID</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
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


        <div className="text-center">
          <Button type="submit" variant="primary" className="w-100 mb-2">
            Admin Login
          </Button>
         
        </div>
      </Form>
       </div>
    </Container>
   
  );
}

export default AdminLoginPage;
