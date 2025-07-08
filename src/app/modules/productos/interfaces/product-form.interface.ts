import { ProductCategory } from "./product-category.interface";

export interface ProductForm {
    id_producto?: number;
    nombre_producto: string;
    descripcion_producto?: string;
    precio_compra: string;
    precio_venta: string;
    id_categoria_producto: number;
    es_activo?: boolean;
}