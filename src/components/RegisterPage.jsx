import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError, resetSuccess } from '../store/authSlice';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [validationError, setValidationError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    
    if (success) {
      dispatch(resetSuccess());
      navigate('/login');
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    dispatch(registerUser({ 
      name: formData.name, 
      email: formData.email, 
      password: formData.password 
    }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create an Account</h2>
      
      {(validationError || error) && (
        <div style={{ color: 'red', marginBottom: '15px' }}>{validationError || error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};