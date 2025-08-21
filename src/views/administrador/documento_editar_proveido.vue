<template>
   <!-- {{ DocumentoNuevo }} -->
   <!-- <br><br>DOCUMENTO<br>
   {{ DocumentoNuevo }}
   <br>DOCUEMNTO<br>
   {{ editorDescripcion }} -->
  <!-- <br>USUARIO<br>
  {{ Usuario }}
  <br><br>DOCUMENTO<br>
    {{ DocumentoNuevo }}

    <br><br>ORIGINAL<br>
    {{ Array_oficina_original }} 

   <br> -->

  <div class="row pt-4">
    <div class="col-12">
          <h4 class="text-secondary"><iconDocument class="wid-25 "/> Editar Documento Proveido </h4>
    </div>
  </div>
  <!-- <QuillEditor content-type="html" v-model:content="editorDescripcion" :modules="modules" toolbar="minimal" ref="quillEditor" style="min-height: 400px;"/> -->
  <divloading v-if="is_edit_loading"/>
  <Transition>
    <div v-if="!is_edit_loading" class="box">
      <div class="row g-2 pt-1">
        <div class="col-md-7">
            
            <!-- CARD INFORMACIÓN DEL DOCUMENTO  -->
            <div class="card  rounded-1 shadow-sm mb-1">

              <div class="card-header py-1 bg-blue-700 rounded-top-1 text-white">
                <i class="ph-duotone ph-clipboard-text p-r-10"></i>Datos de Documento
              </div>
              <div class="card-body p-3">
                <!-- Fila 1------ -->
                <div class="col-md-12 mb-3">
                          <label class="form-label align-content-center f-13 p-r-15 f-w-600  wid-95">Remitente:</label>
                          <input readonly disabled class="form-control" :value="Usuario.buzon_nombre">
                </div>
                <!-- Fila 3------ -->
                <div class="row mb-3">
                  <div class="col-md-12">
                    <label class="form-label  f-13 ">Asunto</label>
                    <textarea maxlength="249" type="text" readonly="true" disabled="true" v-model="DocumentoNuevo.asunto" class="form-control" ></textarea>
                    <ErrorMessage :error="errorsDoc.asunto" />
                  </div>
                </div>
                <!-- Fila 2------ -->
                <div class="row g-1 mb-3">
                    <div class="col-md-3">
                      <label class="form-label f-13">Tipo de documento</label>
                      <div class="row g-1">
                        <div class="col-md-12">
                          <input readonly type="text"   v-model="frm_tipodocumento.nombre" class="form-control" />
                          <ErrorMessage :error="errorsDoc.tipodocumento_id" />
                        </div>
                      </div>
                    </div>
                    <!-- -------------- -->
                    <div class="col-md-2">
                      <label class="form-label  f-13  mb-0">Número</label>
                      <input maxlength="6" type="text" readonly v-model="DocumentoNuevo.numeracion_tipodoc_oficina" class="form-control" />
                      <ErrorMessage :error="errorsDoc.codigo" />
                    </div>
                    <!-- ------------- -->
                    <div class="col-md-2">
                      <label class="form-label  f-13  mb-0">Año</label>
                      <input readonly type="text" v-model="anioactual" class="form-control" />
                    </div>
                    <!-- ------------- -->
                    <div class="col-md-2">
                      <label class="form-label  f-13  mb-0">Folio</label>
                      <input maxlength="6" type="text" v-model="DocumentoNuevo.folios" class="form-control" />
                      <ErrorMessage :error="errorsDoc.folios" />
                    </div>
                    <!-- ------------- -->
                    <div class="col-md-3">
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
                  <!-- ------------- -->
                </div>
                
              
    
              </div>
            </div>
            <!-- FIN CARD DOCUMENTO -->
             <div class="card pb-2 mb-2 rounded-1 shadow-sm">
              <div class="card-header py-1 bg-blue-800 rounded-top-1 text-white">
                    <i class="ph-duotone ph-navigation-arrow p-r-10"></i>Destinatarios
              </div>
              <div class="card-body row py-2 ">
                  
                    <!-- Fila 2------ -->
                    <div class="col-md-12 mb-0 ">
                      <div class="d-flex">
                          <label class="form-label align-content-center f-13 p-r-15 text-gray-600 f-w-600 wid-100">Original:</label>
                          <multiselect v-model="Original"
                                      @update:modelValue="Add_Original"
                                      class="f-6"
                                      label="destino"
                                      track-by="id"
                                      placeholder="Seleccionar"
                                      selectLabel=""
                                      deselectLabel=""
                                      selectedLabel=""
                                      :options="filteredOriginalDestinos">
                          </multiselect>
                      </div>
                      <ErrorMessage :error="error_destino_original" />
                      <div class="px-0 py-2  rounded-1 mt-1">
                        <label class="form-label align-content-center f-13 p-r-15 text-gray-600 f-w-600 wid-100">{{ Array_oficina_original.length }} Oficinas</label>
                        <div class="align-content-center f-14 f-w-500 alert alert-secondary b-gray mb-0 py-1 px-2">
                          <span
                            class="badge text-white  bg-blue-600 mx-1 text-md py-0"
                            v-for="Item in Array_oficina_original" :key="Item.id" style="margin-top: 1px; margin-bottom: 1px;">
                            {{ Item.destino }}
                                <div class="btn f-4 text-white btn-sm my-0 py-0" @click="Remove_Original(Item.id)" >
                                    <i class="fa fa-trash my-0 py-0" style="font-size:10px"></i>
                                </div>
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="card pb-2 mb-2 rounded-1 shadow-sm">
              <div class="card-header py-1 bg-blue-900 rounded-top-1 text-white">
                    <i class="ph-duotone ph-navigation-arrow p-r-10"></i>Mensaje Proveido
              </div>
              <div class="card-body row py-2 ">
                  
                      <!-- Fila 3------ -->
               
                        <!-- <label class="form-label  f-13 ">Comentario</label> -->
                        <textarea maxlength="249" type="text" v-model="DocumentoNuevo.pase_proveido" class="form-control bg-light" ></textarea>
                        <ErrorMessage :error="errorsDoc.asunto" />
                  
                </div>
            </div>

             <!-- -------------------------------------------- -->

            <div class="d-flex gap-2 g-1 justify-content-end">
                  <div  class="text-center" >
                    <button @click="cancelar" class="btn btn-lg w-100  btn-danger mt-0 m-auto text-nowrap">
                        <i class="ph-duotone ph-x p-r-5"></i>Cancelar</button>
                  </div>
                  <div  class="text-center" >
                    <button @click="ActualizarDocumento" class="btn btn-lg w-100  btn-success mt-0 m-auto text-nowrap">
                        <i class="ph-duotone ph-floppy-disk p-r-5"></i>Actualizar Documento</button>
                  </div>
            </div>

            <!-- -------------------------------------------- -->


        </div>

      </div>
     
    </div>
  </Transition>
 

