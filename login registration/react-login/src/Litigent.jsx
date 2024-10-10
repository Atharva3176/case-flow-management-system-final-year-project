import React, { useState } from 'react';
import Navinbar from './Navinbar';
import './Lit.css'; // Ensure this file includes your updated CSS

const Litigent = () => {
  const [petitionerType, setPetitionerType] = useState('');
  const [relation, setRelation] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [caste, setCaste] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [taluka, setTaluka] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [otherInfo, setOtherInfo] = useState(false); // Checkbox for "Other Information"
  const [complainantName, setComplainantName] = useState('');
  const [legalHeirName, setLegalHeirName] = useState('');
  const [complainantAddress, setComplainantAddress] = useState('');
  const [complainantOccupation, setComplainantOccupation] = useState('');

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
      email,
      occupation,
      mobileNo,
      pinCode,
      state,
      taluka,
      district,
      village,
      otherInfo,
      complainantName,
      legalHeirName,
      complainantAddress,
      complainantOccupation,
    });
  };

  return (
    <div>
      <Navinbar />
      <div className="litigent-container">
        <h2>Litigant Information</h2>
        <form className="litigent-form" onSubmit={handleSubmit}>
          
          {/* Personal Details Section */}
          <div className="litigent-section">
            <h3>Personal Details</h3>

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
                <option value="Mother">Mother</option>
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
                <option value="SC/ST">SC/ST</option>
              </select>
            </div>

            <div className="litigent-form-group">
              <label>Address *</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          </div>
          
          {/* Contact Details Section */}
          <div className="litigent-section">
            <h3>Contact Details</h3>

            <div className="litigent-form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="litigent-form-group">
              <label>Occupation</label>
              <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>

            <div className="litigent-form-group">
              <label>Mobile Number *</label>
              <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
            </div>

            <div className="litigent-form-group">
              <label>Pin Code</label>
              <input type="text" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
            </div>
          </div>
          
          {/* State Information Section */}
          <div className="litigent-section">
            <h3>State Information</h3>

            <div className="litigent-form-group">
              <label>State</label>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="Maharashtra">Maharashtra</option>
                {/* Add more state options as needed */}
              </select>
            </div>

            <div className="litigent-form-group">
              <label>Taluka</label>
              <select value={taluka} onChange={(e) => setTaluka(e.target.value)}>
                <option value="">Select Taluka</option>
                <option value="Baramati">Baramati</option>
                {/* Add more options */}
              </select>
            </div>

            <div className="litigent-form-group">
              <label>District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="Pune">Pune</option>
                {/* Add more options */}
              </select>
            </div>

            <div className="litigent-form-group">
              <label>Village</label>
              <select value={village} onChange={(e) => setVillage(e.target.value)}>
                <option value="">Select Village</option>
                {/* Add more options */}
              </select>
            </div>
          </div>

          {/* Marathi Section: Other Information */}
          <div className="litigent-form-group">
            <h3>Other Information</h3>
            <label>
              <input type="checkbox" checked={otherInfo} onChange={(e) => setOtherInfo(!otherInfo)} />
              इतर माहिती
            </label>
          </div>

          {/* Marathi Form Fields */}
          <div className="litigent-form-group">
            <label>फिर्यादी/आरोपी *</label>
            <input type="text" value={complainantName} onChange={(e) => setComplainantName(e.target.value)} />
          </div>

          <div className="litigent-form-group">
            <label>वडील/आई/पति चे नाव *</label>
            <input type="text" value={legalHeirName} onChange={(e) => setLegalHeirName(e.target.value)} />
          </div>

          <div className="litigent-form-group">
            <label>पत्ता *</label>
            <input type="text" value={complainantAddress} onChange={(e) => setComplainantAddress(e.target.value)} />
          </div>

          <div className="litigent-form-group">
            <label>व्यवसाय *</label>
            <input type="text" value={complainantOccupation} onChange={(e) => setComplainantOccupation(e.target.value)} />
          </div>

          <div className="litigent-form-actions">
            <button type="submit" className="litigent-btn-submit">Submit</button>
            <button type="reset" className="litigent-btn-reset">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Litigent;
