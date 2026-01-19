export interface LoginCredentials {
  email: string;
}

export interface AuthUser {
  email: string;
  id: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}
