<template>
  <div class="modal modal-lg fade" id="firmaModal" tabindex="-1" aria-labelledby="firmaModalLabel"
       aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header modal_head_bg py-2">
          <h5 class="modal-title py-0">
            <i class="ph-duotone ph-signature p-r-15"></i> Firmar Documento
          </h5>
          <button type="button" class="btn-close f-10" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-1">
          <div class="d-flex flex-row p-2">
            <button class="btn btn-danger bg-red-300" @click="cargarPDF">
              <i class="ti ti-refresh p-r-5"></i>Cargar</button>
            <!-- ---- -->
            <div class="d-flex px-2">
              <label class="form-label align-content-center px-2 ">NroPágina:</label>
              <select class="form-select" v-model="selectedPage" @change="cargarPDF">
                <option v-for="page in totalPages" :key="page" :value="page">Página {{ page }}</option>
              </select>
            </div>
            <!-- ---- -->
            <div class="d-flex px-2">
              <label class="form-label align-content-center px-2">Motivo:</label>
              <select class="form-select" v-model="motivo_firma">
                <option value="normal">Soy Autor del documento</option>
                <option value="visto">Doy V°B°</option>
                <option value="conformidad">En señal de conformidad</option>
              </select>
            </div>
            <!-- ---- -->
            <div class="d-flex px-2">
              <button class="btn btn-primary mx-1" @click="firmarDocumento">
                <i class="ti ti-writing-sign p-r-5"></i>Firmar</button>

              <button class="btn btn-success mx-1 btn-sm" @click="FirmaManual">
                <i class="ti ti-writing-sign p-r-5"></i>Firma Manual</button>  
                 
              <button class="btn btn-secondary mx-1" @click="GuardarCambios">
                <i class="fa fa-save p-r-5"></i> Guardar Documento</button>              
            </div>
          </div>
          <div class="body-modal">              
                <canvas ref="canvasDocumentFirma"></canvas>
                <div>
                  <canvas ref="rectangleFirma"></canvas>
                </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>

  <div class="loader is-active">
      <div class="p-4 text-center">
          <div class="custom-loader"></div>
          <h2 class="my-3 f-w-400">Cargando FirmaPerú..</h2>
          <p class="mb-0">Espere un momento</p>
      </div>
  </div>

</template>

<script lang="ts">
import { ref, defineComponent, onMounted, nextTick, watchEffect, computed, watch } from 'vue';
import { Alert, Modal } from 'bootstrap';
import { FirmaPosicion } from '../utils/libfirma/firmaPosicion.js';
import { Signature } from '../utils/libfirma/signature.js';
import { FirmaPeru } from '../utils/libfirma/firmaperu.js';
import { Spin } from '../utils/libfirma/spin.js';
import Swal from 'sweetalert2';
import div_loading from '../components/div_loading.vue'; // Ajusta la ruta según tu estructura

import img_firmanormal from '../assets/images/firmadigital/mdvo_firmadigital.png';
import img_visto from '../assets/images/firmadigital/mdvo_visto.png';
import { ServerFirma } from '../config.js';
import Alerta from '../utils/alertas.js';
import { Loadingview } from '../utils/loader.js';




