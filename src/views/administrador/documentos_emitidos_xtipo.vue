<template>
  <div class="row ">
    <div class="col-3">
        <div class="card mt-3">
          <div class="card-body">
            <h4>Tipo de documentos</h4>
            <div class=" ">
                <template v-for="(item, index) in Lista_tipodocumento" :key="item.id">
                    <div class="top-1">
                        <div class="btn btn-light-danger  d-flex py-0 m-1"
                              @click="Cargar_Documentos_xtipo_xbuzonOrigen(item.id)"
                              :id="'lbl_option_'+item.id">
                              <div class="p-1 w-100 bd-highlight justify-content-start d-flex">
                                {{ item.nombre }}
                              </div>
                              <div class="p-1 flex-shrink-1 bd-highlight">
                                {{ item.nrodocumentos }}
                              </div>
                        </div>
                      </div>
                </template>
            </div>
          </div>
        </div>
    </div>
    <div class="col-9">
      <!-- Cards de estadísticas -->
          <div class="row mt-3 mb-0">
            <div class="col-md-2 col-sm-6">
              <div class="card border-0 shadow-sm h-60 bg-yellow-700 px-2 mb-0 ">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalProyectados }}</h4>
                      <small class="text-white-50">Proyectados</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-file-text text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-2 col-sm-6">
              <div class="card border-0 shadow-sm h-60 bg-danger px-2  mb-0">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalPendientes }}</h4>
                      <small class="text-white-50">Pendientes</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-hand text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-2 col-sm-6 ">
              <div class="card border-0 shadow-sm h-60 bg-success px-2  mb-0">
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
            
            <!-- <div class="col-md-2 col-sm-6 my-2">
              <div class="card border-0 shadow-sm h-60 bg-info px-2 ">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalDocumentos }}</h4>
                      <small class="text-white-50">Total Docs</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-files text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

            <div class="col-md-2 col-sm-6">
              <div class="card border-0 shadow-sm h-60 bg-secondary px-2  mb-0">
                <div class="card-body text-center text-white p-2">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="text-start">
                      <h4 class="mb-0 text-white fw-bold">{{ totalTiposDocumento }}</h4>
                      <small class="text-white-50">Total Docs</small>
                    </div>
                    <div class="text-end">
                      <i class="ph-duotone ph-stack text-white fs-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Documentos Emitidos'" :clase="'text-white'"  :clasehead="'bg-yellow-7<00 border-0'">
        <!-- Botones de la parte superior derecha -->
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <button @click="Cargar_Expedientes_xOficina" class="btn btn-blue b-dark btn-sm mx-1">
                  <i class="ti ti-refresh"></i>
                </button>
                <button @click="resetear" class="btn btn-secondary btn-sm mx-1">
                  <i class="fa fa-broom"></i>
                </button>
              </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          
          
          <DataTable
                :headers="headers"
                :items="Lista_documentos"
                :filterKeys="['fecharegistro', 'tipodocumento_nombre', 'numerodocumento', 'asunto', 'prioridad','fecharegistro']"
                :clasehead="'bg-info-100 '"
              > 
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr class="table-bordered ">
                    <td  class="px-2 mx-0 text-center text-sm">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>
                    <td class="text-wrap f-12"  >{{ item.cabecera }}</td>

                    <td class="text-wrap f-12" v-if="item.procedencia==='Interno'">{{ item.numeracion_tipodoc_oficina }}</td>
                    <td class="text-wrap f-12" v-else >{{ item.numerodocumento }}</td>
                    <td class="text-wrap f-12" v-else >{{ item.numerodocumento }} - {{ item.anio }}</td>
                    <td class="text-wrap f-12">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                            {{ item.asunto }} 
                            <badge v-if="item.prioridad==='Urgente'" class="badge  bg-red-200 ">
                              Urgente</badge>
                            <badge v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600">
                              Proyectado</badge> 
                        </div>
                        <p class="text-sm mb-0"><span class="f-w-600">Destino:</span>  {{ item.pase_nombre_destino }}</p>
                      </div>
                    </td>
                 
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p class="m-b-0 text-gray-600 text-sm">{{ FormatFecha.convertirFecha_saltolinea(item.fecharegistro) }}</p>                              
                        </div>
                      </div>
                    </td>

                    <td class="px-2 mx-0 text-center">
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-danger btn-sm">
                         <i class="fa fa-file-pdf f-20"></i> 
                      </a>
                    </td>

                    <td  class="px-2 mx-0 text-center">
                      <button type="button" class="btn btn-success btn-sm " @click="handleDoubleClick(item.primogenio_id)">
                        <i class="fa fa-search"></i>
                      </button>
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
import { DocumentoFull, DocumentoPase } from '../../interfaces/documento.interface';

