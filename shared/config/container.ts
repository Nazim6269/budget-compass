import { AuthRepository } from "@/features/auth/model/authRepository";
import { AuthService } from "@/features/auth/model/authService";
import { AxiosHttpClient } from "@/shared/api/axios-client";
import { tokenStore } from "@/shared/api/token-store";

let _authService: AuthService;

const httpClient = new AxiosHttpClient(tokenStore, () =>
  _authService.refreshToken(),
);

const authRepository = new AuthRepository(httpClient);
_authService = new AuthService(authRepository);
export const authService = _authService;

export interface AppContainer {
  authService: AuthService;
}

export const container: AppContainer = {
  authService,
};
