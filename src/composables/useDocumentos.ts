// useNegocios.ts
import { computed, ref } from 'vue';
import Notif from '../utils/notificaciones';
import Alerta from '../utils/alertas';
import NProgress from 'nprogress';
import { AxiosError } from 'axios';
import { Documento_x_estado, DocumentoFull, DocumentoPase, tipodocumento } from '../interfaces/documento.interface';
import { Obtener_stat_documentos_todos, get_documentocreados_porOficina, listar_estadisticos_xtipodocumento, Services_Cargar_Documentos_xbuzonOrigen, Services_Cargar_Documentos_xtipo_xbuzonOrigen } from '../services/DocumentoServices';
import { usarAuthStore } from '../stores/autentificacionStore';
import { initializeUsuarioLog, UsuarioLog } from '../types/interfaces';

export function useDocumentos() {

  const authStore = usarAuthStore();
  const Usuario = computed(() => authStore.usuario_Logueado);
  // Datos reactivos
  const Lista_documentos = ref<DocumentoPase[]>([]);
  const Lista_tipodocumento = ref<tipodocumento[]>([]);
  const isloading_tipodocumentos_usuarios = ref(false);
  const isloading_expedientes = ref(false);
  
  const Lista_Documento_x_estado = ref<Documento_x_estado[]>([]);


  // Cargar lista de negocios  -----------------------------------------------------------
  
  const Cargar_Tipodocumentos_xusuario = async () => {
    NProgress.start();
    try {
      isloading_tipodocumentos_usuarios.value=true;
      const response = await Services_Cargar_Documentos_xbuzonOrigen(Usuario.value.buzon_id);
      if (response.success) {
        Lista_tipodocumento.value = response.data;
      } else {
        Notif.Error(response.message || 'Error al cargar la lista de negocios.');
      }
    } catch (error) {
      console.error('Error al cargar la lista de negocios:', error);
      Notif.Error('Error al cargar la lista de negocios.');
    } finally {
      NProgress.done();
      isloading_tipodocumentos_usuarios.value=false;
    }
  };


  //-----------------------------------
  const Cargar_Expedientes_xOficina = async () => {
    try {
        isloading_expedientes.value = true;
        NProgress.start();
        const RespuestaJSON = await get_documentocreados_porOficina(Usuario.value.buzon_id,2025);
        if (RespuestaJSON.success) {
            Lista_documentos.value = RespuestaJSON.data;
            // Notif.Success(RespuestaJSON.message);
        } else {
            Notif.Error(RespuestaJSON.message);
        }
    } catch (error) {
      console.error('Error al cargar la lista de inscripciones:', error);
    } finally {
      NProgress.done();
      isloading_expedientes.value = false;
    }
  };
  
  //-----------------------------------
  const Cargar_Documentos_xtipo_xbuzonOrigen = async (tipoid: number) => {
    try {
        isloading_expedientes.value = true;
        NProgress.start();
        const RespuestaJSON = await Services_Cargar_Documentos_xtipo_xbuzonOrigen(Usuario.value.buzon_id,tipoid);
        if (RespuestaJSON.success) {
            Lista_documentos.value = RespuestaJSON.data;
            // Notif.Success(RespuestaJSON.message);
        } else {
            Notif.Error(RespuestaJSON.message);
        }
    } catch (error) {
      console.error('Error al cargar la lista de inscripciones:', error);
    } finally {
      NProgress.done();
      isloading_expedientes.value = false;
    }
  };


  //------------------------------

  const Cargar_Detalles_xEstado = async () => {
    try {
      NProgress.start();
      const RespuestaJSON = await Obtener_stat_documentos_todos();
      if (RespuestaJSON.success) {
        Lista_Documento_x_estado.value = RespuestaJSON.data;
        // Notif.Success(RespuestaJSON.message);
      } else {
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      console.error('Error al cargar la lista de inscripciones:', error);
    } finally {
      NProgress.done();
    }
  };

  return {
    Lista_tipodocumento,
    Lista_documentos,
    Cargar_Expedientes_xOficina,
    isloading_expedientes,
    Cargar_Tipodocumentos_xusuario,
    isloading_tipodocumentos_usuarios,
    Cargar_Documentos_xtipo_xbuzonOrigen,
    Cargar_Detalles_xEstado,
    Lista_Documento_x_estado
  };
}

