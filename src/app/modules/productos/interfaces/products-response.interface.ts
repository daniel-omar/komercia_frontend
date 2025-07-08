import { Pagination } from "@shared/interfaces/pagination.interface";
import { Product } from "./product.interface";

export interface ProductsResponse {
  productos: Product[];
  paginacion?: Pagination | null;
}