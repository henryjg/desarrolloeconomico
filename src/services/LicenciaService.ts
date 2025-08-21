// src/services/inmuebleService.ts
import axios from 'axios';
import type { FormInsertLicencia, Licencia_tabla, Licencia} from '../interfaces/licencia.interfaces';
import type { filtros_licencia } from '../interfaces/filtros.interface';
import { API_URL } from '../config';


// export const get_lista_licencias = async () => {
//   const response = await axios.post(API_URL, {
//       op: 'get_lista_licencias', 
//   });
//   return response.data;
// };

export const get_listar_licencias = async (filtros: filtros_licencia) => {
  const response = await axios.post(API_URL, {
      op: 'get_tabla_licencias', 
       ...filtros
  });
  return response.data;
};
export const get_listar_licencias_full = async (filtros: filtros_licencia) => {
  const response = await axios.post(API_URL, {
      op: 'get_tabla_licencias_full', 
       ...filtros
  });
  return response.data;
};
export const get_tabla_licencias_emtidas = async (filtros: filtros_licencia) => {
  const response = await axios.post(API_URL, {
      op: 'get_tabla_licencias_emtidas', 
       ...filtros
  });
  return response.data;
};
export const get_lista_bajas = async (filtros: filtros_licencia) => {
  const response = await axios.post(API_URL, {
      op: 'get_tabla_bajas', 
       ...filtros
  });
  return response.data;
};

export const get_licencia = async (idlicencia: string) => {
  const response = await axios.post(API_URL, {
      op: 'get_licencia', 
      idlic: idlicencia
  });
  return response.data;
};


export const add_licenciaPanel = async (LicenciaADD: FormInsertLicencia) => {
  const response = await axios.post(API_URL, {
    op: 'add_licencia_nuevo', 
    ...LicenciaADD
  });
  return response.data;
};


export const upd_licenciaActual = async (LicenciaUPD: Licencia) => {
  const response = await axios.post(API_URL, {
    op: 'upd_licencia', 
    ...LicenciaUPD
  });
  return response.data;
};

export const guardar_licenciaAdjunta = async (formData: FormData) => {
  formData.append("op", "save_licenciaAdjunta");
  const response = await axios.post(API_URL, formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};

export const guardar_resolucionAdjunto = async (formData: FormData) => {
  formData.append("op", "save_documentoResolucionAjunta");
  const response = await axios.post(API_URL, formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};


export const guardar_licenciaGenerada = async (formData: FormData) => {
  formData.append('op','save_LicenciaGenerada');
  const response = await axios.post(API_URL, formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};

export const obtener_Correlativo = async () => {
  const response = await axios.post(API_URL, {
    op: 'get_correlativo'
  });
  return response.data;
};



export const aceptar_solicitud_licencia = async (id: string) => {
  const response = await axios.post(API_URL, {
      op: 'aceptar_solicitud_licencia',
      idlic: id
  });
  return response.data;
};

export const rechazar_solicitud_licencia = async (id: string, observacion:string) => {
  const response = await axios.post(API_URL, {
      op: 'rechazar_solicitud_licencia',
      vigencia_observacion: observacion,
      idlic: id
  });
  return response.data;
};

export const dar_bajanulidad = async (id: string, observacion:string, oper: string) => {
  const response = await axios.post(API_URL, {
      op: 'bajanulidad_licencia',
      vigencia_observacion: observacion,
      operacion: oper,
      idlic: id
  });
  return response.data;
};


export const cambiar_estado_licencia = async (id: string, estado:string, observacion:string) => {
  const response = await axios.post(API_URL, {
      op: 'cambiar_estado_licencia',
      vigencia_estado: estado,
      vigencia_observacion: observacion,
      idlic: id
  });
  return response.data;
};

export const guardar_zonificacion = async (id: string, zoni:string) => {
  const response = await axios.post(API_URL, {
      op: 'guardar_zonificacion',
      zonificacion: zoni,
      idlic: id
  });
  return response.data;
};
export const guardar_Vigencia = async (id: string, vige:string) => {
  const response = await axios.post(API_URL, {
      op: 'guardar_Vigencia',
      vigencia: vige,
      idlic: id
  });
  return response.data;
};
export const guardar_fechavencimiento = async (id: string, fecha:string) => {
  const response = await axios.post(API_URL, {
      op: 'guardar_itsefechavencimiento',
      fechavencimiento: fecha,
      idlic: id
  });
  return response.data;
};


export const del_licencia = async (idlicencia: string) => {
  const response = await axios.post(API_URL, {
      op: 'delete_licencia',
      idlic: idlicencia
  });
  return response.data;
};



export const generarResolucion = async (idlicencia: string) => {
  const response = await axios.post(API_URL, {
      op: 'generarResolucion', 
      idlic: idlicencia
  });
  return response.data;
};
