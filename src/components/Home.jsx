import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../store/bookActions';
import './Home.css';

class Home extends Component {
  componentDidMount() {
    // Fetch books through Redux Thunk if the list hasn't been loaded yet
    if (this.props.books.length === 0) {
      this.props.fetchBooks();
    }
  }

  render() {
    const { books, loading, onViewChange } = this.props;
    const totalAuthors = books.reduce((acc, book) => acc + book.authors.length, 0);

    if (loading) {
      return <div className="form-container"><p>Syncing Library Database...</p></div>;
    }

    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Book Store</h1>
          <nav className="nav-links">
            <button className="nav-link active">Dashboard</button>
            <button className="nav-link" onClick={() => onViewChange('authors')}>Authors Index</button>
            <button className="nav-link btn-accent" onClick={() => onViewChange('add')}>
              + Add New Book
            </button>
          </nav>
        </header>

        <section className="hero-section">
          <h2>Welcome to Book Store App Dashboard. A Redux Managed Book Catalog Dashboard</h2>
          <p>Easily save books, map collaborative authors, and manage cross-functional literary genres.</p>
          <div className="hero-actions">
            <button className="primary-action-btn" onClick={() => onViewChange('add')}>
              Get Started: Add a Book
            </button>
          </div>
        </section>

        <section className="analytics-grid">
          <div className="metric-card">
            <h3>Total Saved Books</h3>
            <p className="metric-value">{books.length}</p>
          </div>
          <div className="metric-card">
            <h3>Registered Authors</h3>
            <p className="metric-value">{totalAuthors}</p>
          </div>
        </section>

        <section className="catalog-section">
          <div className="catalog-header">
            <h2>Recent Submissions</h2>
          </div>

          <div className="catalog-grid">
            {books.map((book) => (
              <article key={book.id} className="book-display-card">
                <div className="book-card-main">
                  <span className="genre-badge">{book.genre}</span>
                  <h3 className="book-card-title">{book.title}</h3>
                  <p className="publish-date">Published: {new Date(book.publishDate).toLocaleDateString()}</p>
                </div>
                
                <div className="book-card-footer">
                  <h4>{book.authors.length > 1 ? 'Collaborators' : 'Author'}</h4>
                  <ul className="author-list">
                    {book.authors.map((author, idx) => (
                      <li key={idx} className="author-list-item">
                        <span className="author-name">{author.firstName} {author.lastName}</span>
                        <span className="author-email">{author.email}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.catalog.books,
  loading: state.catalog.loading
});

const mapDispatchToProps = { fetchBooks };

export default connect(mapStateToProps, mapDispatchToProps)(Home);