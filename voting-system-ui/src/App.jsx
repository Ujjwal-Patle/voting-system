import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import VotingPage from "./components/VotingPage.jsx";
import VoterRegister from "./components/VoterRegistration.jsx";
import AdminLogin from "./components/AdminLoginPage.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import CreatePoll from './Components/CreatePoll/CreatePoll.jsx';
import ShowPolls from './Components/ShowPolls/ShowPolls.jsx';
import PollPage from "./Components/PollPage/PollPage.jsx";
import EditPolls from "./Components/EditPolls/EditPolls.jsx";


function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
       <Route path="/voter/register" element={<VoterRegister />} />
       <Route path="/pollpage" element={<PollPage />} />
       <Route path="/createpoll" element={<CreatePoll/>} />
       <Route path="/showpolls" element={<ShowPolls/>} />
       <Route path="/editpolls" element={<EditPolls/>} />


       {/* <Route path="/voter/register" element={<ShowPolls />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
