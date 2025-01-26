import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import logos from '../image/Data-Paths.png';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo"><img className='company-logo' src={logos} /></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && <li className="navsign"><Link to="/login">Login</Link></li>}
        {!isLoggedIn && <li  ><Link to="/signup">Signup</Link></li>}
        {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
        <li className="dropdown">
          <span>About Us</span>
          <ul className="dropdown-menu">
            <li><Link to="/about">Our Mission</Link></li>
            <li><Link to="/team">Team</Link></li>
          </ul>
        </li>
        <li className="dropdown">
          <span>Services</span>
          <ul className="dropdown-menu">
            <li><Link to="/services/web">Web Development</Link></li>
            <li><Link to="/services/mobile">Mobile Development</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
