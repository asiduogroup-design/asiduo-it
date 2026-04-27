const normalizeBaseUrl = (value) => (value ? value.replace(/\/+$/, "") : "");

const PRODUCTION_FALLBACK_API_BASE_URL = "https://asiduo-solutions.onrender.com";

const API_BASE_URL = normalizeBaseUrl(
  process.env.REACT_APP_API_BASE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : PRODUCTION_FALLBACK_API_BASE_URL)
);

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
