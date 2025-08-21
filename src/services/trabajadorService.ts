// src/stores/trabajadorStore.ts
import axios from 'axios';
import { API_URL } from '../config';
import { Trabajador } from '../interfaces/trabajador.interface';

export const add_Trabajador = async (trabajador: Trabajador) => {
    const response = await axios.post(API_URL, {
      op: 'add_usuario', 
      ...trabajador
    });
    return response.data;
};
export const upd_TrabajadorActual = async (trabajador: Trabajador) => {
    const response = await axios.post(API_URL, {
      op: 'upd_usuario', 
      ...trabajador
    });
    return response.data;
  };
  
export const getUsuariosTramite = async () => {
    const response = await axios.post(API_URL, {
        op: 'get_usuarios_tramitedocumentario'
    });
    return response.data;
};

export const getTrabajadores = async () => {
    const response = await axios.post(API_URL, {
        op: 'get_usuarios'
    });
    return response.data;
};

export const get_Trabajador = async (idtrabajador: number) => {
    const response = await axios.post(API_URL, {
        op: 'get_usuario',
        id: idtrabajador
    });
    return response.data;
};

export const deleteTrabajador = async (idtrabajador: number) => {
    const response = await axios.post(API_URL, {
        op: 'del_usuario',
        id: idtrabajador
    });
    return response.data;
};


export const subir_foto = async (formData: FormData) => {
    formData.append("op", "subir_imagen");
    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};