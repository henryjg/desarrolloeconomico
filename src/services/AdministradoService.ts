// src/services/inmuebleService.ts
import axios from 'axios';
import type { PersonaRegistro } from '../types/interfaces';
import { API_URL } from '../config';
import { Administrado } from '../interfaces/administrado.interface';


export const get_lista_Administrados = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_lista_administrados', 
  });
  return response.data;
};


export const get_administrado_id = async (idadministrado: string) => {
  const response = await axios.post(API_URL, {
      op: 'get_administrado',
      id: idadministrado
  });
  return response.data;
};

export const get_administrado_numdoc = async (numdocumento: string) => {
  const response = await axios.post(API_URL, {
      op: 'get_administrado_numdoc',
      numdocumento: numdocumento
  });
  return response.data;
};

export const get_busqueda_administrados = async (txtnombre: string, textapellido: string) => {
  const response = await axios.post(API_URL, {
      op: 'get_administrado_search',
      nombre: txtnombre,
      apellido: textapellido
  });
  return response.data;
};

export const add_administrado = async (administradoAdd: Administrado) => {
  const response = await axios.post(API_URL, {
    op: 'add_administrado', 
    ...administradoAdd
  });
  return response.data;
};

export const upd_administrado = async (administradoUpd: Administrado) => {
  const response = await axios.post(API_URL, {
    op: 'upd_administrado', 
    ...administradoUpd
  });
  return response.data;
};

export const del_administrado = async (idadministrado: number) => {
  const response = await axios.post(API_URL, {
      op: 'del_administrado',
      id: idadministrado
  });
  return response.data;
};


export const registrar_UsarioCasilla = async (Persona: PersonaRegistro) => {
  const response = await axios.post(API_URL, {
    op: 'add_UsuarioCasilla', 
    ...Persona
  });
  return response.data;
};

export const Activar_UsarioCasilla = async (codigo: string, idpersona: string) => {
  const response = await axios.post(API_URL, {
    op: 'activar_UsuarioCasilla', 
    id: idpersona,
    codigo: codigo,
  });
  return response.data;
};

