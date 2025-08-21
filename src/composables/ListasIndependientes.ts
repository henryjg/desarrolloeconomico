// src/composables/usarAutenticacion.ts
import { ref } from "vue";
import { get_lista_tiposdocumento } from "../services/DocumentoServices";
import { get_lista_tramites, get_lista_tramites_oficina } from "../services/TramiteServicios";
import { get_departamentos, get_provincia, get_distrito} from "../services/ubigeo";
import { item_id_nombre, Tramite } from "../types/interfaces";
import NProgress from 'nprogress';
import Notif from '../utils/notificaciones';
import Alerta from '../utils/alertas';

import { ListasStore } from "../stores/listasStore";
import { get_lista_RequisitosAsignados } from "../services/RequisitoServices";
import { get_lista_oficinas } from "../services/OficinaServices";
import { get_destinos_unidadesorganicas } from "../services/DestinosServices";



export function Listas() {
  const Departamentos = ref("");
  const Provincias = ref("");

  const Distritos = ref<item_id_nombre[]>([]);
//   const ListaDocumentos = ref<item_id_nombre[]>([]);
//   const ListaTramites = ref<Tramite[]>([]);

  const StoreList =  ListasStore();


  // TRAMITES ----------------------------------------------

  const load_TramitesTupa = async () => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_lista_tramites();
      if (RespuestaJSON.success) {
            StoreList.ListaTramitesTUPA = RespuestaJSON.data;
      } else {
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
    } finally {
      NProgress.done();
    }
  };

  const load_Requisitos_TramitesTupa = async (idtramite: string) => {
    NProgress.start();
    try {
      // StoreList.limpiarListaRequisitosAsignados();
      const RespuestaJSON = await get_lista_RequisitosAsignados(idtramite);
      if (RespuestaJSON.success) {
            StoreList.ListaRequisitosAsignados = RespuestaJSON.data;
      } else {
        StoreList.limpiarListaRequisitosAsignados();
        // Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
    } finally {
      NProgress.done();
    }
  };

  const load_Destinos = async () => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_destinos_unidadesorganicas();
      if (RespuestaJSON.success) {
            StoreList.ListaDestinos = RespuestaJSON.data;
      } else{
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
    } finally {
      NProgress.done();
    }
  };


  const load_TramitesTupa_Oficina = async (idoficina: string) => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_lista_tramites_oficina(idoficina);
      if (RespuestaJSON.success) {
            StoreList.ListaTramitesTUPA_Oficina = RespuestaJSON.data;
      } else {
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
    } finally {
      NProgress.done();
    }
  };

  //  TIPOS DE DOCUMENTOS ----------------------------------

  const load_TiposDocumentos = async () => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_lista_tiposdocumento();
      if (RespuestaJSON.success) {
        StoreList.ListaTipoDocumentos = RespuestaJSON.data;
      } else {
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
    } finally {
      NProgress.done();
    }
  };

  const load_Oficinas = async () => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_lista_oficinas();
      if(RespuestaJSON.success){
          StoreList.ListaOficinas = RespuestaJSON.data;
      }else{
          Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
    }finally {
        NProgress.done();
    }
  };



  //  LISTA DEPARTAMENTOS ---------------------------------

  const load_departamentos = async () => {
    NProgress.start();
    try {
      const RespuestaJSON = await get_departamentos();
      if (RespuestaJSON.success) {
        Departamentos.value = RespuestaJSON.data;
      } else {
        Notif.Error(RespuestaJSON.message);
      }
    } catch (error) {
      Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
    } finally {
      NProgress.done();
    }
  };
  // CARGAR LISTA PROVINCIAS
//   const load_provincias = async () => {
//     NProgress.start();
//     try {
//       const RespuestaJSON = await get_provincia(
//         ubigeoSelected.value.departamento
//       );
//       if (RespuestaJSON.success) {
//         Provincias.value = RespuestaJSON.data;
//       } else {
//         Notif.Error(RespuestaJSON.message);
//       }
//     } catch (error) {
//       Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
//     } finally {
//       NProgress.done();
//     }
//   };
//   // CARGAR DISTRITOS
//   const load_distritos = async () => {
//     NProgress.start();
//     try {
//       const RespuestaJSON = await get_distrito(ubigeoSelected.value.provincia);
//       if (RespuestaJSON.success) {
//         Distritos.value = RespuestaJSON.data;
//       } else {
//         Notif.Error(RespuestaJSON.message);
//       }
//     } catch (error) {
//       Alerta.Error("Error", "No se pudieron cargar los trabajadores.");
//     } finally {
//       NProgress.done();
//     }
//   };

  return {
    load_TramitesTupa,
    load_TramitesTupa_Oficina,
    load_TiposDocumentos,
    load_departamentos,
    load_Requisitos_TramitesTupa,
    load_Oficinas,
    load_Destinos
    // load_provincias,
    // load_distritos,
  };
}
