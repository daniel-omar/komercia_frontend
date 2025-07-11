import { Pagination } from "@shared/interfaces/pagination.interface";
import { User } from "./user.interface";

export interface UsersResponse {
  usuarios: User[];
  paginacion?: Pagination | null;
}