import { parseError } from "@/shared/api/api-errors";
import { tokenStore } from "@/shared/api/token-store";
import {
  AuthResponseDto,
  AuthUser,
  UserDto,
  LoginParams,
  RegisterParams,
} from "./authType";
import { logger } from "@/shared/api/logger";
import { AuthRepository } from "./authRepository";

// ---------------------------------------------------------------------------
// Transformers
// ---------------------------------------------------------------------------

function transformUser(dto: UserDto): AuthUser {
  return {
    email: dto.email,
    type: dto.type || "",
  };
}

export class AuthService {
  private refreshPromise?: Promise<string | null> | null = null;

  constructor(private readonly repo: AuthRepository) {}

  async login(params: LoginParams): Promise<{ token: string }> {
    try {
      const { data } = await this.repo.login<AuthResponseDto>(params);

      const token =
        data.access_token ||
        data.authorization?.token ||
        data.authorization?.access_token;
      if (!token) {
        throw new Error("No token found in login response");
      }

      tokenStore.setAccessToken(token);
      this.scheduleRefreshToken(3600);
      return {
        token: token,
      };
    } catch (error) {
      logger.error(String(error), "Error during login");
      throw parseError(error);
    }
  }

  async register(
    params: RegisterParams,
  ): Promise<{ token: string; user: AuthUser }> {
    try {
      const { data } = await this.repo.register<AuthResponseDto>(params);

      const token =
        data.access_token ||
        data.authorization?.token ||
        data.authorization?.access_token;
      if (!token) {
        throw new Error("No token found in registration response");
      }

      tokenStore.setAccessToken(token);
      this.scheduleRefreshToken(3600);
      return {
        token: token,
        user: transformUser(data.user || { email: params.email }),
      };
    } catch (error) {
      logger.error(String(error), "Error during registration");
      throw parseError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.repo.logout();
    } catch (error) {
      logger.error(String(error), "Error during logout");
    } finally {
      tokenStore.clearAccessToken();
    }
  }

  //forget password
  async forgetPassword(email: string): Promise<void> {
    try {
      await this.repo.forgetPassword(email);
    } catch (error) {
      logger.error(String(error), "Error during forget password");
      throw parseError(error);
    }
  }
  //verify email
  async verifyEmail(params: { email: string; token: string }) {
    try {
      console.log(params, "verifyemail");
      const { data } = await this.repo.verifyEmail(params);
      return data;
    } catch (error) {
      logger.error(String(error), "Error during verify email");
      throw parseError(error);
    }
  }

  //reset pass
  async resetPassword(params: {
    email: string;
    password: string;
    token: string;
  }) {
    try {
      await this.repo.resetPassword(params);
    } catch (error) {
      logger.error(String(error), "Error during reset password");
      throw parseError(error);
    }
  }

  //change password
  async changePassword(params: { oldPass: string; newPass: string }) {
    try {
      await this.repo.changPassword(params);
    } catch (error) {
      logger.error(String(error), "Error during change password");
      throw parseError(error);
    }
  }
  //verify resend email
  async resendVerifyEmail(email: string) {
    try {
      await this.repo.resendVerifyEmail(email);
    } catch (error) {
      logger.error(String(error), "Error during resend verify email");
      throw parseError(error);
    }
  }

  //refresh token
  async refreshToken(): Promise<string | null> {
    if (this.refreshPromise) return this.refreshPromise;

    // Check if current token is still valid
    const currentToken = tokenStore.getAccessToken();
    if (currentToken) {
      return currentToken;
    }

    this.refreshPromise = this.repo
      .refresh<AuthResponseDto>()
      .then(({ data }) => {
        const token =
          data.access_token ||
          data.authorization?.token ||
          data.authorization?.access_token;
        if (!token) {
          throw new Error("No token found in refresh response");
        }

        tokenStore.setAccessToken(token);
        this.scheduleRefreshToken(3600);
        return token;
      })
      .catch((error) => {
        // Only clear token if we don't have a valid one and refresh failed
        const token = tokenStore.getAccessToken();
        if (!token) {
          logger.debug("Silent refresh failed and no valid token found", error);
          tokenStore.clearAccessToken();
        } else {
          logger.warn(
            "Silent refresh failed but existing token is still valid",
            error,
          );
        }
        return null;
      })
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }
  private scheduleRefreshToken(expiresIn: number) {
    const delay = (expiresIn - 60) * 1000;
    if (delay <= 0) return;

    setTimeout(() => this.refreshToken(), delay);
  }
}
