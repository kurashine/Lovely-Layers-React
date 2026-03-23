import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    // ЭТОТ ЗАГОЛОВОК УБИРАЕТ СТРАНИЦУ С ПАРОЛЕМ LOCALTUNNEL
    "bypass-tunnel-reminder": "true"
  },
});

// На всякий случай дублируем заголовок в интерцепторе
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers["bypass-tunnel-reminder"] = "true";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;