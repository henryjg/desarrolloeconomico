import axios from 'axios';
import { API_URL } from '../config';
import { Oficina } from '../types/interfaces';


export const get_lista_oficinas = async () => {
  const response = await axios.post(API_URL, {
    op: 'get_oficinas', 
  });
  return response.data;
};


export const get_lista_oficinasArbol = async () => {
  const response = await axios.post(API_URL, {
    op: 'getOficinasArbol', 
  });
  return response.data;
};


export const get_oficina = async (id: string) => {
  const response = await axios.post(API_URL, {
    op: 'get_oficina',
    id: id,
  });
  return response.data;
};


export const add_oficina = async (formData: FormData) => {
  formData.append("op", "add_oficina");
  const response = await axios.post(API_URL, formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};


export const upd_oficina = async (oficina: Oficina) => {
  const response = await axios.post(API_URL, {
    op: 'update_oficina',
    ...oficina
  });
  return response.data;
};


export const del_oficina = async (id: string) => {
  const response = await axios.post(API_URL, {
    op: 'delete_oficina',
    id: id
  });
  return response.data;
};
