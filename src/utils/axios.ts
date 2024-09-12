import { routes } from "@/config/routes";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL = `${
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
}/api`;
const TIMEOUT = 10000;
const TOKEN_KEY = "token";

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (typeof window !== "undefined" && error.response?.status === 401) {
        if (window.location.pathname !== routes.home) {
          localStorage.removeItem(TOKEN_KEY);
          window.location.href = routes.home;
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
