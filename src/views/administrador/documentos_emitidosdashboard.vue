<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Documentos Emitidos'" :clase="'text-white'"  :clasehead="'bg-yellow-700 border-0'">
        <!-- Botones de la parte superior derecha -->
         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <button @click="Cargar_Detalles_xEstado" class="btn btn-blue b-dark btn-sm mx-1">
                  <i class="ti ti-refresh"></i>
                </button>
                <button @click="resetear" class="btn btn-secondary btn-sm mx-1">
                  <i class="fa fa-broom"></i>
                </button>
              </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          <!-- Cards de estadísticas -->
          <div class="row ">
            <div class="col-md-2 col-sm-6 mt-1">
              <div class="card border-0 shadow-sm h-60 bg-info px-2 mb-2">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalPorRecibir }}</h4>
                      <small class="text-white-50">Por Recibir</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-hand text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-2 col-sm-6 mt-1">
              <div class="card border-0 shadow-sm h-60 bg-warning px-2 mb-2">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalRecibidos }}</h4>
                      <small class="text-white-50">Recibidos</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-arrow-fat-down text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-2 col-sm-6 mt-1">
              <div class="card border-0 shadow-sm h-60 bg-success px-2 mb-2">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalEnviados }}</h4>
                      <small class="text-white-50">Enviados</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-arrow-fat-right text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-2 col-sm-6 mt-1">
              <div class="card border-0 shadow-sm h-60 bg-danger px-2 mb-2">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalArchivados }}</h4>
                      <small class="text-white-50">Archivados</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-bag text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-2 col-sm-6 mt-1">
              <div class="card border-0 shadow-sm h-60 bg-secondary px-2 mb-2"> 
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalBuzones }}</h4>
                      <small class="text-white-50">Total Buzones</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-buildings text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DataTable
                :headers="headers"
                :items="Lista_Documento_x_estado"
                :filterKeys="['buzon_nombres', 'buzon_tipo', 'porrecibir', 'recibidos', 'enviados','archivados']"
                :clasehead="'bg-info-100'"
              > 
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr>
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>
                    <td>{{ item.buzon_nombres }}</td>
                    <td>{{ item.buzon_tipo }}</td>
                    <td class="text-end">
                        <span v-if="item.porrecibir>0">{{ item.porrecibir }}</span>
                        <span v-else>-</span>
                    </td>
                    <td class="text-end">
                        <span v-if="item.recibidos>0">{{ item.recibidos }}</span>
                        <span v-else>-</span>
                    </td>
                    <td class="text-end">
                        <span v-if="item.enviados>0">{{ item.enviados }}</span>
                        <span v-else>-</span>
                    </td>
                    <td class="text-end">
                        <span v-if="item.archivado>0">{{ item.archivado }}</span>
                        <span v-else>-</span>
                    </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

  
    <Modal_ruta :id="iddocumento_seleccionado_dobleclik"/>

</template>

<script lang="ts">
import DataTable from '../../components/table/DataTable.vue';  
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { list_meses } from '../../utils/listas.fijas';
import { Documento_x_estado, DocumentoFull, DocumentoPase } from '../../interfaces/documento.interface';

import { del_documento, get_documentocreados_porOficina, listar_estadisticos_xtipodocumento } from '../../services/DocumentoServices';
import Notif from '../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Modal_ruta from '../../components/Modal_ruta.vue';
import { useDocumentos } from '../../composables/useDocumentos';
import { useSidebarStore } from '../../stores/sidebarStore';

interface frmPase{
  buzon_nombres:string;
  buzon_id:number;
  buzon_tipo:string;
  enviados:number;
  recibidos:number;
  porrecibir:number;
  archivado:number;
}

