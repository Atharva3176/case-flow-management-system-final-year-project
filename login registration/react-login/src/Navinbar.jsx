import React from 'react';
import { Link } from 'react-router-dom';
import './navinbar.css'; // Custom styles for this navinbar

const Navinbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <span className="brand-title">eFiling Services</span>
      </div>

      <ul className="navbar-menu">
        <li>
          <Link to="/my-partners">
            <i className="fas fa-users"></i> My Partners
          </Link>
        </li>
        <li className="dropdown">
          <Link to="/case-filing">
            <i className="fas fa-folder-open"></i> Case Filing
          </Link>
        </li>
        <li>
          <Link to="/vakalat">
            <i className="fas fa-file-signature"></i> Vakalat
          </Link>
        </li>
        <li>
          <Link to="/pleadings">
            <i className="fas fa-pen-fancy"></i> Pleadings
          </Link>
        </li>
        <li>
          <Link to="/epayments">
            <i className="fas fa-rupee-sign"></i> ePayments
          </Link>
        </li>
        <li className="dropdown">
          <Link to="/applications">
            <i className="fas fa-folder-open"></i> Applications
          </Link>
        </li>
        <li>
          <Link to="/portfolio">
            <i className="fas fa-briefcase"></i> Portfolio
          </Link>
        </li>
      </ul>

      <div className="navbar-right">
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
    </nav>
  );
};

export default Navinbar;
