import { AuthRepository } from "@/features/auth/model/authRepository";
import { AuthService } from "@/features/auth/model/authService";
import { NotificationRepository } from "@/features/notification/model/notificationRepository";
import { NotificationService } from "@/features/notification/model/notificationService";
import { AxiosHttpClient } from "@/shared/api/axios-client";
import { tokenStore } from "@/shared/api/token-store";

let _authService: AuthService;
let _notificationService: NotificationService;

const httpClient = new AxiosHttpClient(tokenStore, () =>
  _authService.refreshToken(),
);

const authRepository = new AuthRepository(httpClient);
_authService = new AuthService(authRepository);

const notificationRepository = new NotificationRepository(httpClient);
_notificationService = new NotificationService(notificationRepository);

export const authService = _authService;
export const notificationService = _notificationService;

export interface AppContainer {
  authService: AuthService;
  notificationService: NotificationService;
}

export const container: AppContainer = {
  authService,
  notificationService,
};
