import { useEffect, useState } from "react";
import { listApplications } from "../api";
import { Link } from "react-router-dom";

export default function ListPage() {
  const [apps, setApps]   = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    listApplications()
      .then(setApps)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!apps.length) return <p>No applications yet.</p>;

  return (
    <ul style={{ padding: "1rem" }}>
      {apps.map(a => (
        <li key={a.applicationId}>
          <Link to={`/applications/${a.applicationId}`}>
            {a.applicationId} – {a.status}
          </Link>
        </li>
      ))}
    </ul>
  );
}
