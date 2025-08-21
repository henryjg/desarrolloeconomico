<template>
    <div class="row">
      <div class="col-12">
        <Breadcrumb :links="breadcrumbRoutes"/>
      </div>
    </div>
    <div class="row">
        <div class="col-md-10">
                
            <div class="card">
              <div class="card-header bg-secondary pb-1 pb-0">
                <h5 class="text-white">
                  <i class="fa fa-edit"></i> Datos de Solicitud
                </h5>
              </div>              
              <div class="card-body bg-light-blue-accent-3">  
                  
                <!-- ********************************************* -->  
                <table class="table table-xs  text-start">
                  <thead>
                    <tr>
                      <th style="width: 30%">DATOS PERSONALES</th>
                      <th style="width: 70%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="f-w-600 text-dark">Codigo de Expediente:</td>
                      <td>{{ licencia.documento_codexpediente }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">RUC:</td>
                      <td>{{ licencia.negocio_ruc }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Razón Social:</td>
                      <td>{{ licencia.negocio_razonsocial }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Dirección Fiscal:</td>
                      <td>{{ licencia.negocio_direccionfiscal }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Representante Legal:</td>
                      <td>{{ licencia.representantelegal_nombre }}
                          DNI  |  {{ licencia.representantelegal_dni }}
                      </td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">DNI:</td>
                      <td>{{ licencia.representantelegal_dni }}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="table table-xs  text-start mt-5">
                  <thead>
                    <tr>
                      <th style="width: 30%">DATOS DEL NEGOCIO</th>
                      <th style="width: 70%"></th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td class="f-w-600 text-dark">Nombre Comercial:</td>
                      <td>{{ licencia.negocio_nombrecomercial }}</td>
                    </tr>
                    
                    <tr>
                      <td class="f-w-600 text-dark">Actividad Comercial:</td>
                      <td>{{ licencia.negocio_actividadcomercial }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Condición del Local:</td>
                      <td>{{ licencia.negocio_condicionlocal }}</td>
                    </tr>
                    
                    <tr>
                      <td class="f-w-600 text-dark">Dirección Comercial:</td>
                      <td>{{ licencia.dir_direccioncomercial }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Detalle Dirección:</td>
                      <td>Núm: {{ licencia.dir_numero }} 
                        |  Letra: {{ licencia.dir_letra }} 
                        |  Int: {{ licencia.dir_inter }}
                        |  Mz: {{ licencia.dir_mz }} 
                        |  Lote: {{ licencia.dir_lote }}
                        |  Dpto: {{ licencia.dir_dpto }}
                      </td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Referencia:</td>
                      <td>{{ licencia.dir_referencia }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Área del Negocio:</td>
                      <td>{{ licencia.negocio_area }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Aforo del Negocio:</td>
                      <td>{{ licencia.negocio_aforo }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Horario del Negocio:</td>
                      <td>{{ licencia.negocio_horario }}</td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Monto del Pago:</td>
                      <td>{{ licencia.pago_monto }}
                          <div class="badge f-14 text-bg-success">OP | {{ licencia.pago_codoperacion }}</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="f-w-600 text-dark">Voucher de Pago</td>
                      <td>{{ licencia.pagovoucher_url }}</td>
                    </tr>
                    
                    <tr>
                      <td class="f-w-600 text-dark">Tipo de Inspección ITSE:</td>
                      <td>{{ licencia.itse_tipoinspeccion }}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- ********************************************* -->  

              </div>
            </div>
            <!-- ------------------------------ -->

            <!-- ------------------------------ -->    
            <div class="card">
              <div class="card-header bg-secondary pb-1 pb-0">
                <h5 class="text-white">
                  <i class="fa fa-edit"></i> Documentos
                </h5>
              </div>              
              <div class="card-body bg-light-blue-accent-3">  
                <!-- ********************************************* -->  

                <div class="row">
                  <div class="col-6 text-center">
                    <a  :href="HOST_URL+licencia.certificado_url" target="_blank" class="text-dark">
                        <div class="alert alert-danger">
                          <img src="../../assets/images/pdf.png" class="img-fluid wid-50"> Certificado PDF
                        </div>
                    </a>
                  </div>
                  <div class="col-6  text-center">
                        <a v-if="licencia.resolucion_url &&   licencia.resolucion_url!==''" :href="HOST_URL+licencia.resolucion_url" target="_blank" class="text-dark"> 
                            <div class="alert alert-success">
                              <img src="../../assets/images/pdf.png" class="img-fluid wid-50"> Resolución PDF
                            </div>
                        </a>
                        <div v-else class="alert alert-warning"> 
                          <i class="fa fa-times"></i> Sin resolución.</div>
                  </div>
                </div> 
                  <!-- ---------------------------- -->
              </div>
            </div>    
        </div>
    
        <div class="col-md-2">
         
                <!-- ------------------------------ -->
                <div class="sticky-top mt-0 pt-0 text-center" style="top:74px">
                   
                    <div class="col-12">
                       
                        <button  class="btn btn-danger d-inline-flex btn-lg mt-2 w-100"
                                @click="openModal">
                                <i class="fas fa-times p-r-5"></i>Anular Licencia</button>
                        <router-link :to="{ name: 'Editarlicencia', params: { idlic: licencia.idlic } }" 
                        class="btn btn-lg d-inline-flex btn-primary mt-2 w-100">
                    
                        <i class="fas fa-edit p-r-5"></i>Editar
                        </router-link>
                        <!-- -------------------------------- -->
                        <router-link :to="{ name: 'ListarLicenciasEmitidas'}" 
                                class="btn btn-lg d-inline-flex btn-secondary mt-2 w-100">
                           
                                <i class="fas fa-arrow-left p-r-5"></i>Volver
                        </router-link>

                        
                    </div>
                </div>
                <!-- ------------------------------ -->

        </div>
    </div>  


    <!-- ------------------------------------------------- -->
    <!-- ------------------------------------------------- -->

    <!-- Modal para agregar Requisito -->
    <div class="modal fade" id="modalRechazar" tabindex="-1" aria-labelledby="modalRechazarLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-red-400 pt-3 pb-2 ">
                    <h6 class="modal-title text-white" id="modalRechazarLabel">
                        <i class="fa fa-exclamation-triangle p-r-15"></i>RECHAZAR LICENCIA
                    </h6>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-1">
                    <div class="mb-3">
                        <label for="reqnombre" class="form-label text-dark f-w-600">Operación:</label>
                        <select class="form-select" v-model="frm_tipooperacion">
                            <option value="">Seleccione una opción</option>
                            <option value="EMITIDO_BAJA">DAR BAJA</option>
                            <option value="EMITIDO_REVOCADA">REVOCAR LICENCIA</option>
                            <option value="EMITIDO_NULIDAD">NULIDAD</option>
                            <!-- Add options here -->
                        </select>                    
                    </div>
                </div>
                <div class="modal-body py-1">
                    <div class="mb-3">
                        <label for="reqnombre" class="form-label text-dark f-w-600">Motivo</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="frm_motivo" placeholder="Ingresa el nombre" rows="3"></textarea>
                    </div>
                </div>

                <div class="modal-footer py-0">                    
                    <button type="submit" class="btn btn-danger" @click="dar_bajaonulidad">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import { get_licencia, aceptar_solicitud_licencia, dar_bajanulidad} from '../../services/LicenciaService';
  import Breadcrumb from '../../components/breadcrumb.vue';
  import ErrorMessage from '../../components/ErrorMessage.vue';
  import Alerta from '../../utils/alertas';
  import { Modal } from 'bootstrap';
  import { HOST_URL } from '../../config';
  import Notif from '../../utils/notificaciones';
  
  import NProgress from 'nprogress';
  
  import fechaview from '../../components/horario_select.vue';
  import { Listas } from '../../composables/ListasIndependientes';
  
  import { get_datosRUC,get_datosDNI } from '../../services/apisunat';
  import { FormInsertLicencia, initializeFormInsertLicencia } from '../../interfaces/licencia.interfaces';
  import { PersonaJuridica } from '../../interfaces/sunat.interfaces';
  import { tiposPersonaJuridica, tiposInspeccion, resultadosITSE, nivelesRiesgo } from '../../utils/listas.fijas'; // Ajusta el path según tu estructura
  
  import { ListasStore } from '../../stores/listasStore';
 
  import { initializeLicencia, Licencia } from '../../interfaces/licencia.interfaces';
import router from '../../router';
import { useRouter } from 'vue-router';
  
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
    props: {
      idlic: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const router = useRouter();
      const breadcrumbRoutes = ref<Link[]>([
        { path: '/office/licencias_emitidas', name: 'Licencias' },
        { path: '', name: 'Operaciones' },
      ]);
  
      // Listas Dependientes.
      const StoreList = ListasStore();
      const frm_motivo = ref("");
      const frm_tipooperacion = ref("");
      
      const PersonaJuridicaSUNAT = ref<PersonaJuridica>();
      const licencia = ref<Licencia>(initializeLicencia());
      const errors = ref<any>(initializeLicencia());
  
  
      // ---Validación de DNI -------------------------

  
      const cargarLicencia = async () => {
        NProgress.start();
        try {
            const response = await get_licencia(props.idlic);
            licencia.value = response.data;
            if(licencia.value.negocio_horario){
            StoreList.HorarioLicencia = licencia.value.negocio_horario;
            }
        } catch (error) {
            Alerta.Error('Error', 'No se pudo cargar la licencia.');
        } finally {
            NProgress.done();
        }
     };

     const dar_bajaonulidad = async () => {
      const isConfirmado = await Alerta.ConfirmacionRegistro(
            'Confirmación',
            '¿Desea rechazar esta solicitud?'
        );
        if (isConfirmado) {
          NProgress.start();
          try {
              const response = await dar_bajanulidad(props.idlic, frm_motivo.value, frm_tipooperacion.value);
              if(response.success){
                closeModal();
                Notif.Success("El expediente fue rechazado.");
                router.push('/office/licencias_emitidas');
              }
          } catch (error) {
              Alerta.Error('Error', 'No se pudo cargar la licencia.');
          } finally {
              NProgress.done();
          }
        }
     };
     const openModal = () => {
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
    
  
      onMounted(() => {
        cargarLicencia();
      });
  
  
  
  
  
  
      return {
        tiposPersonaJuridica,
        tiposInspeccion,
        resultadosITSE,
        nivelesRiesgo,
        licencia,
        errors, 
        PersonaJuridicaSUNAT,
        breadcrumbRoutes,
        dar_bajaonulidad,
        StoreList,
        frm_motivo,
        openModal,closeModal,
        HOST_URL,
        frm_tipooperacion
  
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
  