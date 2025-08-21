<template>
  <div class="modal modal-xl fade" id="modalcorreo_administrado" tabindex="-1" aria-labelledby="modalcorreo_administradoLabel"
       aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        
        <div class="modal-header py-1 card_default_bg">
          <p class="modal-title py-0 text-secondary">
            Responder a Administrado - {{ Documento.numerodocumento }}
          </p>
          <button type="button" class="btn-close f-10" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body py-3" ref="printableContent">
            <!-- Loading state -->
            <div v-if="isloading" class="text-center py-4">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
              <p class="mt-2">Cargando información del documento...</p>
            </div>

            <!-- Content when loaded -->
            <div v-else>
              <div class="alert alert-danger mb-0 f-w-600 py-1 float-end b-red-600" v-if="Documento.procedencia==='Externo'" >DOCUMENTO EXTERNO</div>
              <div class="alert alert-info mb-0 f-w-600 py-1 float-end b-red-600" v-if="Documento.procedencia==='ExternoVirtual'" >DOCUMENTO EXTERNO MESA PARTES VIRTUAL</div>
              
              <div class="alert alert-success mb-0 f-w-600 py-1 float-end" v-if="Documento.procedencia==='Interno'" >DOCUMENTO INTERNO</div>
              
              <label for="reqnombre" class="form-label text-secondary f-15 f-w-800 py-1   rounded-2">DATOS DEL EXPEDIENTE PRINCIPAL:</label>
              <hr class="mt-0 b-gray-200">
              <!-- Fila 1------ -->
              <div class="row g-1">
                <div class="col-md-2">
                  <label class="form-label text-secondary">Documento:</label>
                </div>
                <div class="col-md-5">
                       {{Documento.numerodocumento}} 
                </div>
                <div class="col-md-2">
                  <label class="form-label text-secondary">Tipo:</label>
                </div>
                <div class="col-md-3">
                       {{Documento.tipodocumento_nombre}}
                </div>
              </div>

              <!-- Fila 2------ -->
              <div class="row g-1">
                <div class="col-md-2">
                  <label class="form-label text-secondary">Tipo Pase:</label>
                </div>
                <div class="col-md-5">
                       {{Documento.pase_tipopase}}
                </div>
                <div class="col-md-2">
                  <label class="form-label text-secondary">Folios:</label>
                </div>
                <div class="col-md-3">
                       {{Documento.folios}}
                </div>
              </div>
              
              <!-- Fila 3------ -->
              <div v-if="Documento.procedencia!=='Interno'"  class="row g-1">
                <div class="col-md-2">
                  <label class="form-label text-secondary">Administrado:</label>
                </div>
                <div class="col-md-5">
                  <div v-if="Administrado.tipodocumento==='RUC'">
                    {{Administrado.razonsocial}}  
                    <span class="badge bg-gray-200 text-secondary f-w-600 f-12">{{Administrado.tipodocumento}} - {{Administrado.numdocumento}}</span>
                  </div>
                  <div v-else-if="Administrado.tipodocumento==='DNI'">
                    {{Administrado.nombre}} {{Administrado.apellidopat}} {{Administrado.apellidomat}} - 
                    <span class="badge bg-gray-200 text-secondary f-w-600 f-12">{{Administrado.tipodocumento}} - {{Administrado.numdocumento}}</span>
                  </div>
                  <div v-else>
                    {{Documento.administrado_nombre}}
                  </div>
                </div>
                <div class="col-md-2">
                  <label class="form-label text-secondary">DNI:</label>
                </div>
                <div class="col-md-3">
                  {{Administrado.numdocumento || Documento.administrado_numdocumento}}
                </div>
              </div>
              
              <!-- Fila 4------ -->
              <div v-if="Documento.procedencia!=='Interno'"  class="row g-1">
                <div class="col-md-2">
                  <label class="form-label text-secondary">Correo:</label>
                </div>
                <div class="col-md-5">
                  {{Administrado.correo || Documento.administrado_correo}}
                </div>
                <div class="col-md-2">
                  <label class="form-label text-secondary">Celular:</label>
                </div>
                <div class="col-md-3">
                  {{Administrado.celular || Documento.administrado_celular}}
                </div>
              </div>
              
              <!-- Fila 5 - Dirección ------ -->
              <div v-if="Documento.procedencia!=='Interno'"  class="row g-1">
                <div class="col-md-2">
                  <label class="form-label text-secondary">Dirección:</label>
                </div>
                <div class="col-md-10">
                  {{Administrado.direccion}}
                </div>
              </div>
              
              <!-- Fila 6------ -->
              <div class="row g-1">
                <div class="col-md-2">
                  <label class="form-label text-secondary">Asunto:</label>
                </div>
                <div class="col-md-10">
                       {{Documento.asunto}}
                </div>
              </div>

              <div class="mt-4">

                <label for="contenido_correo" class="form-label text-secondary f-15 f-w-800 py-1 rounded-2">MENSAJE:</label>
                <QuillEditor
                  v-model:content="contenidoCorreo"
                  contentType="html"
                  theme="snow"
                  :options="editorOptions"
                  style="height: 300px;"
                />
              </div>
            </div>
            <!-- Cierre del div v-else -->
        </div>
        
        <div class="modal-footer py-2 card_default_bg">
          <button 
            @click="enviarCorreoAdministrado" 
            :disabled="isSendingEmail"
            class="btn btn-success bg-green-500 text-dark btn-sm mx-1"
          >
            <i class="ph-duotone ph-envelope" v-if="!isSendingEmail"></i>
            <i class="fa fa-spinner fa-spin" v-else></i>
            {{ isSendingEmail ? 'Enviando...' : 'Enviar Correo' }}
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from "vue";
import { Modal } from "bootstrap";
import Notif from "../utils/notificaciones";
import Alerta from "../utils/alertas";
import ErrorMessage from '../components/ErrorMessage.vue';
import { DocumentoFull, initialize_DocumentoFull } from "../interfaces/documento.interface";
import { get_documentoCompleto_primerpase } from "../services/DocumentoServices";
import { enviar_correo_html } from "../services/DocumentoServices";
import { Administrado, initializeAdministrado } from "../interfaces/administrado.interface";
import { get_administrado_id } from "../services/AdministradoService";
import NProgress from 'nprogress';
import { FormatFecha } from '../utils/FormatFecha';
import { QuillEditor } from '@vueup/vue-quill';
import dataDocumento from '../datos/data_documento.json';

