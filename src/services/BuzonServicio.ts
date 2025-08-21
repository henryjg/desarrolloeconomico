// src/stores/trabajadorStore.ts
import axios from 'axios';
import { API_URL } from '../config';
import { Buzon, BuzonCreate } from '../interfaces/buzon.interface';

export const add_Buzon = async (buzon: BuzonCreate) => {
    const response = await axios.post(API_URL, {
      op: 'add_buzon', 
      ...buzon
    });
    return response.data;
};
export const add_Buzon_AsignarUsuario = async (buzon: BuzonCreate, iduser:string) => {
    const response = await axios.post(API_URL, {
      iduser: iduser,
      op: 'add_Buzon_AsignarUsuario', 
      ...buzon
    });
    return response.data;
};

export const upd_buzon = async (buzon: BuzonCreate) => {
    const response = await axios.post(API_URL, {
      op: 'update_buzon', 
      ...buzon
    });
    return response.data;
  };
  
export const getBuzones = async () => {
    const response = await axios.post(API_URL, {
        op: 'get_buzones'
    });
    return response.data;
};


export const get_Buzon = async (id: number) => {
    const response = await axios.post(API_URL, {
        op: 'get_buzon',
        id: id
    });
    return response.data;
};

export const deleteBuzon = async (id: number) => {
    const response = await axios.post(API_URL, {
        op: 'delete_buzon',
        id: id
    });
    return response.data;
};

// eliminar buzon con consulta
export const eliminar_buzon = async (id: number) => {
    const response = await axios.post(API_URL, {
        op: 'eliminar_buzon',
        id: id
    });
    return response.data;
}

export const assign_user_to_buzon = async (userId: number, buzonId:string) => {
    const response = await axios.post(API_URL, {
        op: 'assign_user_to_buzon',
        userId: userId,
        buzonId: buzonId
    });
    return response.data;
};

export const get_users_for_buzon = async (buzonId: string) => {
    const response = await axios.post(API_URL, {
        op: 'get_users_for_buzon',
        buzonId: buzonId
    });
    return response.data;
};

export const get_buzones_for_user = async (userId: number) => {
    const response = await axios.post(API_URL, {
        op: 'get_buzones_for_user',
        userId: userId
    });
    return response.data;
};

export const remove_user_from_buzon = async (userId: number, buzonId:number) => {
    const response = await axios.post(API_URL, {
        op: 'remove_user_from_buzon',
        userId: userId,
        buzonId: buzonId
    });
    return response.data;
};