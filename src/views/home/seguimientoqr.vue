<template>
      <div v-if="Documento.iddoc!==0" class="container-fluid " >
        <div class=" py-1" ref="printableContent">
            <div class="p-2">
              <div class="alert alert-danger mb-0 f-w-600 py-1 float-end b-red-600" v-if="Documento.procedencia==='Externo'" >DOCUMENTO EXTERNO</div>
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
                        {{Administrado.nombre}} {{Administrado.apellidopat}} {{Administrado.apellidomat}} - 
                        <span class="badge bg-gray-200 text-secondary f-w-600 f-12">{{Administrado.tipodocumento}} - {{Administrado.numdocumento}}</span>
                </div>
                <div class="col-md-2 col-sm-2 text-dark f-w-600">
                  <label class="form-label f-13 text-dark f-w-600">FECHA INGRESO:</label>
                </div>
                <div class="col-md-3 col-sm-4 text-gray-600">
                        {{FormatFecha.fecha_larga_hora(Documento.pase_fechaenvio)}}
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
              
          


            <!-- Fila 1------ -->
         
            <hr>
              <div class="card-body">
                   <h6> PASES DEL DOCUMENTO</h6>
                   <!-- -------TABLA -->
                   <!-- ----------------------------------------------- -->
                   <div v-if="ListaPases.length===0" class="alert alert-warning mx-3">
                      <i class="fa fa-user-friends"></i>
                      No existen trabajadores registrados</div>
                   <table v-else class="table table-bordered table-xs  f-13" id="pc-dt-simple">
                      <thead>
                        <tr class="bg-blue-700">
                          <th class="px-1" style="width:5px; font-size: 12px">N°</th>
                          <th style="width:5%; font-size: 12px">Tipo</th>
                          <th style="width:12%; font-size: 12px">Origen</th>
                          <th style="width:10%; font-size: 12px">Enviado el</th>
                          <th style="width:12%; font-size: 12px">Destino</th>
                          <th style="width:10%; font-size: 12px">Recibido el</th>
                          <th style="width:10%; font-size: 12px">Documento</th>
                          <th style="width:10%; font-size: 12px">Estado</th>
                          <th style="width:35%; font-size: 12px">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(pase,index) in ListaPases" :key="pase.idpase">
                          <td class="p-1">{{index + 1 }}</td>
                          <td class="p-1">{{ pase.tipopase }}</td>
                          <td class='text-wrap p-1'>{{ pase.origen_nombre }}</td>
                          <td class='text-wrap p-1'>{{ FormatFecha.convertirFecha_saltolinea(pase.pase_fechaenvio) }}</td>
                          <td class='text-wrap p-1'>{{ pase.destino_nombre }}</td>
                          <td class='text-wrap p-1'>
                            <div v-if="pase.pase_fecharecepcion!==null">
                              {{ FormatFecha.convertirFecha_saltolinea(pase.pase_fecharecepcion) }}
                            </div>
                            <div v-else>-</div>
                            
                          </td>
                          <td class='text-wrap p-1' v-if="pase.procedencia==='Interno'" >{{ pase.tipodocumento_nombre }} Nro- {{ pase.numeracion_tipodoc_oficina }} - {{ pase.sigla }}-MDVO</td>
                          <td class='text-wrap p-1' v-else >{{ pase.numerodocumento }} - {{ pase.anio }}</td>
                          <td class='text-wrap p-1'>{{ pase.estadopase }}</td>
                          <td class='text-wrap p-1'>{{ pase.pase_proveido }}</td>                    
                        </tr>
                      </tbody>
                    </table>
                  <!-- -------FIN TABLA -->
              </div>
              <!-- ------------- -->
              <div v-for="(pase,index) in ListaPases" :key="pase.idpase" class="card">
                <div class="card-body">
                  <div class="d-flex align-items-center">                    
                    <div class="flex-grow-1 me-3">                      
                      <p class="mb-1 fw-medium text-yellow-700">{{index + 1 }}</p>
                      <h5 class="mb-1">{{ pase.tipopase }}</h5>
                      
                      <p class="mb-0 "><span class="f-w-600">ORIGEN: </span>{{ pase.origen_nombre }}</p>
                      <p class="mb-0 "><span class="f-w-600">FECHA ENVÍO:</span> {{ FormatFecha.convertirFecha_saltolinea(pase.pase_fechaenvio) }}</p>
                      <hr class="b-gray py-0 mb-0">
                      <p class="mb-0 "><span class="f-w-600">DESTINO:</span> {{ pase.destino_nombre }}</p>
                      <p class="mb-0 "><span class="f-w-600">FECHA RECEPCIÓN:</span> 
                            <div v-if="pase.pase_fecharecepcion!==null">
                              {{ FormatFecha.convertirFecha_saltolinea(pase.pase_fecharecepcion) }}
                            </div>
                            <div v-else>-</div>
                      </p>
                    </div>
                    <!-- <div class="flex-shrink-0">
                      <div :class="familiar.genero==='Masculino' ? 'bg-light-info' : 'bg-light-danger'" class="avtar avtar-l rounded-circle">
                        <i class="ph-duotone ph-user f-28"></i>
                      </div>
                    </div> -->
                  </div>
                  <hr class="b-gray py-0 mb-0">
                  <div class="">
                    <!-- <div class=" float-end">
                        <button @click="editFamiliar(familiar)" class="btn btn-sm btn-link-success rounded-3 m-0">
                          <i class="ph-duotone ph-pencil-line"></i>
                        </button>
                        <button @click="eliminarFamiliar(familiar.id)" class="btn btn-sm btn-link-danger rounded-3 m-0">
                          <i class="ph-duotone ph-trash"></i>
                        </button>
                    </div>
                    <div v-if="familiar.fechaRegistro" class=" float-star">
                      <p class="mb-0 text-sm text-info ">Registrado el {{ FormatFecha.fecha_dddd_mmmm_yyyy(familiar.fechaRegistro) }}</p>
                    </div> -->
                  </div>
                </div>
              </div>
              <!-- ------------- -->
            <!-- //----------------------------------------------------------------------------- -->
             
            <!-- //----------------------------------------------------------------------------- -->
             
            <div class="pt-3">
              <div class="card-body">
                   <h6> DOCUMENTOS REFERENCIADOS</h6>
                   <!-- -------TABLA -->
                   <!-- ----------------------------------------------- -->
                   <div v-if="ListaDocumentosRelacionados.length===0" class="alert alert-warning mx-3">
                      <i class="fa fa-user-friends"></i>
                      No existen trabajadores registrados</div>
                   <table v-else class="table table-bordered  f-13 table-xs" id="pc-dt-simple">
                      <thead>
                        <tr class="bg-blue-700">
                          <th style="width:2%; font-size: 12px">N°</th>
                          <th style="width:60%; font-size: 12px">Asunto</th>
                          <th style="width:20%; font-size: 12px">Documento</th>
                          <th style="width:15%; font-size: 12px">Enviado el</th>
                          <th style="width:3%; font-size: 12px">PDF</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(pase,index) in ListaDocumentosRelacionados" :key="pase.idpase">
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
        
        </div>
        <div class="modal-footer py-3">
          <button @click="printDiv" class="btn btn-light b-dark btn-sm mx-1 ">
            <i class="ph-duotone ph-printer"></i> Imprimir</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
      <div v-else class="container">
        <div class="alert alert-success">
          <i class="fa fa-exclamation-triangle"></i>Ingrese el año y número de documento.</div>
      </div>
     
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted } from "vue";
import { Modal } from "bootstrap";
import Notif from "../../utils/notificaciones";
import ErrorMessage from '../../components/ErrorMessage.vue';
import {  DocumentoFull, DocumentoPase,  initialize_DocumentoFull } from "../../interfaces/documento.interface";
import { get_documentoCompleto_buscar, get_documentoCompleto_externo, get_documentoCompleto_primerpase, Listar_doc_relacionados, Listar_ruta_pases } from "../../services/DocumentoServices";
import { Administrado, initializeAdministrado } from "../../interfaces/administrado.interface";
import NProgress from 'nprogress';
import { FormatFecha } from '../../utils/FormatFecha';
import Alerta from "../../utils/alertas";
import { useRoute, useRouter } from "vue-router";
import { get_administrado_id } from "../../services/AdministradoService";
const currentYear = new Date().getFullYear(); // Año actual
    const ListaDocumentosRelacionados = ref<DocumentoPase[]>([]);

