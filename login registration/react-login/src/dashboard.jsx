import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import './dashboard.css'; // Ensure you create this CSS file for custom styling

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Navbar/>
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>eFiling Services</h1>
        <div className="header-right">
          <select name="state" className="form-selec">
            <option value="AP">Andhra Pradesh</option>
	          <option value="AR">Arunachal Pradesh</option>
	          <option value="AS">Assam</option>
	          <option value="BR">Bihar</option>
	          <option value="CT">Chhattisgarh</option>
	          <option value="GA">Gujarat</option>
	          <option value="HR">Haryana</option>
	          <option value="HP">Himachal Pradesh</option>
	          <option value="JK">Jammu and Kashmir</option>
	          <option value="GA">Goa</option>
	          <option value="JH">Jharkhand</option>
	          <option value="KA">Karnataka</option>
	          <option value="KL">Kerala</option>
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
	          <option value="AN">Andaman and Nicobar Islands</option>
	          <option value="CH">Chandigarh</option>
	          <option value="DN">Dadra and Nagar Haveli</option>
	          <option value="DD">Daman and Diu</option>
	          <option value="DL">Delhi</option>
	          <option value="LD">Lakshadweep</option>
	          <option value="PY">Puducherry</option>                     
          </select>
          <button className="btn-language">मराठी</button>
          <div className="user-info">KULKARNI...</div>
        </div>
      </header>

      <nav className="header-nav">
        <div className="nav-item">
          <i className="fas fa-users"></i>
          <span>My Partners</span>
        </div>
        <div className="nav-item" onClick={toggleDropdown}>
          <i className="fas fa-folder-open"></i>
          <span>Case Filing</span>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/case-filing">New Case Filing</Link>
              <Link to="#">Manage Favourite Clients</Link>
            </div>
          )}
        </div>
        <div className="nav-item">
          <i className="fas fa-file-signature"></i>
          <span>Vakalat</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-pen-fancy"></i>
          <span>Pleadings</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-rupee-sign"></i>
          <span>ePayments</span>
        </div>
        <div className="nav-item" onClick={toggleDropdown}>
          <i className="fas fa-folder-open"></i>
          <span>Applications</span>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="#">Interlocutory Application Filing</Link>
              <Link to="#">Submitted Applications</Link>
            </div>
          )}
        </div>
        <div className="nav-item">
          <i className="fas fa-briefcase"></i>
          <span>Portfolio</span>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-box">
            <div className="stat-number">0</div>
            <div className="stat-label">Draft Pleadings</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">115</div>
            <div className="stat-label">Completed Pleadings</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">19</div>
            <div className="stat-label">Draft IAs</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">123</div>
            <div className="stat-label">Completed IAs</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">11</div>
            <div className="stat-label">Objections</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">200</div>
            <div className="stat-label">My Cases</div>
          </div>
        </div>

        <div className="dashboard-calendar">
          <h4>Calendar</h4>
          <div className="calendar-container">
            <input type="month" className="form-control" />
            <div className="calendar">
              {/* Implement the calendar or use a third-party calendar library */}
            </div>
          </div>
        </div>

        <div className="dashboard-cases">
          <h4>Cases Listed Today - 03-07-2024</h4>
          <table className="cases-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Cases</th>
                <th>Party Name</th>
                <th>My Clients</th>
                <th>View Document</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><Link to="#">R.C.S./206/2016</Link></td>
                <td>Shakuntalabai Dhanraj Suste</td>
                <td> - </td>
                <td><Link to="#">View</Link></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
