
export interface UserForm {
    id_usuario?: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    id_tipo_documento: number;
    numero_documento: string;
    numero_telefono?: string;
    correo?: string;
    id_perfil: number;
    clave?: string;
}