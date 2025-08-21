// src/services/inmuebleService.ts
import axios from 'axios';
import { API_URL } from '../config';
import { Requisito } from '../interfaces/requisitos.interface';


export const get_lista_requisitos = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_lista_requisitos', 
  });
  return response.data;
};

export const get_requisito = async (idrequisito: String) => {
  const response = await axios.post(API_URL, {
      op: 'get_requisito',
      idreq: idrequisito
  });
  return response.data;
};

export const add_requisito = async (formData: FormData) => {
    formData.append("op", "add_requisito");
    const response = await axios.post(API_URL, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const upd_requisito = async (SolicitanteUpd: Requisito) => {
  const response = await axios.post(API_URL, {
    op: 'upd_requisito', 
    ...SolicitanteUpd
  });
  return response.data;
};

export const del_requisito = async (idrequisito: string) => {
  const response = await axios.post(API_URL, {
      op: 'del_requisito',
      idreq: idrequisito
  });
  return response.data;
};






//********************************************* */
//********************************************* */
export const get_lista_RequisitosAsignados = async (idtramite: String) => {
  const response = await axios.post(API_URL, {
      op: 'get_lista_RequisitosAsignados', 
      idtramite: idtramite
  });
  return response.data;
};

export const add_RequisitosAsignados = async (formData: FormData) => {
    formData.append("op", "add_RequisitosAsignados");
    const response = await axios.post(API_URL, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const del_RequisitosAsignados = async (idrequisito: string) => {
  const response = await axios.post(API_URL, {
      op: 'del_RequisitosAsignados',
      idreq: idrequisito
  });
  return response.data;
};