<!-- *************************************************************************************************************** -->
<!-- *************************************************************************************************************** -->
<!-- *************************************************************************************************************** -->


</template>

<script lang="ts">
import {  computed, onMounted, ref, watch } from 'vue';
import ErrorMessage from '../../components/ErrorMessage.vue';
import { Destino, Destino_Oficina,   } from '../../types/interfaces';
import Alerta from '../../utils/alertas';
import Notif from '../../utils/notificaciones';
import NProgress from 'nprogress';
import { get_resultadoreferencias, subir_adjunto, get_correlativo_nrodocumento_buzon, get_documentoCompleto_primerpase, get_documentoCompleto_interno, getdestino_oficinas, upd_documento_interno, upd_documento_proveido } from '../../services/DocumentoServices';
import { HOST_URL, ServerFirma } from '../../config';
import Multiselect from 'vue-multiselect'
import { initializeUsuarioLog, type UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { FormatFecha } from '../../utils/FormatFecha';

import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import { initialize_SigaPase,  SigaPase, Adjunto, initialize_Adjunto, ReferenciaDoc, initialize_ReferenciaDoc, initialize_CrearDocumentoErrores, tipodocumento, initialize_tipodocumento, DocumentoFull, DocumentoExterno, initialize_CrearDocumentoExterno, initialize_DocumentoFull, initialize_DocumentoInterno, DocumentoInterno } from '../../interfaces/documento.interface';
import { get_destinos_general } from '../../services/DestinosServices';
const currentYear = new Date().getFullYear(); // Año actual
import DataTable from '../../components/table/DataTable.vue';  

import { pdf_generar_documentotramite } from '../../composables/generarPDF_formatos';
import { useRoute, useRouter } from 'vue-router';
import dataMarca from '../../datos/data_marca.json';

import { QuillEditor, Delta } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'

import Modal_Firma from '../../components/Modal_Firma.vue';
import iconDocument from '../../components/icons/icon_newdocument.vue';
import iconFirma from '../../components/icons/icon_firma.vue';
import divloading from '../../components/div_loading.vue';

import * as pdfjsLib from 'pdfjs-dist';
import { Console } from 'console';
const isDarkTheme = ref(false);

interface buscardoc{
  iddocumento: string;
  numdoc: string;
  anio: string;
}

export default {
    components: {
      ErrorMessage,
      Multiselect,
      DataTable,
      QuillEditor,
      Modal_Firma,
      iconDocument,
      iconFirma,
      divloading
    },
    setup () {
        
        const Usuario       = ref<UsuarioLog>(initializeUsuarioLog());
        const authStore     = usarAuthStore();
        Usuario.value       = authStore.usuario_Logueado;
        //-----------------------------------------------------------------------
        const route = useRoute();
        const router = useRouter();
        const iddocumento = Number(route.params.iddocumento);
        const idpase = Number(route.params.idpase);

        const is_edit_loading =ref(true);
        
        const isUploading   = ref(false); 
        const opcion_archivo = ref();
        const anioactual    = ref(new Date().getFullYear());        
        const listaDestinos = ref<Destino_Oficina[]>([]);
        
        const Array_oficina_original  = ref<Destino_Oficina[]>([]);
        const Array_oficina_copia     = ref<Destino_Oficina[]>([]);
        const error_destino_original  = ref("");

        const Array_referencias       = ref<DocumentoFull[]>([]);
        // const Array_referencias_elegidas = ref<DocumentoFull[]>([]);


        //creación de documentos ------------------------------------------------
        const serieDocumento = ref("");
        const editorDescripcion = ref("");

        const quillEditor = ref<any>(null); // Referencia al QuillEditor (usamos 'any' temporalmente para evitar errores de tipado)

        // Watch para depurar y asegurar sincronización (opcional)
        watch(editorDescripcion, (newValue) => {
          console.log('editorDescripcion actualizado:', newValue);
          // Si el editor no se actualiza, podrías usar la instancia de Quill directamente:
          if (quillEditor.value && newValue === '') {
            const quillInstance = quillEditor.value.getQuill();
            quillInstance.setContents([]); // Asegura que el editor se vacíe
          }
          
        });

        const { generar_documento,url_doc_pdf} = pdf_generar_documentotramite();

        
        //Destinos --------------------------------------------------------------
        const Original  = ref<Destino_Oficina>();
        const Copia     = ref<Destino_Oficina>();
          

        // Propiedades computadas para filtrar las opciones de los dropdowns
        const filteredOriginalDestinos = computed(() => {
          // Obtener los IDs de los destinos ya seleccionados en ambos arrays
          const originalIds = Array_oficina_original.value.map(item => item.id);
          // Filtrar listaDestinos para excluir los destinos que están en Array_oficina_copia y Array_oficina_original
          return listaDestinos.value.filter(destino => 
            !originalIds.includes(destino.id)
          );
        });

       
        //Stores ----------------------------------------------------------------
        const StoreList = ListasStore();
        const FunList   = Listas();

        // PRUEBA

        // const pdfUrl ---------------------------------------------------------
        const pdfUrl = ref('');
        const urlServer = ServerFirma;
        const signedPdfUrl = ref<string | null>(null);
        const currentFileToSign = ref<Adjunto | null>(null);

        const headers = ref([
          { text: '#', width: '5%', key: 'index' }, 
          { text: 'Documentos', width: '15%', key: 'codigo' },
          { text: 'Emitido Por:', width: '25%', key: 'codigo' },
          { text: 'Asunto', width: '45%', key: 'asunto' },
          { text: '', width: '10%', key: 'acciones' },
        ]);
      
        onMounted(async () => {
            isDarkTheme.value = checkIfDarkTheme();
            FunList.load_TiposDocumentos();
            FunList.load_TramitesTupa();
            await cargar_Destinos();
            await CargarDocumentoID();
           
        });

        const listaDocumentos = ref([{ documento: '', tipo: 'Seleccionar', descripcion: '' }, ...dataMarca]);
        const selectedDocumento = ref(listaDocumentos.value[0].documento);

        const onDocumentoChange = () => {
          const documento = listaDocumentos.value.find(doc => doc.documento === selectedDocumento.value);
          if (documento) {
            editorDescripcion.value = documento.descripcion;
          }
        };

        const checkIfDarkTheme = () => {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        };  
        
        // ----------------------------------------------------------
        const DocumentoNuevo                  = ref<DocumentoFull>(initialize_DocumentoFull());
        const DocumentoRegistrado             = ref<DocumentoFull>(initialize_DocumentoFull());
        // ----------------------------------------------------------
        const Referencia                      = ref<ReferenciaDoc>(initialize_ReferenciaDoc());
        const errorsDoc                       = ref<any>(initialize_CrearDocumentoErrores());
        const Pase                            = ref<SigaPase>(initialize_SigaPase());
        const ArchivoTemporal                 = ref<Adjunto>(initialize_Adjunto());
        const frm_tipodocumento               = ref<tipodocumento>(initialize_tipodocumento()); 
        const frm_referencia_usuariodestinoid = ref<Destino>();
        const frm_referencia_tipodoc          = ref<tipodocumento>(initialize_tipodocumento()); 

        
        // -----------------------------------------------------------
        const on_changeTipoDocumento = () =>{
          if (frm_tipodocumento.value){
            DocumentoNuevo.value.tipodocumento_id= frm_tipodocumento.value.id;
          }
        }

        const on_changeReferencia_TipoDocumento = () =>{
          if (frm_referencia_tipodoc.value){
            Referencia.value.tipodocumento_id= frm_referencia_tipodoc.value.id;
          }
        }

        const on_changeReferencia_Oficina = () =>{
          if (frm_referencia_usuariodestinoid.value){
            Referencia.value.buzonorigen_id= Number(frm_referencia_usuariodestinoid.value.id);
          }
        }

        const cargar_Destinos = async () => {
          NProgress.start();
          try {
            const RespuestaJSON = await get_destinos_general(Usuario.value.oficina_id);
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


        // ------------------------------------------------------------------------------------
        // Cargar Destinos --------------------------------------------------------------------
        
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
        // DESTINATARIOS
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
              Original.value = undefined; // Limpiar la selección después de agregar
            }
          } else {
            Notif.Error("Seleccione un destino");
          }
        };
        
        const Remove_Original = (id: string) => {
          const index = Array_oficina_original.value.findIndex(oficina => oficina.id === id);
          if (index !== -1) {
            Array_oficina_original.value.splice(index, 1); // Elimina el elemento encontrado
            // Notif.Success("Elemento eliminado correctamente");
          } else {
            Notif.Error("Elemento no encontrado");
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

        // --------------------------------------------------------------------------------------
        // REFERENCIAS
        // --------------------------------------------------------------------------------------
       
        
    
        
        // --------------------------------------------------------------------------------------
        // REGISTRAR DOCUMENTO  -----------------------------------------------------------------
        // --------------------------------------------------------------------------------------

        const validateFieldDocumentos =  (field: string, value: any) => {
          switch (field) {
            case 'tipodocumento_id':
              errorsDoc.value[field] = value ? '' : 'Tipo de documento obligatorio';
              break;
            case 'codigo':
              errorsDoc.value[field] = value ? '' : 'Código obligatorio';
              break;
            case 'folios':
              errorsDoc.value[field] = value ? '' : 'N° Folio obligatorio';
              break;
            case 'prioridad':
              errorsDoc.value[field] = value ? '' : 'Campo obligatorio';
              break;
            case 'asunto':
              errorsDoc.value[field] = value ? '' : 'Asunto obligatorio';
              break;
          }
        };
        
        watch(() => DocumentoNuevo.value.tipodocumento_id, (newVal) => validateFieldDocumentos('tipodocumento_id', newVal));
        watch(() => DocumentoNuevo.value.numerodocumento, (newVal) => validateFieldDocumentos('codigo', newVal));
        watch(() => DocumentoNuevo.value.folios, (newVal) => validateFieldDocumentos('folios', newVal));
        watch(() => DocumentoNuevo.value.prioridad, (newVal) => validateFieldDocumentos('prioridad', newVal));
        watch(() => DocumentoNuevo.value.asunto, (newVal) => validateFieldDocumentos('asunto', newVal));

        
        const validateDocumento = () => {
          Object.keys(DocumentoNuevo.value).forEach(key => {
            validateFieldDocumentos(key, (DocumentoNuevo.value as any)[key]);
          });
          console.log(errorsDoc.value);
          return !Object.values(errorsDoc.value).some(error => error);
        };

        // ------------------
        const ActualizarDocumento = async () => { 
          if (!validateDocumento()) {
            Notif.Error("Debe completar todos los campos del documento");
            return;
          }  
        

          //Asignamos Buzones Destino
         if (Array_oficina_original.value.length===0) {
              error_destino_original.value="Elige al menos 1 destino"
              Notif.Error("Debes agregar al menos un destino");
              return;
          }else{
              error_destino_original.value="";
          }          
          try {
              NProgress.start();
              //--------
              DocumentoNuevo.value.cabecera   =   StoreList.obtenerNombrePorId(DocumentoNuevo.value.tipodocumento_id.toString()) + " - N° " +
                                                  DocumentoNuevo.value.numeracion_tipodoc_oficina  + " - " + anioactual.value  + " - " + Usuario.value.buzon_sigla  + " -MDVO";

              DocumentoNuevo.value.usuario_id = Usuario.value.id.toString();
              const RespuestaJSON = await upd_documento_proveido(DocumentoNuevo.value.pase_proveido, DocumentoNuevo.value, Array_oficina_original.value);
              //--------
              if (RespuestaJSON.success) {
                  //persona.value.id = RespuestaJSON.data;
                  Alerta.Sucessfull_timer("Completado","Documento Actualizado correctamente");
                  router.go(-1);
                
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
              NProgress.done(); // Detiene la barra de progreso
          }
          // reset_formularioDatos();
        };

        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------
        // Nueva función para subir el PDF firmado
        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------



        //EDICIÓN ----------------------------------------------------------------------------------
        // CARGAR DOCUMENTOS EXISTENTES POR ID

        const CargarDocumentoID = async () => {          
          Array_oficina_original.value=[];
         try {
             NProgress.start();
             //--------
             is_edit_loading.value = true;
             
             const RespuestaJSON = await get_documentoCompleto_primerpase(iddocumento.toString());
             if (RespuestaJSON.success) {
                 DocumentoRegistrado.value = RespuestaJSON.data;
                 
                 if (DocumentoRegistrado.value) {
                      console.log("Documento Registrado:", DocumentoRegistrado.value); // Verifica el objeto completo
                      DocumentoNuevo.value = RespuestaJSON.data;
                      editorDescripcion.value = DocumentoNuevo.value.pdf_principal;

                      // OBTENIENDO TIPO DE DOCUMENTO  ---------------------------------------------------- 
                      frm_tipodocumento.value    = initialize_tipodocumento();
                      frm_tipodocumento.value.id = DocumentoRegistrado.value.tipodocumento_id;
                      frm_tipodocumento.value.nombre = DocumentoRegistrado.value.tipodocumento_nombre;

                      // OBTENIENDO BUZON DE DESTINOS     ---------------------------------------------------
                      
                  
                 } else {
                     console.error("DocumentoRegistrado está vacío o no contiene datos.");
                 }

                 // destino:
                 const Respuesta_destinosJSON = await getdestino_oficinas(iddocumento.toString());
                 console.log(Respuesta_destinosJSON.data);
                 if (Respuesta_destinosJSON.success) {
                    Array_oficina_original.value = Respuesta_destinosJSON.data.filter(
                      (item:Destino) => item.tipobuzon === "Original"
                    );
                
                 }else{
                    Array_oficina_original.value=[];
                 }

             } else {
                 Notif.Error(RespuestaJSON.message);
             }
         } catch (error) {
             console.error('Error uploading file:', error);
         } finally {
             NProgress.done(); // Detiene la barra de progreso
             is_edit_loading.value = false;
         }
       };

      const cancelar = () => {
        router.go(-1);
      };

        
      return {
        DocumentoNuevo,ArchivoTemporal,
        on_changeReferencia_TipoDocumento,on_changeReferencia_Oficina,
        Referencia, Array_referencias, frm_referencia_usuariodestinoid,frm_referencia_tipodoc,
        ActualizarDocumento,
        Pase,
        Original,Copia,
        Array_oficina_original, 
        Add_Original, Remove_Original,
        isDarkTheme, 
        errorsDoc,
        HOST_URL,
        listaDestinos,
        StoreList,
        years,
     
        frm_tipodocumento,
        on_changeTipoDocumento,
        FormatFecha, anioactual,
        Usuario, 
        headers,
        error_destino_original,
        obtener_correlativo,
        editorDescripcion,QuillEditor,serieDocumento,
        listaDocumentos,idpase,
        selectedDocumento,
        onDocumentoChange,
        pdfUrl,
        urlServer,
        signedPdfUrl,
        opcion_archivo,
        filteredOriginalDestinos,
        quillEditor,
        cancelar,
        is_edit_loading
      // crearpdf_print
      }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.text-amarillo {
  color: rgb(217, 144, 4) !important;
}
.image-container{
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* This mai the 4:3 aspect ratio */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.image-container img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the container */
  transform: translate(-50%, -50%);
}

.file-input-wrapper {
  position: relative;
  width: 100%;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.custom-file-label {
  display: inline-block;
  width: 100%;
  padding: 10px 15px;
  background-color: #d7edf7;
  color: #353535;
  border: 2px;
  border-radius: 4px;
  border-style:dashed;
  border-color: #aed0e0;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-file-label:hover {
  background-color: #0056b3;
}


input, select,textarea, multiselect{
  background-color: #e7ddc938   !important;
}
</style>
