import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "ngrok-skip-browser-warning": "69420", // Этот заголовок отключает страницу-предупреждение
  },
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
