import { api } from "./client";
import { isAxiosError } from "axios";
import type { RegisterDto } from "../dto/registerDto";
import type { TokenResponseDto } from "../dto/tokenReponseDto";
import type { LoginDto } from "../dto/loginDto";
import { ConflictError, ApiError } from "../errors/errors";

export const authApi = {
    async registerAsync(dto: RegisterDto): Promise<TokenResponseDto>{
        try{
            const res = await api.post<TokenResponseDto>("api/auth/register",dto);
            return res.data;
        } catch(error) {
            if(!isAxiosError(error)) throw error;
            else if(error.status === 409) throw new ConflictError();
            else throw new ApiError(error.message, error.status);
        }
    },
    
    async loginAsync(dto: LoginDto ): Promise<TokenResponseDto>{
        const res = await api.post<TokenResponseDto>("api/auth/login", dto);
        return res.data;
    }
}