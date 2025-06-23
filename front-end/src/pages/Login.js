import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      onLogin(true);
      navigate("/dashboard");
      setError('');
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isAdmin", "false");
    onLogin(false);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>HospiTrack Login</h1>

        {/* Admin Login Form */}
        <div className="admin-login">
          <h3>Admin Login</h3>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
              />
            </div>
            <button type="submit" className="login-button admin">
              Admin Login
            </button>
          </form>
        </div>

        {/* Guest Access */}
        <div className="guest-login">
          <h3>Guest Access</h3>
          <p>View dashboard </p>
          <button
            onClick={handleGuestLogin}
            className="login-button guest"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;