import { routes } from "@/config/routes";
import axios from "axios";

const baseURL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to home page
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== routes.home
      ) {
        // clear the local storage "token"
        localStorage.removeItem("token");

        // redirect to home page
        window.location.href = routes.home;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
