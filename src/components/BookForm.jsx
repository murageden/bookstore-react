import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      genre: 'UNKNOWN',
      publishDate: '',
      authors: [{ firstName: '', lastName: '', email: '' }]
    };

    this.handleBookChange = this.handleBookChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.addAuthor = this.addAuthor.bind(this);
    this.removeAuthor = this.removeAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBookChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleAuthorChange(index, e) {
    const { name, value } = e.target;
    const updatedAuthors = [...this.state.authors];
    updatedAuthors[index][name] = value;
    this.setState({ authors: updatedAuthors });
  }

  addAuthor() {
    this.setState((prevState) => ({
      authors: [...prevState.authors, { firstName: '', lastName: '', email: '' }]
    }));
  }

  removeAuthor(index) {
    if (this.state.authors.length === 1) return;
    const updatedAuthors = this.state.authors.filter((_, i) => i !== index);
    this.setState({ authors: updatedAuthors });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Dispatch the payload through Thunk, redirecting to home upon completion
    this.props.addBook(this.state, () => {
      this.props.onViewChange('home');
    });
  }

  render() {
    const { title, genre, publishDate, authors } = this.state;
    const { isSaving } = this.props;

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit} className="custom-form">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" className="remove-btn" onClick={() => this.props.onViewChange('home')}>
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
                value={title}
                onChange={this.handleBookChange}
                required
              />
            </div>

            <div className="form-row">
              {/* Controlled Dropdown Select Field for Genre */}
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={genre}
                  onChange={this.handleBookChange}
                  className="form-group-select" // Added for explicit styling targeting if needed
                  required
                >
                  {GENRE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')} {/* Displays 'NON_FICTION' as 'NON FICTION' */}
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
                  value={publishDate}
                  onChange={this.handleBookChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>Author(s) Information</legend>
            {authors.map((author, index) => (
              <div key={index} className="author-card">
                <div className="author-header">
                  <h3>Author #{index + 1}</h3>
                  {authors.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => this.removeAuthor(index)}>
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
                      onChange={(e) => this.handleAuthorChange(index, e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={author.lastName}
                      onChange={(e) => this.handleAuthorChange(index, e)}
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
                    onChange={(e) => this.handleAuthorChange(index, e)}
                    required
                  />
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={this.addAuthor}>
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
}

const mapStateToProps = (state) => ({
  isSaving: state.catalog.loading
});

const mapDispatchToProps = { addBook };

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);