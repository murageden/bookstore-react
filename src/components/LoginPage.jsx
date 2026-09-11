import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearError } from '../store/authSlice';
import './LoginPage.css';

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({ });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());

    if (token) {
      navigate('/home');
    }
  }, [token, dispatch, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign In</h2>
        <p className="login-subtitle">Welcome back! Please enter your details.</p>
        
        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              name="username" 
              placeholder="Enter your username"
              value={credentials.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Enter your password"
              value={credentials.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account yet? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};