import axios from "axios";

// 1. Очищаем baseURL от лишних слэшей
const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// 2. Улучшенный интерцептор: добавляет обход ngrok в ЛЮБОЙ запрос
axiosInstance.interceptors.request.use(
  (config) => {
    // Если baseURL не задан в конфиге, берем его из переменной
    if (!config.baseURL) config.baseURL = baseURL;

    // Проверяем, есть ли уже параметры в URL
    const url = config.url || "";
    const hasParams = url.includes("?");
    const skipParam = "ngrok-skip-browser-warning=1";

    // Добавляем параметр только если его еще нет
    if (!url.includes("ngrok-skip-browser-warning")) {
      config.url = `${url}${hasParams ? "&" : "?"}${skipParam}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Если вместо JSON пришел HTML (признак того, что ngrok все же перехватил запрос)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
       console.error("Ngrok blocked the request. Returning HTML instead of JSON.");
       return Promise.reject(new Error("NGROK_BLOCKED_JSON"));
    }
    return response;
  },
  (error) => {
    console.error("DEBUG API ERROR:", error.message);
    return Promise.reject(error);
  }
);

// Важно: fetcher должен использовать axiosInstance
export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;