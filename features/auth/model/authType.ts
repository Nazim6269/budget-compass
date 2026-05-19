export interface UserDto {
  email: string;
  type?: string;
}

export interface AuthResponseDto {
  access_token: string;
  user?: UserDto;
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
