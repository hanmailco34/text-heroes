import type { IAuthState } from "@/types/authTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create<IAuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            userId: null,
            login: (userId) => set({ userId, isLoggedIn: true }),
            logout: () => set({ userId: null, isLoggedIn: false }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
