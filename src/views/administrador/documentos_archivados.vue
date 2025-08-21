<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Documentos Archivados'" :clase="'text-blue-900'"  :clasehead="'bg-red-300 border-0'">
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
                :filterKeys="['tipopase', 'asunto', 'numerodocumento', 'origen_nombre', 'destino_nombre','proveido', 'pase_fechaenvio', 'pase_fecharecepcion']"
                :clasehead="'bg-info-100'"
              >
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr>
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

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
                          
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-600 f-12 uppercase text-gray-700">
                              <div v-if="item.administrado_tipodocumento==='RUC'"><i class="fa fa-building text-muted"></i> {{ item.administrado_razonsocial }}</div>
                              <div v-else><i class="fa fa-user text-muted"></i> {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }}</div>
                          </p>  
                          <p v-if="item.procedencia==='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} - N° - {{ item.numeracion_tipodoc_oficina }} - {{ item.anio }} - {{ item.origen_sigla }} - MDVO/D
                          </p> 
                          <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                            {{ item.asunto }} 
                            <span v-if="item.prioridad==='Urgente'" class="badge capitalize py-1 bg-red-300 f-w-600 f-10">
                              Urgente</span> 
                            <span v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600 f-10">
                              Proyectado</span> 
                          </p>
                          <p class="m-b-0 text-primary  text-justify f-12"  style=" line-height: 1.2;">
                              {{ item.descripcion }} 
                          </p>
                          
                        </div>
                      </div>
                    </td>

                    <td v-if="item.expediente_procedencia!=='Interno'" class="text-wrap f-13">{{ item.expediente }} - {{ item.anio }}</td>
                    <td v-if="item.expediente_procedencia==='Interno'" class="text-wrap f-13">-</td>
                    
                    <td class="text-wrap"  >
                      <p class="m-b-0 text-blue-600 f-w-500 f-12 pt-2 text-italic"  style=" line-height: 1.2;">
                            <span v-if="item.pase_proveido!==''" > <i class="fa fa-comment text-primary"></i> {{ item.pase_proveido }}</span>
                          </p>
                    </td>

                    <td>
                      {{ item.folios }}
                    </td>
                    <td class="text-wrap f-12  lh-sm">
                      {{ item.origen_nombre }}
                    </td>
                    <!-- ----------------------------- -->
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_saltolinea(item.pase_fechaenvio) }}</p>                              
                        </div>
                      </div>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <!-- ----------------------------- -->

                      <button v-if="Usuario.rol_id===8" type="button" class="btn btn-primary btn-sm " @click="confirmar_desarchivamiento_consejo(item.idpase)">
                          <i class="fa fa-archive"></i></button>

                      <button v-else type="button" class="btn btn-secondary btn-sm " @click="confirmar_desarchivamiento(item.idpase,'Desarchivo_porconfirmar')">
                          <i class="fa fa-archive"></i></button>

                      



                          
                      <!-- ----------------------------- -->
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-sm">
                          <img src="../../assets/images/iconos/pdf.png" alt="Proyectar" class="wid-30">
                      </a>
                      <!-- ----------------------------- -->
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
import DataTable from '../../components/table/DataTable.vue';  
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { DocumentoPase } from '../../interfaces/documento.interface';

import { archivo_confirmacion_cambiarestado, desarchivar_pase, get_listadocumentos_Archivados, get_listadocumentos_EnviadosOficina } from '../../services/DocumentoServices';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Modal_ruta from '../../components/Modal_ruta.vue';
import Alerta from '../../utils/alertas';
import Notif from '../../utils/notificaciones';


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
        const RespuestaJSON = await get_listadocumentos_Archivados(Usuario.value.buzon_id);
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

    // const Des_Archivar = async (idpase:number) => {

    //   const isConfirmado = await Alerta.ConfirmacionRegistro(
    //             'Confirmación',
    //             'Desea desarchivar este documento?',
    //   );
    //   if (isConfirmado) {
    //       try {
    //           NProgress.start();
    //           const RespuestaJSON = await desarchivar_pase(idpase);
    //           if (RespuestaJSON.success) {
                  
    //               Alerta.Sucessfull_timer("Completado","Pase desarchivado correctamente");
    //               CargarExpedientes();
                  
    //           } else {
    //             console.log(RespuestaJSON.message);
    //           }
    //       } catch (error) {
    //           console.error('Error al cargar la lista de inscripciones:', error);
    //       } finally {
    //           NProgress.done();
    //       }
    //   }
    // };

     // ARCHIVAR 
      // -----------------------------------------------------------

      const isSending_archivar = ref(false);
      const confirmar_desarchivamiento = async (idpase: number, estado: string) => {
          try {
              NProgress.start();
              isSending_archivar.value = true;

              const RespuestaJSON = await archivo_confirmacion_cambiarestado(idpase, estado);
              if (RespuestaJSON.success) {
                  Alerta.Sucessfull_timer("Completado","Documento agregado correctamente");
                  CargarExpedientes();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
              NProgress.done(); 
              isSending_archivar.value = false;
          }
      };

       const confirmar_desarchivamiento_consejo = async (idpase:number) => {
          const isConfirmado = await Alerta.ConfirmacionRegistro(
                    'Confirmación',
                    '¿Desea cancelar esta acción?',
          );
          if (isConfirmado) {
              try {
                  isSending_archivar.value = true;
                  NProgress.start();
                  const RespuestaJSON = await desarchivar_pase(idpase);
                  if (RespuestaJSON.success) {
                      Alerta.Sucessfull_timer("Completado","Pase desarchivado correctamente");
                      CargarExpedientes();
                  } else {
                    console.log(RespuestaJSON.message);
                  }
              } catch (error) {
                  console.error('Error al cargar la lista de inscripciones:', error);
              } finally {
                  NProgress.done();
                  isSending_archivar.value = false;
              }
          }
        };


    
    

    const headers = ref([
      { text: '#', width: '3%', key: 'index', type: 'string' as const, sortable: false, filterable: false }, 
      { text: 'TIPO', width: '5%', key: 'tipopase', type: 'string' as const, sortable: false, filterable: false },
      { text: 'ASUNTO', width: '35%', key: 'asunto', type: 'string' as const, sortable: false, filterable: false },
      { text: 'Exp.', width: '5%', key: 'expediente', type: 'number' as const, sortable: true, filterable: false },
      { text: 'Mensaje', width: '25%', key: 'proveido', type: 'string' as const, sortable: false, filterable: false },
      { text: 'FOLIOS', width: '5%', key: 'folios', type: 'number' as const, sortable: false, filterable: false },
      { text: 'ORIGEN', width: '15%', key: 'origen_nombre', type: 'string' as const, sortable: true, filterable: true },
      { text: 'FECHA', width: '5%', key: 'pase_fechaenvio', type: 'date' as const, sortable: true, filterable: false },
      { text: 'PDF', width: '2%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
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
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      confirmar_desarchivamiento,confirmar_desarchivamiento_consejo
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





