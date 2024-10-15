import axios from 'axios';
import { useState, useEffect } from 'react';
import './pro.css';

const Priority = () => {
  const [cases, setCases] = useState([]);  // State to store all cases
  const [error, setError] = useState('');  // State to store errors

  // Function to fetch all cases
  const fetchAllCases = async () => {
    try {
      // API call to fetch all cases
      const response = await axios.get('http://localhost:3001/caselitigent');
      
      if (response.status === 200) {
        setCases(response.data); // Set cases data in state
        setError(''); // Clear any previous errors
      }
    } catch (err) {
      // Handle errors
      setError('Error fetching case details');
      setCases([]);  // Clear previous cases if any
      console.error(err);
    }
  };

  // Use effect to fetch all cases when the component mounts
  useEffect(() => {
    fetchAllCases();
  }, []);

  return (
    <div className="case-list-container">
      <h1>Case Management</h1>
  
      {cases.map((caseItem) => (
        <div className={`case-item ${caseItem.urgent ? 'urgent' : ''}`} key={caseItem._id}>
          <div className="case-header">
            <h3>Case: {caseItem.efilingNumber}</h3>
            <span className={`priority ${caseItem.priorityLevel === 1 ? 'high' : 'low'}`}>
              {caseItem.priorityLevel === 1 ? 'High Priority' : 'Low Priority'}
            </span>
          </div>
  
          <div className="case-details">
            <p><strong>Case Type:</strong> {caseItem.caseType}</p>
            <p><strong>Establishment:</strong> {caseItem.establishment}</p>
            <p><strong>Date Filed:</strong> {new Date(caseItem.dateFiled).toLocaleDateString()}</p>
            <p><strong>Urgent:</strong> {caseItem.urgent ? 'Yes' : 'No'}</p>
          </div>
  
          <div className="case-footer">
            <button>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Priority;
