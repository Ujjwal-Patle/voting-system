import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';

const mockResults = [
  { id: 1, name: 'Alice Sharma', photo: 'vote3.jpg', votes: 3 },
  { id: 2, name: 'Ravi Mehta', photo: '/public/vote2.jpg', votes: 5 },
];

function ResultPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Replace this with fetch('/api/results') for real backend
    setResults(mockResults);
  }, []);

  return (
    <Container className="mt-4">
      {/* ✅ Thank You Alert */}
      <Alert variant="success" className="text-center">
        Thank you for voting!
      </Alert>

      <h2 className="text-center mb-4">Voting Results</h2>

      <Row xs={1} md={2} className="g-4">
        {results.map(candidate => (
          <Col key={candidate.id}>
            <Card className="h-100 text-center shadow-sm">
              <Card.Img variant="top" src={candidate.photo} height="250" style={{ objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{candidate.name}</Card.Title>
                <Card.Text><strong>Votes:</strong> {candidate.votes}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ResultPage;