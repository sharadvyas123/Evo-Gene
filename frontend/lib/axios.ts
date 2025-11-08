import axios from "axios";

// 🧠 Base setup for Django API (change baseURL when backend gives you actual URL)
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Django's default API root
  withCredentials: true, // allows sending cookies if Django uses them
});

// ✅ Automatically include JWT if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;