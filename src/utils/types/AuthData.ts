export interface AuthData {
  lastname: string;
  mdpentered: string;
}

export interface AuthResponse {
  authenticated: boolean;
  UserId: number;
  access: string;
}
