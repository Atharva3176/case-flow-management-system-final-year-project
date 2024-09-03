import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; // Ensure you create this CSS file for custom styling

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>eFiling Services</h1>
        <div className="header-right">
          <select name="state" className="form-select">
            <option value="Maharashtra">Maharashtra</option>
            {/* Add more states as needed */}
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
        <div className="nav-item">
          <i className="fas fa-file-alt"></i>
          <span>Case Filing</span>
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
  );
};

export default Dashboard;
