import { AUTH_TOKEN_KEY } from "@/config";
import { routes } from "@/config/routes";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

export const BASE_URL = `${
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
}/api`;
const TIMEOUT = 100000;

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
      const token = getCookie(AUTH_TOKEN_KEY);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (typeof window !== "undefined" && error.response?.status === 401) {
        if (
          window.location.pathname !== routes.home &&
          window.location.pathname.includes("dashboard")
        ) {
          localStorage.removeItem(AUTH_TOKEN_KEY);
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
