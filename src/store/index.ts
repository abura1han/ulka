import { create } from "zustand";

interface UserStore {
  createAppModalOpen: boolean;
  updateCreateAppModalOpen: (value: boolean) => void;
}

export const useStore = create<UserStore>((set) => ({
  createAppModalOpen: false, // Initial state
  updateCreateAppModalOpen: (val) => set({ createAppModalOpen: val }), // Function to update the state
}));
