import React, { useState } from 'react';
import Navinbar from './Navinbar';
import './Lit.css'; // Create a separate CSS file for styling

const Litigent = () => {
  const [petitionerType, setPetitionerType] = useState('');
  const [relation, setRelation] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [caste, setCaste] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      petitionerType,
      relation,
      dob,
      gender,
      caste,
      address,
    });
  };

  return (
    <div>
      <Navinbar />
      <div className="litigent-container">
        <h2>Litigant Information</h2>
        <form className="litigent-form" onSubmit={handleSubmit}>
          <div className="litigent-form-group">
            <label>Petitioner/Respondent Type *</label>
            <select value={petitionerType} onChange={(e) => setPetitionerType(e.target.value)} required>
              <option value="">Select</option>
              <option value="Petitioner">Petitioner</option>
              <option value="Respondent">Respondent</option>
            </select>
          </div>

          <div className="litigent-form-group">
            <label>Relation</label>
            <select value={relation} onChange={(e) => setRelation(e.target.value)}>
              <option value="">Select Relation</option>
              <option value="Father">Father</option>
              {/* Add more relation options as needed */}
            </select>
          </div>

          <div className="litigent-form-group">
            <label>Date of Birth *</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>

          <div className="litigent-form-group">
            <label>Gender *</label>
            <div className="litigent-radio-group">
              <label>
                <input type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                Male
              </label>
              <label>
                <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                Female
              </label>
              <label>
                <input type="radio" value="Other" checked={gender === 'Other'} onChange={(e) => setGender(e.target.value)} />
                Other
              </label>
            </div>
          </div>

          <div className="litigent-form-group">
            <label>Caste</label>
            <select value={caste} onChange={(e) => setCaste(e.target.value)}>
              <option value="">Select Caste</option>
              <option value="General">General</option>
              {/* Add more caste options as needed */}
            </select>
          </div>

          <div className="litigent-form-group">
            <label>Address *</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className="litigent-form-actions">
            <button type="submit" className="litigent-btn-submit">Submit</button>
          </div>

                     
        </form>
      </div>
    </div>
  );
};

export default Litigent;
