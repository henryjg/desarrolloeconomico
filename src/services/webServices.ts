
import axios from 'axios';
import { Contactenos } from '../types/objetosweb';
import { API_URL } from '../config';

export const add_LeadContacto = async (formData: FormData) => {
    formData.append("op", "add_LeadContacto");
    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const del_LeadContacto = async (idcaracter: number) => {
const response = await axios.post(API_URL, {
    op: 'del_LeadContacto',
    id: idcaracter
});
return response.data;
};


//****************** FORMULARIO DE CONTACTO  CONTACTENOS **************************/

export const add_FormContacto = async (formData: FormData) => {
    formData.append("op", "add_FormContacto");
    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


//****************** FORMULARIO DE CONTACTO  CONTACTENOS **************************/
export const get_datosEmpresa = async () => {
    const response = await axios.post(API_URL, {
        op: 'get_Empresa', 
    });
    return response.data;
};
  
export const Upd_Campo = async (campo: String, valor: String) => {
    const response = await axios.post(API_URL, {
        op: 'upd_campo',
        Campo: campo,
        Valor: valor
    });
    return response.data;
};
    
export const upd_reglamento = async (formData: FormData) => {
    formData.append("op", "save_reglamento");
    const response = await axios.post(API_URL, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
  };
  
//****************** PRECIOS **************************/

  export const getPrecios = async () => {
    try {
      const response = await axios.post(API_URL, { op: 'get_precios' });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo precios:', error);
      throw error;
    }
  };
  
  export const updatePrecio = async (categoria: string, preventa: number, venta: number) => {
    try {
      const response = await axios.post(API_URL, {
        op: 'upd_precio',
        categoria: categoria,
        precio_preventa: preventa,
        precio_venta: venta
      });
      return response.data;
    } catch (error) {
      console.error('Error actualizando precio:', error);
      throw error;
    }
  };

//****************** FORMULARIO DE INMUEBLE HOME **************************/

export const get_lista_inmuebles = async () => {
    const response = await axios.post(API_URL, {
        op: 'get_lista_inmuebles', 
    });
    return response.data;
  };

