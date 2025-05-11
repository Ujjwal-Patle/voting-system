import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <div id="about" className="text-center py-4" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About eVote
          <br></br>
          
        </motion.h2>
<h>eVote is a secure, accessible, and transparent electronic voting system designed for modern democracy.</h>
        <Row className="align-items-center mt-5 text-start">
          {/* Left: Image */}
          <Col md={6}>
            <img
              src="/public\OIP.jpeg" // Ensure this path is correct
              alt="eVote on laptop"
              className="img-fluid rounded shadow"
              style={{ width: '100%', maxWidth: '600px', height: 'auto' }} 
            />
          </Col>

          {/* Right: Text */}
          <Col md={6}>
            <p style={{ fontSize: '1.25rem' }}>
              eVote is an election system that facilitates voters to record their secure and secret ballot electronically.
              It has a friendly user interface and enables voters to cast their votes in a few simple steps.
              We ensures the authenticity of the voters and the votes cast by them along with non-traceability of the casted vote. eVote's robust architecture has persistently manifested to be one of the most reliable, comprehensible and economical electronic voting solution.
            </p>
            <p style={{ fontSize: '1.25rem' }}>
              It renders <strong>Simple</strong> and <strong>Accessible</strong> voter experience that increases turnout.
              <strong> Auditable, Easy To Use, Secure and Reliable</strong> is what sets eVote apart from competitors.
            </p>
            <p style={{ fontSize: '1.25rem' }}>
              eVote has helped many organizations with secure, trustworthy elections  and last but not the least; our potential to be able to tabulate expeditious and accurate results .
            </p>
            <p></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutSection;
