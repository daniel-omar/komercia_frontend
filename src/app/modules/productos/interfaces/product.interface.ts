import { ProductCategory } from "./product-category.interface";

export interface Product {
    id_producto: number;
    codigo_producto: string;
    nombre_producto: string;
    descripcion_producto: string | null;
    precio_compra: string;
    precio_venta: string;
    id_categoria_producto: number;
    categoria: ProductCategory;
    cantidad_disponible: string;
    es_activo: boolean;
}