export interface UserDto {
  email: string;
  type?: string;
}

export interface AuthResponseDto {
  access_token?: string;
  authorization?: {
    token?: string;
    access_token?: string;
    type?: string;
    expires_in?: number;
  };
  user?: UserDto;
  success?: boolean;
  message?: string;
}

export interface AuthUser {
  email: string;
  type: string;
}

export interface LoginParams {
  email: string;
  password?: string;
}

export interface RegisterParams {
  email: string;
  password?: string;
  githubUsername?: string;
  confirmPassword?: string;
}
