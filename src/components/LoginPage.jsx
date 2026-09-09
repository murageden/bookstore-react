import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearError } from '../store/authSlice';

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());

    if (token) {
      navigate('/dashboard');
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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Sign In</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Email Address</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLoading ? 'Signing In...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't have an account yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};