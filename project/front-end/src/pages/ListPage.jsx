// src/pages/ListPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listApplications } from '../api';

const ListPage = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    listApplications()
      .then(data => setApplications(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="error-state">
        <p className="error-message">Error loading applications: {error}</p>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="empty-state">
        <p>No applications found.</p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="applications-heading"
      className="applications-list"
    >
      <h1 id="applications-heading" className="visually-hidden">
        Applications
      </h1>
      <ul className="list">
        {applications.map(({ applicationId, status }) => (
          <li key={applicationId} className="list-item">
            <Link to={`/applications/${applicationId}`} className="list-link">
              <span className="list-link-id">{applicationId}</span>
              <span
                className={`status status--${status.toLowerCase()}`}
              >
                {status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ListPage;
