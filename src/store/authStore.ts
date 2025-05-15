// src/store/authStore.ts
import { create } from "zustand";

interface AuthState {
    userId: string | null;
    login: (userId: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    userId: null,
    login: (userId) => set({ userId }),
    logout: () => set({ userId: null }),
}));

export default useAuthStore;
