import axios from "axios";
import { authStore } from "../store/authStore";
import type { TokenResponseDto } from "../dto/tokenReponseDto";

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
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalReq = error.config;
        
        if(error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;

            try {
                const res = await api.post<TokenResponseDto>("api/auth/refresh");
                authStore.getState().setAccessToken(res.data.accessToken);
                originalReq.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return api(originalReq);
            } catch {
                logout();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

function logout(): void {
    authStore.getState().setAccessToken(null);
    authStore.getState().setIsAuth(false);
}