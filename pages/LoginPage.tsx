
'use client';
import LoginForm from "@/widgets/auth/ui/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const LoginPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-bg-secondary border border-border shadow-lg">
          {/* Title */}
          <h1 className="text-center text-2xl font-bold text-textPrimary mb-6">
            Welcome Back
          </h1>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default LoginPage;


