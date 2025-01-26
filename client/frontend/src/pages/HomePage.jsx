import React from 'react';
import '../styles/styles.css';
import '../styles/home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to our Company Portal!</h1>
      <p>Explore our services, mission, and more.</p>
      <div className="home-content">
        <div className="card">
          <h3>Our Mission</h3>
          <p>Delivering the best services for our clients.</p>
        </div>
        <div className="card">
          <h3>Services</h3>
          <p>Web and Mobile Development, Consulting, and more.</p>
        </div>
        <div className="card">
          <h3>Contact Us</h3>
          <p>Email us at support@company.com</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
