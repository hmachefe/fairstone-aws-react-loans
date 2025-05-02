// src/components/DetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getApplication, deleteApplication } from '../api';
import './DetailPage.css';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getApplication(id)
      .then(data => setApplication(data))
      .catch(err => setErrorMessage(err.message));
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Really delete this application?');
    if (!confirmed) return;

    try {
      await deleteApplication(id);
      navigate('/applications');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (errorMessage) {
    return (
      <p className="status-message error">
        Error: {errorMessage}
      </p>
    );
  }

  if (!application) {
    return (
      <p className="status-message loading">
        Loading…
      </p>
    );
  }

  const { applicationId, userId, amount, term, status } = application;

  return (
    <div className="detail-page-wrapper">
      <div className="detail-page-container">
        <hr className="section-divider" />

        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>

        <h2>Application {applicationId}</h2>

        <dl>
          <dt>User ID</dt>
          <dd>{userId}</dd>

          <dt>Amount</dt>
          <dd>{amount}</dd>

          <dt>Term</dt>
          <dd>{term} months</dd>

          <dt>Status</dt>
          <dd>{status}</dd>
        </dl>

        <Link to="/applications" className="back-link">
          ← Back to list
        </Link>
      </div>
    </div>
  );
}
