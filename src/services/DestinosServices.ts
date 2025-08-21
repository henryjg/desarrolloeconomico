import axios from 'axios';
import { API_URL } from '../config';
import { Oficina } from '../types/interfaces';


export const get_destinos_unidadesorganicas = async () => {
  const response = await axios.post(API_URL, {
    op: 'get_destino_unidadesorganicas', 
  });
  return response.data;
};

export const get_destinos_general = async () => {
  const response = await axios.post(API_URL, {
    op: 'get_destino_general', 
  });
  return response.data;
};



