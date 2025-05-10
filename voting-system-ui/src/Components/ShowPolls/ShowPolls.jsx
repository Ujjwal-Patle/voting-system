import React, { useState, useEffect } from 'react';
import './ShowPolls.css';

const ShowPolls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const data = [
        { id: 1, title: "Best Programming Language 2025?", description: "Vote for your favorite programming language!" },
        { id: 2, title: "Next Football Champion?", description: "Predict the winner of the next world cup." },
        { id: 3, title: "Favorite Social Media App?", description: "Which app do you use the most daily?" },
      ];
      setPolls(data);
    };

    fetchPolls();
  }, []);

  const handleDeletePoll = (id) => {
    const updatedPolls = polls.filter(poll => poll.id !== id);
    setPolls(updatedPolls);
  };

  const handleEditPoll = (id) => {
    // You can connect this later to navigate to your Edit page
    console.log(`Edit poll with id: ${id}`);
  };

  return (
    <div className="container">
      <h1 className="page-title">Available Polls</h1>

      {polls.length === 0 ? (
        <p className="no-polls">No polls available.</p>
      ) : (
        <div className="polls-grid">
          {polls.map((poll) => (
            <div key={poll.id} className="poll-card">
              <div>
                <h2 className="poll-title">{poll.title}</h2>
                <p className="poll-description">{poll.description}</p>
              </div>
              <div className="button-group">
                <button
                  className="edit-button"
                  onClick={() => handleEditPoll(poll.id)}
                >
                  Edit Poll
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePoll(poll.id)}
                >
                  Delete Poll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowPolls;