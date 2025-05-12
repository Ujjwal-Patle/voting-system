import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VoterVerification from "./VoterVerification.jsx";

import VoteCasting from "./VoterCasting.jsx";

import Navigation from './navigation.jsx';
import Home from './Home.jsx';

function VotingBox() {
  return (
    <Router>
      
      {/* <main className="py-4"> */}
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<VoterVerification />} />
          {/* <Route path="/vote" element={<VoteCasting />} /> */}
        </Routes>
      {/* </main> */}
    </Router>
  );
}

export default VotingBox;