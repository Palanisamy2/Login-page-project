import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import '../styles/forget.css';
import { changePassword } from '../services/authService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !oldPassword || !password) {
      toast.error("All fields are required.", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      const response = await changePassword({ email, oldPassword, password });
      console.log('Data received from API call: ', response);

      toast.success("Password updated successfully!", { position: "top-right", autoClose: 3000 });

      // Navigate to login page after successful password change
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      toast.error("Failed to update password. Try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleAlreadyLogin = () => {
    console.log("Navigating to login page...");
    navigate("/login");
  };

  return (
    <div className="form-container">
      <form className="change-password-form" onSubmit={handlePasswordChange}>
        <h2>Forget Password</h2>
        
        <p>Email</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <p>Old Password</p>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={{ width: "100%", paddingRight: "40px" }}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />
        </div>

        <p>New Password</p>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", paddingRight: "40px" }}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />
        </div>
        <br />
        <button type="submit">Change Password</button>
        
        {/* Create Account */}
        <div className="Already-login">
          <p>or</p>
          <h5 type="button" onClick={handleCreateAccount}>
            Create an account
          </h5>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
