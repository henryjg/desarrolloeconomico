<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Banjeda de Salida'" :clase="'text-secondary'"  :clasehead="'bg-green-800 border-0'">
        <!-- Botones de la parte superior derecha -->
         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
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
                :filterKeys="['tipopase', 'asunto', 'numerodocumento','destino_nombre','proveido', 'pase_fechaenvio', 'pase_fecharecepcion']"
                :clasehead="'bg-info-100'"
              >
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr class="">
                    <td  class=" mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

                    <td class="px-2 mx-0 ">
                      <span v-if="item.tipopase==='Original'" class="badge bg-light f-12 text-secondary">Original</span>
                      <span v-if="item.tipopase==='Copia'" class="badge bg-light bg-gray-400 text-secondary f-12">Copia</span>
                    </td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} {{ item.cabecera }} 
                          </p>  
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-600 f-12 uppercase text-gray-600">
                              <div v-if="item.administrado_numdocumento==='RUC'">(Adm: {{ item.administrado_razonsocial }})</div>
                              <div v-else>(Adm: {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }})</div>
                          </p>  
                          <p v-if="item.procedencia==='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} - N° - {{ item.numeracion_tipodoc_oficina }} - {{ item.anio }} - {{ item.origen_sigla }} - MDVO/D
                          </p> 
                          <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                            {{ item.asunto }} 
                            <span v-if="item.prioridad==='Urgente'" class="badge  bg-red-300 f-w-600 f-10">
                              Urgente</span> 
                            <badge v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600 f-10">
                              Proyectado</badge> 
                          </p>
                          <p class="m-b-0 text-primary  text-justify f-12"  style=" line-height: 1.2;">
                              {{ item.descripcion }} 
                          </p>
                          <p class="m-b-0 text-orange-900 f-w-500 f-12 pt-2 text-italic"  style=" line-height: 1.2;">
                            <span v-if="item.proveido!==''" > {{ item.proveido }}</span>
                          </p>
                        </div>
                      </div>
                    </td>                    
                    <td v-if="item.expediente_procedencia!=='Interno'" class="text-wrap f-13">{{ item.expediente }} - {{ item.anio }}</td>
                    <td v-if="item.expediente_procedencia==='Interno'" class="text-wrap f-13">-</td>
                    <td class="text-wrap" v-if="item.procedencia==='Interno'">Int</td>
                    <td class="text-wrap" v-else >Ext</td>
                    <td>
                      {{ item.folios }}
                    </td>
                    <td class="text-wrap f-w-500 f-12 lh-sm">
                      {{ item.destino_nombre }}
                    </td>
                    <td class="px-2 mx-0 text-center ">
                        <span v-if="item.estadopase==='Enviado'" class="badge bg-yellow-700 f-12">
                          <i class="ph-duotone ph-clock"></i> {{item.estadopase}}</span>
                        <span v-if="item.estadopase==='Recibido' || item.estadopase==='Tramitado'" class="badge bg-success f-12">
                          <i class="ph-duotone ph-check-circle"></i> Recibido</span>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                        <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_sola(item.pase_fechaenvio) }}</p>
                        <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_horasola(item.pase_fechaenvio) }}</p>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                        <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_sola(item.pase_fecharecepcion) }}</p>
                        <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_horasola(item.pase_fecharecepcion) }}</p>
                    </td>
                    <td  class="px-2 mx-0 text-left">
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-danger btn-sm">
                         <i class="fa fa-file-pdf f-20"></i> 
                      </a>
                      <a v-if="item.pdf_anexo1!==null"  :href="item.pdf_anexo1" target="_blank"  class="btn btn-danger bg-gray-800 border-0 btn-sm mx-1">
                         <i class="fa fa-file-pdf text-white f-20"></i> 
                      </a>
                      <a v-if="item.pdf_anexo2!==null"  :href="item.pdf_anexo2" target="_blank"  class="btn btn-danger  bg-gray-600 border-0 btn-sm">
                         <i class="fa fa-file-pdf text-white f-20"></i> 
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

  <!-- ------------------------------------------------- -->
  

    <Modal_ruta :id="iddocumento_seleccionado_dobleclik"/>

</template>

<script lang="ts">
import DataTable from '../../../components/table/DataTable.vue';  
import CardLayout from '../../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../../config';
import { FormatFecha } from '../../../utils/FormatFecha';
import { list_meses } from '../../../utils/listas.fijas';
import { DocumentoFull, DocumentoPase } from '../../../interfaces/documento.interface';

import {  get_listadocumentos_EnviadosOficina } from '../../../services/DocumentoServices';
import Notif from '../../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../../types/interfaces';
import { usarAuthStore } from '../../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../../composables/ListasIndependientes';
import { ListasStore } from '../../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Modal_ruta from '../../../components/Modal_ruta.vue';

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
        const RespuestaJSON = await get_listadocumentos_EnviadosOficina(Usuario.value.buzon_id);
        if (RespuestaJSON.success) {
          Lista_documentos.value = RespuestaJSON.data;
          // Notif.Success(RespuestaJSON.message);
        } else {
          // Notif.Error(RespuestaJSON.message);
          console.log(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al cargar la lista de inscripciones:', error);
      } finally {
        NProgress.done();
      }
    };




    const headers = ref([
      { text: '#', width: '1%', key: 'index' }, 
      { text: 'TIPO', width: '5%', key: 'tipopase' },
      { text: 'ASUNTO', width: '30%', key: 'asunto' },
      { text: 'Exp.', width: '10%', key: 'asunto' },
      { text: 'P', width: '5%', key: 'numerodocumento' },
      { text: 'FOLIOS', width: '5%', key: 'folios' },
      { text: 'DESTINO', width: '15%', key: 'destino_nombre' },
      { text: 'Estado', width: '5%', key: 'estado' },
      { text: 'Fecha Envio', width: '5%', key: 'pase_fechaenvio' },
      { text: 'Fecha Recepción', width: '5%', key: 'pase_fecharecepcion' },
      { text: 'PDF', width: '2%', key: 'acciones' },
      { text: '', width: '5%', key: 'acciones' },
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





