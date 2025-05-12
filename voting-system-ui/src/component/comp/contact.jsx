import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [contactDetails, setContactDetails] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3200/home/contact')
      .then(res => setContactDetails(res.data))
      .catch(err => console.error('Error fetching contact details:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post('http://localhost:3200/home/contact', formData);
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Contact Us</h1>

      <Row>
        {/* Contact Information Card */}
        <Col md={6} className="mb-4">
          <Card className="contact-info-card">
            <Card.Body>
              <h2>Our Contact Information</h2>
              {contactDetails ? (
                <>
                  <p><strong>Company:</strong> {contactDetails.companyName}</p>
                  <p><strong>Address:</strong> {contactDetails.address}</p>
                  <p><strong>Email:</strong> {contactDetails.email}</p>
                  <p><strong>Business Hours:</strong> {contactDetails.businessHours}</p>
                </>
              ) : (
                <p>Loading contact information...</p>
              )}
            </Card.Body>
          </Card>

          {/* Location Card */}
          <Card className="mt-4">
            <Card.Body>
              <h2>Location</h2>
              <div className="location-map-placeholder">
                <p>Map would go here in a real application</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Form Card */}
        <Col md={6}>
          <Card className="contact-form-card">
            <Card.Body>
              <h2>Send Us a Message</h2>

              {submitStatus && (
                <Alert variant={submitStatus.success ? 'success' : 'danger'}>
                  {submitStatus.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
