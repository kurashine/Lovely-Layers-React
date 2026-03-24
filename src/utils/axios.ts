import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    // Добавляем этот заголовок для обхода заглушки туннеля
    "X-Pinggy-No-Screen": "true", 
    "ngrok-skip-browser-warning": "true", // На случай если перейдешь на ngrok
    "User-Agent": "PostmanRuntime/7.26.8"
  },
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
