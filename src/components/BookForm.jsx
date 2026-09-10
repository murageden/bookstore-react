import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate hook
import { addBook } from '../store/bookActions';
import './BookForm.css';

const GENRE_OPTIONS = [
  "FICTION",
  "BIOGRAPHY",
  "FANTASY",
  "SCIENCE",
  "ROMANCE",
  "NON_FICTION",
  "MYSTERY",
  "UNKNOWN"
];

export default function BookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2. Initialize useNavigate instance

  // 3. Extract saving state directly using hooks matching store setup
  const isSaving = useSelector((state) => state.catalog.loading);

  // 4. Group your form state into a unified hook structure
  const [formData, setFormData] = useState({
    title: '',
    genre: 'UNKNOWN',
    publishDate: '',
    authors: [{ firstName: '', lastName: '', email: '' }]
  });

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuthorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = {
      ...updatedAuthors[index],
      [name]: value
    };
    setFormData((prev) => ({
      ...prev,
      authors: updatedAuthors
    }));
  };

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [...prev.authors, { firstName: '', lastName: '', email: '' }]
    }));
  };

  const removeAuthor = (index) => {
    if (formData.authors.length === 1) return;
    const updatedAuthors = formData.authors.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      authors: updatedAuthors
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 5. FIXED: Dispatch via Thunk and navigate back to "/" route upon success
    dispatch(addBook(formData, () => {
      navigate('/');
    }));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="custom-form">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* 6. FIXED: Replaced legacy property execution with browser redirect */}
          <button type="button" className="remove-btn" onClick={() => navigate('/')}>
            &larr; Back to Dashboard
          </button>
          <h2>Register New Book</h2>
          <div style={{ width: '60px' }}></div>
        </div>
        
        <fieldset className="form-section">
          <legend>Book Information</legend>
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleBookChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleBookChange}
                className="form-group-select"
                required
              >
                {GENRE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="publishDate">Publish Date</label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleBookChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Author(s) Information</legend>
          {formData.authors.map((author, index) => (
            <div key={index} className="author-card">
              <div className="author-header">
                <h3>Author #{index + 1}</h3>
                {formData.authors.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeAuthor(index)}>
                    Remove
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={author.firstName}
                    onChange={(e) => handleAuthorChange(index, e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={author.lastName}
                    onChange={(e) => handleAuthorChange(index, e)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={author.email}
                  onChange={(e) => handleAuthorChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}

          <button type="button" className="add-btn" onClick={addAuthor}>
            + Add Another Author
          </button>
        </fieldset>

        <button type="submit" className="submit-btn" disabled={isSaving}>
          {isSaving ? 'Saving Record...' : 'Save Book Entry'}
        </button>
      </form>
    </div>
  );
}