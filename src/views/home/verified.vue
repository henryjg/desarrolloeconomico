<template>
    <div class="container-fluid bg-blue-700">
        <div class="row">
            <div class="col-12">
              <div class=" my-3">
                  <div class="card-body ">
                        <h5 class="text-center pt-3 fw-bold px-3 text-white">MUNICIPALIDAD DISTRITAL DE VEINTISÉIS DE OCTUBRE</h5>
                  </div>
              </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12">
              <div class=" mt-3">
                  <div class="card-body ">
                        <h4 class="text-center pt-3">
                          {{licencia.categoriatramite_tupa==='Autorización' ? 
                          "AUTORIZACIÓN TEMPORAL" : 
                          "LICENCIA DE FUNCIONAMIENTO DEFINITIVA"}}
                          
                        </h4>
                        
                        
                        <div class="alert bg-secondary text-white m-auto text-center f-16 f-w-600 w-75">
                              {{licencia.categoriatramite_tupa==='Autorización' ? licencia.autorizacion_codigo : licencia.certificado_codigo}}
                        </div>
                      
                        <!-- ------------- -->
                         <div class="text-yellow-900 f-w-700 text-center f-16 py-2">VERIFICA LA INFORMACIÓN DEL QR ESCANEADO</div>
                        <div 
                              :class="licencia.vigencia_estado==='VIGENTE' ? 'alert-success' : 'alert-danger'"
                              class="alert f-16 f-w-700 text-center m-auto my-3">  
                              ESTADO: {{ licencia.vigencia_estado }}
                        </div>

                        <!-- ------------- -->
                        <div class="container">
                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> RESOLUCIÓN:</div>
                            <div class="col-12 col-md-8 p-l-20 f-w-700 uppercase">Emitida con {{ licencia.resolucion_codigo }}</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> FECHA EMISIÓN:</div>
                            <div class="col-12 col-md-8 p-l-20 f-w-700 uppercase">{{ FormatFecha.fecha_larga(licencia.fechaemision) }}</div>
                          </div>

                          <div v-if="licencia.categoriatramite_tupa==='Autorización'" class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> FECHA CADUCIDAD:</div>
                            <div class="col-12 col-md-8  p-l-20 f-w-700 uppercase">{{ FormatFecha.fecha_larga_masuno(licencia.fechaemision) }}</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> Razón Social:</div>
                            <div class="col-12 col-md-8  p-l-20">{{ licencia.negocio_razonsocial }}</div>
                          </div>
                          
                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> RUC:</div>
                            <div class="col-12 col-md-8 p-l-20">{{ licencia.negocio_ruc }}</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> Representante Legal:</div>
                            <div class="col-12 col-md-8 p-l-20">
                              {{ licencia.representantelegal_nombre }}
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> DNI Y/0 C.E N°:</div>
                            <div class="col-12 col-md-8  p-l-20">
                              {{ licencia.representantelegal_dni }}
                            </div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> 
                              {{ licencia.categoriatramite_tupa==="Autorización" ? "Nombre de Asociación" : "Nombre Comercial" }}</div>
                            <div class="col-12 col-md-8 p-l-20">{{ licencia.negocio_nombrecomercial }}</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> Actividad Comercial:</div>
                            <div class="col-12 col-md-8 p-l-20">{{ licencia.negocio_actividadcomercial }}</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> Dirección Comercial:</div>
                            <div class="col-12 col-md-8 p-l-20">{{ licencia.dir_direccioncomercial }}</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> Área del Negocio:</div>
                            <div class="col-12 col-md-8  p-l-20">{{ licencia.negocio_area }}</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> Aforo del Negocio:</div>
                            <div class="col-12 col-md-8 p-l-20">{{ licencia.negocio_aforo }}</div>
                          </div>

                          <div class="row mb-5">
                            <div class="col-12 col-md-4 f-w-700 text-dark uppercase">
                              <i class="fas fa-angle-right"></i> Horario del Negocio:</div>
                            <div class="col-12 col-md-8 p-l-20">{{ licencia.negocio_horario }}</div>
                          </div>
                        </div>

                  </div>
              </div>
            </div>
        </div>
    </div>  
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import {  get_licencia, upd_licenciaActual} from '../../services/LicenciaService';
  import Breadcrumb from '../../components/breadcrumb.vue';
  import ErrorMessage from '../../components/ErrorMessage.vue';
  import Alerta from '../../utils/alertas';
  import { HOST_URL } from '../../config';
 
  import QRCode from 'qrcode';
  import NProgress from 'nprogress';
  
  import fechaview from '../../components/horario_select.vue';
  import { Listas } from '../../composables/ListasIndependientes';
  
  import { PersonaJuridica } from '../../interfaces/sunat.interfaces';
  import { tiposPersonaJuridica, tiposInspeccion, resultadosITSE, nivelesRiesgo } from '../../utils/listas.fijas'; // Ajusta el path según tu estructura
  
  import { ListasStore } from '../../stores/listasStore';
  import { usarAuthStore } from '../../stores/autentificacionStore';
  import { initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
  import { initializeLicencia, Licencia } from '../../interfaces/licencia.interfaces';
  import { FormatFecha } from '../../utils/FormatFecha';
  import { useRoute, useRouter } from 'vue-router';
  
  interface Link {
    path: string;
    name: string;
  }
  
  export default defineComponent({
    components: {
      ErrorMessage,
      Breadcrumb,
      fechaview
    },
    setup() {
      const route  = useRoute();
      const router = useRouter();

      const isUploading = ref(false); // Deshabilitar el botón
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
  
      const idlicencia = Number(route.params.idlic);

      const cargarLicencia = async () => {
      NProgress.start();
      try {
        const response = await get_licencia(idlicencia.toString());
        console.log(response.data);  // Para verificar los datos recibidos
        licencia.value = response.data;
        if (licencia.value.negocio_horario) {
          StoreList.HorarioLicencia = licencia.value.negocio_horario;
        }
      } catch (error) {
        console.error(error);  // Para mostrar detalles del error
      } finally {
        NProgress.done();
      }
    };
      
      onMounted(() => {
        FunList.load_TramitesTupa_Oficina('2');
       
        cargarLicencia();
        generateQRCode('lapadua'); 
      });
  
  

  
  
      // CERTIFICADO **********************************************************
      const qrCodeUrl = ref<string>('');
      const pdfContent = ref<HTMLDivElement | null>(null);
  
      // Método para generar el código QR
      const generateQRCode = async (text: string) => {
        try {
          const url = await QRCode.toDataURL(text, {
            width: 250, // Define el tamaño del código QR
            margin: 1, // Ajusta el margen alrededor del QR si lo deseas
            errorCorrectionLevel: 'Q',
            version: 3 
          });
          qrCodeUrl.value = url; // Asigna la URL del QR al src del <img>
        } catch (err) {
          console.error(err);
        }
      };
  
  
  
  
  
      return {
        tiposPersonaJuridica,
        tiposInspeccion,
        resultadosITSE,
        nivelesRiesgo,
        licencia,
        errors, 
        PersonaJuridicaSUNAT,
        breadcrumbRoutes,
        isUploading,
        HOST_URL,
        pdfContent,
        qrCodeUrl,
        StoreList,
        FormatFecha  
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
  
  
  
  .multi-line-option {
    white-space: normal;
    word-wrap: break-word; /* Rompe las palabras si es necesario */
    display: block;
  }
  
  </style>
  