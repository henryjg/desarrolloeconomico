// src/utils/listasFijas.ts

import { ref } from 'vue';

export const tiposPersonaJuridica = ref([
  'PERSONA NATURAL',
  'PERSONA JURÍDICA'
]);

export const condicionlocal = ref([
  'PROPIO',
  'ALQUILADO'
]);


export const tiposInspeccion = ref([
  'ITSE POSTERIOR',
  'ITSE PREVIA',
  'NO APLICA'
]);

export const resultadosITSE = ref([
  'CUMPLE',
  'NO CUMPLE',
  'RESOLUCION FINALIZADA'
]);

export const nivelesRiesgo = ref([
  'SIN NIVEL DE RIESGO',
  'RIESGO MUY ALTO',
  'RIESGO ALTO',
  'RIESGO MEDIO',
  'RIESGO BAJO'
]);

export const list_meses = [
  { value: 1, name: 'Enero' },
  { value: 2, name: 'Febrero' },
  { value: 3, name: 'Marzo' },
  { value: 4, name: 'Abril' },
  { value: 5, name: 'Mayo' },
  { value: 6, name: 'Junio' },
  { value: 7, name: 'Julio' },
  { value: 8, name: 'Agosto' },
  { value: 9, name: 'Septiembre' },
  { value: 10, name: 'Octubre' },
  { value: 11, name: 'Noviembre' },
  { value: 12, name: 'Diciembre' }
];



export const zonificacion = ref([
  'RDMB (RESIDENCIAL DE DENSIDAD MUY BAJA)',
  'RDB (RESIDENCIAL DE DENSIDAD BAJA)',
  'RDM (RESIDENCIAL DE DENSIDAD MEDIA)',
  'RDA (RESIDENCIAL DE DENSIDAD ALTA)',
  'CZ (COMERCIO ZONAL)',
  'CM (COMERCIO METROPOLITANO)',
  'CV (COMERCIO VECINAL)',
  'I1 (INDUSTRIA ELEMENTAL Y COMPLEMENTARIA)',
  'I2 (INDUSTRIA LIVIANA)',
  'ZHR (ZONA DE HABILITACION RECREACIONAL)',
  'E1 (EDUCACIÓN BASICA)',
  'E3 (EDUCACIÓN SUPERIOR UNIVERSITARIA)',
  'L3 ZONA DE GRAN INDUSTRIA',
  'ZHR (ZONA DE HABILITACION RECREACIONAL)',
  'ZRE (ZONA DE REGLAMENTO ESPECIAL)',
  'ZRP (ZONA DE RECREACIÓN PÚBLICA)',
  'I1-R (ZONA DE VIVIENDA TALLER)',
  'ZT-1 (ZONA TURÍSTICA)',
  'S (SEMIRUSTICO)',
  'OU (OTROS USOS)'
]);
