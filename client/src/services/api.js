import axios from "axios";
import TokenService from "../services/token.service"; // Make sure the import is correct
const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken(); // Corrected case here
    if (token) {
      config.headers["x-access-token"] = token; // Add token to header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
