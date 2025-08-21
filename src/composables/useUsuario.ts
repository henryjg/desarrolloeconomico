// useNegocios.ts
import { computed, ref } from 'vue';
import Notif from '../utils/notificaciones';
import Alerta from '../utils/alertas';
import NProgress from 'nprogress';
import { AxiosError } from 'axios';
import { Documento_x_estado, DocumentoFull, DocumentoPase, tipodocumento } from '../interfaces/documento.interface';
import { get_documentocreados_porOficina, listar_estadisticos_xtipodocumento, Services_Cargar_Documentos_xbuzonOrigen, Services_Cargar_Documentos_xtipo_xbuzonOrigen } from '../services/DocumentoServices';
import { usarAuthStore } from '../stores/autentificacionStore';
import { initializeUsuarioLog, UsuarioLog } from '../types/interfaces';
import { deleteTrabajador, getRoles, getUsuariosTramite } from '../services/trabajadorService';
import { Trabajador } from '../interfaces/trabajador.interface';
import { CambiarPass } from '../services/autentificacion';
import { Modal } from 'bootstrap';
import { Rol } from '../interfaces/rol.interface';

export function useUsuario() {

  const authStore = usarAuthStore();
  const Usuario = computed(() => authStore.usuario_Logueado);
  // Datos reactivos



    const ListaUsuario = ref<Trabajador[]>([]);
    const searchQuery = ref('');
    const selected_usuario = ref<Trabajador | null>(null);
    const isloading_usaurio = ref(false);
    const newPassword = ref('');
    const confirmPassword = ref('');
    const listaRoles = ref<Rol[]>([]);
    const selectedRol_id = ref<number>(0);

  

  // Cargar lista de negocios  -----------------------------------------------------------
  
    const Cargar_Usuarios = async () => {
      NProgress.start();
      isloading_usaurio.value = true;
      try {
        const RespuestaJSON = await getUsuariosTramite();
        if (RespuestaJSON.success) {
          ListaUsuario.value = RespuestaJSON.data;
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar los trabajadores.');
      } finally {
        NProgress.done();
        isloading_usaurio.value = false;
      }
    };

    // Filtrar Usuarios por rol
    const filteredUsuarios = computed(() => {
      if (selectedRol_id.value) {
        return ListaUsuario.value.filter(usuario => usuario.rol_id === selectedRol_id.value);
      }
      return ListaUsuario.value;
    });

    // Cargar roles únicos
    const cargarRolesUnicos = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await getRoles();
        if (RespuestaJSON.success) {
          listaRoles.value = RespuestaJSON.data;
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar los roles.');
      } finally {
        NProgress.done();
      }
    };

    let moda_cambiarpass: Modal | null = null;
    const openChangePasswordModal = (trabajador: Trabajador) => {
      selected_usuario.value = trabajador;
      newPassword.value = '';
      confirmPassword.value = '';
      const modalElement = document.getElementById('changePasswordModal_uadmin');
      if (modalElement) {
        moda_cambiarpass = new Modal(modalElement);
        moda_cambiarpass.show();
      }
    };

    const changePassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        Notif.Error('Las contraseñas no coinciden');
        return;
      }
      if (!selected_usuario.value) {
        Notif.Error('No se seleccionó un trabajador');
        return;
      }
      try {
        const response = await CambiarPass(selected_usuario.value.id.toString(), newPassword.value);
        if (response.success) {
          Notif.Success('Contraseña cambiada con éxito');
          if (moda_cambiarpass) moda_cambiarpass.hide();
        } else {
          Notif.Error(response.message);
        }
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        Notif.Error('Error al cambiar la contraseña');
      }
    };

    const del_Usuario = async (id: number) => {
      const isConfirmado = await Alerta.Confirmacion(
        '¿Estás seguro de que deseas eliminar este trabajador?',
        'Esta acción no se puede deshacer.'
      );
      if (isConfirmado) {
        isloading_usaurio.value = true; 
        try {
          NProgress.start();
          const RespuestaJSON = await deleteTrabajador(id);
          if (RespuestaJSON.success) {
            ListaUsuario.value = ListaUsuario.value.filter(item => item.id !== id);
            Notif.Success(RespuestaJSON.message);
          } else {
            Notif.Error(RespuestaJSON.message);
          }
        } catch (error) {
          console.error('Error al eliminar el trabajador:', error);
          Notif.Error('Error al eliminar el trabajador');
        } finally {
          NProgress.done();
          isloading_usaurio.value = false;
        }
      }
    };

  return {
    ListaUsuario,
      searchQuery,
      del_Usuario,
      openChangePasswordModal,
      changePassword,
      newPassword,
      confirmPassword,
      Cargar_Usuarios,

      cargarRolesUnicos,
      listaRoles,
      selectedRol_id,
      filteredUsuarios,

      selected_usuario,
      isloading_usaurio,
  };
}

