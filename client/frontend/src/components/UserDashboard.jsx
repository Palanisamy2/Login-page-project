import React from 'react';
import '../styles/styles.css';
import '../styles/userDashBoard.css';

const UserDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome, User!</h1>
      <p>Here you can view your reports.</p>
      {/* Add additional admin features here */}
    </div>
  );
};

export default UserDashboard;
