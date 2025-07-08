import { PaymentType } from "./payment_type.interface";

export interface User {
    id_usuario: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
}

export interface Sale {
    id_venta: number;
    concepto: string;
    id_tipo_pago: number;
    tipo_pago: PaymentType;
    tiene_descuento: boolean;
    id_tipo_descuento: number;
    tipo_descuento: string | null;
    descuento: string;
    total_sugerido: string;
    total: string;
    total_final: string;
    id_usuario_registro: number;
    usuario_registro: User;
    id_usuario_actualizacion: number;
    usuario_actualizacion: User;
    fecha_registro: string;
    hora_registro: string;
    fecha_actualizacion: string;
    hora_actualizacion: string;
}