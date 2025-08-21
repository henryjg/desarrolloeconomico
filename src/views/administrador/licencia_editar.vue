<template>
  <div class="row ">
    <div class="col-12">
      <div class="d-flex m-l-15">
          <router-link :to="{ name: 'Editarlicencia', params: { id: idlicencia } }"
                class="btn btn-warning rounded-top-3 rounded-bottom-0 me-2 pt-2">
            <i class="ti ti-database  p-r-5"></i> DATOS
          </router-link>

          <router-link :to="{ name: 'Generarlicencia', params: { id: idlicencia } }"
                class="btn btn-secondary  rounded-top-3 rounded-bottom-0  me-2  pt-2">
            <i class="ti ti-certificate p-r-5"></i> GENERAR DOCUMENTOS
          </router-link>
      </div>
    </div>
  </div>
  <div class="row mt-0">
      <div class="col-md-10">
          <div class="card border-0">
            <div class="card-header bg-yellow-800 mt-0 pb-1 pb-0">
              <h5 class="text-white">
                <i class="fa fa-edit p-r-10"></i> Editar Registro
              </h5>
            </div>              
            <div class="card-body  px-4">
                <!-- ********************************************* -->
                <h5 class="pt-2 text-secondary">1. Datos del Expediente</h5>
                <!-- ---------------------------- -->
                <hr class="mb-4 my-1 b-warning">
                <!-- ---------------------------- -->
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2">Código de Expediente</label>
                      <input v-model="licencia.documento_codexpediente" type="text"  class="form-control"
                        placeholder="Ingrese el código del Expediente" >
                      <ErrorMessage :error="errors.documento_codexpediente" />
                    </div>
                  </div>
                  <div  class="col-md-6">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2">Fecha de presentación</label>
                      
                      <input v-model="licencia.fecharegistro" type="date" class="form-control"
                        placeholder="Número de documento">
                      <ErrorMessage :error="errors.fecharegistro" />
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label align-content-top pt-2">Tipo de Tramite TUPA</label>
                  <select class="form-select" v-model="licencia.tipotramite_tupa" id="tipoinspeccion">
                    <option selected value="">Selecciona una opción</option>
                    <option v-for="tramite in StoreList.ListaTramitesTUPA_Oficina" :key="tramite.id" :value="tramite.id">{{ tramite.nombretramite }}</option>           
                  </select>
                  <ErrorMessage :error="errors.tipotramite_tupa" />
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">Monto Pagado</label>
                      <input v-model="licencia.pago_monto" type="number" class="form-control" placeholder="Monto en S/.">
                      <ErrorMessage :error="errors.pago_monto" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2">Cod. Operación</label>
                      <input v-model="licencia.pago_codoperacion" type="text" class="form-control" placeholder="Codigo OP">
                      <ErrorMessage :error="errors.pago_codoperacion" />
                    </div>
                  </div>
                </div>
           

                <!-- ********************************************* -->
                <h5 class="pt-5 text-secondary">2. Datos del Negocio</h5>
                <!-- ---------------------------- -->
                <hr class="mb-4 my-1 b-warning">
                <!-- ---------------------------- -->
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-2">
                      <label class="form-label align-content-top pt-2">Tipo Persona Jurídica</label>
                      <select v-model="tipopersona" class="form-select">
                        <option value="">Seleccione tipo Documento</option>
                        <option v-for="tipo in tiposPersonaJuridica" :key="tipo" :value="tipo">{{ tipo }}</option>
                      </select>
                    </div>
                  </div>
                  <div  class="col-md-6">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2">RUC</label>
                      <input v-model="licencia.negocio_ruc" type="text" @change="on_rucChange" class="form-control"
                        placeholder="Número de documento">
                      <ErrorMessage :error="errors.negocio_ruc" />
                    </div>
                  </div>
                </div>
                <!-- ---------------------------- -->
                <div class="row " >
                  <div class="col-md-12">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2 ">Razón Social</label>
                      <input v-model="licencia.negocio_razonsocial" type="text" class="form-control"
                        placeholder="Número de documento">
                      <ErrorMessage :error="errors.negocio_razonsocial" />
                    </div>
                  </div>
                  <div class="col-md-6 ">
                    <div v-if="PersonaJuridicaSUNAT?.estado"  class="mb-2">
                        <label class="form-label align-content-top pt-2  f-w-600 ">Condición</label>
                        <div v-if="PersonaJuridicaSUNAT?.condicion==='HABIDO'" 
                            class="alert alert-success d-flex align-items-center py-1 px-2" role="alert">
                            <i class="fas fa-check-circle p-r-5"></i>
                            <div>{{PersonaJuridicaSUNAT?.condicion}}</div>
                        </div>
                        <div v-else class="alert alert-danger d-flex align-items-center py-1 px-2" role="alert">
                            <i class="fas fa-exclamation-triangle p-r-5"></i>
                            <div>{{PersonaJuridicaSUNAT?.condicion}}</div>
                        </div>
                    </div>
                  </div>    
                  <div class="col-md-6">
                    <div v-if="PersonaJuridicaSUNAT?.estado"  class="mb-2">
                        <label class="form-label align-content-top pt-2 ">Estado</label>
                        <div v-if="PersonaJuridicaSUNAT?.estado==='ACTIVO'" 
                            class="alert alert-success d-flex align-items-center py-1 px-2" role="alert">
                            <i class="fas fa-check-circle p-r-5"></i>
                            <div>{{PersonaJuridicaSUNAT?.estado}}</div>
                        </div>
                        <div v-else class="alert alert-danger d-flex align-items-center py-1 px-2" role="alert">
                            <i class="fas fa-exclamation-triangle p-r-5"></i>
                            <div>{{PersonaJuridicaSUNAT?.estado}}</div>
                        </div>
                    </div>
                  </div>
                  
                  <div class="col-md-12 ">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2 ">Dirección Fiscal</label>
                      <input v-model="licencia.negocio_direccionfiscal" type="text" class="form-control"
                        placeholder="Número de documento">
                      <ErrorMessage :error="errors.negocio_direccionfiscal" />
                    </div>
                  </div>
                </div>
                <!-- ---------------------------- -->

                <div class="row">
                  
                  <div class="col-md-4 ">
                    <div class="mb-2 ">
                      <label class="form-label   align-content-top pt-2">DNI Representante Legal</label>
                      <input v-model="licencia.representantelegal_dni" type="text" @change="on_dniChange" class="form-control"
                        placeholder="Número de documento">
                      <ErrorMessage :error="errors.representantelegal_dni" />
                    </div>
                  </div>
                  <div class="col-md-8 ">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2">Nombre Completo del Representante Legal</label>
                      <input v-model="licencia.representantelegal_nombre" type="text" class="form-control"
                        placeholder="Nombres y Apellidos">
                      <ErrorMessage :error="errors.representantelegal_nombre" />
                    </div>
                  </div>
                </div>

                <!-- -------------------------------------------- -->

                <div class="row">
                  <div class="col-md-12 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">Nombre comercial:</label>
                      <input v-model="licencia.negocio_nombrecomercial" type="text" class="form-control" placeholder="">
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">Giro o actividad comercial:</label>
                      <input v-model="licencia.negocio_actividadcomercial" type="text" class="form-control" placeholder="">
                    </div>
                  </div>
                </div>

                <div class="row ">
                  <div class="col-md-12">
                    <div class="alert b-gray ">
                      <fechaview></fechaview>
                    </div>
                    <ErrorMessage :error="errors.negocio_actividadcomercial" />
                  </div>
                </div>

                <!-- -------------------------------------------- -->
                <h5 class="pt-5 text-secondary">3. Ubicación del Negocio</h5>
                <!-- ---------------------------- -->
                <hr class="mb-4 my-1 b-warning">
                <!-- ---------------------------- -->


                <div class="row">
                  <div class="col-md-12 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">Dirección del Establecimiento</label>
                      <input v-model="licencia.dir_direccioncomercial" type="text" class="form-control"
                        placeholder="Dirección del negocio">
                      <ErrorMessage :error="errors.dir_direccioncomercial" />
                    </div>
                  </div>
                </div>
                <div class="row" v-if="licencia.categoriatramite_tupa!=='Autorización'">
                  <div class="col-md-2 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">NUMERO</label>
                      <input v-model="licencia.dir_numero" type="text" class="form-control" placeholder="">
                      <ErrorMessage :error="errors.dir_numero" />
                    </div>
                  </div>
                  <div class="col-md-2 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">LETRA</label>
                      <input v-model="licencia.dir_letra"  
                            type="text" class="form-control" placeholder="">
                    </div>
                  </div>
                  <div class="col-md-2 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">INT.</label>
                      <input v-model="licencia.dir_inter"  type="text" class="form-control" placeholder="">
                    </div>
                  </div>
                  <div class="col-md-2 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">MZ</label>
                      <input v-model="licencia.dir_mz"  type="text" class="form-control" placeholder="">
                    </div>
                  </div>
                  <div class="col-md-2 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">LOTE</label>
                      <input v-model="licencia.dir_lote"  type="text" class="form-control" placeholder="">
                    </div>
                  </div>
                  <div class="col-md-2 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">DPTO</label>
                      <input v-model="licencia.dir_dpto"  type="text" class="form-control" placeholder="">
                    </div>
                  </div>
                </div>

                

                <!-- ---------------------------- -->
                <div class="row">
                  <div class="col-md-12 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">REFERENCIA</label>
                      <textarea v-model="licencia.dir_referencia"   
                                type="text" class="form-control" placeholder="Referencia"></textarea>
                      <ErrorMessage :error="errors.dir_referencia" />
                    </div>
                  </div>
                </div>
                <div class="row" v-if="licencia.categoriatramite_tupa!=='Autorización'">
                  <div class="col-md-4 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">Área del local utilizada (M2)</label>
                      <input  v-model="licencia.negocio_area" type="number" class="form-control" placeholder="">
                      <ErrorMessage :error="errors.negocio_area" />
                    </div>
                  </div>
                  <div class="col-md-4 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">Capacidad de Aforo</label>
                      <input v-model="licencia.negocio_aforo" type="number" class="form-control" placeholder="">
                      <ErrorMessage :error="errors.negocio_aforo" />
                    </div>
                  </div>
                  <div class="col-md-4 mb-2">
                    <div class="mb-1 ">
                      <label class="form-label  align-content-top pt-2">Condición</label>
                      <input v-model="licencia.negocio_condicionlocal" type="text" class="form-control" placeholder="">
                      <ErrorMessage :error="errors.negocio_condicionlocal" />
                    </div>
                  </div>
                </div>
                <!-- ---------------------------- -->
                <!-- ---------------------------- -->
                <h5 class="pt-5 text-secondary">4. ITSE y Observación:</h5>
                <!-- ---------------------------- -->
                <hr class="mb-4 my-1 b-warning">
                <!-- ---------------------------- -->
                
                <!-- ---------------------------- -->
                <div class="row">
                  <div class="col-md-4">
                    <div class="mb-2">
                      <label for="tipoinspeccion" class="form-label pt-2">Tipo de Inspección</label>
                      <select class="form-control multi-line-select" v-model="licencia.itse_tipoinspeccion" id="tipoinspeccion">
                        <option selected value="">Selecciona una opción</option>
                        <option v-for="tipoes in tiposInspeccion" :key="tipoes" :value="tipoes">{{ tipoes }}</option>           
                      </select>
                      <ErrorMessage :error="errors.itse_tipoinspeccion" />
                    </div>
                  </div>
                  <!-- ---------------------------- -->
                  <div class="col-md-4">
                    <div class="mb-2" v-if="licencia.itse_tipoinspeccion=='ITSE PREVIA'">
                      <label for="resultadoITSE" class="form-label pt-2">Resultado ITSE</label>
                      <select class="form-control multi-line-select" v-model="licencia.itse_resultado" id="riesgo">
                        <option value="" selected>Selecciona una opción</option>
                        <option v-for="item in resultadosITSE" :key="item" :value="item">{{ item }}</option>           
                      </select>
                      <ErrorMessage :error="errors.itse_resultado" />
                    </div>
                  </div>
                  <!-- ---------------------------- -->
                  <div class="col-md-4">
                    <div class="mb-2" v-if="licencia.itse_tipoinspeccion=='ITSE PREVIA'">
                      <label for="riesgo" class="form-label pt-2">Riesgo</label>
                      <select class="form-control multi-line-select" v-model="licencia.itse_riesgo" id="riesgo">
                        <option selected>Selecciona una opción</option>
                        <option v-for="item in nivelesRiesgo" :key="item" :value="item">{{ item }}</option>           
                      </select>
                      <ErrorMessage :error="errors.itse_riesgo" />
                    </div>
                  </div>
                  
                </div>

                <!-- ---------------------------- -->
                <div class="row">
                  <div class="col-md-12 ">
                    <div class="mb-2 ">
                      <label class="form-label  align-content-top pt-2">Observación:</label>
                      <textarea v-model="licencia.itse_observacion" type="text" class="form-control" rows="3"></textarea>
                      <ErrorMessage :error="errors.itse_observacion" />
                    </div>
                  </div>
                </div>
                <!-- ---------------------------- -->

            </div>
          </div>
          <!-- ------------------------------ -->
      </div>
  
      <div class="col-md-2">
          <!-- -------------- -->
          <div class="sticky-top mt-0 pt-0 text-center" style="top:74px">  
              <div class="alert alert-primary f-w-700 uppercase">{{ licencia.categoriatramite_tupa }}</div>
              <!-- ------------------------------ -->
              <button @click="guardarLicencia" class="btn btn-lg  btn-primary mt-1 m-auto w-100">
                        <i class="fas fa-save p-r-5"></i>Guardar </button>

              <!-- -------------------------------- -->
              <button  class="btn btn-danger text-center  btn-lg mt-2 w-100"
                      @click="openModal">
                      <i class="fas fa-times p-r-5"></i>Rechazar</button>
              <!-- -------------------------------- -->
                        
              <router-link :to="{ name: 'Lista_Licencias_enproceso'}">
                <button  class="btn btn-lg  btn-secondary mt-3 m-auto w-100">
                  <i class="fas fa-times p-r-5"></i>Cancelar</button>
              </router-link>
              <!-- ------------------------------ -->
          </div>  
               
      </div>
  </div>  
  
  
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
                        <label for="reqnombre" class="form-label text-dark f-w-600">Motivo</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="frm_motivo" placeholder="Ingresa el nombre" rows="3"></textarea>
                    </div>
                    
                </div>
                <div class="modal-footer py-0">                    
                    <button type="submit" class="btn btn-danger" @click="Rechazar_solicitud">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';

