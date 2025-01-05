import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css"; // Ensure your CSS file is properly linked
import axios from "axios"; // Axios for HTTP requests

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
    userType: "user", // Default to "user"
  });
  const [adminFormData, setAdminFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      phoneNumber: "",
      userType: "user", // Reset to default "user"
    });
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminFormData({ ...adminFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isSignup) {
        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
          setMessage("Passwords do not match!");
          return;
        }

        // Send registration request
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          phoneNumber: formData.phoneNumber,
          userType: formData.userType,
        });
        setMessage(res.data.message || "Registration successful!");
      } else {
        // Send login request
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // Handle login success
        setMessage(res.data.message || "Login successful!");
        localStorage.setItem("token", res.data.token); // Save JWT token

        // Check if the user is an admin
        if (res.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/album");
        }
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Send admin login request
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: adminFormData.email,
        password: adminFormData.password,
      });

      // Handle login success
      setMessage(res.data.message || "Login successful!");
      localStorage.setItem("token", res.data.token); // Save JWT token

      // Navigate to admin page
      navigate("/admin");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="message">{message && <p>{message}</p>}</div>
      {isSignup ? (
        <div className="signup-container">
          <div className="logo">
            <img src="/images/Spotify-logo.png" alt="Spotify Logo" />
          </div>
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address or Mobile number</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="userType">User Type</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn-signup">
              SIGN UP
            </button>
          </form>
          <div className="login">
            <p>
              Already have an account?{" "}
              <button onClick={toggleForm} className="link-button">
                Log in
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <div className="logo">
            <img src="/images/Spotify-logo.png" alt="Spotify Logo" />
          </div>
          <h2>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address or username or Mobile.no</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="options">
              <div>
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button onClick={() => alert('Forgot password functionality not implemented yet')} className="link-button">
                Forgot your password?
              </button>
            </div>
            <button type="submit" className="btn-login">
              LOG IN
            </button>
          </form>
          
          <div className="signup">
            <p>
              Don't have an account?{" "}
              <button onClick={toggleForm} className="link-button">
                Sign up for Spotify
              </button>
            </p>
          </div>

          <div className="admin-login">
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminSubmit}>
              <div className="input-group">
                <label htmlFor="adminEmail">Admin Email</label>
                <input
                  type="email"
                  id="adminEmail"
                  name="email"
                  value={adminFormData.email}
                  onChange={handleAdminChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="adminPassword">Admin Password</label>
                <input
                  type="password"
                  id="adminPassword"
                  name="password"
                  value={adminFormData.password}
                  onChange={handleAdminChange}
                  required
                />
              </div>
              <button type="submit" className="btn-login">
                Admin LOG IN
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;