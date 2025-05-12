import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Container style={{ maxWidth: '500px'}}>
     
    <Navbar bg="primary" variant="dark" expand="lg" >
      <Container >
        <Navbar.Brand as={Link} to="/">Voting System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/verify">Voter Verification</Nav.Link>
            {/* <Nav.Link as={Link} to="/vote">Cast Vote</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Container>
  );
};

export default Navigation;