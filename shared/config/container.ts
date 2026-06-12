import { AuthRepository } from "@/features/auth/model/authRepository";
import { AuthService } from "@/features/auth/model/authService";
import { NotificationRepository } from "@/features/notification/model/notificationRepository";
import { NotificationService } from "@/features/notification/model/notificationService";
import { UserManagementRepository } from "@/features/user-management/model/userManagementRepository";
import { UserManagementService } from "@/features/user-management/model/userManagementService";
import { AxiosHttpClient } from "@/shared/api/axios-client";
import { tokenStore } from "@/shared/api/token-store";

let _authService: AuthService;
let _notificationService: NotificationService;
let _userManagementService: UserManagementService;

const httpClient = new AxiosHttpClient(tokenStore, () =>
  _authService.refreshToken(),
);

const authRepository = new AuthRepository(httpClient);
_authService = new AuthService(authRepository);

const notificationRepository = new NotificationRepository(httpClient);
_notificationService = new NotificationService(notificationRepository);

const userManagementRepository = new UserManagementRepository(httpClient);
_userManagementService = new UserManagementService(userManagementRepository);

export const authService = _authService;
export const notificationService = _notificationService;
export const userManagementService = _userManagementService;

export interface AppContainer {
  authService: AuthService;
  notificationService: NotificationService;
  userManagementService: UserManagementService;
}

export const container: AppContainer = {
  authService,
  notificationService,
  userManagementService,
};
