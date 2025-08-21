
export interface datos_stat_documentos {
  buzon_nombres:string;
  buzon_id:number;
  buzon_tipo:string;
  enviados:number;
  recibidos:number;
  porrecibir:number;
  archivado:number;
}

export const initialize_datos_stat_documentos = (): datos_stat_documentos => {
  return {
    buzon_nombres: '',
    buzon_id: 0,
    buzon_tipo: '',
    enviados: 0,
    recibidos: 0,
    porrecibir: 0,
    archivado: 0
  };
};