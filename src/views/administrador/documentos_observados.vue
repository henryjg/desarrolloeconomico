<template>
  <div class="row">
    <div class="col-12">
      <CardLayout  :title="'Documentos Observados'" :clase="'text-secondary'"  :clasehead="''">
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
                :filterKeys="['fecharegistro', 'tipodocumento_nombre', 'numerodocumento', 'asunto', 'prioridad','fecharegistro']"
                :clasehead="'bg-info-100'"> 
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr>
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>
                    <td class="px-2 mx-0 ">
                      <span v-if="item.pase_tipopase==='Original'" class="badge  bg-light f-12 text-secondary">Original</span>
                      <span v-if="item.pase_tipopase==='Copia'" class="badge bg-light bg-gray-400 text-secondary f-12">Copia</span>
                    </td>
                    <td class="text-wrap lh-sm text-sm f-w-600">
                        {{ item.usuarionombre }}
                    </td>
                    <td>
                      <div class="d-inline-block align-middle w-100">
                        <div class="d-inline-block text-wrap">
                          <p class="text-wrap mb-0 f-w-600 text-sm">
                            <span>{{ item.cabecera }}</span>
                            <badge v-if="item.prioridad==='Urgente'" class="badge  bg-red-200 ">
                              Urgente</badge>
                            <badge v-if="item.proyectar" class="badge bg-orange-400  mx-1 f-w-600">
                              PROYECTADO</badge> 
                          </p>
                          <p class="mb-0 text-md text-secondary  text-justify">
                              {{ item.asunto }} 
                          </p>
                          <div class="pt-2 text-sm alert alert-warning py-2"  v-if="item.descripcion!==''" >
                            <h6 clas="mb-0 pb-0">Observación:</h6>
                             {{ item.descripcion }} 
                            </div>   
                        </div>
                       
                      </div>
                    </td>
                    
                    <td class="text-wrap lh-sm text-sm">
                        {{ item.pase_nombre_destino }}
                    </td>
                 
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap text-sm">
                            <p class="m-b-0 text-gray-600 text-sm">{{ FormatFecha.convertirFecha_sola(item.pase_fechaenvio) }}</p>
                            <p class="m-b-0 text-gray-600 text-sm">{{ FormatFecha.convertirFecha_horasola(item.pase_fechaenvio) }}</p>                            
                        </div>
                      </div>
                    </td>
                  
                    <td  class="px-2 mx-0 text-center align-content-center">                      
                      <div v-if="item.estado==='Observado'" 
                            class="badge bg-pink-700 py-1 text-sm">Observado</div>
                    </td>
                    
                    <td  class="px-2 mx-0 text-center align-content-center ">
                      <div  v-if="item.pdf_principal!==null"  class="d-flex py-0 mb-1 alert-light">
                          <a :href="item.pdf_principal" target="_blank"  class="btn-sm text-md w-50 text-start align-content-center">
                            <img src="../../assets/images/pdf.png" class="wid-20" > Principal
                          </a>
                         
                      </div>
                      <div  v-if="item.pdf_anexo1!==null"  class="d-flex py-0 mb-1 alert-light">
                          <a :href="item.pdf_anexo1" target="_blank"  class=" btn-sm text-md w-50 text-start align-content-center">
                            <img src="../../assets/images/pdf.png" class="wid-20" > Anexo 1
                          </a>
                         
                      </div>
                      <div  v-if="item.pdf_anexo2!==null"  class="d-flex py-0 mb-1 alert-light ">
                          <a :href="item.pdf_anexo2" target="_blank"  class=" btn-sm text-md w-50 text-start align-content-center">
                              <img src="../../assets/images/pdf.png" class="wid-20" > Anexo 2
                          </a>
                                          
                      </div>                     
                    </td>
                    <td>
                      
                      <router-link v-if="item.pase_estadopase!=='Recibido' && item.pase_estadopase!=='Tramitado' && (Usuario.rol_id===1 ||Usuario.rol_id===3)"
                          :to="{ name: 'EditarDocumento', params: { iddocumento: item.iddoc } }" class="btn btn-danger btn-sm rounded-3 bg-red-400 border-0 text-sm">
                                <i class="ph-duotone ph-pencil f-20"></i> Corregir
                      </router-link>
                      
                      <div @click="Enviar_corregido_proyectado(item.iddoc)" 
                              v-if="Usuario.rol_id===1" 
                              class="avtar avtar-xs btn btn-warning  py-1 mx-1 bg-yellow-700 text-sm">
                              <i class="ph-duotone ph-paper-plane-right"></i></div>
                    </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

   <!-- //----------------------------- -->
   <Modal_Firma
      :urlpdf="pdfUrl"
      :url-server="urlServer"
      @update:signed-pdf="handleSignedPdf"
    />


</template>

<script lang="ts">
import DataTable from '../../components/table/DataTable.vue';  
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL, ServerFirma } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { Adjunto, DocumentoFull, initialize_Adjunto } from '../../interfaces/documento.interface';

import { Aceptar_documento_proyectado, actualizar_documentosFirmado, ConfirmarEnvio_documento_proyectado, Enviar_a_proyectado, get_listadocumentos_Iniciados, get_listadocumentos_Observados, get_listadocumentos_Proyectados, subir_adjunto } from '../../services/DocumentoServices';
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
          const RespuestaJSON = await get_listadocumentos_Observados(Usuario.value.buzon_id);
          if (RespuestaJSON.success) {
            Lista_documentos.value = RespuestaJSON.data;
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
      { text: 'TIPO', width: '5%', key: 'tipopase', type: 'string' as const, sortable: false, filterable: false },
      { text: 'USUARIO.', width: '15%', key: 'usuario_nombre', type: 'string' as const, sortable: true, filterable: true },
      { text: 'ASUNTO', width: '30%', key: 'asunto', type: 'string' as const, sortable: false, filterable: false },
      { text: 'DESTINO', width: '15%', key: 'origen_nombre', type: 'string' as const, sortable: true, filterable: true },
      { text: 'CREADO EL', width: '5%', key: 'pase_fechaenvio', type: 'date' as const, sortable: true, filterable: false },
      { text: 'Estado', width: '5%', key: 'estado', type: 'string' as const, sortable: true, filterable: false },
      { text: 'Documentos', width: '5%', key: 'estado', type: 'string' as const, sortable: false, filterable: false },
      { text: 'Acciones', width: '5%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
    ]);
    
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
    
    //-----------------------------------------------------------------------------
    const Enviar_corregido_proyectado = async (iddoc: number) => {
        try {
          const isConfirmado = await Alerta.ConfirmacionRegistro('Documento Observado',"¿Desea enviar el documento proyectado corregido?");
          if (isConfirmado) {
              NProgress.start();
              const RespuestaJSON = await Enviar_a_proyectado(iddoc);
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

    
    return {
      headers,
      HOST_URL,
      FormatFecha,
      CargarExpedientes,Lista_documentos,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,Pase,DestinoOficina,StoreList,
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      Aprobar_documento_proyectado,Enviar_documento_proyectado,
      urlServer,
      signedPdfUrl,handleSignedPdf,pdfUrl,openFirmaModal,
      Enviar_corregido_proyectado
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>