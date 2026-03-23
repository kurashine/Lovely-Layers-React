import axios from "axios";

// 1. Очищаем baseURL от лишних слэшей в конце
const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  // Устанавливаем базовые заголовки
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// 2. Добавляем интерцептор запроса (гарантируем наличие заголовка в каждом вызове)
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers["ngrok-skip-browser-warning"] = "true";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Добавляем интерцептор ответа для детальной отладки
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если это ошибка CORS, в консоли будет видно подробности
    console.error("API Error Details:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Универсальный фетчер для SWR или ручных вызовов
export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;