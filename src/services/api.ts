import axios from "axios";

export const api = axios.create({
  baseURL: "https://abrigapp.onrender.com/api",
  timeout: 10000,
});

// Interceptador para log de erro global
api.interceptors.response.use(
  response => response,
  error => {
    console.error("Erro de API:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);
