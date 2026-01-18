import { authStore } from "./authStore"

export const authStoreManager = {
  getAccessToken(): string | null {
    return authStore.getState().accessToken;
  },
  isAuthenticated(): boolean {
    return authStore.getState().isAuth;
  },

  login(token: string): void {
    authStore.getState().setAccessToken(token);
    authStore.getState().setIsAuth(true);
  },

  logout(): void {
    authStore.getState().setAccessToken(null);
    authStore.getState().setIsAuth(false);
  },
};
