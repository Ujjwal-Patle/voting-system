import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header>Welcome to the Voting System</Card.Header>
        <Card.Body>
          <Card.Title>Cast Your Vote Securely</Card.Title>
          <Card.Text>
            Please verify your identity first to participate in the voting process.
          </Card.Text>
          <Button as={Link} to="/verify" variant="primary">Verify Now</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;