import { IHttpClient } from "@/shared/api/http-client";
import { LoginParams, RegisterParams, UpdateProfileParams } from "./authType";

export class AuthRepository {
  constructor(private readonly http: IHttpClient) {}

  login<T = unknown>(params: LoginParams) {
    return this.http.post<T>("/auth/login", params, { _skipAuth: true });
  }

  register<T = unknown>(params: RegisterParams) {
    return this.http.post<T>("/auth/register", params, { _skipAuth: true });
  }

  refresh<T = unknown>() {
    return this.http.post<T>("/auth/refresh-token", {});
  }

  logout<T = unknown>() {
    return this.http.post<T>("/auth/logout", {});
  }
  forgetPassword<T = unknown>(email: string) {
    return this.http.post<T>("/auth/forgot-password", { email });
  }
  resetPassword<T = unknown>(data: {
    email: string;
    token: string;
    password: string;
  }) {
    return this.http.post<T>("/auth/reset-password", data);
  }
  changPassword<T = unknown>(passwords: { oldPass: string; newPass: string }) {
    return this.http.post<T>("/auth/change-password", passwords);
  }
  resendVerifyEmail<T = unknown>(email: string) {
    return this.http.post<T>("/auth/resend-verification-email", { email });
  }
  verifyEmail<T = unknown>(data: { email: string; token: string }) {
    return this.http.post<T>("/auth/verify-email", data);
  }

  updateProfile<T = unknown>(data: UpdateProfileParams) {
    return this.http.patch<T>("/auth/update", data);
  }

  getMe<T = unknown>() {
    return this.http.get<T>("/auth/me");
  }
}
