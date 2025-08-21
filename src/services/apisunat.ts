import axios from 'axios';
import { API_URL } from '../config';

export const get_datosDNI = async (dnitrabajador: string) => {
    const response = await axios.post(API_URL, {
        op: 'get_datos_dni', 
        dni: dnitrabajador
    });
    return response.data;
};

export const get_datosRUC = async (ruc: string) => {
    const response = await axios.post(API_URL, {
        op: 'get_datos_ruc', 
        ruc: ruc
    });
    return response.data;
};
