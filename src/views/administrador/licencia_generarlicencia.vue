<template>
  <div class="row ">
    <div class="col-12">
      <div class="d-flex m-l-15">
          <!-- <router-link :to="{ name: 'Editarlicencia', params: { id: idlicencia } }"
                class="btn btn-secondary rounded-top-3 rounded-bottom-0 me-2 pt-2">
            <i class="ti ti-database  p-r-5"></i> DATOS
          </router-link> -->
<!-- 
          <router-link :to="{ name: 'Generarlicencia', params: { id: idlicencia } }"
                class="btn btn-warning bg-yellow-600  rounded-top-3 rounded-bottom-0  me-2  pt-2">
            <i class="ti ti-certificate p-r-5"></i> GENERAR DOCUMENTOS
          </router-link> -->
      </div>
    </div>
  </div>
  <div class="row">
      <div class="col-md-8">
              <!-- -------------- -->
               <!-- {{ licencia }} -->
               <!-- -------------- -->
              <div class="card border-0">
                  <div class="card-header bg-yellow-800 mt-0 pb-1 pb-0">
                    <h5 class="text-white">
                      <i class="fa fa-edit p-r-10"></i> Generar Licencia de Funcionamiento
                    </h5>
                  </div>             
                  <div  class="card-body">
                    
                    <div class="d-flex justify-content-center py-3">
                      <div class="form-check">
                        <input class="form-check-input"  v-model="existeLicencia" type="checkbox" id="customCheckc1">
                        <label class="form-check-label f-w-600" for="customCheckc1">Es licencia Antigua</label>
                      </div>
                    </div>


                    <div class="alert alert-secondary b-gray">
                      <p>Para poder generar los documentos debes completar los siguientes campos:</p>
                      <div class="row">                        
                        <div class="col-12">
                          <div class="mb-2">
                              <label class="form-label align-content-top pt-2">Zonificación:</label>
                              <select v-model="licencia.zonificacion" class="form-select" @change="guardar_zonificacion_select">
                                <option value="">Seleccione tipo Documento</option>
                                <option v-for="zona in zonificacion" :key="zona" :value="zona">{{ zona }}</option>
                                <option value="NO APLICA">NO APLICA</option>
                              </select>
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="mb-2">
                              <label class="form-label align-content-top pt-2">Tipo de Vigencia:</label>
                              <select class="form-select" v-model="licencia.vigencia_tipo" @change="guardar_vigencia_select">
                                  <option value="DEFINITIVA" :selected="true" >DEFINITIVA</option>
                                  <option value="PROVISIONAL">PROVISIONAL</option>
                                  <!-- Add options here -->
                              </select>
                          </div>
                        </div>
                        <div  class="col-md-8">
                          <div class="mb-2 ">
                            <label class="form-label  align-content-top pt-2 f-w-600">Fecha de Caducidad Certificado ITSE </label>
                            <input v-model="licencia.itse_fechavencimiento" @change="guardar_itse_fechavencimiento" type="date" class="form-control"
                              placeholder="Número de documento">
                            <ErrorMessage :error="errors.fecharegistro" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="alert alert-warning b-warning">
                      <p>Para poder generar los documentos debes completar los siguientes campos:</p>
                      <div class="row">                        
                        <div class="col-6">
                          <div class="mb-2 ">
                            <label class="form-label  align-content-top pt-2 text-secondary">Carnet Sanitario</label>
                            <input v-model="licencia.representantelegal_nombre" type="text" class="form-control"
                              placeholder="N° de Carnet">
                            <ErrorMessage :error="errors.representantelegal_nombre" />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="mb-2 ">
                            <label class="form-label  align-content-top pt-2 text-secondary">Fecha Emisión de Carnet</label>
                            <input v-model="licencia.representantelegal_nombre" type="date" class="form-control">
                            <ErrorMessage :error="errors.representantelegal_nombre" />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="mb-2 ">
                            <label class="form-label  align-content-top pt-2 text-secondary">Medidas de Módulo</label>
                            <input v-model="licencia.representantelegal_nombre" type="text" class="form-control"
                              placeholder="2m x 1m">
                            <ErrorMessage :error="errors.representantelegal_nombre" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="alert" v-if="!existeLicencia" >
                          <p>Verifica que la siguiente información sea correcta:</p>
                          <!-- -------------------------------- -->
                           <!-- Brochre URL -->
                          <div class="alert ">
                              <div class="row">
                                <div class="col-12">
                                  <div class="alert alert-danger text-center uppercase">
                                    {{licencia.categoriatramite_tupa}}
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    CÓDIGO EXPEDIENTE:
                                </div>
                                <div class="col-8">
                                    {{ licencia.documento_codexpediente }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    RAZÓN SOCIAL:
                                </div>
                                <div class="col-8">
                                    {{ licencia.negocio_razonsocial }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    RUC:
                                </div>
                                <div class="col-8">
                                    {{ licencia.negocio_ruc }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    REPRESENTANTE LEGAL:
                                </div>
                                <div class="col-8">
                                    {{ licencia.representantelegal_nombre }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    DNI REPRESENTANTE L.:
                                </div>
                                <div class="col-8">
                                    {{ licencia.representantelegal_dni }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    DIRECCIÓN:
                                </div>
                                <div class="col-8">
                                    {{ licencia.dir_direccioncomercial }} - Distrito Veintiséis de Octubre - Piura.
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    ACTIVIDAD COMERCIAL:
                                </div>
                                <div class="col-8">
                                    {{ licencia.negocio_actividadcomercial }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    ÁREA:
                                </div>
                                <div class="col-8">
                                    {{ licencia.negocio_area }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    CAPACIDAD DE AFORO:
                                </div>
                                <div class="col-8">
                                    {{ licencia.negocio_aforo }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    HORARIO DE ATENCIÓN:
                                </div>
                                <div class="col-8">
                                    {{ licencia.negocio_horario }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    NIVEL DE RIESGO:
                                </div>
                                <div class="col-8">
                                    {{ licencia.itse_riesgo }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600">
                                    RECIBO PAGO:
                                </div>
                                <div class="col-8">
                                    {{ licencia.pago_codoperacion }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600 text-primary">
                                    ZONIFICACIÓN:
                                </div>
                                <div class="col-8">
                                    {{ licencia.zonificacion }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600 text-primary">
                                    VIGENCIA:
                                </div>
                                <div class="col-8">
                                    {{ licencia.vigencia_tipo }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-4 f-w-600 text-primary">
                                    ESTADO TRÁMITE:
                                </div>
                                <div class="col-8 text-danger f-w-500">
                                    {{ licencia.estadotramite }}
                                </div>
                              </div>
                              
                          </div>
                           <!-- ------------------------------- -->

                           <p>Números consecutivos:</p>
                          <div class="row" v-if="licencia.categoriatramite_tupa==='Autorización'">
                            <div class="col-2 px-0">
                              <div class="mb-2 ">
                                  <label class="form-label  align-content-top pt-2" >N° Autorización:</label>
                                  <!-- v-model="licencia.negocio_ruc" -->
                                  <input disabled type="number" v-model="correlativo.numautorizacion" class="form-control">
                              </div>
                            </div>
                            <div class="col-10 px-0">
                              <div class="mb-2">
                                  <label class="form-label align-content-top pt-2">Código de Autorización:</label>
                                  <!-- v-model="licencia.negocio_ruc" -->
                                  <input disabled  type="text" v-model="correlativo.codigoautorizacion" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="row" v-else>
                            <div class="col-2 px-0">
                              <div class="mb-2 ">
                                  <label class="form-label  align-content-top pt-2" >N° Licencia:</label>
                                  <!-- v-model="licencia.negocio_ruc" -->
                                  <input disabled type="number" v-model="correlativo.numlicencia" class="form-control">
                              </div>
                            </div>
                            <div class="col-10 px-0">
                              <div class="mb-2">
                                  <label class="form-label align-content-top pt-2">Código de Licencia:</label>
                                  <!-- v-model="licencia.negocio_ruc" -->
                                  <input disabled  type="text" v-model="correlativo.codigolicencia" class="form-control">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-2 px-0">
                              <div class="mb-2 ">
                                  <label class="form-label  align-content-top pt-2" >N° Res.:</label>
                                  <!-- v-model="licencia.negocio_ruc" -->
                                  <input disabled type="number" v-model="correlativo.numresolucion" class="form-control">
                              </div>
                            </div>
                            <div class="col-10 px-0">
                              <div class="mb-2 ">
                                  <label class="form-label align-content-top pt-2">Código de Resolución:</label>
                                  <!-- v-model="licencia.negocio_ruc" -->
                                  <input disabled  type="text" v-model="correlativo.codigoresolucion" class="form-control">
                              </div>
                            </div>
                          </div>
                          
                          <div class="row" >                            
                            <div class="col-6 pb-1 mt-4">
                                  <button :disabled="isGenerated" class="btn btn-lg   btn-primary w-100 h-100" @click.prevent="generarPDF(licencia)">
                                    
                                    <div v-if="licencia.categoriatramite_tupa==='Autorización'">
                                      <i class="fa fa-check "></i> GENERAR AUTORIZACIÓN
                                    </div>
                                    <div v-else>
                                      <i class="fa fa-file "></i> GENERAR CERTIFICADO DE LICENCIA
                                    </div>
                                    
                                  </button>
                            </div>
                            <div class="col-6 mb-1 mt-4">
                                  <button :disabled="licencia.estadotramite!=='EMITIDO'" class="btn btn-lg   btn-success w-100 h-100" @click.prevent="generarResolucionMunicipal()">
                                    <i class="fa fa-file "></i>
                                    GENERAR RESOLUCIÓN
                                  </button>
                            </div>
                          </div>
                          
                    </div>
                    <!-- ------------------- -->
                    <div v-if="existeLicencia" class="row">

                          <div class="col-12 pt-4">
                            <h4 class="text-secondary">Subida de licencias de Archivo:</h4>
                          </div>

                          

                          <div class="alert alert-secondary">
                            <div class="row">
                              <div class="col-12 pt-4 text-secondary">
                                <h5>Adjuntar Licencia</h5>
                                <hr class="my-0">
                              </div>
                             
                              <div class="col-4">
                                <div class="mb-2 ">
                                    <label class="form-label  align-content-top pt-2" >Correlativo:</label>
                                    <!-- v-model="licencia.negocio_ruc" -->
                                    <input  type="number" v-model="datoslicencia.sequen_licencia" class="form-control">
                                </div>
                              </div>
                              <div class="col-4">
                                <div class="mb-2 ">
                                    <label class="form-label  align-content-top pt-2" >Código de Licencia:</label>
                                    <!-- v-model="licencia.negocio_ruc" -->
                                    <input  type="text" v-model="datoslicencia.numero_licencia" class="form-control">
                                </div>
                              </div>
                              <div class="col-4">
                                <div class="mb-2 ">
                                    <label class="form-label  align-content-top pt-2" >Fecha Emisión:</label>
                                    <!-- v-model="licencia.negocio_ruc" -->
                                    <input  type="date" v-model="datoslicencia.licencia_fechaemision" class="form-control">
                                </div>
                              </div>
                              
                              
                              
                              <div class="col-12 pb-3">
                                <div class="file-input-wrapper b-secondary rounded-1  text-center w-100">
                                    <input type="file" @change="onFileSelected" @dragover.prevent @drop.prevent="handleDrop" accept=".pdf" class="file-input">
                                    <div class="p-15">
                                      <i class="ph-duotone ph-file-pdf f-30"></i>
                                      <div v-if="file" class="uploaded-files">
                                          <p>{{ file.name }}</p>
                                      </div>
                                      <p v-else class="f-14 f-w-600">Arraste ó Seleccione un archivo</p>
                                      
                                     
                                    </div>
                                </div>
                              </div>
                              <div class="col-12 text-center mb-4">
                                <div @click="subir_licenciaadjunta" class="btn btn-secondary m-auto w-50">
                                  Guardar licencia
                                </div>
                              </div>
                              <div class="col-12 pt-5">
                                <h5> Adjuntar Resolución</h5>
                                <hr class="my-0">
                              </div>
                              <div class="col-4">
                                <div class="mb-2 ">
                                    <label class="form-label align-content-top pt-2">Número de resolución:</label>
                                    <!-- v-model="licencia.negocio_ruc" -->
                                    <input   type="text" v-model="datoslicencia.numero_resolucion" class="form-control">
                                </div>
                              </div>
                              
                              <div class="col-12 mb-1">
                                <div class="file-input-wrapper b-secondary rounded-1  text-center w-100">
                                      <input type="file" @change="onFileSelected_resolucion"  @dragover.prevent @drop.prevent="handleDrop_res" accept=".pdf" class="file-input">
                                      <div class="p-15">
                                        <i class="ph-duotone ph-file-pdf f-30"></i>
                                        <div v-if="file_res" class="uploaded-files">
                                            <p>{{ file_res.name }}</p>
                                        </div>
                                        <p v-else class="f-14 f-w-600">Arraste ó Seleccione un archivo</p>
                                        
                                      </div>
                                </div>
                              </div>
                              <div class="col-12 text-center mb-4">
                                <div @click="subir_resolucionAdjunta" class="btn btn-secondary m-auto w-50">
                                  Guardar resolucion
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>
                  </div>
              </div>
              <!-- -------------- -->   
      </div>
      <div class="col-md-4">
        <h5><i class="fa fa-chevron-right text-secondary"></i> Licencia</h5>
        <a v-if="licencia.certificado_url && licencia.certificado_url!==''" :href="HOST_URL+licencia.certificado_url" target="_blank" class="text-dark"> 
          <div class="alert alert-danger pt-3 text-center f-w-500">
              <img src="../../assets/images/pdf.png" class="img-fluid wid-50"> 
                DESCARGAR CERTIFICADO
          </div>
        </a>
        <div v-else class="alert alert-warning text-center"> 
          <i class="fa fa-times"></i> No existe documento registrado.</div>


        <h5 class="pt-3"><i class="fa fa-chevron-right text-secondary "></i> Resolución:</h5>
        <div class="col-12 pt-1 text-center">
              <a v-if="licencia.resolucion_url &&   licencia.resolucion_url!==''" :href="HOST_URL+licencia.resolucion_url" target="_blank" class="text-dark"> 
                <div class="alert alert-primary pt-3 text-center f-w-500">
                  <img src="../../assets/images/pdf.png" class="img-fluid wid-50">   
                  DESCARGAR DOCUMENTO
                </div>
              </a>
            <div v-else class="alert alert-warning text-center"> 
              <i class="fa fa-times"></i> No existe resolución.</div>
        </div>
      </div>
    </div>
  
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { guardar_licenciaAdjunta, guardar_licenciaGenerada, generarResolucion, get_licencia,  obtener_Correlativo, guardar_resolucionAdjunto, guardar_zonificacion, guardar_Vigencia, guardar_fechavencimiento} from '../../services/LicenciaService';
import Breadcrumb from '../../components/breadcrumb.vue';
import ErrorMessage from '../../components/ErrorMessage.vue';
import Alerta from '../../utils/alertas';
import { HOST_URL, BASE_URL } from '../../config';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

import logoData from '../../assets/logo.64.json'; // Importa el archivo JSON


import Notif from '../../utils/notificaciones';

import NProgress from 'nprogress';

import fechaview from '../../components/horario_select.vue';
import { Listas } from '../../composables/ListasIndependientes';

import { PersonaJuridica } from '../../interfaces/sunat.interfaces';
import { tiposPersonaJuridica, tiposInspeccion, resultadosITSE, nivelesRiesgo, zonificacion} from '../../utils/listas.fijas'; // Ajusta el path según tu estructura

import { ListasStore } from '../../stores/listasStore';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { initializeLicencia, Licencia } from '../../interfaces/licencia.interfaces';
import { useRoute, useRouter } from 'vue-router';
import firmaURL from "@/assets/firmadigital.png"
import fondocertificado from "@/assets/fondo_certificado.jpg"
import escudomunicipal from "@/assets/logomuni26.png"
import { FormatFecha } from '../../utils/FormatFecha';

interface Link {
  path: string;
  name: string;
}

interface Correlativo {
  numlicencia: string;
  codigolicencia: string;
  numresolucion: string;
  codigoresolucion: string;
  numautorizacion: string;
  codigoautorizacion:string;
}

interface editlicencia {
  sequen_licencia: string;
  numero_licencia: string;
  numero_resolucion: string;
  licencia_fechaemision: string;
  zonificacion:string;
}

export default defineComponent({
  components: {
    ErrorMessage,
    Breadcrumb,
    fechaview
  },
  props: {
    idlic: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const idlicencia = Number(route.params.idlic);
    const existeLicencia = ref(false);
    const isUploading = ref(false); 
    const isGenerated = ref(false); // Deshabilitar el botón

    // -------------------------
    const breadcrumbRoutes = ref<Link[]>([
      { path: '/office/licencia_solicitudes', name: 'Licencias' },
      { path: '', name: 'Editar' },
    ]);

    // Listas Dependientes.
    const StoreList = ListasStore();
    const FunList = Listas();
    const AuthStore = usarAuthStore();
    const usuario =  ref<UsuarioLog>(initializeUsuarioLog());

    
    // Objetos
    const PersonaJuridicaSUNAT = ref<PersonaJuridica>();
    const licencia = ref<Licencia>(initializeLicencia());
    const errors = ref<any>(initializeLicencia());
    const correlativo = ref<Correlativo>({
      numlicencia: '',
      codigolicencia: '',
      numresolucion: '',
      codigoresolucion: '',
      numautorizacion: '',
      codigoautorizacion:''
    });
    
    const datoslicencia = ref<editlicencia>({
      sequen_licencia: '',
      numero_licencia: '',
      numero_resolucion: '',
      licencia_fechaemision: '',
      zonificacion:''
    });

    const cargarLicencia = async () => {
      NProgress.start();
      try {
        const response = await get_licencia(props.idlic);
        licencia.value = response.data;
        if(licencia.value.negocio_horario){
          StoreList.HorarioLicencia = licencia.value.negocio_horario;
        }
        if(licencia.value.epocatramite==='NO ACTUAL'){
          existeLicencia.value=true;
        }else{
          existeLicencia.value=false;
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudo cargar la licencia.');
      } finally {
        NProgress.done();
      }
    };
    
    const guardar_zonificacion_select = async () => {
      try {
        NProgress.start();
        const RespuestaJSON = await guardar_zonificacion(
                                      licencia.value.idlic.toString(),
                                      licencia.value.zonificacion.toString());
        if (RespuestaJSON.success) {
          Notif.Success(RespuestaJSON.message);
        } else {
          // Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al guardar:', error);
        Notif.Error('Error al guardar');
      } finally {
        NProgress.done(); // Detener la barra de progreso
        cargarLicencia();
      }
    };
    
    //----------------------------------
    const guardar_itse_fechavencimiento = async () => {
      try {
        NProgress.start();
        const RespuestaJSON = await guardar_fechavencimiento(
                                      licencia.value.idlic.toString(),
                                      licencia.value.itse_fechavencimiento.toString());
        if (RespuestaJSON.success) {
          Notif.Success(RespuestaJSON.message);
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al guardar:', error);
        Notif.Error('Error al guardar');
      } finally {
        NProgress.done(); 
        cargarLicencia();
      }
    };
    
    //----------------------------------
    const guardar_vigencia_select = async () => {
      try {
        NProgress.start();
        const RespuestaJSON = await guardar_Vigencia(
                                      licencia.value.idlic.toString(),
                                      licencia.value.vigencia_tipo.toString());
        if (RespuestaJSON.success) {
          Notif.Success(RespuestaJSON.message);
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al guardar:', error);
        Notif.Error('Error al guardar');
      } finally {
        NProgress.done(); 
        cargarLicencia();
      }
    };
    


    const generarResolucionMunicipal = async () => {
      isGenerated.value=true;
      NProgress.start();
      licencia.value.resolucion_url="";
      
      try {
        const response = await generarResolucion(licencia.value.idlic.toString());
        if (response.success) {
          licencia.value.resolucion_url = response.data;
          Alerta.Sucessfull('Actualizado', 'Licencia Generada con éxito');
          isGenerated.value=false;
        } else {
          Alerta.Error('Error', response.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al actualizar la licencia.');
      } finally {
        NProgress.done();
        isGenerated.value=false;
      }
    };

    const volver = () => {
      // Lógica para volver a la lista de licencias
    };

    onMounted(async () => {
      await FunList.load_TramitesTupa_Oficina('2');      
      await cargarLicencia();
      generar_correlativo();
    });


    //  ------------------------------------------------------
    const file = ref<File | null>(null);
    const onFileSelected = (event: Event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
      if (selectedFile) {
        file.value = selectedFile;        
      }
    };
    const handleDrop = (event: DragEvent) => {
          event.preventDefault();
          if (event.dataTransfer && event.dataTransfer.files.length > 0) {
              file.value = event.dataTransfer.files[0];
          }
      };

    
    const subir_licenciaadjunta = async () => {
      if (!file.value) {
        Notif.Error('Debe cargar un archivo PDF');
        return;
      }


      const formData = new FormData();
      formData.append('file_documentoLicencia', file.value);
      formData.append('idlic', licencia.value.idlic.toString());
      formData.append('sequiencia', datoslicencia.value.sequen_licencia.toString());
      formData.append('codlicencia', datoslicencia.value.numero_licencia.toString());
      formData.append('fechaemision', datoslicencia.value.licencia_fechaemision.toString());

      try {
        NProgress.start();
        isUploading.value = true;  

        const RespuestaJSON = await guardar_licenciaAdjunta(formData);
        if (RespuestaJSON.success) {
            licencia.value.certificado_url = RespuestaJSON.data; 
            Notif.Success('Archivo subido correctamente');
        } else {
            Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error subiendo archivo:', error);
        Notif.Error('Ocurrió un error durante la subida');
      } finally {
        NProgress.done(); 
        isUploading.value = false;  
      }
    };


    //  ------------------------------------------------------
    const file_res = ref<File | null>(null);
    const onFileSelected_resolucion = (event: Event) => {
      const selectedFile_resolucion = (event.target as HTMLInputElement).files?.[0] || null;
      if (selectedFile_resolucion) {
        file_res.value = selectedFile_resolucion;
      }
    };
    const handleDrop_res = (event: DragEvent) => {
          event.preventDefault();
          if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            file_res.value = event.dataTransfer.files[0];
          }
      };
    
    const subir_resolucionAdjunta = async () => {
      if (!file_res.value) {
        Notif.Error('Debe cargar un archivo PDF');
        return;
      }

      if (datoslicencia.value.numero_resolucion==="") {
        Notif.Error('Ingrese el número de resolución.');
        return;
      }

      const formData = new FormData();
      formData.append('file_resolucionPDF', file_res.value);
      formData.append('idlic', licencia.value.idlic.toString());
      formData.append('numero_resolucion', datoslicencia.value.numero_resolucion.toString());

      try {
          NProgress.start();
          isUploading.value = true; 
          const RespuestaJSON = await guardar_resolucionAdjunto(formData);
          if (RespuestaJSON.success) {
              licencia.value.resolucion_url = RespuestaJSON.data; // Asigna la URL del PDF subido
              Notif.Success('Resolución subida correctamente');
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error subiendo archivo:', error);
          Notif.Error('Ocurrió un error durante la subida');
      } finally {
          NProgress.done(); // Detener la barra de progreso
          isUploading.value = false; // Habilitar el botón nuevamente
      }
    };

    // CERTIFICADO **********************************************************
    const qrCode = ref("");
    const pdfContent = ref<HTMLDivElement | null>(null);

    // Método para generar el código QR
    const generateQRCode = async (text: string) => {
      try {
        const url = await QRCode.toDataURL(text, {
          width: 80, // Define el tamaño del código QR
          margin: 1, // Ajusta el margen alrededor del QR si lo deseas
          errorCorrectionLevel: 'Q'
        });
        qrCode.value = url; // Asigna la URL del QR al src del <img>
      } catch (err) {
        console.error(err);
      }
    };


    // Helper para evitar valores indefinidos
    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    //********************************************************************************** */
    //********************************************************************************** */
    //********************************************************************************** */
    
    const generarPDF =  async (licenciaactual: Licencia) => { 
      if(checkValue(licenciaactual.zonificacion)==='N/A'){
        Notif.Error('Debe registrar la zonificación');
        return;
      }else if(checkValue(licenciaactual.vigencia_tipo) ==='N/A'){
        Notif.Error('Debe registrar la vigencia');
        return;
      }else{

      }
      
      NProgress.start();
      isGenerated.value=true;
      const textocodigo = BASE_URL+"/licencias/verified/"+licenciaactual.idlic.toString();
      await generateQRCode(textocodigo); 
      licencia.value.certificado_url="";
      const doc = new jsPDF({
          orientation: "portrait", // Orientación vertical
          unit: "mm",              // Unidad en milímetros
          format: "a4",            // Formato A4
      });

      
      const imgfirma = new Image();
      imgfirma.src = firmaURL;
      const fondo = new Image();
      fondo.src = fondocertificado;
      
      


      let PosicionY = 0;
      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();  
      const pageHeight = doc.internal.pageSize.getHeight(); 
      const col1 = margin; 
      const col2 = margin + 70; 
      const maxWidth = pageWidth - col2 - margin; 

      doc.addImage(fondo, "JPG", 0, 0, pageWidth, pageHeight);

      // Función para agregar texto que salte de línea automáticamente
      const addTextWithWrap = (text: string, x: number, y: number, maxWidth: number): number => {
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y); 
        return lines.length * 7; 
      };
      const addTextWithWrapCenter = (text: string, x: number, y: number, maxWidth: number): number => {
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y, { align: "center" }); 
        return lines.length * 7; 
      };

      

      // Borde azul
      if(licencia.value.categoriatramite_tupa==="Autorización"){
        doc.setDrawColor(215, 93, 0);
      }else{
        doc.setDrawColor(252, 218, 151);
      }
      doc.setLineWidth(1);
      doc.roundedRect(margin - 3, margin - 3, pageWidth - margin * 2 + 6, 272, 2, 2); // Rectángulo como borde

      // Borde azul
      if(licencia.value.categoriatramite_tupa==="Autorización"){
        doc.setDrawColor(232, 178, 0);
      }else{
        doc.setDrawColor(240, 191, 93);
      }
      
      doc.setLineWidth(4);
      doc.roundedRect(margin - 7, margin - 7, pageWidth - margin * 2 + 14, 280, 3, 3); // Rectángulo como borde

      // Título de la licencia
      const imgData = qrCode;
      PosicionY=PosicionY+15;
      
      doc.addImage(escudomunicipal, "PNG", pageWidth/2-20, PosicionY, 40, 46);

      // Título de la municipalidad
       PosicionY=PosicionY+46+8;
      
      // Título de la licencia

      doc.setFontSize(19);
      doc.setFont("helvetica", "bold"); // Establecer la fuente en negrita
      if(licencia.value.categoriatramite_tupa==="Autorización"){
        doc.text("AUTORIZACIÓN TEMPORAL", pageWidth / 2, PosicionY, { align: "center" });
        PosicionY=PosicionY+7;
        doc.text("", pageWidth / 2, PosicionY, { align: "center" });
      }else{
        doc.text("LICENCIA DE FUNCIONAMIENTO", pageWidth / 2, PosicionY, { align: "center" });
        PosicionY=PosicionY+7;
        if(licencia.value.vigencia_tipo==="PROVISIONAL"){
            doc.text("PROVISIONAL", pageWidth / 2, PosicionY, { align: "center" });
        }else{
            doc.text("DEFINITIVA", pageWidth / 2, PosicionY, { align: "center" });
        }
      }
      
     
      // 
      PosicionY=PosicionY+8;

      // Dibujar el fondo (como si fuera el background-color del 'div')
      // if(licencia.value.categoriatramite_tupa==="Autorización"){
      //   doc.setFillColor(245, 90, 17); 
      // }else{
      //   doc.setFillColor(0, 107, 213); 
      // }
      
      // if(licencia.value.categoriatramite_tupa==="Autorización"){
      //   doc.roundedRect(pageWidth / 2-50, PosicionY-6, 100, 8, 2, 2, 'F'); 
      // }else{
      //   doc.roundedRect(pageWidth / 2-40, PosicionY-6, 80, 8, 2, 2, 'F'); 
      // }
      // Añadir texto centrado dentro del "div"
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      if(licencia.value.categoriatramite_tupa==="Autorización"){
        doc.text(correlativo.value.codigoautorizacion.toString(), pageWidth / 2, PosicionY, { align: "center" });
      }else{
        doc.text(correlativo.value.codigolicencia, pageWidth / 2, PosicionY, { align: "center" });
      }


      doc.setTextColor(0, 0, 0); 
      
      // Subtítulo
      PosicionY=PosicionY+8;
      doc.setFontSize(10);

      doc.text("“Exhibir en un lugar Visible”", pageWidth / 2, PosicionY, { align: "center" });
      
      doc.setFontSize(12);
      PosicionY=PosicionY+8;

      let texttitulo="";
      if(licencia.value.categoriatramite_tupa==="Autorización"){
        texttitulo="AUTORIZACION TEMPORAL PARA EL EXPENDIO O VENTA DE BEBIDAS ELABORADAS CON PLANTAS MEDICINALES EN LA VIA PUBLICA";
        
      }else{
        texttitulo="AUTORIZACION DISTRITAL DE FUNCIONAMIENTO DE ESTABLECIMIENTOS COMERCIAL, INDUSTRIAL Y DE SERVICIOS";
      }
      PosicionY += addTextWithWrapCenter(checkValue(texttitulo.toUpperCase()), pageWidth / 2, PosicionY,  pageWidth - margin * 2);
      
      
      // Títulos y contenido
      PosicionY = PosicionY + 5;
      doc.setFontSize(12);

      // ----------------------
      doc.setFillColor(245, 249, 195);       
      doc.setFont("helvetica", "bold");
      doc.text("NOMBRE O RAZON SOCIAL:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(checkValue(licenciaactual.negocio_razonsocial), col2, PosicionY, maxWidth);
      doc.setFontSize(12);

      // ----------------------
      doc.setFillColor(245, 249, 195);       
      doc.setFont("helvetica", "bold");
      doc.text("RUC N°:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      PosicionY += addTextWithWrap(checkValue(licenciaactual.negocio_ruc), col2, PosicionY, maxWidth);

      // ----------------------
      doc.setFillColor(245, 249, 195);       
      doc.setFont("helvetica", "bold");
      doc.text("REPRESENTANTE LEGAL:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(checkValue(licenciaactual.representantelegal_nombre), col2, PosicionY, maxWidth);
      doc.setFontSize(12);
      
      // ----------------------
      doc.setFillColor(245, 249, 195);        
      doc.setFont("helvetica", "bold");
      doc.text("DNI Y/0 C.E N°:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(checkValue(licenciaactual.representantelegal_dni), col2, PosicionY, maxWidth);
      doc.setFontSize(12);

      // ----------------------
      doc.setFillColor(245, 249, 195);        
      doc.setFont("helvetica", "bold");
      if(licencia.value.categoriatramite_tupa==="Autorización"){
        doc.text("NOMBRE DE ASOCIACIÓN:", col1+4, PosicionY);
      }else{
        doc.text("NOMBRE COMERCIAL:", col1+4, PosicionY);
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(checkValue(licenciaactual.negocio_nombrecomercial), col2, PosicionY, maxWidth);
      doc.setFontSize(12);

      // ----------------------
      doc.setFillColor(245, 249, 195);       
      doc.setFont("helvetica", "bold");
      doc.text("UBICACIÓN:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(checkValue(licenciaactual.dir_direccioncomercial+ " -  DISTRITO VEINTISÉIS DE OCTUBRE - PIURA."), col2, PosicionY, maxWidth);
      doc.setFontSize(12);
      PosicionY = PosicionY - 4;

      // ----------------------
      doc.setFillColor(245, 249, 195);        
      doc.setFont("helvetica", "bold");
      doc.text("ACTIVIDAD COMERCIAL:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(checkValue(licenciaactual.negocio_actividadcomercial), col2, PosicionY, maxWidth);
      doc.setFontSize(12);
      PosicionY = PosicionY - 2;

      // ----------------------
      if(licencia.value.categoriatramite_tupa!=="Autorización"){
        doc.setFillColor(245, 249, 195);          
        doc.setFont("helvetica", "bold");
        doc.text("ÁREA:", col1+4, PosicionY);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        PosicionY += addTextWithWrap(`${checkValue(licenciaactual.negocio_area)} m²`, col2, PosicionY, maxWidth);
        doc.setFontSize(12);

      }
      

      // ----------------------
      doc.setFillColor(245, 249, 195);        
      doc.setFont("helvetica", "bold");
      doc.text("HORARIO DE ATENCIÓN:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(`${checkValue(licenciaactual.negocio_horario)}`, col2, PosicionY, maxWidth);
      doc.setFontSize(12);

       // ----------------------
      doc.setFillColor(245, 249, 195);            
      doc.setFont("helvetica", "bold");
      doc.text("FECHA DE EMISION:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      PosicionY += addTextWithWrap(FormatFecha.fecha_larga(licenciaactual.fechaemision), col2, PosicionY, maxWidth);
      doc.setFontSize(12);

      if(licencia.value.categoriatramite_tupa==="Autorización"){
         
          // ----------------------
          doc.setFillColor(245, 249, 195);  
          
          doc.setFont("helvetica", "bold");
          doc.text("FECHA DE CADUCIDAD:", col1+4, PosicionY);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          PosicionY += addTextWithWrap(FormatFecha.fecha_larga_masuno(licenciaactual.fechaemision), col2, PosicionY, maxWidth);
          doc.setFontSize(12);
      }

      if(licencia.value.categoriatramite_tupa!=="Autorización" && licencia.value.vigencia_tipo==="PROVISIONAL"){
         
          // ----------------------
          doc.setFillColor(245, 249, 195);  
          
          doc.setFont("helvetica", "bold");
          doc.text("FECHA DE CADUCIDAD:", col1+4, PosicionY);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          PosicionY += addTextWithWrap(FormatFecha.fecha_larga_masuno(licenciaactual.fechaemision), col2, PosicionY, maxWidth);
          doc.setFontSize(12);
      }

      // ----------------------
      doc.setFillColor(245, 249, 195);  
      
      doc.setFont("helvetica", "bold");
      doc.text("RESOLUCIÓN:", col1+4, PosicionY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      PosicionY += addTextWithWrap("R.G. N° 347-2025-MDVO-GDE", col2, PosicionY, maxWidth-40);
      // PosicionY += addTextWithWrap("R.G. N° 306-2025-MDVO-GDE", col2, PosicionY, maxWidth-40);
      // PosicionY += addTextWithWrap("R.G. N° 88-2025-MDVO-GDE-AT", col2, PosicionY, maxWidth);
      doc.setFontSize(12);
      // ------------------------
      
 
      // QR
       const imgData2 = qrCode;
     // doc.addImage(imgfirma, "PNG", pageWidth*1/4-5, 217, 52, 44);
      doc.addImage(imgData2.value, "JPEG", pageWidth*3/4-10, 210, 40, 40); // Modifica la posición 


      // ----------
      // Añadir textos legales
      doc.setFontSize(7);

      if(licencia.value.categoriatramite_tupa==="Autorización"){
        doc.text(
          "1. Esta AUTORIZACIÓN es de vigencia Temporal (01 AÑO). El conductor queda prohibido de alquilar, traspasar o realizar " +
          "cualquier tipo de transferencia de la presente autorización a terceros que desempeñen actividad similar; adulterar datos" +
          "consignados y ejercer actividad comercial en módulos no autorizados.",
          margin, 265, { maxWidth: pageWidth - margin * 2 }
        );
        doc.text(
            "2. El conductor del establecimiento se encuentra obligado acatar las disposiciones emitidas por la autoridad municipal, " +
            "autoridades sanitarias y/o competentes en casos emergencias sanitarias conforme a Ley.",
            margin, 272, { maxWidth: pageWidth - margin * 2 }
        );
        doc.text(
            "3. El conductor del negocio queda prohibido de ejercer actividad comercial en estado de ebriedad, generar pleitos y/o," +
            "maltratos físicos o verbales con los compañeros y terceros.",
            margin, 279, { maxWidth: pageWidth - margin * 2 }
        );
      }else{
        doc.text(
          "1.Esta licencia tiene vigencia indeterminada.  El Certificado de Inspección Técnica de Seguridad en edificaciones tiene vigencia de dos años, a partir de su expedición, " +
          "tanto en el caso en que la inspección se realiza de manera posterior al otorgamiento de la licencia de funcionamiento, como en el caso en que, por tratarse de " +
          "riesgo alto y muy alto, se le requiere como requisito previo para otorgar la licencia de funcionamiento.",
          margin, 260, { maxWidth: pageWidth - margin * 2 }
        );
        doc.text(
          "2.El conductor del establecimiento se encuentra prohibido de ocupar la vía pública, ejercer giro distinto, perturbar la tranquilidad pública, vender bebidas " +
          "alcohólicas a menores de edad o facilitar el consumo de las mismas en la vía Pública, entre otras disposiciones normativas correspondientes, caso contrario es " +
          "susceptible la imposición de las sanciones administrativas que resulten pertinentes.",
          margin, 269, { maxWidth: pageWidth - margin * 2 }
        );
        doc.text(
          "3.El conductor del establecimiento se encuentra obligado acatar las disposiciones emitidas por la autoridad municipal, autoridades sanitarias y/o competentes en " +
          "casos emergencias sanitarias conforme a Ley.",
          margin, 278, { maxWidth: pageWidth - margin * 2 }
        );

      }

      

      

      // Fecha de creación del documento
      doc.setFont("helvetica", "bold");
      doc.text(FormatFecha.convertirFecha(licenciaactual.fechaemision), pageWidth - margin - 25, pageHeight - margin);

      // Exportar como PDF
      // doc.save('licencia_funcionamiento.pdf');
      const pdfBlob = doc.output('blob');


      const formData = new FormData();
      formData.append('idlic', licenciaactual.idlic.toString());
      formData.append('tipo_duracion', licenciaactual.vigencia_tipo.toString());
      formData.append('sequiencia', correlativo.value.numlicencia.toString());
      formData.append('codlicencia', correlativo.value.codigolicencia.toString());
      formData.append('numresolucion', correlativo.value.numresolucion.toString());
      formData.append('codautorizacion', correlativo.value.codigoautorizacion.toString());
      formData.append('numautorizacion', correlativo.value.numautorizacion.toString());

      formData.append('categoriatramite', licenciaactual.categoriatramite_tupa.toString());

      formData.append('codresolucion', correlativo.value.codigoresolucion.toString());
      formData.append('qrverificacion', BASE_URL+"/licencias/verified/"+licenciaactual.idlic.toString());
      const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, ''); // Fecha y hora sin caracteres no válidos
      const randomNum = Math.floor(Math.random() * 10000); // Número aleatorio entre 0 y 9999
      formData.append('file_documentoLicencia', pdfBlob, `Documento_${licenciaactual.resolucion_numero}_${timestamp}_${randomNum}.pdf`);

      
      try {
        
        const RespuestaJSON = await guardar_licenciaGenerada(formData);
        if (RespuestaJSON.success) {
          licencia.value.certificado_url = RespuestaJSON.data; // Asigna la URL del PDF subido
          isGenerated.value=false;
          await cargarLicencia();
          generar_correlativo();
          Notif.Success('Licencia Generada Correctamente');
          
          
        } else {
          licencia.value.certificado_url="";
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al guardar la licencia y el PDF:', error);
        alert('Error al guardar la licencia y el PDF.');
      } finally {
        isGenerated.value=false;
        await cargarLicencia();
        NProgress.done(); 
        
      }

    };

    const generar_correlativo = async () => {
      
      if(licencia.value.estadotramite==='EMITIDO'){
        if (licencia.value.certificado_numerosequencia) {
            correlativo.value.numlicencia = licencia.value.certificado_numerosequencia.toString() || "";
        } else {
            correlativo.value.numlicencia = "";
        }
        correlativo.value.codigolicencia = 
            "L.F. N° " + (licencia.value.certificado_numerosequencia || "") + "-" + new Date(licencia.value.fecharegistro).getFullYear() + "-MDVO-GDE";

        correlativo.value.numresolucion = licencia.value.resolucion_numero || "";
        correlativo.value.codigoresolucion = 
            "R.G. N° " + (licencia.value.resolucion_numero || "") + "-" + new Date().getFullYear() + "-MDVO-GDE";

        correlativo.value.numautorizacion = licencia.value.autorizacion_numero || "";
        correlativo.value.codigoautorizacion = 
            "AUTORIZACIÓN N° " + (licencia.value.autorizacion_numero || "") + "-" + new Date(licencia.value.fecharegistro).getFullYear()  + "-MDVO-GDE";

      }else{
        try {        
          const RespuestaJSON = await obtener_Correlativo();
          if (RespuestaJSON.success) {
            
            correlativo.value.numautorizacion = RespuestaJSON.data.siguiente_numautorizacion;   
            correlativo.value.codigoautorizacion = "AUTORIZACIÓN N° "+ RespuestaJSON.data.siguiente_numautorizacion +"-"+ new Date().getFullYear()+"-MDVO-GDE";

            correlativo.value.numlicencia = RespuestaJSON.data.siguiente_certificado;  
            correlativo.value.codigolicencia = "N° "+ correlativo.value.numlicencia +"-"+  new Date().getFullYear()+"-MDVO-GDE";
            correlativo.value.numresolucion = RespuestaJSON.data.siguiente_resolucion;  
            correlativo.value.codigoresolucion = "R.G. N° "+ correlativo.value.numresolucion +"-"+ new Date().getFullYear()+"-MDVO-GDE";
          } else {
            Notif.Error(RespuestaJSON.message);
          }
        } catch (error) {
          console.error('Error al guardar la licencia y el PDF:', error);
        }
      }
    };
   

    return {
      zonificacion,
     
      licencia,
      errors, 
      PersonaJuridicaSUNAT,
      volver,
      breadcrumbRoutes,
      isUploading,
      onFileSelected,onFileSelected_resolucion,
      HOST_URL,
      generarPDF,
      isGenerated,
      pdfContent,
      guardar_itse_fechavencimiento,
      qrCode,
      generarResolucionMunicipal,
      StoreList,
      correlativo, 
      existeLicencia,
      datoslicencia,
      idlicencia,
      subir_resolucionAdjunta,
      subir_licenciaadjunta,
      file,handleDrop,
      file_res, handleDrop_res,
      guardar_vigencia_select,guardar_zonificacion_select

    };
  },
});
</script>

<style scoped>
.text-primary {
  color: #007bff !important;
}

.file-input-wrapper {
  position: relative;
  width: 100%;
  border-style: dashed;
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
  border-style:dotted;
  border-color: #aed0e0;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-file-label:hover {
  background-color: #0056b3;
}



.multi-line-option {
  white-space: normal;
  word-wrap: break-word; /* Rompe las palabras si es necesario */
  display: block;
}

</style>
