import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    state: '',
    barRegistrationNumber: '',
    advocateName: '',
    gender: '',
    dateOfBirth: '',
    placeOfPractice: 'District Court',
    district: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-otp', { email: formData.email });
      console.log(response.data);
      alert("OTP sent to " + formData.email);
      setOtpSent(true);
    } catch (error) {
      console.error("There was an error sending the OTP!", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!otpSent) {
      alert("Please generate and enter the OTP first");
      return;
    }

    try {
      const otpResponse = await axios.post('http://localhost:3001/verify-otp', { email: formData.email, otp: formData.otp });
      if (otpResponse.data !== 'OTP verified successfully') {
        alert("Invalid OTP");
        return;
      }

      const response = await axios.post('http://localhost:3001/api/register', formData);
      console.log(response.data);
      alert("Registration successful");
      navigate('/login');
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">Registration Form</div>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>Bar Registration Detail</h4>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <select id="state" name="state" className="form-select" onChange={handleChange} required>
              <option value="">-- Select State --</option>
              <option value="State1">State1</option>
              <option value="State2">State2</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="barRegistrationNumber" className="form-label">Bar Registration Number</label>
            <input type="text" id="barRegistrationNumber" name="barRegistrationNumber" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="advocateName" className="form-label">Advocate Name</label>
            <input type="text" id="advocateName" name="advocateName" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="genderMale" value="Male" onChange={handleChange} required />
                <label className="form-check-label" htmlFor="genderMale">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="Female" onChange={handleChange} required />
                <label className="form-check-label" htmlFor="genderFemale">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="genderOther" value="Other" onChange={handleChange} required />
                <label className="form-check-label" htmlFor="genderOther">Other</label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h4>Ordinary Place of Practice</h4>
          <div className="mb-3">
            <label htmlFor="placeOfPractice" className="form-label">Ordinary Place of Practice</label>
            <select id="placeOfPractice" name="placeOfPractice" className="form-select" onChange={handleChange} required>
              <option value="District Court">District Court</option>
              <option value="High Court">High Court</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="district" className="form-label">District</label>
            <select id="district" name="district" className="form-select" onChange={handleChange} required>
              <option value="">-- Select District --</option>
              <option value="District1">District1</option>
              <option value="District2">District2</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h4>Contact Details</h4>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number (+91)</label>
            <input type="text" id="mobileNumber" name="mobileNumber" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h4>Choose Password</h4>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h4>OTP Verification</h4>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP</label>
            <div className="input-group">
              <input type="text" id="otp" name="otp" className="form-control" onChange={handleChange} required />
              <button type="button" className="btn btn-primary" onClick={handleGetOtp}>Get OTP</button>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
