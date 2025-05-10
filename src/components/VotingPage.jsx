import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Alert, Form } from 'react-bootstrap';

const candidates = [
  { id: 1, name: 'Alice Sharma', photo: 'vote3.jpg' },
  { id: 2, name: 'Ravi Mehta', photo: '/public/vote2.jpg' },
];

function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleVote = () => {
    if (!selectedCandidate) return alert('Select a candidate');
    // TODO: Send vote to backend later
    setSubmitted(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Cast Your Vote</h2>
      {submitted && <Alert variant="success">Thank you for voting!</Alert>}

      <Form>
        <Row className='justiy-content-center'>
          {candidates.map((candidate) => (
            <Col md={6} key={candidate.id}>
              <Card className="mb-3">
                <Card.Img variant="top" src={candidate.photo} height="250" />
                <Card.Body className="text-center">
                  <Card.Title>{candidate.name}</Card.Title>
                  <Form.Check
                    type="radio"
                    label="Select"
                    checked={selectedCandidate === candidate.id}
                    onChange={() => setSelectedCandidate(candidate.id)}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <Button onClick={handleVote} variant="primary" disabled={submitted}>
            Vote
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default VotingPage;
