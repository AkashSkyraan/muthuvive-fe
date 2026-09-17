import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstance;
=======
  baseURL: import.meta.env.VITE_DEV_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
>>>>>>> cf0066869a199779f6178c8e14faef49decdb297
