import axios from "axios";
import { authStore } from "../store/authStore";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.request.use((config) => {
    const token = authStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})