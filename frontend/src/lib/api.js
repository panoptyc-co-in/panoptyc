export const API_BASE_URL = (process.env.REACT_APP_BACKEND_URL || "/_/backend").replace(/\/+$/, "");

export const apiUrl = (path = "") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
};

export const readJsonSafely = async (response) => {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { detail: text };
  }
};