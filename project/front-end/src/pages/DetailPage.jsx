// src/components/DetailPage.jsx
import React, { useEffect, useState } from 'react';
import { deleteApplication, getApplication } from '../api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './DetailPage.css';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp]     = useState(null);
  const [error, setError] = useState(null);

  const onDelete = async () => {
    if (!window.confirm('Really delete this application?')) return;
    try {
      await deleteApplication(id);
      navigate('/applications');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getApplication(id)
      .then(setApp)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p className="status-message error">Error: {error}</p>;
  if (!app)   return <p className="status-message loading">Loading…</p>;

  return (
    <div className="detail-page-wrapper">
      <div className="detail-page-container">
        <hr className="section-divider" />

        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
        >
          Delete
        </button>

        <h2>Application {app.applicationId}</h2>

        <dl>
          <dt>User ID</dt><dd>{app.userId}</dd>
          <dt>Amount</dt><dd>{app.amount}</dd>
          <dt>Term</dt><dd>{app.term} months</dd>
          <dt>Status</dt><dd>{app.status}</dd>
        </dl>

        <Link to="/applications" className="back-link">
          ← Back to list
        </Link>
      </div>
    </div>
  );
}
