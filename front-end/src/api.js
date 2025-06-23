// src/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // ✅ Removed /api since your endpoints start from root
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // allows sending cookies/session
});

// Optional: add request/response interceptors for logging or auth token
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default instance;
