import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [state, setState] = useState('');
  const [role, setRole] = useState('Advocate');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/login', {username, password });
      console.log(response.data);
  
      if (response.data.message === "Login successful") {
        alert("Login successful");
        navigate('/home');
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
      <div className="p-4 rounded" style={{ backgroundColor: '#ffffff', width: '400px' }}>
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
            >
              <option value="">Select State</option>
              <option value="State1">State 1</option>
              <option value="State2">State 2</option>
              {/* Add more states as needed */}
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
              />
              <div className="bg-light border d-flex align-items-center justify-content-center" style={{ width: '40%' }}>
                kt2a86
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3">New User? <a href="/register">Register here</a></p>
        <p><a href="/forgot-password">Forgot Password</a></p>
      </div>
    </div>
  );
}

export default Login;
