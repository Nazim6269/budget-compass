export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
  updateProfile: () => [...authKeys.all, "update-profile"] as const,
  resetPassword: () => [...authKeys.all, "reset-password"] as const,
};
