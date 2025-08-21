import axios from 'axios';
import { API_URL } from '../config';

export const iniciarSesion  = async (usuario: string, pass: string) => {
  const response = await axios.post(API_URL, {
      op: 'loggin', 
      user: usuario,
      pass: pass
  });
  return response.data;
};
export const CargarUsuario = async (idtrabajador: String) => {
  const response = await axios.post(API_URL, {
      op: 'get_trabajador',
      id: idtrabajador
  });
  return response.data;
};

export const inicia_sesion_operacionesLinea = async (user:string, password:string)=> {
  const response = await axios.post(API_URL,{
    op: 'logginAdm',
    usuario: user,
    contrasena: password
  });
  return response.data;
};

export const CargarAdmin = async (idadmin: String) => {
  const response = await axios.post(API_URL, {
      op: 'get_administrado',
      id: idadmin
  });
  return response.data;
};