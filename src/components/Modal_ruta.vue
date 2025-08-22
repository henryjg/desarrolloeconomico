<template>
  <div class="modal modal-xl fade" id="ruta_Modal" tabindex="-1" aria-labelledby="ruta_ModalLabel"
       aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        
        <div class="modal-header py-1 card_default_bg">
          <p class="modal-title py-0 text-secondary">
            <i class="ph-duotone ph-circles-four p-r-15"></i> Seguimiento de Documento 
          </p>
          <button type="button" class="btn-close f-10" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body py-1" ref="printableContent">
            <div class="alert alert-danger mb-0 f-w-600 py-1 float-end b-red-600" v-if="Documento.procedencia==='Externo'" >DOCUMENTO EXTERNO</div>
            <div class="alert alert-info mb-0 f-w-600 py-1 float-end b-red-600" v-if="Documento.procedencia==='ExternoVirtual'" >DOCUMENTO EXTERNO MESA PARTES VIRTUAL</div>
            
            <div class="alert alert-success mb-0 f-w-600 py-1 float-end" v-if="Documento.procedencia==='Interno'" >DOCUMENTO INTERNO</div>
            
            <label for="reqnombre" class="form-label text-secondary f-15 f-w-800 py-1   rounded-2">DATOS DEL EXPEDIENTE PRINCIPAL:</label>
            <hr class="mt-0 b-gray-200">
            <!-- Fila 1------ -->
            <div class="row g-1">
                <div class="col-md-2 col-sm-2 ">
                  <label class="form-label f-13 text-dark f-w-600">DOCUMENTO:</label>
                </div>
                <div class="col-md-5 col-sm-4 text-gray-600">
                    <div v-if="Documento.procedencia==='Interno'" >{{ Documento.cabecera }}</div>
                    <div v-else >{{ Documento.numerodocumento }} - {{ Documento.anio }}</div>
                </div>
                <div class="col-md-2 col-sm-2">
                  <label class="form-label f-13 text-dark f-w-600">TIPO</label>
                </div>
                <div class="col-md-3 col-sm-4 text-gray-600">
                        {{Documento.tipodocumento_nombre}}
                </div>
            </div>

            <!-- Fila 1------ -->
            <div class="row g-1">
                <div class="col-md-2 col-sm-2">
                  <label class="form-label f-13 text-dark f-w-600">TIPO PASE:</label>
                </div>
                <div class="col-md-5 col-sm-4 text-gray-600">
                        {{Documento.pase_tipopase}}
                </div>
                <div class="col-md-2 col-sm-2">
                  <label class="form-label f-13 text-dark f-w-600">FOLIOS:</label>
                </div>
                <div class="col-md-3 col-sm-4 text-gray-600">
                        {{Documento.folios}}
                </div>
            </div>
            <!-- Fila 1------ -->
            <div class="row g-1">
              
                <div class="col-md-2 col-sm-2">
                  <label v-if="Documento.procedencia==='Interno'" class="form-label f-13 f-w-600 text-dark">ORIGEN</label>
                  <label v-else class="form-label f-13 f-w-600 text-dark">ADMINISTRADO</label>
                </div>
                <div v-if="Documento.procedencia==='Interno'" class="col-md-5 col-sm-4 text-gray-600 ">
                        {{Documento.buzonorigen_nombre}}
                </div>
                <div v-else class="col-md-5 col-sm-4 text-gray-600 f-w-600">
                    <div v-if="Administrado.tipodocumento==='RUC'">
                        {{Administrado.razonsocial}}  
                        <span class="badge bg-gray-200 text-secondary f-w-600 f-12">{{Administrado.tipodocumento}} - {{Administrado.numdocumento}}</span>
                        
                    </div>
                    <div v-else-if="Administrado.tipodocumento==='DNI'">
                        {{Administrado.nombre}} {{Administrado.apellidopat}} {{Administrado.apellidomat}} - 
                        <span class="badge bg-gray-200 text-secondary f-w-600 f-12">{{Administrado.tipodocumento}} - {{Administrado.numdocumento}}</span>

                    </div>
                        
                </div>
                <div class="col-md-2 col-sm-2 text-dark f-w-600">
                  <label class="form-label f-13 text-dark f-w-600">FECHA INGRESO:</label>
                </div>
                <div class="col-md-3 col-sm-4 text-gray-600">
                        {{FormatFecha.fecha_larga_hora(Documento.pase_fechaenvio)}}
                </div>
            </div>
             <!-- Fila 1------ -->
            <div v-if="Documento.procedencia!=='Interno'"  class="row g-1">
                <div class="col-md-2 col-sm-2">
                  <label class="form-label f-13 f-w-600 text-dark">CORREO:</label>
                </div>
                <div class="col-md-5 col-sm-4 text-gray-600 ">
                        {{Administrado.correo}}
                </div>
                <div class="col-md-2 col-sm-2 text-dark f-w-600">
                  <label class="form-label f-13 text-dark f-w-600">CELULAR:</label>
                </div>
                <div class="col-md-3 col-sm-4 text-gray-600">
                         {{Administrado.celular}} 
                </div>
            </div>
              <!-- Fila 1------ -->
            <div v-if="Documento.procedencia!=='Interno'"  class="row g-1">
                <div class="col-md-2 col-sm-2">
                  <label class="form-label f-13 f-w-600 text-dark">DIRECCIÓN:</label>
                </div>
                <div class="col-md-10 col-sm-10 text-gray-600 ">
                        {{Administrado.direccion}}
                </div>
                
            </div>
            
            <!-- Fila 1------ -->
            <div class="row g-1">
                <div class="col-md-2 col-sm-2">
                  <label class="form-label f-13 text-dark f-w-600">ASUNTO:</label>
                </div>
                <div class="col-md-10 col-sm-10 text-gray-600">
                  <p class="mb-0" v-if="Documento.procedencia==='Externo'" >{{ Documento.cabecera }}</p>
                  <p class="mb-0">{{Documento.asunto}}</p>
                </div>
            </div>

            <div class="mt-4">
              <div class="card-header">
                  <h6><i class="ph-duotone ph-arrow-fat-right p-r-5"></i> PASES DEL DOCUMENTO</h6>
              </div>
              <div class="card-body f-13">
                    <!-- -------TABLA -->
                    <!-- ----------------------------------------------- -->
                    <div v-if="ListaPases.length===0" class="alert alert-warning mx-3">
                        <i class="ph-duotone ph-path"></i> No existen pases registrados</div>
                    <table v-else class="table table-bordered  table-xs" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th style="width:1%">N°</th>
                            <th style="width:6%">Tipo</th>
                            <th style="width:12%">Origen</th>
                            <th style="width:5%">Enviado el</th>
                            <th style="width:12%">Destino</th>
                            <th style="width:5%">Recibido el</th>
                            <th style="width:15%">Documento</th>
                            <th style="width:5%">Estado</th>
                            <th style="width:25%">Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(pase,index) in ListaPases" :key="pase.idpase">
                            <td class="p-1">{{index + 1 }}</td>
                            <td class="p-1">{{ pase.tipopase }}</td>
                            <td class='text-wrap p-1'>{{ pase.origen_nombre }}</td>
                            <td class='text-wrap p-1 text-center '>
                              <span>{{ FormatFecha.convertirFecha_sola(pase.pase_fechaenvio) }}<br/>
                              {{ FormatFecha.convertirFecha_horasola(pase.pase_fechaenvio) }}</span>
                            </td>
                            <td class='text-wrap p-1'>{{ pase.destino_nombre }}</td>
                            <td class='text-wrap p-1 text-center'>
                              <div v-if="pase.pase_fecharecepcion!==null">
                                <span>{{ FormatFecha.convertirFecha_sola(pase.pase_fecharecepcion) }}<br/>
                                  {{ FormatFecha.convertirFecha_horasola(pase.pase_fecharecepcion) }}</span>
                              </div>
                              <div v-else>-</div>
                            </td>
                            <td class='text-wrap p-1' v-if="pase.procedencia==='Interno'" >{{ pase.tipodocumento_nombre }} Nro- {{ pase.numeracion_tipodoc_oficina }} - {{ pase.sigla }}-MDVO</td>
                            <td class='text-wrap p-1' v-else >{{ pase.numerodocumento }} - {{ pase.anio }}</td>
                            <td class='text-wrap p-1'>{{ pase.estadopase }}</td>
                            <td v-if="pase.tipodocumento_id=='1'" class='text-wrap p-1'>{{ pase.asunto }}</td>  
                            <td v-else class='text-wrap p-1'>{{ pase.pase_proveido }}</td>                  
                          </tr>
                        </tbody>
                      </table>
                    <!-- -------FIN TABLA -->
                    <!-- ----------------------------------------------- -->
                </div>
              </div>
            <!-- //----------------------------------------------------------------------------- -->
            <!-- //----------------------------------------------------------------------------- -->
            <!-- //----------------------------------------------------------------------------- -->
             
            <div class="pt-3">
             <div class="card-header">
                 <h6> <i class="ph-duotone ph-arrow-fat-right p-r-5"></i> DOCUMENTOS REFERENCIADOS</h6>
             </div>
              <div class="card-body f-13">
                   <!-- -------TABLA -->
                   <!-- ----------------------------------------------- -->
                   <div v-if="ListaDocumentosRelacionados.length===0" class="alert alert-warning mx-3">
                      <i class="ph-duotone ph-notepad"></i>
                      No existen referencias</div>
                   <table v-else class="table table-bordered  table-xs" id="pc-dt-simple">
                      <thead>
                        <tr>
                          <th style="width:2%">N°</th>
                          <th style="width:60%">Asunto</th>
                          <th style="width:20%">Documento</th>
                          <th style="width:15%">Enviado el</th>
                          <th style="width:3%">PDF</th>
                        </tr>
                      </thead>
                      <tbody v-for="(pase,index) in ListaDocumentosRelacionados" :key="pase.idpase">
                        <tr v-if="pase.tipodocumento_id!='1'" >
                          <td class="p-1">{{index + 1 }}</td>
                          <td class="p-1 text-wrap">{{ pase.asunto }}</td>
                          <td v-if="pase.procedencia==='Interno'" >{{ pase.tipodocumento_nombre }} Nro- {{ pase.numeracion_tipodoc_oficina }} - {{ pase.sigla }}-MDVO</td>
                          <td v-else >{{ pase.numerodocumento }} - {{ pase.anio }}</td>
                          <td class='text-wrap p-1'>{{ FormatFecha.convertirFecha_saltolinea(pase.fecharegistro) }}</td>
                          <td class='text-wrap p-1'>
                            <a v-if="pase.pdf_principal!==null"  :href="pase.pdf_principal" target="_blank"  class="btn btn-danger btn-sm ">
                              <i class="fa fa-file-pdf f-20"></i> 
                            </a>
                          </td>
                        
                        </tr>
                      </tbody>
                    </table>
                  <!-- -------FIN TABLA -->
                  <!-- ----------------------------------------------- -->
              </div>
            </div>
            
        </div>
        <div class="modal-footer py-0 card_default_bg">
          <!-- {{ Documento.usuario_nombre }} -->
          <div class="alert alert-warning mb-0 f-w-600 py-1 float-end b-red-60 f-12" v-if="Documento.procedencia!=='ExternoVirtual'" >Recepcionado por: {{Documento.usuarionombre}}</div>
          <button @click="printDiv" class="btn btn-success bg-green-500 text-dark btn-sm mx-1">
            <i class="ph-duotone ph-printer"></i> Imprimir</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watchEffect, watch, defineComponent, onMounted } from "vue";
