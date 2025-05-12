import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const VoterVerification = () => {
  const [formData, setFormData] = useState({
    adhar_no: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3200/voter/verifyVoter', formData);
      if (response.data?.voter_id) {
        localStorage.setItem('voter_id', response.data.voter_id);
        navigate('/vote');
      } else {
        setError('Verification failed. Invalid response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 
              'Verification failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container  style={{ maxWidth: '500px' }}>
      <Card className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Voter Verification</h2>
          <p className="text-center mb-4">
            Please enter your Aadhaar number and Date of Birth to verify your identity.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar Number</Form.Label>
              <Form.Control
                type="text"
                name="adhar_no"
                value={formData.adhar_no}
                onChange={handleChange}
                required
                pattern="[0-9]{12}"
                title="Please enter 12-digit Aadhaar number"
                maxLength="12"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100 py-2"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VoterVerification;