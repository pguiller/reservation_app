export interface DecodedToken {
  isAdmin: any;
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  role: string;
}
