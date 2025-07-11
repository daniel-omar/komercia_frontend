import { DocumentType } from "./document-type.interface";
import { Profile } from "./profile.interface";

export interface User {
    id_usuario?: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    numero_documento: string;
    id_tipo_documento: string;
    tipo_documento?: DocumentType;
    id_perfil: number;
    perfil?: Profile;
    correo: string;
    numero_telefono: string;
    fecha_hora_registro?: Date;
    fecha_hora_actualizacion?: Date;
    es_activo?: boolean;
}
