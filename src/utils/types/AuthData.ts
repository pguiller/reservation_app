export interface AuthData {
  lastname: string;
  mdpentered: string;
}

export interface AuthResponse {
  authenticated: boolean;
  UserId: number;
  access: string;
}

export interface HistoryActionUser {
  Ot: string;
  phase?: string;
  sous_phase: string | null;
  name: string | null;
  firstname: string | null;
  Date_pose: Date | string;
}
