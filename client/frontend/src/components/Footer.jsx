import React from 'react';
// import './Footer.css';  // Import custom CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Datapath Login Page. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a> | 
          <a href="/contact">Contact</a> | 
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
