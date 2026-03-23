import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;