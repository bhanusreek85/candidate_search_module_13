import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

// interface SavedCandidatesProps {
//   savedCandidates: Candidate[];
//   removeFromSaved: (candidate: Candidate) => void;
// }


const SavedCandidates = () => {
  
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  
    useEffect(() => {
      const saved = localStorage.getItem('savedCandidates');
      if (saved) {
        setSavedCandidates(JSON.parse(saved));
      }
    }, []);
    
  const removeFromSaved = (candidate: Candidate) => {
    const updatedSavedCandidates = savedCandidates.filter(c => c.login !== candidate.login);
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };
  return (
    <div className="potential-container">
      <h1 className="center-text" >Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.login}>
              <td><img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="50" /></td>
              <td>{candidate.name}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
                           <td>
                <button className="icon-button" onClick={() => removeFromSaved(candidate)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus-circle">
                    <circle cx="12" cy="12" r="10" fill="red"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;