import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EditPolls.css';

function EditPolls() {

  const location = useLocation();
  const { poll } = location.state;

  const [pollName, setPollName] = useState('');
  const [adminId, setAdminId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the form data
    console.log({
      pollName,
      adminId,
      startDate,
      endDate
    });

    // Reset form fields
    setPollName('');
    setAdminId('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Edit Poll</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Poll title</label>
          <input
            type="text"
            defaultValue={poll.title} 
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Poll description</label>
          <input
            type="text"
            defaultValue={poll.description} 
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
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPolls;