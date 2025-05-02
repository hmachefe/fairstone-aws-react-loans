const BASE = import.meta.env.VITE_API_BASE; 
// CRA: process.env.REACT_APP_API_BASE

export async function deleteApplication(id) {
  const res = await fetch(`${BASE}/applications/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    throw new Error(`Delete failed: ${res.status}`);
  }
}

export async function createApplication({ userId, amount, term }) {
  const res = await fetch(`${BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, amount, term })
  });
  return res.json();
}

export async function listApplications() {
  const res = await fetch(`${BASE}/applications`);
  return res.json();
}

export async function getApplication(id) {
  const res = await fetch(`${BASE}/applications/${id}`);
  if (res.status === 404) throw new Error("Not found");
  return res.json();
}
