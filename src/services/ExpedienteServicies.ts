// src/services/inmuebleService.ts
import axios from 'axios';

import { API_URL } from '../config';
import { Requisito } from '../interfaces/requisitos.interface';


export const get_lista_expedientes = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_lista_expedientes', 
  });
  return response.data;
};

export const get_expedientes = async (idrequisito: String) => {
  const response = await axios.post(API_URL, {
      op: 'get_expedientes',
      id: idrequisito
  });
  return response.data;
};

export const add_expediente = async (RequisitoAdd: Requisito) => {
  const response = await axios.post(API_URL, {
    op: 'add_expediente', 
    ...RequisitoAdd
  });
  return response.data;
};

export const upd_expediente = async (RequisitoUpd: Requisito) => {
  const response = await axios.post(API_URL, {
    op: 'upd_expediente', 
    ...RequisitoUpd
  });
  return response.data;
};

export const del_expediente = async (idrequisito: number) => {
  const response = await axios.post(API_URL, {
      op: 'del_expediente',
      id: idrequisito
  });
  return response.data;
};
