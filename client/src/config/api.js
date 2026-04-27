const normalizeBaseUrl = (value) => (value ? value.replace(/\/+$/, "") : "");

const PRODUCTION_FALLBACK_API_BASE_URL = "https://asiduo-solutions.onrender.com";

const runtimeEnv = import.meta.env || {};
const isDevelopment = Boolean(runtimeEnv.DEV);

const API_BASE_URL = normalizeBaseUrl(
  runtimeEnv.VITE_API_BASE_URL ||
    (isDevelopment
      ? "http://localhost:5000"
      : PRODUCTION_FALLBACK_API_BASE_URL)
);

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