export default defineComponent({
  components:{
    ErrorMessage,
    QuillEditor
  },
  name: "Modal_correo_administrado",
  props: {
    id: Number
  },
  setup(props) {

    const iddocumento  = computed(() => props.id);
    const isloading    = ref(false);
    const Documento    = ref<DocumentoFull>(initialize_DocumentoFull());
    const Administrado = ref<Administrado>(initializeAdministrado());
    
    // Variables para el correo
    const asuntoCorreo = ref('');
    const contenidoCorreo = ref('');
    const isSendingEmail = ref(false);
    
    // Configuración del editor Quill
    const editorOptions = {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'align': [] }],
        ]
      }
    };

    const printableContent = ref<HTMLDivElement | null>(null);

    const CargarDocumentoID = async () => {         
      try {
          isloading.value = true;
          NProgress.start();
          
          const RespuestaJSON = await get_documentoCompleto_primerpase(Documento.value.iddoc.toString());
          
          if (RespuestaJSON.success) {
              Documento.value = RespuestaJSON.data;
              
              // Cargar datos del administrado si existe
              if(Documento.value.administrado_id !== null){
                try {
                    const RespuestaJSON_Adm = await get_administrado_id(Documento.value.administrado_id.toString());
                    if (RespuestaJSON_Adm.success) {
                        Administrado.value = RespuestaJSON_Adm.data;
                    } else {
                        Notif.Error(RespuestaJSON_Adm.message);
                    }
                } catch (error) {
                    console.error('Error al cargar administrado:', error);
                }
              }
              
              // Configurar plantilla de correo
              const plantilla = dataDocumento[0]?.descripcion || '';
              
              // Determinar el nombre correcto según el tipo de documento
              let nombreAdministrado = 'Estimado/a';
              if (Administrado.value.tipodocumento === 'RUC' && Administrado.value.razonsocial) {
                nombreAdministrado = Administrado.value.razonsocial;
              } else if (Administrado.value.tipodocumento === 'DNI' && Administrado.value.nombre) {
                nombreAdministrado = `${Administrado.value.nombre} ${Administrado.value.apellidopat} ${Administrado.value.apellidomat}`;
              } else if (Documento.value.administrado_nombre) {
                nombreAdministrado = Documento.value.administrado_nombre;
              }
              
              const plantillaPersonalizada = plantilla.replace('{nombre_administrado}', nombreAdministrado);
              
              asuntoCorreo.value = `Respuesta a su documento: ${Documento.value.numerodocumento}`;
              contenidoCorreo.value = plantillaPersonalizada;
              
          } else {
                Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error al cargar documento:', error);
      } finally {
          isloading.value = false;
          NProgress.done();
      }
    };

    // Función para enviar correo
    const enviarCorreoAdministrado = async () => {
      if (!asuntoCorreo.value.trim()) {
        Notif.Error('Debe ingresar un asunto');
        return;
      }
      
      if (!contenidoCorreo.value.trim()) {
        Notif.Error('Debe ingresar el contenido del mensaje');
        return;
      }

      if (!Administrado.value.correo && !Documento.value.administrado_correo) {
        Notif.Error('No se encontró el email del administrado');
        return;
      }

      try {
        isSendingEmail.value = true;
        
        // Determinar el nombre correcto según el tipo de documento
        let nombreCompleto = 'Estimado/a';
        if (Administrado.value.tipodocumento === 'RUC' && Administrado.value.razonsocial) {
          nombreCompleto = Administrado.value.razonsocial;
        } else if (Administrado.value.tipodocumento === 'DNI' && Administrado.value.nombre) {
          nombreCompleto = `${Administrado.value.nombre} ${Administrado.value.apellidopat} ${Administrado.value.apellidomat}`;
        } else if (Documento.value.administrado_nombre) {
          nombreCompleto = Documento.value.administrado_nombre;
        }
          
        const correoAdministrado = Administrado.value.correo || Documento.value.administrado_correo || '';
        
        // Llamar al servicio enviar_correo_html
        await enviar_correo_html({
          nombre: nombreCompleto,
          correo: correoAdministrado,
          asunto: asuntoCorreo.value,
          cuerpohtml: contenidoCorreo.value
        });
        
        // Si llegamos aquí sin error, el correo se envió
        Notif.Success('Correo enviado exitosamente');
        
        // Cerrar modal
        const modalElement = document.getElementById('modalcorreo_administrado');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
          if (modal) modal.hide();
        }
        
        // // Limpiar formulario
        // reset_modal();
        
      } catch (error: any) {
        console.error('Error al enviar correo:', error);
        Notif.Error('Error al enviar el correo');
      } finally {
        isSendingEmail.value = false;
      }
    };

    const closeModal = () => {
      const modalElement = document.getElementById("modalcorreo_administrado");
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
      reset_modal();
    };

    // Watcher que observa los cambios en iddocumento (cuando el id cambia)
    watch(iddocumento, async (newId) => {
      if (newId) {
        Documento.value.iddoc = newId;
        await CargarDocumentoID();
      }
    }, { immediate: true });

    const reset_modal = () => {
      // Reiniciar los valores del modal
      Documento.value = initialize_DocumentoFull();
      Administrado.value = initializeAdministrado();
      asuntoCorreo.value = '';
      contenidoCorreo.value = '';
    };

    return { 
      closeModal, isloading, Documento, Administrado, FormatFecha, iddocumento, printableContent,
      asuntoCorreo, contenidoCorreo, editorOptions, isSendingEmail, enviarCorreoAdministrado
     };
  }
});
</script>

<style>
  input, select,textarea, multiselect{
    background-color: #c2d1d238 !important;
  }
  .tox-tinymce {
    font-size: 12px !important;
    height: 300px !important;
  }
  .tox .tox-tbtn {
    font-size: 12px !important;
    height: 20px !important;
  }
  .tox .tox-statusbar__branding svg {
    fill: rgba(34, 47, 62, .8);
    height: 1.14em;
    vertical-align: -.28em;
    width: 0em !important;
  }
  .tox .tox-edit-area__iframe {
    background-color: #fbfbfb !important;
}
  
</style>
