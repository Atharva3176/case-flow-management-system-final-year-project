import React, { useState } from 'react';
import Navinbar from './Navinbar'; 
import './caseFiling.css'; // Ensure to create this CSS file for styling
import { useNavigate } from 'react-router-dom';

const CaseFiling = () => {
  const [district, setDistrict] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [caseType, setCaseType] = useState('');
  const [nature, setNature] = useState('Civil');
  const [relief, setRelief] = useState('');
  const [petitioner, setPetitioner] = useState('');
  const [mobile, setMobile] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Navigate('/litigent');
    // Handle form submission logic here
    console.log({
      district,
      establishment,
      caseType,
      nature,
      relief,
      petitioner,
      mobile
    });
    navigate('/litigent')
  };

  const handleReset = () => {
    setDistrict('');
    setEstablishment('');
    setCaseType('');
    setNature('Civil');
    setRelief('');
    setPetitioner('');
    setMobile('');
  };

  return (
    <div>
      <Navinbar/>
    <div className="case-filing-container">
      <h2>Initial Inputs</h2>
      <form className="case-filing-form" onSubmit={handleSubmit}>
        <div className="section">
          <h3>District/Establishment</h3>
          <div className="form-group">
            <label>Select District *</label>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
              <option value="">Select District</option>
              <option value="Pune">Pune</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Select Establishment *</label>
            <select value={establishment} onChange={(e) => setEstablishment(e.target.value)} required>
              <option value="">Select Establishment</option>
              <option value="Civil Court Senior Division">Civil Court Senior Division</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        <div className="section">
          <h3>Case Types</h3>
          <div className="form-group">
            <label>Nature *</label>
            <div className="radio-group">
              <label>
                <input type="radio" value="Civil" checked={nature === 'Civil'} onChange={(e) => setNature(e.target.value)} />
                Civil
              </label>
              <label>
                <input type="radio" value="Criminal" checked={nature === 'Criminal'} onChange={(e) => setNature(e.target.value)} />
                Criminal
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Relief Sought *</label>
            <select value={relief} onChange={(e) => setRelief(e.target.value)} required>
              <option value="">Select Relief</option>
              <option value="Desertion and Maintenance">Desertion and Maintenance</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Case Type *</label>
            <select value={caseType} onChange={(e) => setCaseType(e.target.value)} required>
              <option value="">Select Case Type</option>
              <option value="Divorce">Divorce</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        <div className="section">
          <h3>Party Details</h3>
          <div className="form-group">
            <label>Petitioner/Respondent *</label>
            <input type="text" value={petitioner} onChange={(e) => setPetitioner(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mobile Number *</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit1" onClick={handleSubmit}>Submit</button>
          <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CaseFiling;
