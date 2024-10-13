import React, { useState } from 'react';
import Navinbar from './Navinbar';
import './Lit.css'; // Ensure this file includes your updated CSS
import { useNavigate } from 'react-router-dom';

const Litigent = () => {
  const [formType, setFormType] = useState('Petitioner'); // To toggle between Petitioner and Respondent
  const [name, setName] = useState(''); // Name of Petitioner/Respondent
  const [age, setAge] = useState(''); // Age of Petitioner/Respondent
  const [relation, setRelation] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [caste, setCaste] = useState('');
  const [extraPetitionerCount, setExtraPetitionerCount] = useState(0); // Extra Petitioner Count
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [taluka, setTaluka] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [otherInfo, setOtherInfo] = useState(false);
  const [complainantName, setComplainantName] = useState('');
  const [legalHeirName, setLegalHeirName] = useState('');
  const [complainantAddress, setComplainantAddress] = useState('');
  const [complainantOccupation, setComplainantOccupation] = useState('');
  const [efilingNumber, setEfilingNumber] = useState(''); // New state for e-filing number
  const [caseType, setCaseType] = useState(''); // New state for case type
  const [establishment, setEstablishment] = useState(''); // New state for establishment
  const [displayInfo, setDisplayInfo] = useState(false); // State to control when to display info

  const navigate = useNavigate(); // Initialize useNavigate

  
  const handleUpdate = async (e) => {
    e.preventDefault(); // Move e.preventDefault() to the top
    const caseFilingData = {
      formType,
      name,
      age,
      relation,
      dob,
      gender,
      caste,
      extraPetitionerCount,
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
      efilingNumber,
      caseType,
      establishment
    };
  
    try {
      const response = await fetch('http://localhost:3001/api/litigent/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(caseFilingData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Case updated successfully');
        console.log(result);
      } else {
        alert('Error filing case');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error filing case');
    }

    try {
        const response = await fetch('http://localhost:3001/api/caseDetails');
        const data = await response.json();

        if (response.ok) {
            // Assuming data is an array of objects with establishment and caseType
            
            if (data.length > 0) {
                const generatedEfilingNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
                setEfilingNumber(generatedEfilingNumber); // Set the generated e-filing number
                const caseDetail = data[0]; // Assuming you want the first case detail
                setEstablishment(caseDetail.establishment);
                setCaseType(caseDetail.caseType);
                
                // Default to 'N/A' if efilingNumber is not available
                setEfilingNumber(caseDetail.efilingNumber || generatedEfilingNumber);

                setDisplayInfo(true); // Set displayInfo to true to show information
                
                // Alert user with caseType, establishment, and generated e-filing number
                alert(`Case Type: ${caseDetail.caseType}\nEstablishment: ${caseDetail.establishment}\nE-Filing Number: ${generatedEfilingNumber}`);
            } else {
                alert('No case details found'); // Handle the case where no details are found
            }
        } else {
            alert(data.message); // Show the error message from the server
        }
    } catch (error) {
        console.error('Error fetching case details:', error);
        alert('Error fetching case details');
    }
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const caseFilingData = {
      formType,
      name,
      age,
      relation,
      dob,
      gender,
      caste,
      extraPetitionerCount,
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
      efilingNumber,
      caseType,
      establishment
    };
  
    try {
      const response = await fetch('http://localhost:3001/api/litigent/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(caseFilingData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Case submitted successfully');
        console.log(result);
        navigate('/case-details');
      } else {
        alert('Error filing case');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error filing case');
    }
  };
  

  return (
    <div>
      <Navinbar />
      {displayInfo && (
          <div className="efiling-info">
            <h2>Establishment: {establishment}</h2>
            <h3>E-Filing Number: {efilingNumber}</h3>
            <h3>Case Type: {caseType}</h3>
            <p><b>{name} VS</b> </p>
          </div>
        )}
      <div className="litigent-container">
        <h2>Litigant Information</h2>

        {/* Radio buttons to toggle between Petitioner and Respondent, styled like Gender */}
        <div className="litigent-form-group">
          <label>Petitioner/Respondent Type *</label>
          <div className="litigent-radio-group">
            <label>
              <input
                type="radio"
                value="Petitioner"
                checked={formType === 'Petitioner'}
                onChange={() => setFormType('Petitioner')}
              />{' '}
              Petitioner
            </label>
            <label>
              <input
                type="radio"
                value="Respondent"
                checked={formType === 'Respondent'}
                onChange={() => setFormType('Respondent')}
              />{' '}
              Respondent
            </label>
          </div>
        </div>

        <form className="litigent-form" onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <div className="litigent-section">
            <h3>{formType} Personal Details</h3>

            <div className="litigent-form-group">
              <label>Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="litigent-form-group">
              <label>Age *</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
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
                  <input
                    type="radio"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={gender === 'Other'}
                    onChange={(e) => setGender(e.target.value)}
                  />
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
              <label>Extra Petitioner Count</label>
              <input type="number" value={extraPetitionerCount} onChange={(e) => setExtraPetitionerCount(e.target.value)} />
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="litigent-section">
            <h3>Contact Details</h3>

            <div className="litigent-form-group">
              <label>Address *</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

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
                <option value="">Select District</option>
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
          <div className="litigent-section">
            <h3>Other Information</h3>
            <label>
              <input
                type="checkbox"
                checked={otherInfo}
                onChange={(e) => setOtherInfo(!otherInfo)}
              />
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

          {/* Buttons Section */}
          <div className="litigent-form-actions">
            <button type="submit" className="litigent-btn-submit" onClick={handleSubmit}>
              Submit
            </button>
            <button type="reset" className="litigent-btn-reset">
              Reset
            </button>
            <button type="button" className="litigent-btn-update" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Litigent;
