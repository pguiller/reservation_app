export interface Stage {
  id: number;
  accessRoles: string[];
  name: string;
  url: string;
  redirect?: boolean;
}
