export interface UserInfos {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  supervised_service: {
    id: number;
    nom_service: string;
    pole: string;
    entite: string;
    manager: number;
  };
}
