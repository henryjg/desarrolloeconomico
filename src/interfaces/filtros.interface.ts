// filtros.interfaces.ts
export interface filtros_licencia {
    f_estado?: string | null;
    f_mes_registro?: number | null;
    f_anio_registro?: number | null;
    f_fecha_inicio?: string | null; // Formato de fecha en string 'YYYY-MM-DD'
    f_fecha_fin?: string | null; // Formato de fecha en string 'YYYY-MM-DD'
    f_categoria?: string | null;
    f_codigo?: string | null;
    f_numero_documento?: string | null;
    f_direccion?: string | null;
}

export const initializeLicenciaFiltro = (): filtros_licencia => {
    return {
      f_estado: null,
      f_mes_registro: null,
      f_anio_registro: null,
      f_fecha_inicio: null, // Formato de fecha 'YYYY-MM-DD'
      f_fecha_fin: null, // Formato de fecha 'YYYY-MM-DD'
      f_categoria: null,
      f_codigo: null,
      f_numero_documento: null,
      f_direccion: null
    };
};
  