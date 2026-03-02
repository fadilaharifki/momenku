import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  isLoggedIn: boolean;
  email: string;
  full_name: string;
  phone_number: string;
  created_at: string;
  provider?: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("momenku_user");
      },
    }),
    {
      name: "momenku_user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
