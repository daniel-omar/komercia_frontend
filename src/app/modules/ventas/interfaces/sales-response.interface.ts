import { Pagination } from "@shared/interfaces/pagination.interface";
import { Sale } from "./sale.interface";

export interface SalesResponse {
  ventas: Sale[];
  paginacion?: Pagination | null;
}