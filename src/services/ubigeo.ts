import axios from 'axios';
import { API_URL } from '../config';

export const get_departamentos = async () => {
    const response = await axios.post(API_URL, {
        op: 'get_departamentos'
    });
    return response.data;
};

export const get_provincia = async (depart: string) => {
    const response = await axios.post(API_URL, {
        op: 'get_provincias',
        departamento: depart
    });
    return response.data;
};

export const get_distrito = async (provin: string) => {
    const response = await axios.post(API_URL, {
        op: 'get_distritos',
        provincia: provin
    });
    return response.data;
};


