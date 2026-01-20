import axios from "axios";
import { authStoreManager } from "../store/authStoreManager";
import type { TokenResponseDto } from "../dto/tokenReponseDto";
import type { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (!axios.isAxiosError(error)) {
            return Promise.reject(error);
        }
        const originalReq = error.config as RetryRequestConfig;
        
        if(error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;

            try {
                const res = await api.post<TokenResponseDto>("api/auth/refresh");
                originalReq.headers = originalReq.headers ?? {};
                originalReq.headers.Authorization = `Bearer ${res.data.accessToken}`;
                authStoreManager.login(res.data.accessToken);
                return api(originalReq);
            } catch {
                authStoreManager.logout();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}