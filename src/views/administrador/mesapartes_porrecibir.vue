<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      {{ documentosSeleccionados.length }} documentos seleccionados
      <CardLayout  :title="'Por Recibir'" :clase="'text-secondary'"  :clasehead="'bg-green-800 border-0'">
        <!-- Botones de la parte superior derecha -->
         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <!-- <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_inicio">
                <label class="form-label px-2 text-white align-content-center" >-</label>
                <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_fin"> -->
                <button 
                  :disabled="documentosSeleccionados.length === 0" 
                  @click="recibirDocumentosSeleccionados" 
                  class="btn btn-success b-dark btn-sm mx-1">
                  <i class="ti ti-check"></i> Recibir Seleccionados ({{ documentosSeleccionados.length }})
                </button>
                <button 
                  :disabled="documentosSeleccionados.length === 0" 
                  @click="limpiarSeleccionTabla" 
                  class="btn btn-warning btn-sm mx-1">
                  <i class="fa fa-times"></i> Limpiar Selección
                </button>
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
                ref="datatableref"
                :headers="headers"
                :items="Lista_documentos"
                :item-key="'idpase'"
                :selectable="true"
                :selected-items="documentosSeleccionados"
                @update:selected-items="documentosSeleccionados = $event"
                :auto-height="true"
                :hide-loading="true"
                :page-size="50"
                :filterKeys="['negocio_razonsocial', 'negocio_ruc', 'representantelegal_nombre', 'dir_direccioncomercial', 'negocio_actividadcomercial', 'certificado_codigo', 'resolucion_codigo', 'resolucion_codigo', 'itse_tipoinspeccion', 'fecharegistro', 'estado']"
                :clasehead="'bg-info-100'"
              >
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr>
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <h6 class="m-b-0 text-dark uppercase text-justify">
                            <span v-if="item.prioridad==='Urgente'" class="badge  bg-red-300 f-12 ">
                              <i class="fa fa-exclamation-triangle p-r-5"></i>Urgente</span> {{ item.asunto }} 
                          </h6>
                          <!-- <p class="pt-3 m-b-0 text-amarillo">Empresa:</p> -->
                          <p class="m-b-0 pt-0 f-w-600 f-12 uppercase text-gray-600">
                              <span class="text-gray-700 f-w-700"></span>
                              {{ item.tipodocumento_nombre }}
                                </p>  
                          <!-- <p class="m-b-0 text-gray-600 f-12"><strong>RUC:</strong> {{ item.numdoc }}</p>                               -->
                        </div>
                      </div>
                    </td>
                    <td class="px-2 mx-0 ">
                        <span v-if="item.estado==='Casilla'" class=" f-12">
                          <i class="material-icons-two-tone text-danger"> mark_email_read</i>
                        </span>
                        <span v-if="item.estado==='Externo'" class=" f-12">
                            <i class="material-icons-two-tone text-yellow"> mark_email_read</i>
                        </span>
                        <span v-else class="badge bg-success f-12">{{ item.tipodocumento_nombre }}</span>
                    </td>
                    <td>{{ item.codigo }}</td>
                    
                    <td>
                      {{ item.folios }}
                    </td>
                    <td>
                      {{ item.origen_nombre }}
                    </td>
                    <td class="px-2 mx-0 text-center">
                        <span v-if="item.estadopase==='Enviado'" class="badge bg-secondary f-12">Por Recibir</span>
                        
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p class="m-b-0 text-gray-600">{{ FormatFecha.convertirFecha_saltolinea(item.pase_fechaenvio) }}</p>                              
                        </div>
                      </div>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-danger btn-sm">
                         <i class="fa fa-file-pdf f-20"></i> 
                      </a>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      
                      <a href="#" @click.prevent="RecepcionarDocumento(item)" class="btn btn-primary btn-sm">
                          <i class="ti ti-check f-20"></i> Recibir
                      </a>
                    </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

  <!-- ------------------------------------------------- -->
    <!-- ------------------------------------------------- -->


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
import { DocumentoFull, DocumentoPase, initialize_DocumentoPase } from '../../interfaces/documento.interface';

