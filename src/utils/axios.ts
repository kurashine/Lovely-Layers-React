import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    // ДОБАВЛЯЕМ ЭТО: обман Ngrok через User-Agent (если браузер позволит)
    // И принудительный заголовок skip
    "ngrok-skip-browser-warning": "69420" 
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Добавляем параметр в URL (двойная защита)
    const url = config.url || "";
    const separator = url.includes("?") ? "&" : "?";
    config.url = `${url}${separator}ngrok-skip-browser-warning=true`;
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Проверка на HTML вместо JSON
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
       return Promise.reject(new Error("NGROK_STILL_BLOCKING"));
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;