export default defineComponent({
  components:{
    ErrorMessage,
  },
  setup() {
    const route = useRoute();
    const iddocumento = Number(route.params.idexpediente);

    const frm_anio = ref("");
    const frm_nrodocumento = ref("");    
    const isloading = ref(false);
    const Documento = ref<DocumentoFull>(initialize_DocumentoFull());
    const Administrado = ref<Administrado>(initializeAdministrado());
    const ListaDocumentosRelacionados = ref<DocumentoPase[]>([]);

    const ListaPases = ref<DocumentoPase[]>([]);

   

    onMounted(async () => {
        await CargarDocumentoID(iddocumento.toString());
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

    const CargarDocumentoID = async (id:string) => {   
      try {
          NProgress.start();
          //--------
          const RespuestaJSON = await get_documentoCompleto_externo(id);
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
              await CargarRutaPases();
              await Cargar_Documentos_Referidos();
            } else {
                Notif.Error(RespuestaJSON.message);
            }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
      }
    };


    // --------------------------------------------------------------------------------------
    const years = computed(() => {
          const yearList = [];
          for (let year = currentYear; year >= 2015; year--) {
            yearList.push(year);
          }
          return yearList;
        });

    const CargarRutaPases = async () => {          
         
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
   
    const closeModal = () => {
      const modalElement = document.getElementById("add_OfertaModal");
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
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

    



    return { 
      closeModal,isloading, Documento, ListaPases, FormatFecha, iddocumento,printDiv,printableContent,
      frm_nrodocumento,frm_anio,years,CargarDocumentoID,ListaDocumentosRelacionados,Administrado
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