import React, { useState } from 'react';
import './CreatePoll.css';
import axios from "axios";


function CreatePoll() {

  const [pollName, setPollName] = useState('');
  const [adminId, setAdminId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For now, just log the form data
    console.log({
      pollName,
      adminId,
      startDate,
      endDate
    });

    const pollData = {
      name: pollName,
      admin_id: adminId,
      start_date: startDate,
      end_date: endDate,
    };
    try {
      // setLoading(true); // Show loading state while making the API call

      // Send POST request to the backend API to create the poll
      
      const response = await axios.post(
        "http://localhost:3200/admin/createPoll",pollData,
        {
          headers: {
            'Authorization': `Bearer secret123`  // Add token in Authorization header
          }
        }
      );

      // Handle the response (Success)
      console.log("Poll created successfully:", response.data);
      alert("Poll created successfully")
    } catch(err){
      // Handle error response
      console.error("Error creating poll:", err);
    }

    // Reset form fields
    setPollName('');
    setAdminId('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Poll Name</label>
          <input
            type="text"
            value={pollName}
            onChange={(e) => setPollName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Admin ID</label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Poll Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Poll End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Create Poll
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;