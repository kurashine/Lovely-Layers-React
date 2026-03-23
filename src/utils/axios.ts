import axios from "axios";

// 1. Очищаем baseURL от лишних слэшей в конце, чтобы не было //api/home
const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    // 2. Используем строковое значение "true". 
    // Некоторые прокси-серверы капризны к числам в заголовках.
    "ngrok-skip-browser-warning": "true", 
  },
});

// 3. Добавляем интерцептор для логирования (поможет увидеть ошибку в консоли Vercel)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Details:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;