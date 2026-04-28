// Sonner configuration for center-positioned toasts
// Instructions:
// 1. Install sonner: npm install sonner
// 2. Add Toaster to your app layout (e.g., app/layout.tsx)
// 3. Update the toast.ts file to use sonner

// Step 1: Install sonner
// npm install sonner

// Step 2: Add Toaster to your app (app/layout.tsx or similar)
/*
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster 
          position="top-center"
          expand={false}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
*/

// Step 3: Update toast.ts to use sonner (replace the existing toast.ts content)
/*
import { toast as sonnerToast } from 'sonner';

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  duration?: number;
  position?: "top-center" | "bottom-center" | "top-right" | "bottom-right";
}

export const toast = {
  success: (message: string, options?: ToastOptions) => 
    sonnerToast.success(message, { position: "top-center", ...options }),
  
  error: (message: string, options?: ToastOptions) => 
    sonnerToast.error(message, { position: "top-center", ...options }),
  
  warning: (message: string, options?: ToastOptions) => 
    sonnerToast.warning(message, { position: "top-center", ...options }),
  
  info: (message: string, options?: ToastOptions) => 
    sonnerToast.info(message, { position: "top-center", ...options }),
};

// Helper functions for common user actions
export const userActionToasts = {
  userViewed: (userName: string) => 
    toast.info(`Viewing user: ${userName}`),
  
  userUpdated: (userName: string) => 
    toast.success(`User "${userName}" has been updated successfully`),
  
  userDeleted: (userName: string) => 
    toast.success(`User "${userName}" has been deleted`),
  
  userUpdateFailed: (userName: string, error?: string) => 
    toast.error(`Failed to update user "${userName}". ${error ? `Error: ${error}` : ''}`),
  
  userDeleteFailed: (userName: string, error?: string) => 
    toast.error(`Failed to delete user "${userName}". ${error ? `Error: ${error}` : ''}`),
};
*/

export const sonnerInstallationSteps = {
  step1: "Run: npm install sonner",
  step2: "Add Toaster component to your app layout with position='top-center'",
  step3: "Update shared/utils/toast.ts to use sonner instead of console logs",
};
