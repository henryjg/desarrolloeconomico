import axios from 'axios';
import { API_DOCUMENTOS  } from '../config';

export const subir_archivo = async (formData: FormData) => {
  formData.append("op", "subir_archivo");
  const response = await axios.post(API_DOCUMENTOS, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};
  
export const subir_foto = async (formData: FormData) => {
  formData.append("op", "Subir_foto");
  const response = await axios.post(API_DOCUMENTOS, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};
  