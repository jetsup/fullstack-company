import axios from "axios";
import { JWT_TOKEN } from "./constants";

const api = axios.create({
    // Server API URL from environment
    // baseURL: import.meta.env.SERVER_API_URL,
    baseURL: "http://localhost:9090/api/v1", // Default fallback URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(JWT_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
