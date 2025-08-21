<template>
  <!-- {{ Lista_documentos_copia }} -->
  <div class="row">
    <div class="col-12">
      <CardLayout  :title="'Documentos por Firmar'" :clase="'text-secondary'"  :clasehead="''">
        <!-- Botones de la parte superior derecha -->         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <!-- ---------------------- -->
                <div v-if="Lista_documentos_copia.length>0" class="alert alert-warning py-1 my-0 f-w-500"><span class="fw-bold">{{ Lista_documentos_copia.length }}</span> documentos por despachar</div>
                <div v-else class="alert alert-success py-1 my-0 f-w-500"> <i class="fas fa-check"></i> Despacho Vacío</div>
                <!-- ---------------------- -->
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
                :items="Lista_documentos_copia"
                :filterKeys="['fecharegistro', 'tipodocumento_nombre','pase_buzondestino_nombre', 'cabecera', 'asunto', 'prioridad']"
                :auto-height="true"
                :height-offset="120"
                
                :clasehead="'bg-info-100'"> 
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr id="documento-{{ item.iddoc }}">
                    <!-- {{ item }} -->
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

                    <td v-if="item.pase_estadopase==='Enviado' && item.tipodocumento_nombre==='Proveido'"><badge class=" f-12 badge text-bg-warning">Pase</badge></td>
                    <td v-if="item.pase_estadopase==='Archivo_porconfirmar'"><badge class=" f-12 badge text-bg-danger">Archivo</badge></td>
                    <td v-if="item.pase_estadopase==='Desarchivo_porconfirmar'"><badge class=" f-12 badge text-bg-secondary">DesArchivar</badge></td>
                    <td v-if="item.pase_estadopase==='Enviado' && item.tipodocumento_nombre!=='Proveido'"> <badge class=" f-12 badge text-bg-info">Documento</badge></td>

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
                          <p class="m-b-0 text-orange-900 f-w-500 f-12 pt-2 text-italic"  style=" line-height: 1.2;">
                            <span v-if="item.pase_proveido!==''" > {{ item.pase_proveido }}</span>
                          </p>
                        </div>

                        
                      </div>
                    </td>

                    <!-- *************************************** -->
                    <td v-if="item.tipodocumento_nombre==='Proveido'">
                        <div  v-if="item.pdf_principal!==null"  class="d-flex  px-1 py-0 mb-0 ">
                            <a :href="item.pdf_principal" target="_blank"  class="btn-sm w-50 text-start align-content-center p-r-15 f-12">
                              <img src="../../assets/images/pdf.png" class="wid-20" > Principal
                            </a>
                        </div>
                        <div  v-if="item.pdf_anexo1!==null"  class="d-flex  px-1 py-0 mb-0 ">
                            <a :href="item.pdf_anexo1" target="_blank"  class=" btn-sm w-50 text-start align-content-center p-r-15 f-12">
                              <img src="../../assets/images/pdf.png" class="wid-20" > Anexo 1
                            </a>
                        </div>
                        <div  v-if="item.pdf_anexo2!==null"  class="d-flex  px-1 py-0 mb-0  ">
                            <a :href="item.pdf_anexo2" target="_blank"  class=" btn-sm w-50 text-start align-content-center p-r-15 f-12">
                                <img src="../../assets/images/pdf.png" class="wid-20" > Anexo 2
                            </a>                 
                        </div>
                        <!-- <span class="text-gray-500">Solo Pase</span> -->
                    </td>
                    <td v-if="item.tipodocumento_nombre!=='Proveido'"  class="px-2 mx-0 text-center align-content-center ">
                      <div  v-if="item.pdf_principal!==null"  class="d-flex  px-1 py-0 mb-0 ">
                          <a :href="item.pdf_principal" target="_blank"  class="btn-sm w-50 text-start align-content-center p-r-5 text-sm">
                            <img src="../../assets/images/pdf.png" class="wid-20" > Principal
                          </a>

                          <div class="d-flex " v-if="item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'">
                            <div v-if="item.pdf_principal_estadofirma==='Sin Firma'"
                              class="badge bg-light-warning   text-sm py-1 my-1 align-content-center">{{item.pdf_principal_estadofirma}}</div>
                            <div v-if="item.pdf_principal_estadofirma==='Firmado'"
                              class="badge bg-light-success   text-sm py-1 my-1 align-content-center">{{item.pdf_principal_estadofirma}}</div>
                            <div v-if="Usuario.rol_id===1" class="btn btn-outline-secondary btn-sm mx-1 d-flex text-sm" @click="openFirmaModal(item.pdf_principal, item.iddoc,'pdf_principal')">
                              <i class="ph-duotone ph-fingerprint-simple Firmar p-r-5 " style="font-size:17px"></i> Firmar
                            </div>
                          </div>
                      </div>
                      <div  v-if="item.pdf_anexo1!==null"  class="d-flex  px-1 py-0 mb-0 ">
                          <a :href="item.pdf_anexo1" target="_blank"  class=" btn-sm w-50 text-start align-content-center p-r-5 text-sm">
                            <img src="../../assets/images/pdf.png" class="wid-20" > Anexo 1
                          </a>
                          
                          <div class="d-flex " v-if="item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'">
                            <div v-if="item.pdf_anexo1_estadofirma==='Sin Firma'"
                              class="badge bg-light-warning   text-sm py-1 my-1 align-content-center">{{item.pdf_anexo1_estadofirma}}</div>
                            <div v-if="item.pdf_anexo1_estadofirma==='Firmado'"
                              class="badge bg-light-success   text-sm py-1 my-1 align-content-center">{{item.pdf_anexo1_estadofirma}}</div>
                            <div v-if="Usuario.rol_id===1" class="btn btn-outline-secondary btn-sm py-1 mx-1 d-flex text-sm" @click="openFirmaModal(item.pdf_anexo1, item.iddoc,'pdf_anexo1')">
                              <i class="ph-duotone ph-fingerprint-simple Firmar p-r-5" style="font-size:17px"></i> Firmar
                            </div>
                          </div>
                      </div>
                      <div  v-if="item.pdf_anexo2!==null"  class="d-flex  px-1 py-0 mb-0  ">
                          <a :href="item.pdf_anexo2" target="_blank"  class=" btn-sm w-50 text-start align-content-center p-r-5 text-sm">
                              <img src="../../assets/images/pdf.png" class="wid-20" > Anexo 2
                          </a>

                          <div class="d-flex " v-if="item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'">
                            <div v-if="item.pdf_anexo2_estadofirma==='Sin Firma'"
                              class="badge bg-light-warning   text-sm py-1 my-1 align-content-center">{{item.pdf_anexo2_estadofirma}}</div>
                            <div v-if="item.pdf_anexo2_estadofirma==='Firmado'"
                              class="badge bg-light-success   text-sm py-1 my-1 align-content-center">{{item.pdf_anexo2_estadofirma}}</div>
                            <div v-if="Usuario.rol_id===1" class="btn btn-outline-secondary btn-sm py-1 mx-1 d-flex text-sm" @click="openFirmaModal(item.pdf_anexo2, item.iddoc,'pdf_anexo2')">
                              <i class="ph-duotone ph-fingerprint-simple Firmar p-r-5" style="font-size:17px"></i> Firmar
                            </div>
                          </div>                     
                      </div>                     
                    </td>

                    <td class="text-wrap f-12 lh-sm">
                      <div v-if="item.pase_estadopase==='Archivo_porconfirmar'">
                            Mi Archivo
                      </div>
                      <div v-else-if="item.pase_estadopase==='Desarchivo_porconfirmar'">
                           Buzón Recibidos
                      </div>
                      <div v-else>
                        <ul>
                          <li class="mb-0 text-sm" v-for="value in item.destinos" :key="value">{{ value }}</li>
                        </ul>
                        
                      </div>
                        
                    </td>
                 
                    <td  class="px-2 mx-0 text-center ">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap text-md">
                            <p class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_sola(item.pase_fechaenvio) }}</p>
                            <p class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_horasola(item.pase_fechaenvio) }}</p>                            
                        </div>
                      </div>
                    </td>
                  
                    <!-- <td  class="px-2 mx-0 text-center align-content-center">                      
                      <div v-if="item.estado==='Iniciado'" 
                            class="badge bg-light-primary b-info py-1 text-md">Por Firmar</div>
                    </td> -->
                    
                    <td>
                    <!-- ----------------------- -->
                      <!-- BTN ARCHIVADO -->
                      <button :disabled="isSending_archivar" v-if="Usuario.rol_id===1 && item.pase_estadopase==='Archivo_porconfirmar'" 
                           @click.prevent="confirmar_archivamiento(item.pase_id,'Archivo')" class="btn btn-sm text-sm rounded-2 px-2 btn-secondary">
                          <i class="ph-duotone ph-check f-20"></i> Aprobar
                      </button>
                      <button :disabled="isSending_archivar" v-if="Usuario.rol_id===1 && item.pase_estadopase==='Archivo_porconfirmar'" 
                           @click.prevent="confirmar_desarchivamiento(item.pase_id)" class="btn btn-sm text-sm rounded-2 px-2 btn-danger">
                          <i class="ph-duotone ph-x f-20"></i> Rechazar
                      </button>

                      <!-- BTN DESARCHIVADO -->
                      <button :disabled="isSending_archivar" v-if="Usuario.rol_id===1 && item.pase_estadopase==='Desarchivo_porconfirmar'" 
                           @click.prevent="confirmar_desarchivamiento(item.pase_id)" class="btn btn-sm text-sm rounded-2 px-2 btn-secondary">
                          <i class="ph-duotone ph-check f-20"></i> Aprobar
                      </button>
                      <button :disabled="isSending_archivar" v-if="Usuario.rol_id===1 && item.pase_estadopase==='Desarchivo_porconfirmar'" 
                           @click.prevent="confirmar_archivamiento(item.pase_id,'Archivo')" class="btn btn-sm text-sm rounded-2 px-2 btn-danger">
                          <i class="ph-duotone ph-x f-20"></i> Rechazar
                      </button>


                      <button :disabled="isSending" v-if="Usuario.rol_id===1 && item.tipodocumento_nombre!=='Proveido' &&  item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'" 
                           @click.prevent="Confirmar_Envio_DocumentosFirmados(item.iddoc)" class="btn btn-sm text-sm rounded-2 px-2 btn-secondary">
                          <i class="ph-duotone ph-paper-plane-right f-20"></i> Enviar
                      </button>

                      <!-- ----------------------- -->
                      <button :disabled="isSending" v-if="Usuario.rol_id===1 && item.tipodocumento_nombre==='Proveido' &&  item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'" 
                           @click.prevent="Confirmar_Envio_Proveido(item.iddoc)" class="btn btn-sm text-sm rounded-2 px-2  btn-secondary">
                          <i class="ph-duotone ph-paper-plane-right f-20"></i> Enviar
                      </button>

                      <!-- ----------------------- -->
                      <router-link v-if="item.tipodocumento_nombre==='Proveido' && item.pase_estadopase!=='Recibido' && item.pase_estadopase!=='Tramitado' && item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'" 
                          :to="{ name: 'EditarProveido', params: { iddocumento: item.iddoc } }" class="avtar avtar-xs mx-1 btn btn-warning bg-yellow-900 border-0">
                                <i class="ph-duotone ph-pencil f-20"></i>
                      </router-link>
                      
                      <!-- ----------------------- -->
                      <router-link v-if="item.tipodocumento_nombre!=='Proveido' && item.pase_estadopase!=='Recibido' && item.pase_estadopase!=='Tramitado' && item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'" 
                          :to="{ name: 'EditarDocumento', params: { iddocumento: item.iddoc } }" class="avtar avtar-xs mx-1 btn btn-warning bg-yellow-700 border-0">
                                <i class="ph-duotone ph-pencil f-20"></i>
                      </router-link>
                      
                      <!-- ----------------------- -->
                      <div @click="openModal(item.iddoc)" 
                              v-if="Usuario.rol_id===1 && item.tipodocumento_nombre!=='Proveido'  && item.pase_estadopase!=='Archivo_porconfirmar' && item.pase_estadopase!=='Desarchivo_porconfirmar'" 
                              class="avtar avtar-xs btn btn-danger py-1 mx-1 bg-red-300">
                              <i class="ti ti-clipboard-x"></i>
                      </div>
                    </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>
  <!-- Modal para agregar Requisito -->
  <div class="modal modal-sm fade" id="modalRechazar" tabindex="-1" aria-labelledby="modalRechazarLabel" 
       aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                
                <div class="modal-header bg-red-400 pt-3 pb-2 ">
                    <h6 class="modal-title text-white" id="modalRechazarLabel">
                        <i class="fa fa-exclamation-triangle p-r-15"></i>Observar Documento
                    </h6>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-1">
                    <div class="mb-3">
                        <label for="reqnombre" class="form-label text-dark f-w-600">Motivo</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="frm_motivo" placeholder="Ingresa el nombre" rows="3"></textarea>
                    </div>
                    
                </div>
                <div class="modal-footer py-0 justify-content-center">                    
                    <button :disabled="isSending" class="btn btn-danger" @click="Rechazar_documento">Confirmar</button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
   <!-- //----------------------------- -->
   <Modal_Firma
      :urlpdf="pdfUrl"
      :url-server="urlServer"
      @update:signed-pdf="handleSignedPdf"
      @update:manual="Enviar_Firmado_Manualmente"
    />

    <Modal_ruta :id="iddocumento_seleccionado_dobleclik"/>
