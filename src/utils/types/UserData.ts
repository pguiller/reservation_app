export interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  confirmation: boolean | null;
  confirmation_dej: boolean | null;
  confirmation_balade: boolean | null;
  confirmation_diner: boolean | null;
  isMember: boolean;
  idTable: number;
}
