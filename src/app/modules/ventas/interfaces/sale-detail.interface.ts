import { Color } from "./color.interface";
import { Product } from "./product.interface";
import { Size } from "./size.interface";


export interface SaleDetail {
    id_venta_detalle: number;
    id_venta: number;
    id_producto: number;
    producto: Product;
    precio: number;
    cantidad: number;
    id_talla: number;
    talla: Size;
    id_color: number;
    color: Color;
    sub_total_sugerido: number;
    sub_total: number;
}