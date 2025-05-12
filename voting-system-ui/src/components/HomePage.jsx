import React from 'react';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Outlet, useNavigate } from 'react-router-dom';
import AboutSection from '../components/AboutSection.jsx'; 
import { Link } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#">eVote</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => scrollToSection('home')}>Home</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('about')}>About</Nav.Link>
              <Nav.Link onClick={() => navigate('/home')}>Vote Now</Nav.Link>
              <Nav.Link onClick={() => navigate('/contactpage')}>Contact Us</Nav.Link>
            <Nav.Link onClick={()=>navigate('/voter/register')}>Sign In</Nav.Link>
            <Nav.Link as={Link} to="/results">Results</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div id="home" style={{ paddingTop: '100px' }}>
        <Container className="text-center mt-5">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Secure & Smart eVoting System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Vote from anywhere, anytime, safely.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            
      <Button variant="primary" onClick={() => navigate('/admin/login')}>
  Get Started
</Button>

          </motion.div>
        </Container>
      </div>

    
      <AboutSection />


      <div id="result" className="text-center py-5">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Results
          </motion.h2>
          <p>
            Real-time and verifiable results will be displayed here.
          </p>
        </Container>
      </div>

      <div id="contact" className="text-center py-5 bg-light">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>
          <p>
            Have questions? Reach out to us at <a href="mailto:support@evote.com">support@evote.com</a>
          </p>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