</template>

<script lang="ts">
import DataTable from '../../components/table/DataTable.vue';  
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL, ServerFirma } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { Adjunto, DocumentoFull, initialize_Adjunto, initialize_SigaPase, SigaPase } from '../../interfaces/documento.interface';

import { Aceptar_documento_proyectado, actualizar_documentosFirmado, archivo_confirmacion_cambiarestado, Confirmar_EnviodocumentoFirmado, Confirmar_Proveido, ConfirmarEnvio_documento_proyectado, desarchivar_pase, Enviar_FirmadoManualmente, get_listadocumentos_Iniciados, get_listadocumentos_Proyectados, Observar_documento, subir_adjunto } from '../../services/DocumentoServices';
import Notif from '../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Alerta from '../../utils/alertas';

import Modal_Firma from '../../components/Modal_Firma.vue';
import iconDocument from '../../components/icons/icon_newdocument.vue';
import iconFirma from '../../components/icons/icon_firma.vue';
import Modal_ruta from '../../components/Modal_ruta.vue';

interface frmPase{
  pasetipo:string;
  destinoid:number;
  proveido:string;
  observacion:string;
}

interface documento_pdf{
  pdf_url:  string;
  pdf_tipo: string;
  doc_id:   string;
}



export default defineComponent({
  components: {
    CardLayout,
    Multiselect,
    DataTable,
    Modal_ruta,
    Modal_Firma,iconDocument,iconFirma
  },
  setup() {
    const DestinoOficina = ref<Destino>();
    const authStore = usarAuthStore();
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
    const Pase = ref<frmPase>({
        pasetipo:   'Original',
        destinoid:  0,
        proveido:   '',
        observacion:'',
    })
    Usuario.value = authStore.usuario_Logueado;
    const StoreList = ListasStore();
    const FunList = Listas();
    const Lista_documentos = ref<DocumentoFull[]>([]);
    const id_documento_seleccionado = ref("");
    const frm_motivo = ref("");

    // Computed property para crear una copia agrupada de los documentos
    const Lista_documentos_copia = computed(() => {
      const gruposDoc = new Map<number, any>();
      
      Lista_documentos.value.forEach(doc => {
        if (gruposDoc.has(doc.iddoc)) {
          // Si ya existe el documento, agregar el destino al array
          const docExistente = gruposDoc.get(doc.iddoc);
          if (doc.pase_buzondestino_nombre && !docExistente.destinos.includes(doc.pase_buzondestino_nombre)) {
            docExistente.destinos.push(doc.pase_buzondestino_nombre);
          }
        } else {
          // Si es un documento nuevo, crear entrada con array de destinos
          const docCopia = { 
            ...doc,
            destinos: doc.pase_buzondestino_nombre ? [doc.pase_buzondestino_nombre] : []
          };
          gruposDoc.set(doc.iddoc, docCopia);
        }
      });
      
      const resultado = Array.from(gruposDoc.values());
      console.log('Lista_documentos_copia:', resultado);
      return resultado;
    });

    const isSending = ref(false);

    const pdfUrl = ref('');
    const urlServer = ref(ServerFirma);
    const signedPdfUrl = ref<string | null>(null);
    const currentFileToSign = ref<DocumentoFull | null>(null);

    const isUploading   = ref(false); 
    const Array_archivos          = ref<Adjunto[]>([]);

    const current_documento_pdf = ref<documento_pdf>({
      pdf_url:  "",
      pdf_tipo: "",
      doc_id:   "",
    });
    
    
    //-----------------------------------------------------------------------------
    const CargarExpedientes = async () => {
        try {
          Lista_documentos.value=[];
          NProgress.start();
          const RespuestaJSON = await get_listadocumentos_Iniciados(Usuario.value.buzon_id);
          if (RespuestaJSON.success) {
            Lista_documentos.value = RespuestaJSON.data;
            console.table(Lista_documentos.value);
          } else {
            // Notif.Error(RespuestaJSON.message);
          }
        } catch (error) {
          console.error('Error al cargar la lista de inscripciones:', error);
        } finally {
          NProgress.done();
        }
    };

    //-----------------------------------------------------------------------------
    // Función utilitaria para eliminar un documento específico sin recargar toda la tabla
    const eliminarDocumentoPorId = (iddoc: number) => {
      const idx = Lista_documentos.value.findIndex(doc => doc.iddoc === iddoc);
      if (idx !== -1) {
        Lista_documentos.value.splice(idx, 1);
      }
    };

    //-----------------------------------------------------------------------------
    const Aprobar_documento_proyectado = async (iddoc: number) => {
        try {
          const isConfirmado = await Alerta.ConfirmacionRegistro('Desea Aprobar el Documento',"Esta acción indica que el documento está listo para ser enviado a sus destinatarios");
          if (isConfirmado) {
              NProgress.start();
              const RespuestaJSON = await Aceptar_documento_proyectado(iddoc);
              if (RespuestaJSON.success) {
                  CargarExpedientes();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          }  
        } catch (error) {
          console.error('Error al cargar la lista de inscripciones:', error);
        } finally {
          NProgress.done();
        }
    };
    
    //-----------------------------------------------------------------------------
    const Enviar_documento_proyectado = async (iddoc: number) => {
        try {
          const isConfirmado = await Alerta.ConfirmacionRegistro('Desea Confirmar el envío del Documento',"Confirmar");
          if (isConfirmado) {
              NProgress.start();
              const RespuestaJSON = await ConfirmarEnvio_documento_proyectado(iddoc);
              if (RespuestaJSON.success) {
                  CargarExpedientes();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          }  
        } catch (error) {
          console.error('Error al cargar la lista de inscripciones:', error);
        } finally {
          NProgress.done();
        }
    };

    //-----------------------------------------------------------------------------
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
      { text: '#', width: '3%', key: 'index', type: 'string' as const, sortable: false, filterable: false }, 
      { text: 'TIPO', width: '5%', key: 'tipodocumento_nombre', type: 'string' as const, sortable: false, filterable: true },
      { text: 'ASUNTO', width: '35%', key: 'asunto', type: 'string' as const, sortable: false, filterable: false },
      { text: 'Documentos', width: '15%', key: 'estado', type: 'string' as const, sortable: true, filterable: false },

      { text: 'DESTINO', width: '20%', key: 'pase_buzondestino_nombre', type: 'string' as const, sortable: true, filterable: false },
      { text: 'CREADO EL', width: '5%', key: 'pase_fechaenvio', type: 'date' as const, sortable: true, filterable: false },
      { text: '', width: '5%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
    ]);
    
    const resetear= () =>{
      CargarExpedientes();
    };

    onMounted(async () => {
      CargarExpedientes();
      FunList.load_Destinos();
    });



     // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------
        // Nueva función para subir el PDF firmado
        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------


        const SubirArchivoFirmado = async (signedUrl:string) => {
            try {
              NProgress.start();
              isUploading.value = true;
      
              // Descargar el PDF desde la URL
              const response = await fetch(signedUrl);
              if (!response.ok) {
                throw new Error('No se pudo descargar el PDF firmado');
              }
              const blob = await response.blob();
      
              // Convertir el Blob en un File
              const file = new File([blob], `${formatFileName(current_documento_pdf.value.pdf_tipo)}_firmado.pdf`, { type: 'application/pdf' });
      
              // Preparar FormData para subir el archivo
              const formData = new FormData();
              formData.append('archivopdf', file);
      
              // Subir el archivo al servidor
              const RespuestaJSON = await subir_adjunto(formData);
              if (RespuestaJSON.success) {
                //ACTUALIZAR --------------------------------------------------
                const nuevolink = ref("");
                nuevolink.value = HOST_URL + RespuestaJSON.data.toString();
                await actualizar_documentosFirmado(current_documento_pdf.value.doc_id, nuevolink.value, current_documento_pdf.value.pdf_tipo);
                Notif.Success('Archivo firmado subido correctamente');
                await CargarExpedientes();
              } else {
                Notif.Error(RespuestaJSON.message);
              }
            } catch (error) {
              console.error('Error subiendo archivo firmado:', error);
              Notif.Error('Ocurrió un error al subir el archivo firmado');
            } finally {
              NProgress.done();
              isUploading.value = false;
            }
        };


        const Confirmar_Envio_DocumentosFirmados = async (iddoc:string) => {
          const isConfirmado = await Alerta.Confirmacion_envio(
              '¿Estás seguro de Enviar este documento?',
              '¡Confirmar!'
          );
          if (isConfirmado) {
              try {
                  NProgress.start();
                  isSending.value = true;
          
                  const RespuestaJSON = await Confirmar_EnviodocumentoFirmado(iddoc);
                  if (RespuestaJSON.success) {
                    //ACTUALIZAR --------------------------------------------------
                    Alerta.Sucessfull_timer('Envío Completado', 'Se envió el documento firmado correctamente');
                    eliminarDocumentoPorId(Number(iddoc)); // Elimina solo la fila
                  } else {
                    Alerta.Advertencia("Verificar",RespuestaJSON.message);
                  }
              } catch (error) {
                  console.error('Error subiendo archivo firmado:', error);
                  Notif.Error('Ocurrió un error al subir el archivo firmado');
              } finally {
                  NProgress.done();
                  isSending.value = false;
              }
          }
            
        };

        const Enviar_Firmado_Manualmente = async (signedUrl:string) => {

            try {
              NProgress.start();
              isUploading.value = true;
      
             
              const RespuestaJSON = await Enviar_FirmadoManualmente(current_documento_pdf.value.doc_id);
              if (RespuestaJSON.success) {
                //ACTUALIZAR --------------------------------------------------
                Notif.Success('Envío Completado');
                await CargarExpedientes();
              } else {
                Notif.Error(RespuestaJSON.message);
              }
            } catch (error) {
              console.error('Documento No fue Enviado:', error);
              Notif.Error('Ocurrió un error al subir el archivo firmado');
            } finally {
              NProgress.done();
              isUploading.value = false;
            }
        };


        const Confirmar_Envio_Proveido = async (iddoc:string) => {
          const isConfirmado = await Alerta.Confirmacion_envio(
              '¿Estás seguro de Enviar este Pase?',
              '¡Confirmar!'
          );
          if (isConfirmado) {
              try {
                  NProgress.start();
                  isSending.value = true;
          
                  const RespuestaJSON = await Confirmar_Proveido(iddoc);
                  if (RespuestaJSON.success) {
                    //ACTUALIZAR --------------------------------------------------
                    Alerta.Sucessfull_timer('Envío Completado', 'Se envió el documento firmado correctamente');
                    eliminarDocumentoPorId(Number(iddoc)); // Elimina solo la fila
                  } else {
                    Alerta.Advertencia("Verificar",RespuestaJSON.message);
                  }
              } catch (error) {
                  console.error('Error subiendo archivo firmado:', error);
                  Notif.Error('Ocurrió un error al subir el archivo firmado');
              } finally {
                  NProgress.done();
                  isSending.value = false;
              }
          }
            
        };

       
        // -------------------------------------------------------------------------------
        const openFirmaModal = (urldoc: string, iddoc: string, tipo: string) => {

          current_documento_pdf.value.pdf_url = urldoc;
          current_documento_pdf.value.doc_id = iddoc;
          current_documento_pdf.value.pdf_tipo = tipo;

          pdfUrl.value = urldoc;

          const modalElement = document.getElementById('firmaModal');
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
          }
        };



        // -------------------------------------------------------------------------------
        const handleSignedPdf = async (signedUrl: string) => {
          signedPdfUrl.value = signedUrl;
         
          await SubirArchivoFirmado(signedUrl);
          currentFileToSign.value = null;
       
        };

        

       

        function formatFileName(input: string): string {
            // Convertir a minúsculas
            let result = input.toLowerCase();
            
            // Reemplazar "n°" por "n"
            result = result.replace(/n°/g, 'n');
            
            // Reemplazar guiones y espacios por guiones bajos
            result = result.replace(/[-\s]+/g, '_');
            
            // Eliminar cualquier carácter que no sea letra, número o guion bajo
            result = result.replace(/[^a-z0-9_]/g, '');
            
            // Eliminar guiones bajos múltiples consecutivos (por si acaso)
            result = result.replace(/_+/g, '_');
            
            // Eliminar guiones bajos al inicio o final (opcional, según necesidad)
            result = result.replace(/^_|_$/g, '');
            
            return result;
        }


        const Rechazar_documento = async () => {
          const isConfirmado = await Alerta.ConfirmacionRegistro(
                'Confirmación',
                '¿Desea Observar este documento?'
            );
            if (isConfirmado) {
              isSending.value = true;
              NProgress.start();
              try {
                  const response = await Observar_documento(id_documento_seleccionado.value, frm_motivo.value);
                  if(response.success){
                    CargarExpedientes();
                    Notif.Success("Registro Completado");
                    closeModal();
                  }
              } catch (error) {
                  Alerta.Error('Error', 'No se pudo cargar el documento.');
              } finally {
                  NProgress.done();
                  isSending.value = false;
              }
            }
        };
        const openModal = (iddoc:string) => {
          id_documento_seleccionado.value = iddoc;
          const modalElement = document.getElementById('modalRechazar');
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
          }
        };

        const closeModal = () => {
          const modalElement = document.getElementById('modalRechazar');
          if (modalElement) {
            const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
            if (modal) modal.hide();
          }
        };

        // ARCHIVAR 
        // -----------------------------------------------------------

        const isSending_archivar = ref(false);
        const confirmar_archivamiento = async (idpase: number, estado: string) => {
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

        const confirmar_desarchivamiento = async (idpase:number) => {
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
       
    
    return {
      headers,
      HOST_URL,
      FormatFecha,
      CargarExpedientes,Lista_documentos,Lista_documentos_copia,eliminarDocumentoPorId,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,Pase,DestinoOficina,StoreList,
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      Aprobar_documento_proyectado,Enviar_documento_proyectado,
      urlServer,
      signedPdfUrl,handleSignedPdf,pdfUrl,openFirmaModal,
      frm_motivo,Rechazar_documento,
      Confirmar_Envio_DocumentosFirmados,
      Confirmar_Envio_Proveido,
      Enviar_Firmado_Manualmente,isSending,
      confirmar_archivamiento, isSending_archivar,
      confirmar_desarchivamiento
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>