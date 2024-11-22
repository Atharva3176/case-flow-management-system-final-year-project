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

  const civilCases = [
    "Divorce",
    "Child Custody",
    "Maintenance",
    "Property Dispute",
    "Recovery Suit",
    "Injunction Suit",
    "Breach of Contract",
    "Consumer Case",
  ];

  const criminalCases = [
    "Criminal Assault",
    "Theft",
    "Fraud",
    "Murder",
    "Drug Offenses",
    "Cybercrime",
    "Domestic Violence",
    "Homicide",
  ];


  const handleSubmit = async(e) => {
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

    const caseData = {
      district,
      establishment,
      caseType,
      nature,
      relief,
      petitioner,
      mobile
    };

    try {
      const response = await fetch('http://localhost:3001/api/casefiling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(caseData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Case filed successfully:', result);
        // Navigate to another page after successful submission
        alert("details saved")
        navigate('/litigent');
      } else {
        console.error('Failed to file case:', result.message);
      }
    } catch (error) {
      console.error('Error while submitting case:', error);
    }
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
              <option value="Ahmednagar">Ahmednagar</option>
<option value="Akola">Akola</option>
<option value="Amravati">Amravati</option>
<option value="Aurangabad">Aurangabad</option>
<option value="Beed">Beed</option>
<option value="Bhandara">Bhandara</option>
<option value="Buldhana">Buldhana</option>
<option value="Chandrapur">Chandrapur</option>
<option value="Dhule">Dhule</option>
<option value="Gadchiroli">Gadchiroli</option>
<option value="Gondia">Gondia</option>
<option value="Hingoli">Hingoli</option>
<option value="Jalna">Jalna</option>
<option value="Jalgaon">Jalgaon</option>
<option value="Kolhapur">Kolhapur</option>
<option value="Latur">Latur</option>
<option value="Mumbai City">Mumbai City</option>
<option value="Mumbai Suburban">Mumbai Suburban</option>
<option value="Nanded">Nanded</option>
<option value="Nandurbar">Nandurbar</option>
<option value="Nasik">Nasik</option>
<option value="Osmanabad">Osmanabad</option>
<option value="Parbhani">Parbhani</option>
<option value="Pune">Pune</option>
<option value="Raigad">Raigad</option>
<option value="Ratnagiri">Ratnagiri</option>
<option value="Sindhudurg">Sindhudurg</option>
<option value="Solapur">Solapur</option>
<option value="Thane">Thane</option>
<option value="Wardha">Wardha</option>
<option value="Washim">Washim</option>
<option value="Yavatmal">Yavatmal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Select Establishment *</label>
            <select value={establishment} onChange={(e) => setEstablishment(e.target.value)} required>
              <option value="">Select Establishment</option>
              <option value="Civil Court Senior Division">Civil Court Senior Division</option>
              <option value="Civil Court Junior Division">Civil Court Junior Division</option>
                <option value="Family Court">Family Court</option>
                <option value="Criminal Court">Criminal Court</option>
                <option value="Consumer Forum">Consumer Forum</option>
                <option value="Labour Court">Labour Court</option>
                <option value="District Consumer Disputes Redressal Forum">District Consumer Disputes Redressal Forum</option>
                <option value="High Court">High Court</option>
                <option value="Supreme Court">Supreme Court</option>
                <option value="Armed Forces Tribunal">Armed Forces Tribunal</option>
                <option value="Family Welfare Court">Family Welfare Court</option>
                <option value="Small Causes Court">Small Causes Court</option>
                <option value="Tribunal for Prevention of Money Laundering Act">Tribunal for Prevention of Money Laundering Act</option>
                <option value="NCLT (National Company Law Tribunal)">NCLT (National Company Law Tribunal)</option>
                <option value="NCLAT (National Company Law Appellate Tribunal)">NCLAT (National Company Law Appellate Tribunal)</option>
                <option value="Income Tax Appellate Tribunal">Income Tax Appellate Tribunal</option>
                <option value="Central Administrative Tribunal">Central Administrative Tribunal</option>
                <option value="State Administrative Tribunal">State Administrative Tribunal</option>
                <option value="Motor Accidents Claims Tribunal">Motor Accidents Claims Tribunal</option>
                <option value="Railway Claims Tribunal">Railway Claims Tribunal</option>
                <option value="Consumer Redressal Forum">Consumer Redressal Forum</option>
                <option value="Environmental Tribunal">Environmental Tribunal</option>
                <option value="Green Tribunal">Green Tribunal</option>
                <option value="Special Court for Prevention of Money Laundering">Special Court for Prevention of Money Laundering</option>
                <option value="Special Court for Prevention of Corruption Act">Special Court for Prevention of Corruption Act</option>
                <option value="Special Court under NIA Act">Special Court under NIA Act</option>
                <option value="Fast Track Court">Fast Track Court</option>
                <option value="Commercial Court">Commercial Court</option>
                <option value="Motor Vehicle Appellate Tribunal">Motor Vehicle Appellate Tribunal</option>
                <option value="Telecom Disputes Settlement and Appellate Tribunal">Telecom Disputes Settlement and Appellate Tribunal</option>
                <option value="Competition Appellate Tribunal">Competition Appellate Tribunal</option>
                <option value="Income Tax Settlement Commission">Income Tax Settlement Commission</option>
                <option value="Debt Recovery Tribunal">Debt Recovery Tribunal</option>

            </select>
          </div>
        </div>

        <div className="section">
          <h3>Case Types</h3>
          <div className="form-group">
            <label>Nature *</label>
            <div className="nature-container">
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


            
          </div>
        </div>
          
          <div className="form-group">
            <label>Relief Sought *</label>
            <select value={relief} onChange={(e) => setRelief(e.target.value)} required>
              <option value="">Select Relief</option>
              <option value="Desertion and Maintenance">Desertion and Maintenance</option>
              <option value="Desertion and Maintenance">Desertion and Maintenance</option>
                <option value="Restoration of Conjugal Rights">Restoration of Conjugal Rights</option>
                <option value="Divorce">Divorce</option>
                <option value="Child Custody">Child Custody</option>
                <option value="Alimony/Maintenance">Alimony/Maintenance</option>
                <option value="Separation">Separation</option>
                <option value="Partition of Property">Partition of Property</option>
                <option value="Injunction">Injunction</option>
                <option value="Specific Performance of Contract">Specific Performance of Contract</option>
                <option value="Recovery of Possession">Recovery of Possession</option>
                <option value="Damages for Breach of Contract">Damages for Breach of Contract</option>
                <option value="Compensation for Loss/Damage">Compensation for Loss/Damage</option>
                <option value="Return of Dowry">Return of Dowry</option>
                <option value="Declaration of Rights">Declaration of Rights</option>
                <option value="Restoration of Status">Restoration of Status</option>
                <option value="Quashing of FIR">Quashing of FIR</option>
                <option value="Bail">Bail</option>
                <option value="Compensation under Motor Vehicles Act">Compensation under Motor Vehicles Act</option>
                <option value="Compensation under Workmen's Compensation Act">Compensation under Workmen's Compensation Act</option>
                <option value="Relief under Negotiable Instruments Act">Relief under Negotiable Instruments Act</option>
                <option value="Relief under Consumer Protection Act">Relief under Consumer Protection Act</option>
                <option value="Legal Aid">Legal Aid</option>
                <option value="Interim Relief">Interim Relief</option>

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