import { guardar_licenciaGenerada, generarResolucion, get_licencia, upd_licenciaActual, rechazar_solicitud_licencia} from '../../services/LicenciaService';
import Breadcrumb from '../../components/breadcrumb.vue';
import ErrorMessage from '../../components/ErrorMessage.vue';
import Alerta from '../../utils/alertas';
import { HOST_URL } from '../../config';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

import logoData from '../../assets/logo.64.json'; // Importa el archivo JSON


import Notif from '../../utils/notificaciones';

import NProgress from 'nprogress';

import fechaview from '../../components/horario_select.vue';
import { Listas } from '../../composables/ListasIndependientes';

import { get_datosRUC,get_datosDNI } from '../../services/apisunat';
import { FormInsertLicencia, initializeFormInsertLicencia } from '../../interfaces/licencia.interfaces';
import { PersonaJuridica } from '../../interfaces/sunat.interfaces';
import { tiposPersonaJuridica, tiposInspeccion, resultadosITSE, nivelesRiesgo } from '../../utils/listas.fijas'; // Ajusta el path según tu estructura

import { ListasStore } from '../../stores/listasStore';
import { usarAuthStore } from '../../stores/autentificacionStore';
import comboSelect_choices from '../../components/form/comboSelect_choices.vue';
import Horario_select from '../../components/horario_select.vue';
import { initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import router from '../../router';
import { useRoute, useRouter } from 'vue-router';
import { initializeLicencia, Licencia } from '../../interfaces/licencia.interfaces';
import { Modal } from 'bootstrap';

interface Link {
  path: string;
  name: string;
}

export default defineComponent({
  components: {
    ErrorMessage,
    fechaview,
    comboSelect_choices
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const idlicencia = Number(route.params.idlic);

    const isUploading = ref(false); // Deshabilitar el botón
    const frm_motivo = ref("");
 
    const tipopersona = ref("");
    const tipodocumento = ref("");
    // Listas Dependientes.
    const StoreList = ListasStore();
    const FunList   = Listas();
    const AuthStore = usarAuthStore();
    const usuario   =  ref<UsuarioLog>(initializeUsuarioLog());
    
    // Objetos
    const PersonaJuridicaSUNAT = ref<PersonaJuridica>();
    const licencia  = ref<Licencia>(initializeLicencia());
    const errors    = ref<any>(initializeLicencia());


   // ---Validación de DNI -------------------------
   const on_dniChange = async () => {
      try {
        NProgress.start();
        if (licencia.value.representantelegal_dni.length == 8) {
            const data = await get_datosDNI(licencia.value.representantelegal_dni);
            licencia.value.representantelegal_nombre =  `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
        }else{
            licencia.value.representantelegal_nombre = "";
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alerta.Error('Error', 'No se pudo obtener los datos.');
      } finally {
        NProgress.done();
      }
    };
    const on_changeTipoDoc = async () => {
        licencia.value.representantelegal_nombre = "";
        licencia.value.representantelegal_dni = "";
    };

    const on_rucChange = async () => {
      try {
        NProgress.start();
        if (licencia.value.negocio_ruc.length === 11) {
          const data = await get_datosRUC(licencia.value.negocio_ruc);
            PersonaJuridicaSUNAT.value= data;
            licencia.value.negocio_razonsocial = data.razonSocial;
            licencia.value.negocio_direccionfiscal = data.direccion;
        }else{
            licencia.value.negocio_razonsocial = "";
            licencia.value.negocio_direccionfiscal ="";
            PersonaJuridicaSUNAT.value = {} as PersonaJuridica;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alerta.Error('Error', 'No se pudo obtener los datos.');
      } finally {
        NProgress.done();
      }
    };

    watch(() => licencia.value.negocio_ruc, (newVal)     => on_rucChange);    
    watch(() => StoreList.HorarioLicencia, (newVal)     => licencia.value.negocio_horario = StoreList.HorarioLicencia);    

    const cargarLicencia = async () => {
      NProgress.start();
      try {
        const response = await get_licencia(idlicencia.toString());
        licencia.value = response.data;
        if(licencia.value.negocio_horario){
          StoreList.HorarioLicencia = licencia.value.negocio_horario;
        }
        if(licencia.value.negocio_ruc.substring(0, 2)==="20"){
          tipopersona.value="PERSONA JURÍDICA";
        }else{
          tipopersona.value="PERSONA NATURAL";
        }
        
      } catch (error) {
        Alerta.Error('Error', 'No se pudo cargar la licencia.');
      } finally {
        NProgress.done();
      }
    };
    

    const guardarLicencia = async () => {
      NProgress.start();
      try {        
        const response = await upd_licenciaActual(licencia.value);
        if (response.success) {
          Alerta.Sucessfull_timer('Actualizado', 'Licencia actualizada con éxito');
        } else {
          Alerta.Error('Error', response.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al actualizar la licencia.');
      } finally {
        NProgress.done();
      }
    };



    onMounted(async () => {
      await FunList.load_TramitesTupa_Oficina('2');

      await cargarLicencia();
      licencia.value.fecharegistro = licencia.value.fecharegistro.split(' ')[0];
    });

    const Rechazar_solicitud = async () => {
      const isConfirmado = await Alerta.ConfirmacionRegistro(
            'Confirmación',
            '¿Desea rechazar esta solicitud?'
        );
        if (isConfirmado) {
          NProgress.start();
          try {
              const response = await rechazar_solicitud_licencia(idlicencia.toString(),frm_motivo.value);
              if(response.success){
                closeModal();
                Notif.Success("El expediente fue rechazado.");
                router.push('/office/licencia_solicitudes');
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



    // Helper para evitar valores indefinidos
    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    
    return {
      tiposPersonaJuridica,
      tiposInspeccion,
      resultadosITSE,
      nivelesRiesgo,
      licencia,
      errors, 
      on_rucChange,
      on_dniChange,
      PersonaJuridicaSUNAT,
      guardarLicencia,
      isUploading,

      HOST_URL,
      StoreList,
      idlicencia,
      tipopersona,

      Rechazar_solicitud,
      frm_motivo,
        openModal,closeModal

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

input, select, textarea{
  background-color: #f7f6f5;
}
</style>
