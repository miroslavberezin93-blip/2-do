import { api } from "./client";
import type { RegisterDto } from "../dto/registerDto";
import type { TokenResponseDto } from "../dto/tokenReponseDto";

export const authApi = {
    async registerAsync(dto: RegisterDto): Promise<TokenResponseDto>{
        const res = await api.post<TokenResponseDto>("api/auth/register",dto);
        return res.data;
    }
}