export default defineComponent({
  components: {
    div_loading
  },
  name: 'ModalFirma',
  props: {
    urlpdf: {
      type: String,
      required: true
    },
    urlServer: {
      type: String,
      default: ServerFirma
    }
  },
  emits: ['update:signedPdf', 'update:manual'],
  setup(props, { emit }) {
    const canvasDocumentFirma = ref<HTMLCanvasElement | null>(null);
    const rectangleFirma = ref<HTMLCanvasElement | null>(null);
    const selectedEstampilla = ref<number>(1);
    const isLoading = ref(false);
    let firmaPosicion: FirmaPosicion | null = null;
    const signature = new Signature();
    let scale = 0.75;
    const pdfSeleccionado = ref("");
    const motivo_firma = ref("normal");
    const firma_estado = ref(false);
    const isloading_invoker = ref(false);

    const totalPages = ref<number>(0);
    const selectedPage = ref<number>(1);
    // let pdfDocument: any = null;
    
    const firmaPosicionInstances: { id: string, instance: FirmaPosicion }[] = []; // Almacenar instancias con sus IDs


    const urlpdf = computed(() => props.urlpdf);
    watchEffect(() => {
      if (urlpdf.value !== undefined) {
        pdfSeleccionado.value = urlpdf.value;
      }
    });

    // Observar cambios en urlpdf para recargar el PDF
    watch(() => props.urlpdf, (newUrl) => {
      if (newUrl) {
        selectedPage.value = 1; // Reiniciar a la primera página
        cargarPDF();
        firma_estado.value = false;
      }
    });

    const loadPdfJs = () => {
      if (!window.pdfjsLib) {
        throw new Error('pdfjsLib no está cargado');
      }
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js';
    };

    const limpiarCanvas = () => {
      if (canvasDocumentFirma.value) {
        const context = canvasDocumentFirma.value.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvasDocumentFirma.value.width, canvasDocumentFirma.value.height);
        }
      }
      if (rectangleFirma.value) {
        const context = rectangleFirma.value.getContext('2d');
        if (context) {
          context.clearRect(0, 0, rectangleFirma.value.width, rectangleFirma.value.height);
        }
      }
    };

    const destroyAllFirmaPosicionInstances = () => {
      firmaPosicionInstances.forEach(({ instance }) => {
        instance.destroy();
      });
      firmaPosicionInstances.length = 0; // Limpiar el arreglo
      firmaPosicion = null;
    };


    const cargarPDF = async () => {
      isLoading.value = true;
     
      try {
        loadPdfJs();
        await nextTick();

        if (!canvasDocumentFirma.value || !rectangleFirma.value) {
          throw new Error('Canvas o rectangleFirma no están disponibles');
        }

        // Limpiar el canvas antes de cargar un nuevo PDF
        limpiarCanvas();
        
        const canvas = canvasDocumentFirma.value;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('No se pudo obtener el contexto 2D');

        console.log('Cargando PDF desde:', pdfSeleccionado.value);
        const loadingTask = window.pdfjsLib.getDocument(pdfSeleccionado.value);
        const pdf = await loadingTask.promise;
        totalPages.value = pdf.numPages;  
        const page = await  pdf.getPage(selectedPage.value);
        scale = 1;
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        console.log('Dimensiones del canvas:', canvas.width, canvas.height);

        await page.render({ canvasContext: context, viewport }).promise;
        console.log('PDF renderizado');

        // Destruir instancias anteriores
        destroyAllFirmaPosicionInstances();

        // Crear una nueva instancia con un ID único
        const firmaPosicionId = `firmaPosicion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        firmaPosicion = new FirmaPosicion(rectangleFirma.value, firmaPosicionId);
        firmaPosicionInstances.push({ id: firmaPosicionId, instance: firmaPosicion });

        // firmaPosicion = new FirmaPosicion(rectangleFirma.value);
        firmaPosicion.sizeCanvas(canvas.width, canvas.height);
        // firmaPosicion.setSignatureStyle(selectedEstampilla.value);
        firmaPosicion.setScale(scale);

        const pdfData = await pdf.getData();
        const pdfTexto = new TextDecoder('utf-8').decode(pdfData);
        const signatures = signature.signaturesByPage(pdfTexto, selectedPage.value);
        
        firmaPosicion.dibujarSignatures(canvas, signatures, 'rgb(255, 0, 0, 0.1)');
        firmaPosicion.dibujarInicio(10, 10, 'rgba(127, 191, 63, 0.5)');

      } catch (error:any) {
        console.error('Error al cargar el PDF:', error);
        Swal.fire('Error', 'No se pudo cargar el PDF: ' + error.message, 'error');
      } finally {
        isLoading.value = false;
      }
    };


    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    const firmarDocumento = async () => {
      if (!firmaPosicion) {
        Swal.fire('Error', 'Primero carga el PDF', 'error');
        return;
      }

      try {
          isloading_invoker.value = true;
          Loadingview.show_loader();

          const posx = Math.round(firmaPosicion.getX() / scale);
          const posy = Math.round(firmaPosicion.getY() / scale);
          console.log('Posición de la firma:', { posx, posy });

          // Preparar el PDF (solo uno, con un nombre genérico)
          const pdfs = [{ url: pdfSeleccionado.value, name: 'document' }];

          const reason = ref("");
          const tipoimg = ref("");
          if(motivo_firma.value==="visto"){
              reason.value="Doy V°B°";
              tipoimg.value = "visto";
          }else if(motivo_firma.value==="normal"){
              reason.value="Soy Autor del documento";
              tipoimg.value = "normal";
          }else{
              reason.value="En señal de conformidad";
              tipoimg.value = "visto";
          }

          const firmaParam = {
              posx: posx,
              posy: posy,
              reason: reason.value,
              role: '',
              signatureStyle: selectedEstampilla.value,
              tipoimg: tipoimg.value,
              pageNumber: selectedPage.value,
              visiblePosition:false
          };

          const firma = new FirmaPeru(props.urlServer);
          const token = await firma.autenticacion('usuarioAccesoApi');
          const urlBase = await firma.ejecutar(pdfs, firmaParam, token);

          Swal.fire('', 'El documento ha sido firmado correctamente', 'success');

          // Emitir la URL del PDF firmado
          const signedPdfUrl = `${urlBase}/${encodeURI('document')}/${encodeURI(token)}`;
          pdfSeleccionado.value=`${urlBase}/${encodeURI('document')}/${encodeURI(token)}`;

          firma_estado.value = true;
          
          cargarPDF();

      } catch (error:any) {

          console.error('Error al firmar:', error);
          Swal.fire('Error', 'No se pudo firmar el documento: ' + error.message, 'error');

      } finally {

          isloading_invoker.value = false;
          Loadingview.unload_loader();
      }
    };

    const changePosEstampilla = () => {
      if (firmaPosicion) {
          firmaPosicion.setSignatureStyle(selectedEstampilla.value);
          firmaPosicion.clear(firmaPosicion.LAST_RECTANGLE_X, firmaPosicion.LAST_RECTANGLE_Y);
          firmaPosicion.dibujar(firmaPosicion.LAST_RECTANGLE_X, firmaPosicion.LAST_RECTANGLE_Y, 'rgba(127, 191, 63, 0.5)');
      }
    };

    const onclickCancel = () => {
      const modalElement = document.getElementById('firmaModal');
      if (modalElement) {
          const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
          const focusableElement = document.querySelector('button:not([data-bs-dismiss])') as HTMLElement;
          if (focusableElement) focusableElement.focus();
          modal.hide();
      }
    };

    const GuardarCambios = () =>{
      if( firma_estado.value){
          emit('update:signedPdf', pdfSeleccionado.value);
          onclickCancel();
      }else{
          Alerta.Advertencia("Advertencia","El Documento no ha sido Firmado");
      }
      
    }
     const FirmaManual = async () =>{
      const isConfirmado = await Alerta.ConfirmacionRegistro(
            'Firma Manual',
            '¿Está seguro que el documento será firmado manualmente?',
      );
      if (isConfirmado) {
        emit('update:manual');
        onclickCancel();
      }
    }


    onMounted(() => {
      loadPdfJs();
      // const modalElement = document.getElementById('firmaModal');
      // if (modalElement) {
      //   modalElement.addEventListener('shown.bs.modal', () => {
      //     cargarPDF();
      //   });
      // }
    });

    onMounted(() => {
      loadPdfJs();
    });

    return {
      canvasDocumentFirma,
      rectangleFirma,
      selectedEstampilla,
      isLoading,
      cargarPDF,
      firmarDocumento,
      changePosEstampilla,
      onclickCancel,
      selectedPage,
      totalPages, 
      motivo_firma,
      GuardarCambios, FirmaManual
    };
  }
});
</script>

<style scoped>
.body-modal {
  position: relative;
}
.body-modal > canvas {
  display: block;
}
.body-modal > div {
  position: absolute;
  top: 0;
  left: 0;
}
.body-modal > div > canvas {
  border: 1px solid rgb(244, 244, 244);
}

.modalSpin {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1000000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.1); /* Black w/ opacity */
  }
  .modalSpin > div{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
  
    animation: spin 1s ease infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
</style>