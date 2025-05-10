import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function VoterRegistration() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/voters/register', data);
      if (response.data.success) {
        navigate(`/vote?aadhaar=${data.aadhaar_number}`);
      } else {
        alert('Registration failed. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Voter Registration</h2>
      {isSubmitSuccessful && <Alert variant="success">Registration successful!</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                {...register('full_name', { required: 'Name is required' })}
              />
              {errors.full_name && <small className="text-danger">{errors.full_name.message}</small>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="aadhaar" className="mb-3">
              <Form.Label>Aadhaar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter 12-digit Aadhaar"
                {...register('aadhaar_number', {
                  required: 'Aadhaar is required',
                  pattern: {
                    value: /^\d{12}$/,
                    message: 'Aadhaar must be exactly 12 digits',
                  },
                })}
              />
              {errors.aadhaar_number && <small className="text-danger">{errors.aadhaar_number.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="dob" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                {...register('dob', { required: 'Date of birth is required' })}
              />
              {errors.dob && <small className="text-danger">{errors.dob.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default VoterRegistration;
