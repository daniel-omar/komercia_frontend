export interface Carga {
  id_carga: number,
  id_formato: number,
  total_registros?: number;
  total_registros_incorrectos?: number;
  total_registros_correctos?: number;
  observacion?: String;
  fecha_hora_registro?: Date;
}

export interface CargaResponse {
  cargas: Carga[],
  carga: Carga
}
