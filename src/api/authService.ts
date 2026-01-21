import type { RegisterDto } from "../dto/registerDto"
import type { LoginDto } from "../dto/loginDto";
import { authApi } from "./authApi"
import { authStoreManager } from "../store/authStoreManager";
import { serviceWrapper } from "./wrappers/authErrorHandlingWrapper";

const authServiceRaw = {
    async register(dto: RegisterDto): Promise<void>{
        const res = await authApi.register(dto);
        authStoreManager.login(res.accessToken);
        console.log(`registered: ${res.accessToken}, username: ${dto.username}`)
    },

    async login(dto: LoginDto): Promise<void>{
        const res = await authApi.login(dto);
        authStoreManager.login(res.accessToken);
        console.log(`logined: ${res.accessToken}, username: ${dto.username}`)
    },

    async logout(): Promise<void>{
        await authApi.logout();
        authStoreManager.logout();
        console.log("Logged out");
    }
}

export const authService = serviceWrapper(authServiceRaw);