<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Documentos Recibidos'" :clase="'text-white'"  :clasehead="'bg-blue-800 border-0'">
        <!-- Botones de la parte superior derecha -->
         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <!-- <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_inicio">
                <label class="form-label px-2 text-white align-content-center" >-</label>
                <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_fin"> -->
                <button @click="btn_devolverdocumento" class="btn btn-success b-dark btn-sm mx-1">
                  <i class="ti ti-arrow-left"></i> Devolver
                </button>
                <button @click="btn_Derivardocumento" class="btn btn-warning bg-yellow-700 b-dark btn-sm mx-1">
                  <i class="ti ti-arrow-right"></i> Derivar
                </button>
                <button @click="btn_Archivardocumento" class="btn btn-danger bg-red-300 b-dark btn-sm mx-1">
                  <i class="ph-duotone ph-arrow-fat-down"></i> Archivar
                </button>
                <!-- <button @click="btn_Archivardocumento" class="btn btn-light b-dark btn-sm mx-1">
                  <i class="ph-duotone ph-printer"></i> Imprimir
                </button> -->
                <button @click="CargarExpedientes" class="btn btn-success b-dark btn-sm mx-1">
                  <i class="ti ti-refresh"></i>
                </button>
                <button @click="resetear" class="btn btn-warning btn-sm mx-1">
                  <i class="fa fa-broom"></i>
                </button>
              </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          <!-- {{ iddocumento_seleccionado_dobleclik }} -->
          <!-- {{ documento_seleccionado }} -->
          <DataTable
                :headers="headers"
                :items="Lista_documentos"
                :filterKeys="['tipopase', 'asunto', 'numerodocumento', 'origen_nombre', 'destino_nombre','proveido', 'pase_fechaenvio', 'pase_fecharecepcion']"
                :clasehead="'bg-info-100'"
              >
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr @click="seleccionar_documento(item)" :class="{ 'bg-light-danger ': documento_seleccionado.idpase === item.idpase,  }">
                    <!-- {{ item.primogenio_id }} -->
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

                    <td class="px-2 mx-0 ">
                      <span v-if="item.tipopase==='Original'" class="badge  bg-light f-12 text-secondary">Original</span>
                      <span v-if="item.tipopase==='Copia'" class="badge bg-light bg-gray-400 text-secondary f-12">Copia</span>
                    </td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} {{ item.cabecera }} 
                          </p>  
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-600 f-12 uppercase text-gray-700">
                              <div v-if="item.administrado_numdocumento==='RUC'">(SOLICITANTE: {{ item.administrado_razonsocial }})</div>
                              <div v-else>(Adm: {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }})</div>
                          </p>  
                          <p v-if="item.procedencia==='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} - N° - {{ item.numeracion_tipodoc_oficina }} - {{ item.anio }} - {{ item.origen_sigla }} - MDVO/D
                          </p> 
                          <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                            {{ item.asunto }} 
                            <span v-if="item.prioridad==='Urgente'" class="badge  bg-red-300 f-w-600 f-10">
                              Urgente</span> 
                            <span v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600 f-10">
                              Proyectado</span> 
                          </p>
                          <p class="m-b-0 text-primary  text-justify f-12"  style=" line-height: 1.2;">
                              {{ item.descripcion }} 
                          </p>
                          <p class="m-b-0 text-yellow-900 f-w-500 f-12 pt-2 text-italic"  style=" line-height: 1.2;">
                            <span v-if="item.pase_proveido!==''" > {{ item.pase_proveido }}</span>
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
                    <td class="text-wrap  lh-sm  f-12 f-w-500">
                      {{ item.origen_nombre }}
                    </td>
                 
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap ">
                          <p class="m-b-0 text-gray-600  f-12">{{ FormatFecha.convertirFecha_sola(item.pase_fecharecepcion) }}</p>
                          <p class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_horasola(item.pase_fecharecepcion) }}</p>                            
                             
                        </div>
                      </div>
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
                        <router-link :to="{ name: 'trabajador_documento_crear', params: { idreferencia: item.documento_id,idpase: item.idpase } }" class="btn btn-primary btn-sm rounded-3">
                          <i class="fa fa-file f-20"></i> Atender
                        </router-link>
                        <router-link 
                          :to="{ name: 'Trabajador_documento_editar', params: { iddocumento: item.documento_id } }" class="btn btn-danger btn-sm rounded-3 bg-red-400 border-0">
                                <i class="ph-duotone ph-pencil f-20"></i>
                        </router-link>
                     
                        
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
    <!-- ------------------------------------------------- -->

    <!-- Modal DEVOLVER -->
    <div class="modal modal-lg fade" id="modal_PASE" tabindex="-1" aria-labelledby="modal_PASE_Aria" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-yellow-800 py-2  ">
                    <h6 class="modal-title text-white" id="modal_PASE_Aria">
                        <i class="fa fa-book p-r-15"></i>DEVOLVER DOCUMENTO
                    </h6>
                    <button type="button" class="btn-close btn-sm f-10" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-2">
                  <label for="reqnombre" class="form-label text-secondary f-16 f-w-600 py-1  mb-2 rounded-2">Datos del Documento:</label>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Documento</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_seleccionado.cabecera}} 
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Tipo</label>
                    </div>
                    <div class="col-md-3">
                           {{documento_seleccionado.tipodocumento_nombre}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Tipo Pase:</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_seleccionado.tipopase}}
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Folios:</label>
                    </div>
                    <div class="col-md-3">
                           {{documento_seleccionado.folios}}
                    </div>
                    
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Origen</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_seleccionado.origen_nombre}}
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Fecha Envío:</label>
                    </div>
                    <div class="col-md-3">
                           {{FormatFecha.fecha_larga_hora(documento_seleccionado.pase_fechaenvio)}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary"></label>
                    </div>
                    <div class="col-md-5">
                           
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Fecha Recepción:</label>
                    </div>
                    <div class="col-md-3">
                           {{FormatFecha.fecha_larga_hora(documento_seleccionado.pase_fecharecepcion)}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">MOTIVO:</label>
                    </div>
                    <div class="col-md-10">
                           {{documento_seleccionado.pase_proveido }}
                    </div>
                  </div>

                  <!-- ---------- -->
                  <!-- Fila 3------ -->
                  <div class="row">                  
                    <div class="mb-3">
                      <label for="reqnombre" class="form-label text-secondary f-16 f-w-600 py-1 mb-2 rounded-2 pt-3">Motivo:</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="PaseDevolver.proveido" rows="3"></textarea>
                    </div>
                  </div>
                  
                </div>
              
                <div class="modal-footer py-0">                    
                    <button :disabled="isSending_devolver" type="submit" class="btn btn-danger" @click="DevolverDocumento()">
                        <i class="ti ti-arrow-left"></i>Devolver</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>


    <!-- MODAL DERIVAR DOCUMETNO -->

    <div class="modal modal-lg fade" id="modal_PASE_DERIVAR" tabindex="-1" aria-labelledby="modal_PASE_Aria" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success  pt-3 pb-2 ">
                    <h6 class="modal-title text-white" id="modal_PASE_Aria">
                        <i class="fa fa-book p-r-15"></i>NUEVO PASE
                    </h6>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-2">
                  <!-- --------------------------------------------------- -->
                  
                  <!-- --------------------------------------------------- -->
                      <div class="row g-1">
                          <div class="col-md-3">
                            <label class="form-label text-gray-600 f-13  mb-0">Proveído</label>
                            <input maxlength="6" type="text" readonly v-model="DocumentoNuevo.numerodocumento" class="form-control" />
                            <ErrorMessage :error="errorsDoc.codigo" />
                          </div>
                          <div class="col-md-2">
                            <label label class="form-label text-gray-600 f-13  mb-0">Año</label>
                            <input readonly type="text" v-model="anioactual" class="form-control" />
                          </div>
                          <div class="col-md-4">
                            <label class="form-label f-13">Prioridad</label>
                            <div class="d-flex ">
                                    <input  v-model="DocumentoNuevo.prioridad"
                                            class="btn-check" checked type="radio" name="radioprioridad" value="Normal" id="lbl_radioprioridad1">
                                    <label class=" btn btn-outline-secondary b-gray py-1 px-2 m-r-5 w-100 f-w-600" for="lbl_radioprioridad1"> Normal </label>

                                    <input  v-model="DocumentoNuevo.prioridad"
                                            class="btn-check"  type="radio" name="radioprioridad" value="Urgente" id="lbl_radioprioridad2">
                                    <label class=" btn btn-outline-danger b-gray px-2 py-1 m-r-5 w-100 f-w-600" for="lbl_radioprioridad2"> Urgente </label>
                            </div>
                            <ErrorMessage :error="errorsDoc.prioridad" />
                          </div>
                      </div>
                      <!-- Fila 2------ -->
                      <div class="row mb-2">
                          <div class="col-md-12">
                          <label class="form-label text-gray-600 f-13 ">MOTIVO</label>
                          <textarea maxlength="249" type="text" v-model="DocumentoNuevo.pase_proveido" class="form-control" ></textarea>
                          <ErrorMessage :error="errorsDoc.pase_proveido" />
                          </div>
                      </div>
                      <!-- Fila 3------ -->
                      <div class="row">
                          <div class="col-md-12  ">
                              <label class="form-label align-content-center f-13 p-r-15 text-gray-600  f-w-600">Original:</label>
                              <multiselect v-model="Original"
                                            @update:modelValue="Add_Original" 
                                            class="f-6"
                                            label="destino"
                                            track-by="id"
                                            placeholder="Seleccionar"
                                            selectLabel=""
                                            deselectLabel=""
                                            selectedLabel=""
                                            :options="listaDestinos">
                              </multiselect>
                            <ErrorMessage :error="error_destino_original" />
                            <div class="p-2  rounded-1 mt-1">
                                <div v-for="Item in Array_oficina_original" :key="Item.id" class="d-flex border-bottom" style="margin-top: 1px; margin-bottom: 1px;">
                                    <div class="w-100"><i class="f-8 fa fa-chevron-right"></i> {{ Item.destino }}</div>
                                    <div class="flex-shrink-1">
                                        <div class="btn f-4 btn-link-hover-danger btn-sm py-0" @click="Remove_Original(Item.id)" >
                                            <i class="fa fa-trash" style="font-size:10px"></i>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>

                  

                  <!-- --------------------------------------------------- -->
                  <!-- --------------------------------------------------- -->
                </div>

                <div class="modal-footer py-0">                    
                    <button :disabled="isSending_derivar" type="submit" class="btn btn-danger" @click="Registrar_Derivacion_Proveido()">
                      <i class="ti ti-arrow-right"></i>Derivar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ARCHIVAR DOCUMETNO -->

    <!-- Modal para agregar Requisito -->
    <div class="modal modal-lg fade" id="modal_PASE_ARCHIVAR" tabindex="-1" aria-labelledby="modal_PASE_Aria" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-gray-300  pt-3 pb-2 ">
                    <h6 class="modal-title " id="modal_PASE_Aria">
                        <i class="ph-duotone ph-arrow-fat-down p-r-15"></i>ARCHIVAR DOCUMENTO
                    </h6>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-2">
                  <!-- <label for="reqnombre" class="form-label text-secondary f-16 f-w-600 py-1  mb-2 rounded-2">Datos del Documento:</label> -->
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label f-13">Documento</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_seleccionado.cabecera}}
                    </div>
                    <div class="col-md-2">
                      <label class="form-label f-13">Tipo</label>
                    </div>
                    <div class="col-md-3">
                           {{documento_seleccionado.tipodocumento_nombre}}
                    </div>
                    
                  </div>

                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    
                    <div class="col-md-2">
                      <label class="form-label f-13">Tipo Pase:</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_seleccionado.tipopase}}
                    </div>
                    <div class="col-md-2">
                      <label class="form-label f-13">Folios:</label>
                    </div>
                    <div class="col-md-3">
                           {{documento_seleccionado.folios}}
                    </div>
                    
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label f-13">Origen</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_seleccionado.origen_nombre}}
                    </div>
                    <div class="col-md-2">
                      <label class="form-label f-13">Fecha Envío:</label>
                    </div>
                    <div class="col-md-3">
                           {{FormatFecha.fecha_larga_hora(documento_seleccionado.pase_fechaenvio)}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label f-13"></label>
                    </div>
                    <div class="col-md-5">
                           
                    </div>
                    <div class="col-md-2">
                      <label class="form-label f-13">Fecha Recepción:</label>
                    </div>
                    <div class="col-md-3">
                           {{FormatFecha.fecha_larga_hora(documento_seleccionado.pase_fecharecepcion)}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label f-13">Asunto:</label>
                    </div>
                    <div class="col-md-10">
                           {{documento_seleccionado.asunto}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div v-if="documento_seleccionado.pase_proveido!==''" class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label f-13">Proveido:</label>
                    </div>
                    <div class="col-md-10">
                           {{documento_seleccionado.pase_proveido}}
                    </div>
                  </div>
                  <!-- Fila 3------ -->
                  <div class="row">  
                    <div class="mb-1">
                        <label class="form-label f-13">Mensaje:</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="PaseArchivar.proveido" rows="3"></textarea>
                    </div>
                  </div>
                 
                  <div class="modal-footer py-0">                    
                      <button :disabled="isSending_archivo" type="submit" class="btn btn-secondary" @click="Archivar_Documento_Especialista()">
                        <i class="ph-duotone ph-arrow-fat-down"></i>Archivar</button>
                      <button type="button" class="btn btn-danger bg-red-300" data-bs-dismiss="modal">Cancelar</button>
                  </div>
                </div>
            </div>
        </div>
    </div>

    <Modal_ruta :id="iddocumento_seleccionado_dobleclik"/>


</template>

<script lang="ts">
import DataTable from '../../../components/table/DataTable.vue';  
import CardLayout from '../../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed, watch } from 'vue';
import NumberFormat from '../../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../../config';
import { FormatFecha } from '../../../utils/FormatFecha';
import { list_meses } from '../../../utils/listas.fijas';
import { DocumentoExterno, DocumentoFull, DocumentoPase, initialize_CrearDocumentoErrores, initialize_CrearDocumentoExterno, initialize_DocumentoPase, initialize_SigaPase, SigaPase } from '../../../interfaces/documento.interface';

import { add_documentoInterno, add_pasedocumento, del_documento, get_correlativo_nrodocumento_buzon, get_listadocumento_estado_UsuarioDestino, recepcionar_pase } from '../../../services/DocumentoServices';
import Notif from '../../../utils/notificaciones';
import { Destino, Destino_Oficina, initializeUsuarioLog, UsuarioLog } from '../../../types/interfaces';
import { usarAuthStore } from '../../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../../composables/ListasIndependientes';
import { ListasStore } from '../../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Modal_ruta from '../../../components/Modal_ruta.vue';
import { RouterLink } from 'vue-router';
import { get_all_buzones_oficina } from '../../../services/DestinosServices';
import Alerta from '../../../utils/alertas';
import ErrorMessage from '../../../components/ErrorMessage.vue';

export default defineComponent({
  components: {
    CardLayout,
    Multiselect,
    DataTable,
    Modal_ruta,
    ErrorMessage 
  },
  setup() {
    const anioactual        = ref(new Date().getFullYear());        
    const DestinoOficina    = ref<Destino>();
    const authStore         = usarAuthStore();
    const Usuario           = ref<UsuarioLog>(initializeUsuarioLog());
    const proveido          = ref("");
    const FrmMotivo         = ref("");
    const FrmMotivoArchivo  = ref("");
    Usuario.value           = authStore.usuario_Logueado;
    const StoreList         = ListasStore();
    const FunList           = Listas();
    const Lista_documentos  = ref<DocumentoPase[]>([]);

    const isSending_derivar = ref(false);
    const isSending_archivo = ref(false);
    const isSending_devolver = ref(false);

    const documento_seleccionado = ref<DocumentoPase>(initialize_DocumentoPase());
    const currentYear       = new Date().getFullYear(); // Año actual

    const PaseDevolver      = ref<SigaPase>(initialize_SigaPase())
    const PaseDerivar       = ref<SigaPase>(initialize_SigaPase())
    const PaseArchivar      = ref<SigaPase>(initialize_SigaPase())


    // ----------------------------------------------------------
    const DocumentoNuevo = ref<DocumentoExterno>(initialize_CrearDocumentoExterno());
    const errorsDoc = ref<any>(initialize_CrearDocumentoErrores());
    const Pase = ref<SigaPase>(initialize_SigaPase());
      
    // ----------------------------------------------------------

    // -----------------------------------------------
    const on_changeOficina = () =>{
        if (DestinoOficina.value){
          PaseDerivar.value.buzondestino_id= parseInt(DestinoOficina.value?.id, 10) || 0;
        }
    }

    const CargarExpedientes = async () => {
      try {
        NProgress.start();
        Lista_documentos.value=[];
        const RespuestaJSON = await get_listadocumento_estado_UsuarioDestino('Recibido',Usuario.value.buzon_id);
        if (RespuestaJSON.success) {
          Lista_documentos.value = RespuestaJSON.data;
          // Notif.Success(RespuestaJSON.message);
        } else {
          console.log(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al cargar la lista de inscripciones:', error);
      } finally {
        NProgress.done();
      }
    };

    const seleccionar_documento    = (docseleccionado:DocumentoPase) =>{
      documento_seleccionado.value = docseleccionado;
    }

    // REGISTRAR PERSONA -------------------
    const RecepcionarDocumento     = async (id:number) => {         
      try {
          NProgress.start();
          //--------
          const RespuestaJSON     = await recepcionar_pase(id);
          if (RespuestaJSON.success) {
            CargarExpedientes();
            closeModal();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
      }
    };



    const cargar_Destinos_oficina = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await get_all_buzones_oficina(Usuario.value.oficina_id);
        if(RespuestaJSON.success){
            listaDestinos.value = RespuestaJSON.data;
        }else{
            Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
          Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
      }finally {
          NProgress.done();
      }
    };

    // DEVOLVER DOCUMENTO -----------------------------------------------------------
    const DevolverDocumento = async () => {     
      if(PaseDevolver.value.proveido===""){
        Notif.Error("Debe indicar el motivo por el que se devuelve el documento");
        return;
      } 
      try {
          NProgress.start();
          isSending_devolver.value = true;
          //--------
          const RespuestaJSON = await add_pasedocumento(PaseDevolver.value);
          if (RespuestaJSON.success) {
            CargarExpedientes();
            closeModal();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
          isSending_devolver.value = false;
      }
    };


    // DAR PASE DOCUMENTO  ---------------------------------------------------
    const Pase_Archivar_Documento = async () => {          
    
      if(PaseArchivar.value.proveido===""){
        Notif.Error("Debe indicar el motivo por el que se Archiva el documento");
        return;
      } 
      try {
          NProgress.start();
          isSending_archivo.value = true;
          //--------
          const RespuestaJSON = await add_pasedocumento(PaseArchivar.value);
          if (RespuestaJSON.success) {
            CargarExpedientes();
            closeModal_archivar();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
          isSending_archivo.value = false;
      }
    };

    // -----------------------------------------------------------------
    const years = computed(() => {
      const yearList = [];
      for (let year = currentYear; year >= 2015; year--) {
        yearList.push(year);
      }
      return yearList;
    });

    const headers = ref([
      { text: '#', width: '3%', key: 'index' }, 
      { text: 'TIPO', width: '5%', key: 'tipopase' },
      { text: 'ASUNTO', width: '35%', key: 'asunto' },
      { text: 'Exp.', width: '5%', key: 'asunto' },
      { text: 'P.', width: '5%', key: 'numerodocumento' },
      { text: 'FOL', width: '5%', key: 'folios' },
      { text: 'REMITE', width: '15%', key: 'origen_nombre' },
      { text: 'RECIBIDO EL', width: '5%', key: 'pase_fechaenvio' },
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
        await cargar_Destinos_oficina();
    });

    const btn_devolverdocumento=()=>{
      resetear_Formulario();
      if(documento_seleccionado.value.idpase!==0){
        PaseDevolver.value.idpase= documento_seleccionado.value.idpase;
        PaseDevolver.value.buzonorigen_id = Usuario.value.buzon_id;
        PaseDevolver.value.buzondestino_id = documento_seleccionado.value.origen_id;
        PaseDevolver.value.tipopase = "Original";
        PaseDevolver.value.proveido = FrmMotivo.value;
        PaseDevolver.value.observacion = "";
        PaseDevolver.value.estadopase = 'Enviado';
        PaseDevolver.value.documento_id = documento_seleccionado.value.documento_id;
        PaseDevolver.value.usuario_id= Usuario.value.id.toString();
        PaseDevolver.value.usuarionombre= Usuario.value.username;
        PaseDevolver.value.idpase_previo = documento_seleccionado.value.idpase;
        PaseDevolver.value.primogenio_id = documento_seleccionado.value.primogenio_id;
        openModal(documento_seleccionado.value)
      }else{
        Alerta.Advertencia("Advertencia","Debe Seleccionar un registro primero");
      }
    }


    const btn_Derivardocumento=()=>{
      console.log("Estado de Derivacion: ",DocumentoNuevo.value);
      resetear_Formulario();
      if(documento_seleccionado.value.idpase!==0){
        console.log("Estado de Derivacion: ",documento_seleccionado.value);
        PaseDerivar.value.buzonorigen_id = Usuario.value.buzon_id;
        PaseDerivar.value.tipopase = "Original";
        PaseDerivar.value.proveido = FrmMotivo.value;
        PaseDerivar.value.observacion = "";
        // if(Usuario.value.rol_id==='2'){
          PaseDerivar.value.estadopase = 'Enviado';
        // }else{
          // PaseDerivar.value.estadopase = 'Enviado';
        // }
        
        PaseDerivar.value.documento_id = documento_seleccionado.value.documento_id;
        PaseDerivar.value.usuario_id= Usuario.value.id.toString();
        PaseDerivar.value.usuarionombre= Usuario.value.username;
        PaseDerivar.value.idpase_previo = documento_seleccionado.value.idpase;
        PaseDerivar.value.tipoaccion = "Pase";
        PaseDerivar.value.primogenio_id = documento_seleccionado.value.primogenio_id;
        // Modificación de Documento a Derivar ---------------------------------------------
        DocumentoNuevo.value.tipodocumento_id=1;
        DocumentoNuevo.value.estado = "Enviado";
        
        DocumentoNuevo.value.asunto = documento_seleccionado.value.asunto;
        DocumentoNuevo.value.folios = documento_seleccionado.value.folios;
        DocumentoNuevo.value.pdf_principal = documento_seleccionado.value.pdf_principal;
        DocumentoNuevo.value.pdf_anexo1 = documento_seleccionado.value.pdf_anexo1;
        DocumentoNuevo.value.pdf_anexo2 = documento_seleccionado.value.pdf_anexo2;
        //Asignandole el Primogenio ---------------------------------------------------------
        DocumentoNuevo.value.referencias_id = documento_seleccionado.value.primogenio_id.toString();
        obtener_correlativo();
        openModal_derivar(documento_seleccionado.value);
      }else{
        Alerta.Advertencia("Advertencia","Debe Seleccionar un registro primero");
      }
    }

    const btn_Archivardocumento=()=>{
      if(documento_seleccionado.value.idpase!==0){
        PaseArchivar.value.idpase= documento_seleccionado.value.idpase;
        PaseArchivar.value.buzonorigen_id = Usuario.value.buzon_id;
        PaseArchivar.value.buzondestino_id = Usuario.value.buzon_id;
        PaseArchivar.value.tipopase = "Original";
        PaseArchivar.value.proveido = FrmMotivoArchivo.value;
        PaseArchivar.value.observacion = "";
        PaseArchivar.value.estadopase = 'Archivo';
        PaseArchivar.value.documento_id = documento_seleccionado.value.documento_id;
        PaseArchivar.value.usuario_id= Usuario.value.id.toString();
        PaseArchivar.value.usuarionombre= Usuario.value.username;
        PaseArchivar.value.idpase_previo = documento_seleccionado.value.idpase;
        PaseArchivar.value.primogenio_id = documento_seleccionado.value.primogenio_id;
        openModal_archivar()
      }else{
        Alerta.Advertencia("Advertencia","Debe Seleccionar un registro primero");
      }
    }

    const openModal = (doc:DocumentoPase) => {
      const modalElement = document.getElementById('modal_PASE');
      if (modalElement) {
        const modal = new Modal(modalElement);
        documento_seleccionado.value= doc;
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

    const openModal_derivar = (doc:DocumentoPase) => {
      const modalElement = document.getElementById('modal_PASE_DERIVAR');
      if (modalElement) {
        const modal = new Modal(modalElement);
        documento_seleccionado.value= doc;
        modal.show();
      }
    };

    const closeModal_derivar = () => {
      const modalElement = document.getElementById('modal_PASE_DERIVAR');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };

    const openModal_archivar = () => {
      const modalElement = document.getElementById('modal_PASE_ARCHIVAR');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    const closeModal_archivar = () => {
      const modalElement = document.getElementById('modal_PASE_ARCHIVAR');
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

    // DERIVAR DOCUMENTO CON PROVEIDO
    //------------------------------------
    
    const listaDestinos = ref<Destino_Oficina[]>([]);
    
    const Array_oficina_original  = ref<Destino_Oficina[]>([]);
    const error_destino_original  = ref("");
    const Array_oficina_copia     = ref<Destino_Oficina[]>([]);
    //Destinos
    const Original  = ref<Destino_Oficina>();

    
    const checkIfDarkTheme = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };  
    

  


    // Cargar Destinos
    const obtener_correlativo = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await get_correlativo_nrodocumento_buzon("Interno",DocumentoNuevo.value.tipodocumento_id, Usuario.value.buzon_id);
        if(RespuestaJSON.success){
          DocumentoNuevo.value.numeracion_tipodoc_oficina = RespuestaJSON.data;
          DocumentoNuevo.value.numerodocumento = RespuestaJSON.data;
        }else{
            Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
          Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
      }finally {
          NProgress.done();
      }
    };

    // ----------------------------------------------------------
    const Add_Original = () => {
      if (Original.value) {
        const exists = Array_oficina_original.value.some(
          oficina => oficina.id === Original.value?.id
        );
        if (exists) {
          Notif.Advertencia("El destino ya ha sido agregado");
        } else {
          Array_oficina_original.value.push(Original.value);
          // Notif.Success("Destino agregado correctamente");
        }
      } else {
        Notif.Error("Seleccione un destino");
      }
    };
    // ----------------------------------------------------------
    const Remove_Original = (id: string) => {
      const index = Array_oficina_original.value.findIndex(oficina => oficina.id === id);
      if (index !== -1) {
        Array_oficina_original.value.splice(index, 1); // Elimina el elemento encontrado
        // Notif.Success("Elemento eliminado correctamente");
      } else {
        Notif.Error("Elemento no encontrado");
      }
    };

    // REGISTRAR DOCUMENTO  -------------------------------------------------------------
    const validateFieldDocumentos =  (field: string, value: any) => {
      switch (field) {
        case 'asunto':
          errorsDoc.value[field] = value ? '' : 'Asunto obligatorio';
          break;
      }
    };
    watch(() => DocumentoNuevo.value.asunto, (newVal) => validateFieldDocumentos('asunto', newVal));
    
    // ----------------------------------------------------------        
    const validateDocumento = () => {
      Object.keys(DocumentoNuevo.value).forEach(key => {
        validateFieldDocumentos(key, (DocumentoNuevo.value as any)[key]);
      });
      console.log(errorsDoc.value);
      return !Object.values(errorsDoc.value).some(error => error);
    };


    // -----------------------------------------------------------
    const Registrar_Derivacion_Proveido = async () => {   
        if (!validateDocumento()) {
            Notif.Error("Debe completar todos los campos del documento");
            return;
        }
        if (Array_oficina_original.value.length===0) {
            error_destino_original.value="Elige al menos 1 destino"
            Notif.Error("Debes agregar al menos un destino");
            return;
        }else{
            error_destino_original.value="";
        }          
        try {
            NProgress.start();
            isSending_derivar.value = true;
            // DocumentoNuevo.value.estado="Iniciado";
            DocumentoNuevo.value.cabecera =  "Proveido - N° " +
                                              DocumentoNuevo.value.numeracion_tipodoc_oficina  + " - " + anioactual.value  + " - " + Usuario.value.buzon_sigla  + " -MDVO/D";

            const RespuestaJSON = await add_documentoInterno(DocumentoNuevo.value, Array_oficina_original.value, Array_oficina_copia.value, PaseDerivar.value.idpase_previo);
            if (RespuestaJSON.success) {
                Alerta.Sucessfull_timer("Completado","Documento agregado correctamente");
                CargarExpedientes();
                resetear_Formulario();
                closeModal_derivar();
            } else {
                Notif.Error(RespuestaJSON.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            NProgress.done(); 
            isSending_derivar.value = false;
        }
    };


    const Archivar_Documento_Especialista = async () => {          
        PaseArchivar.value.idpase= documento_seleccionado.value.idpase;
        PaseArchivar.value.buzonorigen_id = Usuario.value.buzon_id;
        PaseArchivar.value.buzondestino_id = Usuario.value.buzon_id;
        PaseArchivar.value.tipopase = "Original";
        PaseArchivar.value.proveido = FrmMotivoArchivo.value;
        PaseArchivar.value.observacion = "";
        PaseArchivar.value.estadopase = 'Archivo';
        PaseArchivar.value.documento_id = documento_seleccionado.value.documento_id;
        PaseArchivar.value.usuario_id= Usuario.value.id.toString();
        PaseArchivar.value.usuarionombre= Usuario.value.username;
        PaseArchivar.value.idpase_previo = documento_seleccionado.value.idpase;
        PaseArchivar.value.primogenio_id = documento_seleccionado.value.primogenio_id;
  
      try {
          NProgress.start();
          isSending_archivo.value = true;
          //--------
          PaseArchivar.value.proveido==="Se admitió el documento y se procedio a archivar el pase.";
          const RespuestaJSON = await add_pasedocumento(PaseArchivar.value);
          if (RespuestaJSON.success) {
            Alerta.Sucessfull_timer("Tarea Completada","El documento se ha archivado correctamente");
             CargarExpedientes();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
          isSending_archivo.value = false;
      }
    };


    //resetear
    const resetear_Formulario = () => {
      DocumentoNuevo.value = initialize_CrearDocumentoExterno();
      errorsDoc.value = initialize_CrearDocumentoErrores();
      Array_oficina_original.value = [];
      Array_oficina_copia.value = [];
      error_destino_original.value = "";
      FrmMotivo.value = "";
      FrmMotivoArchivo.value = "";
      Original.value = undefined; // Resetear el valor del multiselect
    };

    return {
      headers,
      HOST_URL,
      FormatFecha,
      checkValue,
      CargarExpedientes,Lista_documentos,
      years,list_meses,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,FrmMotivo, FrmMotivoArchivo,DestinoOficina,StoreList,RecepcionarDocumento,documento_seleccionado,
      anioactual,
      seleccionar_documento,
      btn_devolverdocumento,proveido,
      PaseDevolver, DevolverDocumento,
       PaseDerivar,
      on_changeOficina, btn_Derivardocumento,
      Pase_Archivar_Documento,openModal_archivar, closeModal_archivar, btn_Archivardocumento,PaseArchivar,
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      //derivar
      DocumentoNuevo,
      Registrar_Derivacion_Proveido,
      Pase,
      Original,
      Array_oficina_original, 
      Add_Original, Remove_Original,   
      errorsDoc,
      listaDestinos,
      error_destino_original,
      obtener_correlativo, isSending_derivar,
      isSending_archivo, isSending_devolver, 
      Archivar_Documento_Especialista
      
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
.handpointer{
  cursor: pointer;
}
</style>





