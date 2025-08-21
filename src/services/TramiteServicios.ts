// src/services/inmuebleService.ts
import axios from 'axios';
import type { Tramite } from '../types/interfaces';
import { API_URL } from '../config';


export const get_lista_tramites = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_lista_tramites', 
  });
  return response.data;
};

export const get_lista_tramites_oficina = async (idoficina_actual: string) => {
  const response = await axios.post(API_URL, {
      op: 'get_lista_tramites_oficina', 
      idoficina: idoficina_actual
  });
  return response.data;
};


export const get_tramite = async (idtramite: string) => {
  const response = await axios.post(API_URL, {
      op: 'get_tramite',
      tram_id: idtramite
  });
  return response.data;
};

export const add_tramite = async (TramiteAdd: Tramite) => {
  const response = await axios.post(API_URL, {
    op: 'add_tramite', 
    ...TramiteAdd
  });
  return response.data;
};

export const upd_tramite = async (TramiteUpd: Tramite) => {
  const response = await axios.post(API_URL, {
    op: 'upd_tramite', 
    ...TramiteUpd
  });
  return response.data;
};

export const del_tramite = async (idtramite: string) => {
  const response = await axios.post(API_URL, {
      op: 'del_tramite',
      id: idtramite
  });
  return response.data;
};
