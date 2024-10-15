import axios from 'axios';
import { useState } from 'react';
import './portfolio.css';

const PortfolioPage = () => {
  const [eFilingNumber, setEFilingNumber] = useState('');
  const [caseDetails, setCaseDetails] = useState(null);
  const [error, setError] = useState('');

  // Function to handle the search for case details
  const handleSearch = async () => {
    try {
      // Make an API call to fetch case details by eFilingNumber
      const response = await axios.get(`http://localhost:3001/api/caseDetails/${eFilingNumber}`);
      
      if (response.status === 200) {
        setCaseDetails(response.data); // Set case details in state
        setError(''); // Clear any previous error
      }
    } catch (err) {
      // If error occurs, handle it and display appropriate message
      setError('Case not found or error fetching case details');
      setCaseDetails(null); // Clear previous case details if any
      console.error(err);
    }
  };

  return (
    <div className="portfolio-container">
      <h1>Search Case by e-Filing Number</h1>
      <div className="input-group">
        <input
          type="text"
          value={eFilingNumber}
          onChange={(e) => setEFilingNumber(e.target.value)}
          placeholder="Enter e-Filing Number"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {caseDetails && (
        <div className="case-details">
          <h2>Case Details</h2>
          <ul>
            {/* <li><strong>ID:</strong> {caseDetails._id}</li> */}
            <li><strong>e-Filing Number:</strong> {caseDetails.efilingNumber}</li>
            <li><strong>Case Type:</strong> {caseDetails.caseType}</li>
            <li><strong>Establishment:</strong> {caseDetails.establishment}</li>
            <li><strong>Date Filed:</strong> {new Date(caseDetails.dateFiled).toLocaleString()}</li>
            {/* <li><strong>Version:</strong> {caseDetails.__v}</li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
