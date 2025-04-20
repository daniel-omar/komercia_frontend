
export interface User {
  id_usuario: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  id_tipo_documento: number;
  numero_documento: string;
  numero_telefono: string;
  correo: string;
  fecha_nacimiento: null;
  id_perfil: number;
  fecha_hora_registro: Date;
  fecha_hora_actualizacion: null;
  id_usuario_registro: null;
  id_usuario_actualizacion: null;
  es_activo: boolean;
  nombre_perfil: string;
  token?: string;
}
