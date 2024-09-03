import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [state, setState] = useState('');
  const [role, setRole] = useState('Advocate');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [phoneNumber, setPhoneNumber] = useState(''); 
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const randomCaptcha = Math.random().toString(36).substring(2, 8);
    setGeneratedCaptcha(randomCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captcha !== generatedCaptcha) {
      alert('Incorrect CAPTCHA. Please try again.');
      return;
    }

    // if (!/^\d{10}$/.test(phoneNumber)) {
    //   alert('Phone number must be exactly 10 digits.');
    //   return;
    // }

    try {
      //console.log('Submitting login with:', { phoneNumber, password });
      const response = await axios.post('http://localhost:3001/login', {username, password });
      console.log(response.data);

      if (response.data.message === "Login successful") {
        alert("Login successful");
        navigate('/dashboard');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="p-4 rounded border" style={{ backgroundColor: '#ffffff', width: '400px', border: '2px solid #007bff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="state" className="form-label"><strong>Select State</strong></label>
            <select
              id="state"
              className="form-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              style={{ border: '2px solid #007bff' }}
            >
              <option value="">Select State</option>
              <option value="AP">Andhra Pradesh</option>
              <option value="AN">Andaman and Nicobar Islands</option>
	            <option value="AR">Arunachal Pradesh</option>
	            <option value="AS">Assam</option>
	            <option value="BR">Bihar</option>
	            <option value="CH">Chandigarh</option>
	            <option value="CT">Chhattisgarh</option>
              <option value="DN">Dadra and Nagar Haveli</option>
	            <option value="DD">Daman and Diu</option>
	            <option value="LD">Lakshadweep</option>
	            <option value="DL">Delhi</option>
	            <option value="GA">Gujarat</option>
	            <option value="HR">Haryana</option>
	            <option value="HP">Himachal Pradesh</option>
	            <option value="JK">Jammu and Kashmir</option>
	            <option value="GA">Goa</option>
	            <option value="JH">Jharkhand</option>
	            <option value="KA">Karnataka</option>
	            <option value="KL">Kerala</option>
	            <option value="PY">Puducherry</option>
	            <option value="MP">Madhya Pradesh</option>
	            <option value="MH">Maharashtra</option>
              <option value="MN">Manipur</option>
              <option value="ML">Meghalaya</option>
	            <option value="MZ">Mizoram</option>
	            <option value="NL">Nagaland</option>
	            <option value="OR">Odisha</option>
	            <option value="PB">Punjab</option>
	            <option value="RJ">Rajasthan</option>
	            <option value="SK">Sikkim</option>
	            <option value="TN">Tamil Nadu</option>
	            <option value="TG">Telangana</option>
	            <option value="TR">Tripura</option>
	            <option value="UT">Uttarakhand</option>
	            <option value="UP">Uttar Pradesh</option>
	            <option value="WB">West Bengal</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Role</strong></label>
            <div>
              <input
                type="radio"
                id="advocate"
                name="role"
                value="Advocate"
                checked={role === 'Advocate'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="advocate" className="me-3">Advocate</label>
              <input
                type="radio"
                id="litigant"
                name="role"
                value="Litigant"
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="litigant" className="me-3">Litigant</label>
              <input
                type="radio"
                id="govt_pleader"
                name="role"
                value="Govt. Pleader"
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="govt_pleader" className="me-3">Govt. Pleader</label>
              <input
                type="radio"
                id="clerk"
                name="role"
                value="Clerk"
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="clerk" className="me-3">Clerk</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label"><strong>Email or Phone Number</strong></label>
            <input
              type="text"
              id="username"
              placeholder="Enter Email or Phone Number"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="captcha" className="form-label"><strong>Captcha</strong></label>
            <div className="d-flex">
              <input
                type="text"
                id="captcha"
                placeholder="Enter Captcha"
                className="form-control me-2"
                style={{ width: '60%' }}
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                required
              />
              <div className="bg-light border d-flex align-items-center justify-content-center" style={{ width: '40%' }}>
                {generatedCaptcha}
              </div>
              <button type="button" className="btn btn-link ms-2" onClick={generateCaptcha}>Refresh</button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3">New User? <a href="/api/register">Register here</a></p>
      </div>
    </div>
  );
}

export default Login;
