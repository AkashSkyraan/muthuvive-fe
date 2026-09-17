import axios from "axios";

export default axiosInstance({
  baseURL: import.meta.env.VITE_DEV_API_BASE_URL,
});
