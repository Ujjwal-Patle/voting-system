import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,Alert,Button,Card,Spinner,Form,ListGroup,Row,Col} from 'react-bootstrap';
import axios from 'axios';

const VoteCasting = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState({
    polls: true,
    candidates: false,
    submitting: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivePolls = async () => {
      try {
        const response = await axios.get('http://localhost:3200/public/polls');
        setPolls(response.data || []);
      } catch (err) {
        console.error('Error fetching polls:', err);
        setError('Failed to load polls. Please try again later.');
        setPolls([]);
      } finally {
        setLoading(prev => ({ ...prev, polls: false }));
      }
    };

    fetchActivePolls();
  }, []);

  const handlePollSelect = async (pollId) => {
    setSelectedPoll(pollId);
    setLoading(prev => ({ ...prev, candidates: true }));
    setError('');
    setSelectedCandidate('');

    try {
      const response = await axios.get(`http://localhost:3200/public/polls/${pollId}`);
      setCandidates(response.data?.candidates || []);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError('Failed to load candidates. Please try again.');
      setCandidates([]);
    } finally {
      setLoading(prev => ({ ...prev, candidates: false }));
    }
  };

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) {
      setError('Please select a candidate');
      return;
    }

    setLoading(prev => ({ ...prev, submitting: true }));
    setError('');
    setSuccess('');

    try {
      const voterId = localStorage.getItem('voter_id');
      if (!voterId) {
        throw new Error('Voter session expired. Please verify again.');
      }

      await axios.post('http://localhost:3200/voter/castVote', {
        poll_id: selectedPoll,
        candidate_id: selectedCandidate,
        voter_id: voterId
      });
      
      setSuccess('Your vote has been recorded successfully!');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 
              err.message || 
              'Failed to cast vote. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Cast Your Vote</h1>

      {error && (
        <Alert variant="danger" className="mb-4" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4">
          {success}
        </Alert>
      )}

      {loading.polls ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading polls...</span>
          </Spinner>
          <p>Loading available polls...</p>
        </div>
      ) : polls.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>No Active Polls</Card.Title>
            <Card.Text>
              There are currently no active polls available for voting.
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <>
          <h4 className="mb-3">Select a Poll:</h4>
          <Row className="g-3 mb-4">
            {polls.map(poll => (
              <Col key={poll.id} md={6} lg={4}>
                <Card 
                  onClick={() => handlePollSelect(poll.id)}
                  className={`h-100 ${selectedPoll === poll.id ? 'border-primary border-2' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body>
                    <Card.Title>{poll.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {new Date(poll.start_date).toLocaleDateString()} - {new Date(poll.end_date).toLocaleDateString()}
                    </Card.Text>
                    {selectedPoll === poll.id && (
                      <Card.Text className="text-success">
                        Currently selected
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {selectedPoll && (
            <div className="mt-4">
              {loading.candidates ? (
                <div className="text-center my-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading candidates...</span>
                  </Spinner>
                  <p>Loading candidates for selected poll...</p>
                </div>
              ) : candidates.length === 0 ? (
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>No Candidates Available</Card.Title>
                    <Card.Text>
                      There are no candidates available for this poll.
                    </Card.Text>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  <h4 className="mb-3">Select a Candidate:</h4>
                  <ListGroup className="mb-4">
                    {candidates.map(candidate => (
                      <ListGroup.Item key={candidate.id}>
                        <Form.Check
                          type="radio"
                          id={`candidate-${candidate.id}`}
                          name="candidate"
                          label={
                            <div className="d-flex align-items-center">
                              {candidate.photo_url && (
                                <img 
                                  src={candidate.photo_url} 
                                  alt={candidate.name}
                                  className="me-3"
                                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                              )}
                              <div>
                                <strong>{candidate.name}</strong>
                                <div className="text-muted">
                                  {candidate.party || 'Independent'}
                                </div>
                                {candidate.description && (
                                  <div className="small mt-1">{candidate.description}</div>
                                )}
                              </div>
                            </div>
                          }
                          checked={selectedCandidate === candidate.id}
                          onChange={() => setSelectedCandidate(candidate.id)}
                        />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleVoteSubmit}
                      disabled={loading.submitting || !selectedCandidate}
                    >
                      {loading.submitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Submitting Vote...
                        </>
                      ) : (
                        'Submit Vote'
                      )}
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => {
                        setSelectedPoll(null);
                        setSelectedCandidate('');
                      }}
                    >
                      Change Poll Selection
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default VoteCasting;