import { del_documento, get_listadocumento_estado_UsuarioDestino, recepcionar_pase } from '../../services/DocumentoServices';
import Notif from '../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Alerta from '../../utils/alertas';

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
  },
  setup() {
    const anioactual    = ref(new Date().getFullYear());        
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

    // Variables para selección múltiple
    const documentosSeleccionados = ref<DocumentoPase[]>([])

    // Variable computada para compatibilidad con sistema anterior
    const documento_seleccionado = computed(() => documentosSeleccionados.value[0] || null)

    // Reference to DataTable component
    const datatableref = ref<InstanceType<typeof DataTable>>()

    const documento_elegido = ref<DocumentoPase>(initialize_DocumentoPase());
    const currentYear = new Date().getFullYear(); // Año actual

    const CargarExpedientes = async () => {
      try {
        NProgress.start();
        Lista_documentos.value=[];
        const RespuestaJSON = await get_listadocumento_estado_UsuarioDestino('Enviado',Usuario.value.id);
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

       // REGISTRAR PERSONA -------------------
    const RecepcionarDocumento = async (docpase:DocumentoPase) => {   
      const isConfirmado = await Alerta.Confirmacion_Recepción('Confirmar la recepción del Documento N° ' + docpase.numerodocumento +':', '' + docpase.asunto);
      if (isConfirmado) {
        try {
          const RespuestaJSON = await recepcionar_pase(docpase.idpase);
          if (RespuestaJSON.success) {
            CargarExpedientes();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
        } catch (error) {
          Alerta.Error('Error', 'Hubo un error al eliminar la oficina.');
        }
      }       
    };

    // Función para recibir múltiples documentos seleccionados
    const recibirDocumentosSeleccionados = async () => {
      if (documentosSeleccionados.value.length === 0) {
        Notif.Error('No hay documentos seleccionados para recibir.');
        return;
      }

      const documentosText = documentosSeleccionados.value.map(doc => doc.numerodocumento).join(', ');
      const isConfirmado = await Alerta.Confirmacion_Recepción(
        `Confirmar la recepción de ${documentosSeleccionados.value.length} documento(s):`, 
        documentosText
      );
      
      if (isConfirmado) {
        try {
          NProgress.start();
          
          // Procesar documentos uno por uno
          for (const documento of documentosSeleccionados.value) {
            const RespuestaJSON = await recepcionar_pase(documento.idpase);
            if (!RespuestaJSON.success) {
              Notif.Error(`Error al recibir documento ${documento.numerodocumento}: ${RespuestaJSON.message}`);
            }
          }
          
          // Limpiar selección y recargar
          documentosSeleccionados.value = [];
          if (datatableref.value) {
            datatableref.value.limpiarSeleccion();
          }
          CargarExpedientes();
          Notif.Success(`Se recibieron ${documentosSeleccionados.value.length} documentos correctamente.`);
          
        } catch (error) {
          console.error('Error al recibir documentos:', error);
          Alerta.Error('Error', 'Hubo un error al recibir los documentos.');
        } finally {
          NProgress.done();
        }
      }
    };

    // Función para limpiar la selección
    const limpiarSeleccionTabla = () => {
      documentosSeleccionados.value = [];
      if (datatableref.value) {
        datatableref.value.limpiarSeleccion();
      }
    };

     // -----------------------------------------------
    const on_changeOficina = () =>{
        if (DestinoOficina.value){
            Pase.value.destinoid= parseInt(DestinoOficina.value?.id, 10) || 0;
        }
      }


    const headers = ref([
      { text: '#', width: '30px', key: 'index', type: 'string' as const, sortable: false, filterable: false }, 
      { text: 'ASUNTO', width: '35%', key: 'asunto', type: 'string' as const, sortable: false, filterable: false },
      { text: 'TIPO DOCUMENTO', width: '10%', key: 'procedencia', type: 'string' as const, sortable: false, filterable: false },
      { text: 'N°EXP.', width: '5%', key: 'codigo', type: 'string' as const, sortable: true, filterable: false },
      { text: 'FOLIOS', width: '5%', key: 'folios', type: 'number' as const, sortable: false, filterable: false },
      { text: 'ORIGEN', width: '10%', key: 'origen_nombre', type: 'string' as const, sortable: true, filterable: true },
      { text: 'Estado', width: '10%', key: 'estadopase', type: 'string' as const, sortable: true, filterable: false },
      { text: 'FECHA', width: '10%', key: 'pase_fechaenvio', type: 'date' as const, sortable: true, filterable: false },
      { text: 'PDF', width: '2%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
      { text: '', width: '5%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
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


    return {
      headers,
      HOST_URL,
      FormatFecha,
      checkValue,
      CargarExpedientes,Lista_documentos,
      list_meses,
      resetear,
      NumberFormat,
      Usuario,
      Pase,DestinoOficina,on_changeOficina,StoreList,RecepcionarDocumento,documento_elegido,
      anioactual,
      // Variables y funciones de selección múltiple
      documentosSeleccionados,
      documento_seleccionado,
      datatableref,
      recibirDocumentosSeleccionados,
      limpiarSeleccionTabla
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





