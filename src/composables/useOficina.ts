import { ref } from 'vue';
import {
get_lista_oficinas,
get_lista_oficinasArbol,
get_oficina,
add_oficina,
del_oficina
} from '../services/OficinaServices';
import Notif from '../utils/notificaciones';
import Alerta from '../utils/alertas';
import NProgress from 'nprogress';
import { Oficina, initializeOficina, OficinaErrors, initializeOficinaErrors, OfficeNode} from '../interfaces/oficina.interface';
import { AxiosError } from 'axios';

export function useOficina() {
  // Datos reactivos
  const listaOficinas = ref<Oficina[]>([]);
  const nuevaOficina = ref<Oficina>(initializeOficina());
  const oficina = ref<Oficina>(initializeOficina());
  const errors = ref<OficinaErrors>(initializeOficinaErrors());
  const offices = ref<OfficeNode[]>([]);
  const isloading = ref(false);


  // Cargar lista de oficinas
  const cargarOficinas = async () => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_lista_oficinas();
      if(RespuestaJSON.success){
        listaOficinas.value = RespuestaJSON.data;
      }else{
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
    }finally {
      NProgress.done();
    }
  };

// Cargar arbol de oficinas
const cargarArbol = async () => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_lista_oficinasArbol();
      if(RespuestaJSON.success){
        offices.value = RespuestaJSON.data;
      }else{
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      // Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
    }finally {
      NProgress.done();
    }
  };

  const deleteOficina = async (id: string) => {
    const isConfirmado = await Alerta.Confirmacion('¿Estás seguro de eliminar esta oficina?', 'Eliminar');
    if (isConfirmado) {
      try {
        const response = await del_oficina(id);
        if (response.success) {
          Alerta.Sucessfull('Completado','La oficina ha sido eliminada con éxito');
          await cargarOficinas();
        } else {
          Alerta.Error('Error', response.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al eliminar la oficina.');
      }
    }
  };

  return {
    listaOficinas,
    nuevaOficina,
    errors,
    offices,
    cargarOficinas,
    cargarArbol,
    isloading,
    oficina,
    deleteOficina
  };
}