import { del_documento, get_documentocreados_porOficina } from '../../services/DocumentoServices';
import Notif from '../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Modal_ruta from '../../components/Modal_ruta.vue';
import { useDocumentos } from '../../composables/useDocumentos';

interface frmPase{
  pasetipo:string;
  destinoid:number;
  proveido:string;
  observacion:string;
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
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
    const Pase = ref<frmPase>({
      pasetipo:'Original',
      destinoid: 0,
      proveido:'',
      observacion:'',
    })
    Usuario.value = authStore.usuario_Logueado;
    const StoreList = ListasStore();
    const FunList = Listas();
    const currentYear = new Date().getFullYear(); // Año actual
    const { Lista_tipodocumento,
            Lista_documentos,
            Cargar_Expedientes_xOficina,
            
            Cargar_Tipodocumentos_xusuario,
            Cargar_Documentos_xtipo_xbuzonOrigen,
            isloading_tipodocumentos_usuarios } = useDocumentos();

    const iddocumento_seleccionado_dobleclik = ref(0);
    const idTipoDocumento_seleccionado = ref(0);
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
      { text: '#', width: '2%', key: 'index' }, 
      { text: 'CABECERA.', width: '20%', key: 'numerodocumento' },
      { text: 'N°DOC', width: '5%', key: 'numerodocumento' },

      { text: 'ASUNTO', width: '30%', key: 'asunto' },
      { text: 'FECHA', width: '5%', key: 'fecharegistro' },
      { text: 'PDF', width: '2%', key: 'acciones' },
      { text: '', width: '2%', key: 'acciones' },
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    // conversión a número
    const toNumber = (value: any): number => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };

    const isTrue = (value: any): boolean => {
      return value === true || value === 'true' || value === 1 || value === '1';
    };

    // estadisticas
    const totalProyectados = computed(() => {
      return Lista_documentos.value.filter(doc => isTrue(doc.proyectar)).length;
    });

    const totalPendientes = computed(() => {
      return Lista_documentos.value.filter(doc => 
        doc.pase_fecharecepcion === null || doc.pase_fecharecepcion === ''
      ).length;
    });

    const totalRecibidos = computed(() => {
      return Lista_documentos.value.filter(doc => 
        doc.pase_fecharecepcion !== null && doc.pase_fecharecepcion !== ''
      ).length;
    });

    const totalDocumentos = computed(() => {
      return Lista_documentos.value.length;
    });

    const totalTiposDocumento = computed(() => {
      return Lista_tipodocumento.value.reduce((total, tipo) => {
        return total + toNumber(tipo.nrodocumentos);
      }, 0);
    });

    const resetear= () =>{
      Cargar_Expedientes_xOficina();
    };
    onMounted(async () => {
      Cargar_Expedientes_xOficina();
      Cargar_Tipodocumentos_xusuario();
      FunList.load_Destinos();
      // await load_departamentos();
      

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
      Cargar_Expedientes_xOficina,
      Lista_documentos,
      Lista_tipodocumento,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,Pase,DestinoOficina,StoreList,
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      idTipoDocumento_seleccionado,
      Cargar_Documentos_xtipo_xbuzonOrigen,
      // Estadísticas computadas
      totalProyectados,
      totalPendientes,
      totalRecibidos,
      totalDocumentos,
      totalTiposDocumento
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