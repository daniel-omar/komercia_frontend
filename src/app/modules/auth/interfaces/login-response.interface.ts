import { User } from "./user.interface";

export interface LoginResponse {
  usuario: User;
  token: string;
  refresh_token: string;
}
