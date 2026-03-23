import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  // ВАЖНО: Убираем ngrok-skip-browser-warning отсюда!
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Вместо заголовка мы добавим параметр в URL к каждому запросу
// Ngrok понимает параметр ?ngrok-skip-browser-warning=1 так же как и заголовок,
// но это не вызывает CORS-проверку OPTIONS!
axiosInstance.interceptors.request.use(
  (config) => {
    const separator = config.url?.includes("?") ? "&" : "?";
    config.url = `${config.url}${separator}ngrok-skip-browser-warning=1`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("DEBUG API:", error.message);
    return Promise.reject(error);
  }
);

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;