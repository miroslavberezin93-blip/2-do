import { api } from "./client";
import { isAxiosError } from "axios";
import type { RegisterDto } from "../dto/registerDto";
import type { TokenResponseDto } from "../dto/tokenReponseDto";
import type { LoginDto } from "../dto/loginDto";
import type { UsernameUpdateDto } from "../dto/usernameUpdateDto";
import { authStoreManager } from "../store/authStoreManager";
import { InvalidCredentialsError, ConflictError, ApiError } from "../errors/errors";

export const authApi = {
    async registerAsync(dto: RegisterDto): Promise<TokenResponseDto>{
        try{
            const res = await api.post<TokenResponseDto>("api/auth/register",dto);
            return res.data;
        } catch(error) {
            if(!isAxiosError(error)) throw error;
            const status = error.response?.status;
            if(status === 409) throw new ConflictError();
            else throw new ApiError(error.message, status ?? 500);
        }
    },
    
    async loginAsync(dto: LoginDto ): Promise<TokenResponseDto>{
        try {
            const res = await api.post<TokenResponseDto>("api/auth/login", dto);
            return res.data;
        } catch (error) {
            if(!isAxiosError(error)) throw error;
            const status = error.response?.status;
            if(status === 404 || status === 400) throw new InvalidCredentialsError();
            else throw new ApiError(error.message, status ?? 500);
        }
    },

    async logoutAsync(): Promise<void> {
        try {
            await api.post("api/auth/logout");
            authStoreManager.logout();
        } catch(error) {
            if(!isAxiosError(error)) throw error;
            const status = error.response?.status;
            throw new ApiError(error.message, status ?? 500);
        }
    }
}