import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import "../styles/login.css";
import { login } from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserTie, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueKey, setUniqueKey] = useState(""); 
  const [role, setRole] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleCreateAccount = () => {
     toast.success("SYou're Going to Signup !!!", { position: "top-right", autoClose: 3000 });
    setTimeout(() => navigate("/signup"), 2000);
  };

  const handleForgotPassword = () => {
    navigate("/change-password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!email || !password || (role === "admin" && !uniqueKey)) {
      toast.error("Please fill all required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const payload = { email, password, role, uniqueKey };
      const response = await login(payload);

      if (response.token) {
        localStorage.setItem("authToken", response.token);
        setIsLoggedIn(true);

        if (role === "admin" && uniqueKey === "Admin47") {
          navigate('/admin-dashboard');
          toast.success("Successfully logged as admin!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          navigate('/user-dashboard');
          toast.success("Successfully logged as user!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Incorrect Password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="radios" style={{ marginBottom: "15px" }}>
          <button
            type="button"
            name="role"
            value="user"
            onClick={() => setRole("user")}
            style={{ display: "flex", alignItems: "center", marginRight: "15px" }}
          >
            <FontAwesomeIcon className="icons" icon={faUser} size="2x" />
            <span style={{ marginLeft: "8px", paddingTop: "3px" }}>User</span>
          </button>

          <button
            type="button"
            name="role"
            value="admin"
            onClick={() => setRole("admin")}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FontAwesomeIcon  className="icons"  icon={faUserTie} size="2x" />
            <span style={{ marginLeft: "8px" , paddingTop: "3px"}}>Admin</span>
          </button>
        </div>

        {role === "admin" && (
          <>
            <p>Unique Key</p>
            <input
              type="text"
              placeholder="Enter Unique Key"
              value={uniqueKey}
              onChange={(e) => setUniqueKey(e.target.value)}
              required
            />
          </>
        )}

        <p>Email</p>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <p>Password</p>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
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

        <button className="login-btn" type="submit">
          Login
        </button>

        {/* Forgot Password */}
        <p type="button" onClick={handleForgotPassword} className="forgot-btn">
          Forgot Password?
        </p>

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

export default LoginForm;
