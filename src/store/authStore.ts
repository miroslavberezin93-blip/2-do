import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    isAuth: boolean;
    setAccessToken: (token: string | null) => void;
    setIsAuth: (auth: boolean) => void;
}

export const authStore = create<AuthState>((set) => ({
    accessToken: null,
    isAuth: false,
    setAccessToken: (token) => set({accessToken: token}),
    setIsAuth: (auth) => set({ isAuth: auth })
}));