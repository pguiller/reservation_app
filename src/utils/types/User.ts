import { Member } from './Member';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  confirmation: boolean | null;
  members: Member[];
}
