import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuthors } from '../store/bookActions';
import './Home.css';

class AuthorsList extends Component {
  componentDidMount() {
    this.props.fetchAuthors();
  }

  render() {
    const { authors, loading, onViewChange } = this.props;

    if (loading) {
      return <div className="form-container"><p>Syncing Registry Directories...</p></div>;
    }

    return (
      <div className="dashboard-container">
        {/* Synchronized Header Shell */}
        <header className="dashboard-header">
          <h1>Book Store</h1>
          <nav className="nav-links">
            <button className="nav-link" onClick={() => onViewChange('home')}>Dashboard</button>
            <button className="nav-link active">Authors Index</button>
            <button className="nav-link btn-accent" onClick={() => onViewChange('add')}>
              + Add New Book
            </button>
          </nav>
        </header>

        {/* Directory Intro Layout */}
        <section className="catalog-section">
          <div className="catalog-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Registered Authors</h2>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                Comprehensive list of all contributing network publishers.
              </p>
            </div>
            <div className="metric-card" style={{ padding: '0.75rem 1.5rem', margin: 0 }}>
              <h3 style={{ fontSize: '0.75rem' }}>Total Profiles</h3>
              <p className="metric-value" style={{ fontSize: '1.5rem' }}>{authors.length}</p>
            </div>
          </div>

          {/* Grid Layout Cards */}
          <div className="catalog-grid">
            {authors.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No author listings discovered on the network server.</p>
            ) : (
              authors.map((author, index) => (
                <article key={author.id || index} className="book-display-card" style={{ minHeight: 'auto' }}>
                  <div className="book-card-main" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        background: 'rgba(79, 70, 229, 0.1)',
                        color: 'var(--primary-color)',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '1.1rem'
                      }}>
                        {author.firstName?.[0]}{author.lastName?.[0]}
                      </div>
                      <div>
                        <h3 className="book-card-title" style={{ margin: 0, fontSize: '1.1rem' }}>
                          {author.firstName} {author.lastName}
                        </h3>
                        <p className="publish-date" style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>
                          Contributor Identity #{index + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="book-card-footer" style={{ padding: '1rem 1.25rem' }}>
                    <h4>Contact Point</h4>
                    <span className="author-name" style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>
                      {author.email}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authors: state.catalog.authors,
  loading: state.catalog.loading
});

const mapDispatchToProps = { fetchAuthors };

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsList);