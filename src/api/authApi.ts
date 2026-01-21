import { api } from "./client";
import type { RegisterDto } from "../dto/registerDto";
import type { LoginDto } from "../dto/loginDto";
import type { UsernameUpdateDto } from "../dto/usernameUpdateDto";
import type { PasswordUpdateDto } from "../dto/passwordUpdateDto";
import type { TokenResponseDto } from "../dto/tokenReponseDto";
import endpoints from "./endpoints";

const postData = async <T, R>(url: string, dto: T): Promise<R> => {
  return (await api.post<R>(url, dto)).data
}

export const authApi = {
  register: (dto: RegisterDto) => postData<RegisterDto, TokenResponseDto>(endpoints.auth.register.path, dto),
  login: (dto: LoginDto) => postData<LoginDto, TokenResponseDto>(endpoints.auth.login.path, dto),
  updateUsername: (dto: UsernameUpdateDto) => postData<UsernameUpdateDto, TokenResponseDto>(endpoints.user.updateUsername.path, dto),
  updatePassword: (dto: PasswordUpdateDto) => postData<PasswordUpdateDto, TokenResponseDto>(endpoints.user.updatePassword.path, dto),
  logout: async () => {
    await api.post(endpoints.auth.logout.path, {
      headers: { "Use-Token": true }
    });
    return;
  }
} as const