export interface UsersFilter {
  numero_documento?: string;
  nombre?: string;
  correo?: string;
  ids_perfil?: number[];
  es_activo?: boolean;
}