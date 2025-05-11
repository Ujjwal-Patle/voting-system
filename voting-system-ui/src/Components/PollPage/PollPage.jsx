import React from "react";
import { useNavigate } from "react-router-dom";


function PollPage() {
    const navigate= useNavigate();
  function handleCreatePoll() {
    console.log("Create Poll button clicked");
    navigate('/createpoll')
  }

  function handleShowPoll() {
    console.log("Show Poll button clicked");
    navigate('/showpolls')
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Poll Manager</h1>
      <div>
        <button onClick={handleCreatePoll} style={styles.createButton}>
          Create Poll
        </button>
        <button onClick={handleShowPoll} style={styles.showButton}>
          Show Poll
        </button>
      </div>
    </div>
  );
}

// Inline styling object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "24px",
  },
  createButton: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    marginRight: "12px",
    cursor: "pointer",
  },
  showButton: {
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default PollPage;
