export interface UserDto {
  email: string;
  type?: string;
}

export interface UserProfileDto {
  data: {
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    phone_number?: string;
    avatar?: string;
    avatar_url?: string;
    address?: string | null;
    gender?: string | null;
    date_of_birth?: string | null;
    type?: string;
  }
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

export interface ChangePasswordParams {
  old_password: string;
  new_password: string;
}

export interface UpdateProfileParams {
  name?: string;
  image?: string;
  phone_number?: string;
  dateOfBirth?: string;
  billReminders?: boolean;
  notificaitonReminders?: boolean;
}
