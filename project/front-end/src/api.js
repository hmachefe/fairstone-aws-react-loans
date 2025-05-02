
const BASE_URL = import.meta.env.VITE_API_BASE;

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data;
  if (contentType?.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const error = new Error(data?.message || data || `Error ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}

export const deleteApplication = async (id) =>
  handleResponse(
    await fetch(`${BASE_URL}/applications/${id}`, { method: 'DELETE' })
  );

export const createApplication = async (payload) =>
  handleResponse(
    await fetch(`${BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );

export const listApplications = async () =>
  handleResponse(await fetch(`${BASE_URL}/applications`));

export const getApplication = async (id) =>
  handleResponse(await fetch(`${BASE_URL}/applications/${id}`));
