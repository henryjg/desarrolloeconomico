// src/services/inmuebleService.ts
import axios from 'axios';
import { API_URL } from '../config';


export const get_fotos = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_fotos', 
  });
  return response.data;
};

export const add_FotoActual = async (formData: FormData) => {
  formData.append("op", "add_foto");
  const response = await axios.post(API_URL, formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};

export const del_foto = async (idfoto: number) => {
  const response = await axios.post(API_URL, {
      op: 'del_foto',
      id: idfoto
  });
  return response.data;
};

//------------------------------------------

export const get_fotosRuta = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_fotosRuta', 
  });
  return response.data;
};

export const add_FotoActualRuta = async (formData: FormData) => {
  formData.append("op", "add_fotoRuta");
  const response = await axios.post(API_URL, formData, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};

export const del_fotoRuta = async (idfoto: number) => {
  const response = await axios.post(API_URL, {
      op: 'del_fotoRuta',
      id: idfoto
  });
  return response.data;
};
