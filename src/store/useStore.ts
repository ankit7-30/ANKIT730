import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
  isAdmin: boolean;
  setIsAdmin: (status: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isAdmin: false,
      setIsAdmin: (status) => set({ isAdmin: status }),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "ankit730-session",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

