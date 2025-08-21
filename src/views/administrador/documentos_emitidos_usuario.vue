<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Documentos Emitidos'" :clase="'text-white'"  :clasehead="'bg-yellow-700 border-0'">
        <!-- Botones de la parte superior derecha -->
         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <!-- <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_inicio">
                <label class="form-label px-2 text-white align-content-center" >-</label>
                <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_fin"> -->
                <button @click="CargarExpedientes" class="btn btn-blue b-dark btn-sm mx-1">
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
                :clasehead="'bg-info-100'"
              > 
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr  >
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

                    <td class="text-wrap">{{ item.tipodocumento_nombre }}</td>
                    <td class="text-wrap" v-if="item.procedencia==='Interno'">{{ item.numeracion_tipodoc_oficina }}</td>
                    <td class="text-wrap" v-else >{{ item.numerodocumento }}</td>

                    <td class="text-wrap f-12" v-if="item.procedencia==='Interno'" >{{ item.cabecera }}</td>
                    <td class="text-wrap" v-else >{{ item.numerodocumento }} - {{ item.anio }}</td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                            {{ item.asunto }} 
                            <badge v-if="item.prioridad==='Urgente'" class="badge  bg-red-200 ">
                              Urgente</badge>
                            <badge v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600">
                              Proyectado</badge> 
                        </div>
                      </div>
                    </td>
                    <td class="text-wrap f-w-600">
                      {{ item.pase_nombre_destino }}
                    </td>
                    <td>
                      {{ item.folios }}
                    </td>
                    <td class="text-wrap f-w-600">
                      {{ item.prioridad }}
                    </td>
                    
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p class="m-b-0 text-gray-600">{{ FormatFecha.convertirFecha_saltolinea(item.fecharegistro) }}</p>                              
                        </div>
                      </div>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-danger btn-sm">
                         <i class="fa fa-file-pdf f-20"></i> 
                      </a>
                     
                    </td>
                    <td  class="px-2 mx-0 text-center">
                  
                      <button type="button" class="btn btn-success btn-sm " @click="handleDoubleClick(item.primogenio_id)">
                        <i class="fa fa-search"></i></button>
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

import { del_documento, get_documentocreados_porOficina, get_listadocumentos_Proyectados } from '../../services/DocumentoServices';
import Notif from '../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Modal_ruta from '../../components/Modal_ruta.vue';

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
    const Lista_documentos = ref<DocumentoPase[]>([]);
    const currentYear = new Date().getFullYear(); // Año actual

    const CargarExpedientes = async () => {
      try {
        NProgress.start();
        const RespuestaJSON = await get_listadocumentos_Proyectados(Usuario.value.buzon_id);
        if (RespuestaJSON.success) {
          Lista_documentos.value = RespuestaJSON.data;
          Notif.Success(RespuestaJSON.message);
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al cargar la lista de inscripciones:', error);
      } finally {
        NProgress.done();
      }
    };

    

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
      { text: '#', width: '30px', key: 'index' }, 
      { text: 'TIPO DOC', width: '10%', key: 'tipodocumento_nombre' },
      { text: 'N°DOC', width: '5%', key: 'numerodocumento' },
      { text: 'CABECERA.', width: '15%', key: 'numerodocumento' },
      { text: 'ASUNTO', width: '30%', key: 'asunto' },
      { text: 'DESTINO', width: '15%', key: 'folios' },
      { text: 'FOLIOS', width: '5%', key: 'folios' },
      { text: 'PRIORIDAD', width: '5%', key: 'prioridad' },
      { text: 'FECHA', width: '5%', key: 'fecharegistro' },
      { text: 'PDF', width: '2%', key: 'acciones' },
      { text: '', width: '2%', key: 'acciones' },
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    const resetear= () =>{
      CargarExpedientes();
    };
    onMounted(async () => {
      CargarExpedientes();
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
      CargarExpedientes,Lista_documentos,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,Pase,DestinoOficina,StoreList,
      iddocumento_seleccionado_dobleclik,handleDoubleClick
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