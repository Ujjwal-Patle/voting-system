import React from 'react'
import './App.css'
import CreatePoll from './Components/CreatePoll/CreatePoll.jsx';
import ShowPolls from './Components/ShowPolls/ShowPolls.jsx';

function App() {

  return (
    
    <div>
      <CreatePoll />
      <ShowPolls />
    </div>
    
  );
}

export default App;