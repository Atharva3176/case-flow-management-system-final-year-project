import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './pro.css';

const Priority = () => {
  const [cases, setCases] = useState([]);  // State to store all cases
  const [selectedDate, setSelectedDate] = useState(null);  // Selected date for hearing
  const [selectedCase, setSelectedCase] = useState(null);  // Case to assign the date
  const [error, setError] = useState('');  // State to store errors

  // Function to calculate priority based on date filed
  const calculatePriority = (dateFiled) => {
    const currentDate = new Date();
    const filedDate = new Date(dateFiled);
    
    const timeDiff = currentDate - filedDate;  // Difference in milliseconds
    const nineMonthsInMillis = 9 * 30 * 24 * 60 * 60 * 1000;  // Approx. 9 months
    const twoYearsInMillis = 2 * 365 * 24 * 60 * 60 * 1000;  // Approx. 2 years

    if (timeDiff >= nineMonthsInMillis && timeDiff <= twoYearsInMillis) {
      return 1;  // High priority
    }
    return 2;  // Low priority
  };

  // Function to fetch all cases using fetch
  const fetchAllCases = async () => {
    try {
      const response = await fetch('http://localhost:3001/caselitigent');
      if (response.ok) {
        const data = await response.json();
        // Recalculate the priority for each case based on the filing date
        const updatedCases = data.map((caseItem) => ({
          ...caseItem,
          priorityLevel: calculatePriority(caseItem.dateFiled),
          urgent: calculatePriority(caseItem.dateFiled) === 1 ? true : caseItem.urgent 
        }));
        setCases(updatedCases);
        setError('');
      } else {
        throw new Error('Error fetching case details');
      }
    } catch (err) {
      setError('Error fetching case details');
      setCases([]);
      console.error(err);
    }
  };

  // Function to save the hearing date for a case using fetch
  const saveHearingDate = async (efilingNumber, date, caseItem) => {
    try {
      // Send updated case details including the new hearing date to the backend
      const response = await fetch(`http://localhost:3001/caselitigent/${efilingNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          efilingNumber: caseItem.efilingNumber,
          caseType: caseItem.caseType,
          establishment: caseItem.establishment,
          dateFiled: caseItem.dateFiled,
          urgent: caseItem.priorityLevel === 1 ? true : caseItem.urgent,
          priorityLevel: caseItem.priorityLevel,
          hearingDate: date.toISOString(),  // Save hearing date in ISO format
        }),
      });

      if (response.ok) {
        fetchAllCases();  // Fetch updated cases
        alert('Hearing date saved successfully');
      } else {
        throw new Error('Error saving hearing date');
      }
    } catch (err) {
      setError('Error saving hearing date');
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
      
      {cases.map((caseItem, index) => (
        <div
          className={`case-item ${caseItem.urgent ? 'urgent' : ''}`}
          key={caseItem.efilingNumber || `case-${index}`}  // Fallback key using index if efilingNumber is missing
        >
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
            <button onClick={() => setSelectedCase(caseItem.efilingNumber)}>
              Assign Hearing Date
            </button>

            {selectedCase === caseItem.efilingNumber && (
              <div className="date-picker">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
                <button
                  onClick={() => {
                    saveHearingDate(caseItem.efilingNumber, selectedDate, caseItem);  // Pass caseItem to save function
                    setSelectedCase(null);  // Close the date picker
                  }}
                >
                  Save Hearing Date
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Priority;