export default defineComponent({
  components: {
    CardLayout,
    Multiselect,
    DataTable,
    Modal_ruta
  },
  setup() {
    const DestinoOficina = ref<Destino>();
    const authStore = usarAuthStore();
    const sidebarStore = useSidebarStore();
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
    const Pase = ref<frmPase>({
      buzon_nombres: '',
      buzon_id: 0,
      buzon_tipo: '',
      enviados: 0,
      recibidos: 0,
      porrecibir: 0,
      archivado: 0,
    })
    Usuario.value = authStore.usuario_Logueado;
    const StoreList = ListasStore();
    const FunList = Listas();
    const currentYear = new Date().getFullYear(); // Año actual

    const { Lista_tipodocumento,
            Lista_documentos,
            Cargar_Expedientes_xOficina,
            isloading_expedientes,
            Cargar_Tipodocumentos_xusuario,
            Cargar_Documentos_xtipo_xbuzonOrigen,
            Cargar_Detalles_xEstado,Lista_Documento_x_estado,
            isloading_tipodocumentos_usuarios } = useDocumentos();

    

    

    const iddocumento_seleccionado_dobleclik = ref(0);
    const openRuta_modal = (idoc:number) => {
      iddocumento_seleccionado_dobleclik.value = idoc;
      const modalElement = document.getElementById('ruta_Modal');
      if (modalElement) {
        const modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
    };
    // openRuta_modal
    const handleDoubleClick = (iddoc:number) => {
      openRuta_modal(iddoc);
    };

    const headers = ref([ 
      { text: '#', width: '5%', key: 'index', type: 'string' as const, sortable: false, filterable: false }, 
      { text: 'NOMBRE DE BUZÓN', width: '30%', key: 'buzon_nombres', type: 'string' as const, sortable: true, filterable: true },
      { text: 'TIPO DE BUZÓN', width: '10%', key: 'buzon_tipo', type: 'string' as const, sortable: true, filterable: true },
      { text: 'POR RECIBIR', width: '10%', key: 'porrecibir', type: 'number' as const, sortable: true, filterable: true },
      { text: 'RECIBIDO', width: '10%', key: 'recibidos', type: 'number' as const, sortable: true, filterable: true },
      { text: 'ENVIADOS', width: '10%', key: 'enviados', type: 'number' as const, sortable: true, filterable: true },
      { text: 'ARCHIVADOS', width: '10%', key: 'archivados', type: 'number' as const, sortable: true, filterable: true },
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    // Función para convertir valores a número 
    const toNumber = (value: any): number => {
      const num = parseInt(value?.toString() || '0');
      return isNaN(num) ? 0 : num;
    };

    // totales de las estadísticas
    const totalPorRecibir = computed(() => {
      return Lista_Documento_x_estado.value.reduce((total, item: any) => {
        return total + toNumber(item.porrecibir);
      }, 0);
    });

    const totalRecibidos = computed(() => {
      return Lista_Documento_x_estado.value.reduce((total, item: any) => {
        return total + toNumber(item.recibidos);
      }, 0);
    });

    const totalEnviados = computed(() => {
      return Lista_Documento_x_estado.value.reduce((total, item: any) => {
        return total + toNumber(item.enviados);
      }, 0);
    });

    const totalArchivados = computed(() => {
      return Lista_Documento_x_estado.value.reduce((total, item: any) => {
        return total + toNumber(item.archivado);
      }, 0);
    });

    const totalBuzones = computed(() => {
      return Lista_Documento_x_estado.value.length;
    });

    // Función para actualizar el store del sidebar con los totales
    const actualizarSidebarStore = () => {
      // Verificar que el store y el objeto existan
      if (sidebarStore && sidebarStore.datos_stat_documentos) {
        // Actualizar directamente los valores del store
        sidebarStore.datos_stat_documentos.porrecibir = totalPorRecibir.value;
        sidebarStore.datos_stat_documentos.recibidos = totalRecibidos.value;
        sidebarStore.datos_stat_documentos.enviados = totalEnviados.value;
        sidebarStore.datos_stat_documentos.archivado = totalArchivados.value;
      }
    };

    const resetear= () =>{
      Cargar_Detalles_xEstado().then(() => {
        actualizarSidebarStore();
      });
    };
    onMounted(async () => {
      await Cargar_Detalles_xEstado();
      actualizarSidebarStore();
      FunList.load_Destinos();
    });

    const openModal = () => {
      const modalElement = document.getElementById('modal_PASE');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    const closeModal = () => {
      const modalElement = document.getElementById('modal_PASE');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };
    

    return {
      headers,
      HOST_URL,
      FormatFecha,
      checkValue,
      Cargar_Detalles_xEstado,Lista_Documento_x_estado,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,Pase,DestinoOficina,StoreList,
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      // Computed properties para los totales
      totalPorRecibir,
      totalRecibidos,
      totalEnviados,
      totalArchivados,
      totalBuzones,
      // Función para actualizar sidebar
      actualizarSidebarStore
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.text-sentence {
    text-transform: lowercase; /* Capitaliza la primera letra de cada palabra */
}

.text-sentence::first-letter {
    text-transform: uppercase; /* Asegura que solo la primera letra de la oración esté en mayúscula */
}
</style>