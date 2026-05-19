'use client'
import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import { useForm } from "react-hook-form";
import { useState } from "react";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log(data);
    // TODO: Implement login API call here
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <GenericInput
          type="email"
          placeholder="Enter your email"
          label="Email"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm mb-2"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <GenericInput
          type="password"
          placeholder="Enter your password"
          label="Password"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm mb-2"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Button */}
      <GenericButton
        title={isSubmitting ? "Logging in..." : "Login"}
        size="mlarge"
        className="w-full"
        disabled={isSubmitting}
        onClick={() => {}}
      />
    </form>
  );
};

export default LoginForm;
