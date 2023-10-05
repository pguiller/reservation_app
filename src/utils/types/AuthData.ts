export interface AuthData {
  username: string;
  password: string;
}

export interface AuthToken {
  refresh: string;
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