import { Modal } from "bootstrap";
// import { Oferta, OfertaErrors, initializeOferta, initializeOfertaErrors } from "../interfaces/oferta.interfaces";
import Notif from "../utils/notificaciones";
import Alerta from "../utils/alertas";
import ErrorMessage from '../components/ErrorMessage.vue';
import { DocumentoExterno, DocumentoFull, DocumentoPase, initialize_CrearDocumentoExterno, initialize_DocumentoFull, initialize_DocumentoPase } from "../interfaces/documento.interface";
// import { get_documentoCompleto_primerpase, Listar_doc_relacionados, Listar_ruta_pases } from "../services/DocumentoServices";
import { Administrado, initializeAdministrado } from "../interfaces/administrado.interface";
import { get_administrado_id } from "../services/AdministradoService";
import NProgress from 'nprogress';
import { FormatFecha } from '../utils/FormatFecha';

export default defineComponent({
  components:{
    ErrorMessage,
  },
  name: "Modal_ruta",
  props: {
    id: Number
  },
  setup(props, { emit }) {

    const iddocumento  = computed(() => props.id);
    const isloading    = ref(false);
    const Documento    = ref<DocumentoFull>(initialize_DocumentoFull());
    const Administrado = ref<Administrado>(initializeAdministrado());

    const ListaPases   = ref<DocumentoPase[]>([]);
    const ListaDocumentosRelacionados = ref<DocumentoPase[]>([]);

    watchEffect(() => {
      if (iddocumento.value !== undefined) {
        Documento.value.iddoc = iddocumento.value;
      }
    });

    onMounted(async () => {
        // await CargarDocumentoID();
        // await CargarRutaPases();
    });
    const printableContent = ref<HTMLDivElement | null>(null);

    const printDiv = () => {
      const content = printableContent.value;
      if (content) {
        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
          // Agregar estilos a la ventana de impresión para que se respete el diseño
          printWindow.document.write('<html><head><title>Imprimir</title>');
          
          // Agregar los estilos de la página a la ventana de impresión
          const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach(style => {
            printWindow.document.write(style.outerHTML);
          });

          printWindow.document.write('</head><body>');
          printWindow.document.write(content.innerHTML); // Escribir el HTML del div
          printWindow.document.write('</body></html>');
          printWindow.document.close(); // Cerrar el documento de la nueva ventana
          printWindow.print(); // Abrir el cuadro de impresión
        }
      }
    };

    const CargarDocumentoID = async () => {         
         
      try {
          
          NProgress.start();
          //--------
          const RespuestaJSON = await get_documentoCompleto_primerpase(Documento.value.iddoc.toString());
          if (RespuestaJSON.success) {
              Documento.value = RespuestaJSON.data;
           
              if(Documento.value.administrado_id!==null){
                try {
                    const RespuestaJSON_Adm = await get_administrado_id(Documento.value.administrado_id.toString());
                    if (RespuestaJSON_Adm.success) {
                        Administrado.value = RespuestaJSON_Adm.data;
                    } else {
                        Notif.Error(RespuestaJSON.message);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
              }
          } else {
                Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
      }
    };

    const CargarRutaPases = async () => {      
      ListaPases.value=[];
      try {
        NProgress.start();
        //--------
        const RespuestaJSON = await Listar_ruta_pases(Documento.value.iddoc.toString());
        if (RespuestaJSON.success) {
          ListaPases.value = RespuestaJSON.data;
        } else {
            Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
      }
    };

    //---------------------------------------------------------------------------
    const Cargar_Documentos_Referidos = async () => {     
      ListaDocumentosRelacionados.value=[]; 
      try {
        NProgress.start();
        //--------
        const RespuestaJSON = await Listar_doc_relacionados(Documento.value.iddoc.toString());
        if (RespuestaJSON.success) {
          ListaDocumentosRelacionados.value = RespuestaJSON.data;
        } else {
            Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
      }
    };

   
    const closeModal = () => {
      const modalElement = document.getElementById("add_OfertaModal");
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
      reset_modal();
    };

    // Watcher que observa los cambios en iddocumento (cuando el id cambia)
    watch(iddocumento, async (newId) => {
      
      if (newId) {
        // Ejecutar los métodos al cambiar el id
        
        await CargarDocumentoID();
        await CargarRutaPases();
        await Cargar_Documentos_Referidos();
      }
    }, { immediate: true });

    onMounted(async () => {
      // Solo ejecutamos cuando el componente se monta si id está disponible.
      if (iddocumento.value) {
        await CargarDocumentoID();
        await CargarRutaPases();
      }
    });

    const reset_modal = () => {
      // Reiniciar los valores del modal
      Documento.value = initialize_DocumentoFull();
      Administrado.value = initializeAdministrado();
      ListaPases.value = [];
      ListaDocumentosRelacionados.value = [];
    };




    return { 
      closeModal,isloading, Documento, ListaPases, FormatFecha, iddocumento,printDiv,printableContent,ListaDocumentosRelacionados,
      Administrado
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