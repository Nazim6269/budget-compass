import { create } from "zustand";

interface AuthResetState {
  email: string;
  otp: string;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  clear: () => void;
}

export const useAuthResetStore = create<AuthResetState>((set) => ({
  email: "",
  otp: "",
  setEmail: (email) => set({ email }),
  setOtp: (otp) => set({ otp }),
  clear: () => set({ email: "", otp: "" }),
}));