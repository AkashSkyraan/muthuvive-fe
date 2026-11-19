import axios from "axios";
import { loaderManager } from "../utils/loaderManager.js"; // path unga folder structure padi maathikonga

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DEV_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.skipLoader) loaderManager.start();
    return config;
  },
  (error) => {
    // request set aagum podhe fail aana, start() call aagala, so end() thevai illa
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.config.skipLoader) loaderManager.end();
    return response;
  },
  (error) => {
    if (!error.config?.skipLoader) loaderManager.end();
    return Promise.reject(error);
  },
);

export default axiosInstance;
