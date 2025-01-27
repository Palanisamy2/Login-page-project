import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import "../styles/signup.css";
import { signup } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.trim() === confirmPassword.trim()) {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.",{ position: "top-right", autoClose: 3000 });
        return;
      }
      try {
        setLoading(true);
        await signup({ username, email, password });
        toast.success("Signup successful! Please log in.", { position: "top-right", autoClose: 3000 });
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message , { position: "top-right", autoClose: 3000 });
        } else {
          console.error("Error during signup:", error.response || error.message);
          toast.error("Signup failed. Try again later.", { position: "top-right", autoClose: 3000 });
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Confirm Password does not match", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleAlreadyLogin = () => {
    navigate("/login");
  };

  return (
    <div className="pages">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h1>Signup</h1>
          <p>User Name</p>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <p>User Email</p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p>Password</p>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <p>Confirm Password</p>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="Already-login">
          <p>or</p>
          <h5 onClick={handleAlreadyLogin} style={{ cursor: "pointer" }}>
            Already have an account
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
