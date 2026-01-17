import { api } from "./client";
import type { RegisterDto } from "../dto/registerDto";
import type { TokenResponseDto } from "../dto/tokenReponseDto";
import type { LoginDto } from "../dto/loginDto";

export const authApi = {
    async registerAsync(dto: RegisterDto): Promise<TokenResponseDto>{
        const res = await api.post<TokenResponseDto>("api/auth/register",dto);
        return res.data;
    },
    
    async loginAsync(dto: LoginDto ): Promise<TokenResponseDto>{
        const res = await api.post<TokenResponseDto>("api/auth/login", dto);
        return res.data;
    }
}