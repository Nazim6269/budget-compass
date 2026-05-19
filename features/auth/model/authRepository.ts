import { IHttpClient } from "@/shared/api/http-client";
import { LoginParams, RegisterParams } from "./authType";

export class AuthRepository {
  constructor(private readonly http: IHttpClient) {}

  login<T = unknown>(params: LoginParams) {
    return this.http.post<T>("/auth/login", params);
  }

  register<T = unknown>(params: RegisterParams) {
    return this.http.post<T>("/auth/register", params);
  }

  refresh<T = unknown>() {
    return this.http.post<T>("/auth/refresh-token", {}, {
      _skipAuth: true,
    } as any);
  }

  logout<T = unknown>() {
    return this.http.post<T>("/auth/logout", {});
  }
}
