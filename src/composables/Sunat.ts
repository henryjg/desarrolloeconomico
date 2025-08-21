// sunat.ts
import { ref } from "vue";
import { get_datosRUC as fetchDatosRUC, get_datosDNI } from '../services/apisunat'; // Renombrar la importación para evitar conflictos
import { PersonaJuridica, PersonaNatural } from "../types/interfaces";
import NProgress from 'nprogress';
import Notif from '../utils/notificaciones';
import Alerta from '../utils/alertas';

export function Sunat() {

  const fun_get_datosRUC = async (ruc: string) => {
    try {
      NProgress.start();
      const data = await fetchDatosRUC(ruc); 
      if (data) {
        return data;  
      } else {
        Alerta.Error('Error', 'No se encontraron datos para el RUC proporcionado.');
        return null;  
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alerta.Error('Error', 'No se pudo obtener los datos.');
      return null;  
    } finally {
      NProgress.done(); 
    }
  };

  return {
    fun_get_datosRUC,
  };
}
