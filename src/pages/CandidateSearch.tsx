import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  useEffect(() => {
    // Initialize saved candidates from local storage
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const users = await searchGithub();
      setCandidates(users);
      if (users.length > 0) {
        fetchCandidateDetails(users[0].login);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchCandidateDetails = async (username: string) => {
    try {
      const user = await searchGithubUser(username);
      setCurrentCandidate(user);
    } catch (error) {
      console.error('Error fetching candidate details:', error);
    }
  };

  const dismissCandidate = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < candidates.length) {
      setCurrentIndex(nextIndex);
      fetchCandidateDetails(candidates[nextIndex].login);
    } else {
      console.log('No more candidates');
      setCurrentCandidate(null);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);
  
  const addToSaved = (candidate: Candidate) => {
    const updatedSavedCandidates = [...savedCandidates, candidate];
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    const nextIndex = currentIndex + 1;
    if (nextIndex < candidates.length) {
      setCurrentIndex(nextIndex);
      fetchCandidateDetails(candidates[nextIndex].login);
    } else {
      console.log('No more candidates');
      setCurrentCandidate(null);
    }
  };
  const isCandidateSaved = (candidate: Candidate) => {
    return savedCandidates.some(savedCandidate => savedCandidate.login === candidate.login);
  };
  return (
    <div className="candidate-container">
      {currentCandidate ? (
        <div className="candidate-info">
      <h1>Candidate Information</h1>
      <img src={currentCandidate.avatar_url} alt={`${currentCandidate.name}'s avatar`} width="100" />
      <p><strong>Name:</strong> {currentCandidate.name}</p>
      <p><strong>Username:</strong> {currentCandidate.login}</p>
      <p><strong>Location:</strong> {currentCandidate.location}</p>
      <p><strong>Email:</strong> {currentCandidate.email}</p>
      <p><strong>Company:</strong> {currentCandidate.company}</p>
      <p><strong>Profile:</strong> <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a></p>
      <button
            className={`icon-button ${isCandidateSaved(currentCandidate) ? 'disabled' : ''}`}
            onClick={() => addToSaved(currentCandidate)}
            disabled={isCandidateSaved(currentCandidate)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle">
              <circle cx="12" cy="12" r="10" fill="green"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
          <button className="icon-button" onClick={() => dismissCandidate()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus-circle">
              <circle cx="12" cy="12" r="10" fill="red"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
    </div>
  ) : (
    <div>No more candidates</div>
  )}
</div>
  );
};

export default CandidateSearch;
