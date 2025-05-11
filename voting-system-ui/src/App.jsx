import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import VotingPage from "./components/VotingPage.jsx";
import './components/custom.scss';

import NavbarComponent from "./components/NavbarComponent.jsx";
import AdminLoginPage from "./components/AdminLoginPage.jsx";
import VoterRegistration from "./components/VoterRegistration.jsx";
function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote" element={<VotingPage />} />
       
       <Route path="/voter/register" element={<VoterRegistration />} />
         <Route path="/admin/login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
