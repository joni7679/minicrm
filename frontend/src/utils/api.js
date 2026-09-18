import axios from "axios";

// FIX (prod): VITE_BACKEND_URL is baked at build time. Normalize it
// (trim trailing slash) so both `.../api` and `.../api/` work, and fall
// back to same-origin `/api` with a console warning instead of crashing
// to `undefined/auth/...` when the env var is missing in production.
const rawBase = import.meta.env.VITE_BACKEND_URL;
export const backendApi = (rawBase || "/api").replace(/\/$/, "");

if (!rawBase) {
  console.warn(
    "[api] VITE_BACKEND_URL is missing. Falling back to '/api'. " +
      "Set VITE_BACKEND_URL in Vercel to your deployed backend, e.g. https://your-api.onrender.com/api"
  );
}

const api = axios.create({
  baseURL: backendApi,
  withCredentials: true,
});

// Bearer fallback for hosts that block third-party cookies.
// Backend accepts `Authorization: Bearer <token>` in auth.middleware.js.
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("crm_token");
    if (token && !config.headers?.Authorization) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // localStorage may be unavailable (SSR/private mode) — ignore
  }
  return config;
});

export const saveToken = (token) => {
  try {
    if (token) localStorage.setItem("crm_token", token);
  } catch {
    // ignore
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem("crm_token");
  } catch {
    // ignore
  }
};

export default api;
