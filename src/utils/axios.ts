import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  // ВАЖНО: Мы удаляем ВООБЩЕ ВСЕ заголовки, кроме стандартных.
  // Это предотвратит отправку OPTIONS запроса браузером.
  headers: {
    "Accept": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const separator = url.includes("?") ? "&" : "?";
    // Параметр в URL — это единственный способ обойти проверку ngrok без CORS-ошибки
    config.url = `${url}${separator}ngrok-skip-browser-warning=1`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;