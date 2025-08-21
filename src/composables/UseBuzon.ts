import { ref, onMounted, defineComponent, computed, onBeforeUnmount } from 'vue';
import NProgress from 'nprogress'; 
import Notif from '../utils/notificaciones';
import { initializeUsuarioLog, UsuarioLog } from '../types/interfaces';
import { usarAuthStore } from '../stores/autentificacionStore';

import Alerta from '../utils/alertas';
import { getBuzones, eliminar_buzon, get_users_for_buzon, add_Buzon, add_Buzon_AsignarUsuario } from '../services/BuzonServicio';
import { Buzon, BuzonCreate, initializeBuzonCreate } from '../interfaces/buzon.interface';
import { Modal } from 'bootstrap';

export function useBuzon() {
  // Estados reactivos
  
    const authStore = usarAuthStore();
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
    const isloading_buzones = ref(false);

    // const buzon = ref<Buzon[]>([]);
    const searchQuery = ref('');
    
    const ListaBuzones = ref<Buzon[]>([]);
    const nuevoBuzon = ref<BuzonCreate>(initializeBuzonCreate());
    
    Usuario.value = authStore.usuario_Logueado;

    let modal_addBuzon: Modal | null = null;
    const openAddBuzonModal = () => {
      const modalElement = document.getElementById('addBuzonModal');
      if (modalElement) {
        modal_addBuzon = new Modal(modalElement);
        modal_addBuzon.show();
      }
    };


    const ListarBuzones = async () => {
      isloading_buzones.value = true;
      NProgress.start();
      try {
        const response = await getBuzones();
        if (response && response.success) {
          ListaBuzones.value = response.data;
        } else {
          ListaBuzones.value = [];
        }
      } catch (error: unknown) {
        Notif.Error_TryCatch_sinmensajes(error);
      } finally {
        NProgress.done();
        isloading_buzones.value = false;
      }
    };

    const filteredBuzones = computed(() => {
      const query = searchQuery.value.toLowerCase();
      if (!query) return ListaBuzones.value;
      return ListaBuzones.value.filter((buzon: any) =>
          ['tipo', 'nombre', 'sigla', 'responsable', 'correonotificaion', 'usuarios'].some((key) => {
          const value = buzon[key];
          if (Array.isArray(value)) {
            return value.join(', ').toLowerCase().includes(query);
          }
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        })
      );
    });

    const CrearBuzon = async () => {
      try {
          NProgress.start();
          const response = await add_Buzon(nuevoBuzon.value);
          if (response.success) {
              // Recargar la lista completa para evitar duplicados de ID
              await ListarBuzones();
              modal_addBuzon?.hide();
              nuevoBuzon.value = initializeBuzonCreate(); // Resetear el formulario
              Notif.Success('Buzón agregado con éxito');
          } else {
              Notif.Error(response.message || 'Error al agregar el buzón');
          }
      } catch (error) {
          Alerta.Error("Error",'No se pudo agregar el buzón. Por favor, inténtelo de nuevo más tarde.');
      } finally {
          NProgress.done();
      }
    };
    const CrearBuzonAsignar = async (idusuario: string) => {
      try {
          NProgress.start();
          const response = await add_Buzon_AsignarUsuario(nuevoBuzon.value, idusuario);
          if (response.success) {
              // Recargar la lista completa para evitar duplicados de ID
              await ListarBuzones();
              modal_addBuzon?.hide();
              nuevoBuzon.value = initializeBuzonCreate(); // Resetear el formulario
              Notif.Success('Buzón agregado con éxito');
          } else {
              Notif.Error(response.message || 'Error al agregar el buzón');
          }
      } catch (error) {
          Alerta.Error("Error",'No se pudo agregar el buzón. Por favor, inténtelo de nuevo más tarde.');
      } finally {
          NProgress.done();
      }
    };
   

    const EliminarBuzon = async (buzonId: number) => {
      try {
        const response = await eliminar_buzon(buzonId);
        if (response.success) {
          Notif.Success('Usuario eliminado del buzón.');
          await ListarBuzones(); // Actualizar lista de usuarios asignados
        } else {
          Notif.Error(response.message);
          console.error('Error en remove_user_from_buzon:', response.message);
        }
      } catch (error) {
        Notif.Error('Error al eliminar el usuario del buzón.');
        console.error('Error en removeUserFromBuzon:', error);
      }
    };



  return {
    //Variables
    isloading_buzones,
    Usuario,
    ListaBuzones,
    nuevoBuzon,
    searchQuery,

    // Métodos
    openAddBuzonModal,
    filteredBuzones,
    ListarBuzones,
    CrearBuzon,
    CrearBuzonAsignar,
    EliminarBuzon
  };
}
