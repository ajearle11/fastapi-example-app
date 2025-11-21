const BASE_URL = "http://localhost:8000";

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  if (res.status === 204) {
    return null as T;
  }

  return res.json();
}

export default apiFetch;
