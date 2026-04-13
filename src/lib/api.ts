import { API_URL } from './utils';

async function request(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  return { Authorization: `Bearer ${token}` };
}

// Services
export const getServices = () => request('/api/services');
export const getService = (id: string) => request(`/api/services/${id}`);
export const createService = (data: unknown) =>
  request('/api/services', { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) });
export const updateService = (id: string, data: unknown) =>
  request(`/api/services/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) });
export const deleteService = (id: string) =>
  request(`/api/services/${id}`, { method: 'DELETE', headers: authHeaders() });

// News
export const getNews = () => request('/api/news');
export const getNewsItem = (id: string) => request(`/api/news/${id}`);
export const deleteNews = (id: string) =>
  request(`/api/news/${id}`, { method: 'DELETE', headers: authHeaders() });

export const createNews = (data: FormData) =>
  fetch(`${API_URL}/api/news`, {
    method: 'POST',
    headers: authHeaders(),
    body: data,
  }).then(r => r.json());

export const updateNews = (id: string, data: FormData) =>
  fetch(`${API_URL}/api/news/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: data,
  }).then(r => r.json());

// Contact
export const submitContact = (data: unknown) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(data) });
export const getContacts = () =>
  request('/api/contact', { headers: authHeaders() });
export const deleteContact = (id: string) =>
  request(`/api/contact/${id}`, { method: 'DELETE', headers: authHeaders() });

// Auth
export const login = (data: { username: string; password: string }) =>
  request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
