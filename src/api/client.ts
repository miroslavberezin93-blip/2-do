import axios from "axios";
import { authStoreManager } from "../store/authStoreManager";
import type { TokenResponseDto } from "../dto/tokenReponseDto";
import type { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const tryRefresh = async (): Promise<TokenResponseDto> => {
  return (await axios.post<TokenResponseDto>(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    {},
    { withCredentials: true }
  )).data;
};

api.interceptors.request.use((config) => {
    if(config.headers && config.headers["Use-Token"]) {
        const token = authStoreManager.getAccessToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        delete config.headers["Use-Token"];
    }
    return config;
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
                const res = await tryRefresh();
                originalReq.headers = originalReq.headers ?? {};
                originalReq.headers.Authorization = `Bearer ${res.accessToken}`;
                authStoreManager.login(res.accessToken);
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