import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import VotingPage from "./components/VotingPage.jsx";
import VoterRegister from "./components/VoterRegistration.jsx";
import AdminLogin from "./components/AdminLoginPage.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";


function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
       <Route path="/voter/register" element={<VoterRegister />} />

      </Routes>
    </Router>
  );
}

export default App;
