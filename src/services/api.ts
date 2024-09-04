import axiosInstance from "@/utils/axios";

const api = {
  get: <T>(url: string, config = {}) => axiosInstance.get<T>(url, config),
  post: <T>(url: string, data = {}, config = {}) =>
    axiosInstance.post<T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) =>
    axiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config = {}) => axiosInstance.delete<T>(url, config),
};

export default api;
