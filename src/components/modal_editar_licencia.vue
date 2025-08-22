<template>
  <div class="modal fade" :class="{ show: showModal }" tabindex="-1" style="display: block; background: rgba(0,0,0,0.3);" v-if="showModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-yellow-800 mt-0 pb-1 pb-0">
          <h5 class="text-white">
            <i class="fa fa-edit p-r-10"></i> Editar Registro
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body px-4">
          <!-- Formulario de edición, extraído de licencia_editar.vue -->
          <div>
            <!-- 1. Datos del Expediente -->
            <h5 class="pt-2 text-secondary">1. Datos del Expediente</h5>
            <hr class="mb-4 my-1 b-warning">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Código de Expediente</label>
                  <input v-model="licencia.documento_codexpediente" type="text"  class="form-control" placeholder="Ingrese el código del Expediente" >
                  <ErrorMessage :error="String(errors.documento_codexpediente)" />
                </div>
              </div>
              <div  class="col-md-6">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Fecha de presentación</label>
                  <input v-model="licencia.fecharegistro" type="date" class="form-control" placeholder="Número de documento">
                  <ErrorMessage :error="String(errors.fecharegistro)" />
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label class="form-label align-content-top pt-2">Tipo de Tramite TUPA</label>
              <select class="form-select" v-model="licencia.tipotramite_tupa" id="tipoinspeccion">
                <option selected value="">Selecciona una opción</option>
                <option v-for="tramite in StoreList.ListaTramitesTUPA_Oficina" :key="tramite.id" :value="tramite.id">{{ tramite.nombretramite }}</option>           
              </select>
              <ErrorMessage :error="String(errors.tipotramite_tupa)" />
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Monto Pagado</label>
                  <input v-model="licencia.pago_monto" type="number" class="form-control" placeholder="Monto en S/.">
                  <ErrorMessage :error="String(errors.pago_monto)" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Cod. Operación</label>
                  <input v-model="licencia.pago_codoperacion" type="text" class="form-control" placeholder="Codigo OP">
                  <ErrorMessage :error="String(errors.pago_codoperacion)" />
                </div>
              </div>
            </div>
            <!-- 2. Datos del Negocio -->
            <h5 class="pt-5 text-secondary">2. Datos del Negocio</h5>
            <hr class="mb-4 my-1 b-warning">
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
                  <input v-model="licencia.negocio_ruc" type="text" @change="on_rucChange" class="form-control" placeholder="Número de documento">
                  <ErrorMessage :error="String(errors.negocio_ruc)" />
                </div>
              </div>
            </div>
            <div class="row " >
              <div class="col-md-12">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2 ">Razón Social</label>
                  <input v-model="licencia.negocio_razonsocial" type="text" class="form-control" placeholder="Número de documento">
                  <ErrorMessage :error="String(errors.negocio_razonsocial)" />
                </div>
              </div>
              <div class="col-md-6 ">
                <div v-if="PersonaJuridicaSUNAT?.estado"  class="mb-2">
                  <label class="form-label align-content-top pt-2  f-w-600 ">Condición</label>
                  <div v-if="PersonaJuridicaSUNAT?.condicion==='HABIDO'" class="alert alert-success d-flex align-items-center py-1 px-2" role="alert">
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
                  <div v-if="PersonaJuridicaSUNAT?.estado==='ACTIVO'" class="alert alert-success d-flex align-items-center py-1 px-2" role="alert">
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
                  <input v-model="licencia.negocio_direccionfiscal" type="text" class="form-control" placeholder="Número de documento">
                  <ErrorMessage :error="String(errors.negocio_direccionfiscal)" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 ">
                <div class="mb-2 ">
                  <label class="form-label   align-content-top pt-2">DNI Representante Legal</label>
                  <input v-model="licencia.representantelegal_dni" type="text" @change="on_dniChange" class="form-control" placeholder="Número de documento">
                  <ErrorMessage :error="String(errors.representantelegal_dni)" />
                </div>
              </div>
              <div class="col-md-8 ">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Nombre Completo del Representante Legal</label>
                  <input v-model="licencia.representantelegal_nombre" type="text" class="form-control" placeholder="Nombres y Apellidos">
                  <ErrorMessage :error="String(errors.representantelegal_nombre)" />
                </div>
              </div>
            </div>
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
                <ErrorMessage :error="String(errors.negocio_actividadcomercial)" />
              </div>
            </div>
            <!-- 3. Ubicación del Negocio -->
            <h5 class="pt-5 text-secondary">3. Ubicación del Negocio</h5>
            <hr class="mb-4 my-1 b-warning">
            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Dirección del Establecimiento</label>
                  <input v-model="licencia.dir_direccioncomercial" type="text" class="form-control" placeholder="Dirección del negocio">
                  <ErrorMessage :error="String(errors.dir_direccioncomercial)" />
                </div>
              </div>
            </div>
            <div class="row" v-if="licencia.categoriatramite_tupa!=='Autorización'">
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">NUMERO</label>
                  <input v-model="licencia.dir_numero" type="text" class="form-control" placeholder="">
                  <ErrorMessage :error="String(errors.dir_numero)" />
                </div>
              </div>
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">LETRA</label>
                  <input v-model="licencia.dir_letra"  type="text" class="form-control" placeholder="">
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
            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">REFERENCIA</label>
                  <textarea v-model="licencia.dir_referencia" type="text" class="form-control" placeholder="Referencia"></textarea>
                  <ErrorMessage :error="String(errors.dir_referencia)" />
                </div>
              </div>
            </div>
            <div class="row" v-if="licencia.categoriatramite_tupa!=='Autorización'">
              <div class="col-md-4 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Área del local utilizada (M2)</label>
                  <input  v-model="licencia.negocio_area" type="number" class="form-control" placeholder="">
                  <ErrorMessage :error="String(errors.negocio_area)" />
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Capacidad de Aforo</label>
                  <input v-model="licencia.negocio_aforo" type="number" class="form-control" placeholder="">
                  <ErrorMessage :error="String(errors.negocio_aforo)" />
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Condición</label>
                  <input v-model="licencia.negocio_condicionlocal" type="text" class="form-control" placeholder="">
                  <ErrorMessage :error="String(errors.negocio_condicionlocal)" />
                </div>
              </div>
            </div>
            <!-- 4. ITSE y Observación -->
            <h5 class="pt-5 text-secondary">4. ITSE y Observación:</h5>
            <hr class="mb-4 my-1 b-warning">
            <div class="row">
              <div class="col-md-4">
                <div class="mb-2">
                  <label for="tipoinspeccion" class="form-label pt-2">Tipo de Inspección</label>
                  <select class="form-control multi-line-select" v-model="licencia.itse_tipoinspeccion" id="tipoinspeccion">
                    <option selected value="">Selecciona una opción</option>
                    <option v-for="tipoes in tiposInspeccion" :key="tipoes" :value="tipoes">{{ tipoes }}</option>           
                  </select>
                  <ErrorMessage :error="String(errors.itse_tipoinspeccion)" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-2" v-if="licencia.itse_tipoinspeccion=='ITSE PREVIA'">
                  <label for="resultadoITSE" class="form-label pt-2">Resultado ITSE</label>
                  <select class="form-control multi-line-select" v-model="licencia.itse_resultado" id="riesgo">
                    <option value="" selected>Selecciona una opción</option>
                    <option v-for="item in resultadosITSE" :key="item" :value="item">{{ item }}</option>           
                  </select>
                  <ErrorMessage :error="String(errors.itse_resultado)" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-2" v-if="licencia.itse_tipoinspeccion=='ITSE PREVIA'">
                  <label for="riesgo" class="form-label pt-2">Riesgo</label>
                  <select class="form-control multi-line-select" v-model="licencia.itse_riesgo" id="riesgo">
                    <option selected>Selecciona una opción</option>
                    <option v-for="item in nivelesRiesgo" :key="item" :value="item">{{ item }}</option>           
                  </select>
                  <ErrorMessage :error="String(errors.itse_riesgo)" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 ">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Observación:</label>
                  <textarea v-model="licencia.itse_observacion" type="text" class="form-control" rows="3"></textarea>
                  <ErrorMessage :error="String(errors.itse_observacion)" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="guardarLicencia" class="btn btn-primary">
            <i class="fas fa-save p-r-5"></i> Guardar
          </button>
          <button type="button" class="btn btn-danger" @click="openModalRechazar">Rechazar</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
        </div>

    <!-- Modal para motivo de rechazo -->
    <div class="modal fade" :class="{ show: showModalRechazar }" tabindex="-1" style="display: block; background: rgba(0,0,0,0.3);" v-if="showModalRechazar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-red-400 pt-3 pb-2 ">
            <h6 class="modal-title text-white">
              <i class="fa fa-exclamation-triangle p-r-15"></i>RECHAZAR LICENCIA
            </h6>
            <button type="button" class="btn-close btn-sm" @click="closeModalRechazar"></button>
          </div>
          <div class="modal-body py-1">
            <div class="mb-3">
              <label for="reqnombre" class="form-label text-dark f-w-600">Motivo</label>
              <textarea type="text" id="reqnombre" class="form-control" v-model="frm_motivo" placeholder="Ingresa el motivo" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer py-0">
            <button type="submit" class="btn btn-danger" @click="rechazarLicencia">Guardar</button>
            <button type="button" class="btn btn-secondary" @click="closeModalRechazar">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import fechaview from './horario_select.vue';
import { Listas } from '../composables/ListasIndependientes';
import { get_licencia, upd_licenciaActual } from '../services/LicenciaService';
import { tiposPersonaJuridica, tiposInspeccion, resultadosITSE, nivelesRiesgo } from '../utils/listas.fijas';
import { ListasStore } from '../stores/listasStore';
import { initializeLicencia, Licencia } from '../interfaces/licencia.interfaces';
import { PersonaJuridica } from '../interfaces/sunat.interfaces';
import { get_datosRUC, get_datosDNI } from '../services/apisunat';
import NProgress from 'nprogress';

export default defineComponent({
  components: {
    ErrorMessage,
    fechaview
  },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    idlicencia: {
      type: Number,
      required: true
    }
  },
  emits: ['close', 'updated'],
  setup(props, { emit }) {
    const licencia = ref<Licencia>(initializeLicencia());
    const errors = ref<any>(initializeLicencia());
    const tipopersona = ref('');
    const PersonaJuridicaSUNAT = ref<PersonaJuridica>();
    const StoreList = ListasStore();
    const FunList = Listas();
    const showModalRechazar = ref(false);
    const frm_motivo = ref('');

    const cargarLicencia = async () => {
      NProgress.start();
      try {
        const response = await get_licencia(props.idlicencia.toString());
        licencia.value = response.data;
        if (licencia.value.negocio_horario) {
          StoreList.HorarioLicencia = licencia.value.negocio_horario;
        }
        if (licencia.value.negocio_ruc.substring(0, 2) === '20') {
          tipopersona.value = 'PERSONA JURÍDICA';
        } else {
          tipopersona.value = 'PERSONA NATURAL';
        }
        licencia.value.fecharegistro = licencia.value.fecharegistro.split(' ')[0];
      } catch (error) {
        // Puedes mostrar una alerta aquí si lo deseas
      } finally {
        NProgress.done();
      }
    };

    onMounted(async () => {
      await FunList.load_TramitesTupa_Oficina('2');
      await cargarLicencia();
    });

    const on_rucChange = async () => {
      try {
        NProgress.start();
        if (licencia.value.negocio_ruc.length === 11) {
          const data = await get_datosRUC(licencia.value.negocio_ruc);
          PersonaJuridicaSUNAT.value = data;
          licencia.value.negocio_razonsocial = data.razonSocial;
          licencia.value.negocio_direccionfiscal = data.direccion;
        } else {
          licencia.value.negocio_razonsocial = '';
          licencia.value.negocio_direccionfiscal = '';
          PersonaJuridicaSUNAT.value = {} as PersonaJuridica;
        }
      } catch (error) {
      } finally {
        NProgress.done();
      }
    };

    const on_dniChange = async () => {
      try {
        NProgress.start();
        if (licencia.value.representantelegal_dni.length == 8) {
          const data = await get_datosDNI(licencia.value.representantelegal_dni);
          licencia.value.representantelegal_nombre = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
        } else {
          licencia.value.representantelegal_nombre = '';
        }
      } catch (error) {
      } finally {
        NProgress.done();
      }
    };

    watch(() => licencia.value.negocio_ruc, () => on_rucChange());
    watch(() => StoreList.HorarioLicencia, (newVal) => licencia.value.negocio_horario = StoreList.HorarioLicencia);

    const guardarLicencia = async () => {
      NProgress.start();
      try {
        const response = await upd_licenciaActual(licencia.value);
        if (response.success) {
          emit('updated');
          closeModal();
        } else {
          // Puedes mostrar una alerta aquí si lo deseas
        }
      } catch (error) {
      } finally {
        NProgress.done();
      }
    };

    // Rechazar funcionalidad
    const openModalRechazar = () => {
      showModalRechazar.value = true;
    };
    const closeModalRechazar = () => {
      showModalRechazar.value = false;
      frm_motivo.value = '';
    };
    const rechazarLicencia = async () => {
      NProgress.start();
      try {
        // Importar aquí si no está en el script
        const { rechazar_solicitud_licencia } = await import('../services/LicenciaService');
        const response = await rechazar_solicitud_licencia(props.idlicencia.toString(), frm_motivo.value);
        if (response.success) {
          closeModalRechazar();
          emit('updated');
          closeModal();
        } else {
          // Puedes mostrar una alerta aquí si lo deseas
        }
      } catch (error) {
        // Puedes mostrar una alerta aquí si lo deseas
      } finally {
        NProgress.done();
      }
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      licencia,
      errors,
      tipopersona,
      tiposPersonaJuridica,
      tiposInspeccion,
      resultadosITSE,
      nivelesRiesgo,
      PersonaJuridicaSUNAT,
      StoreList,
      on_rucChange,
      on_dniChange,
      guardarLicencia,
      closeModal,
      // Rechazar
      showModalRechazar,
      frm_motivo,
      openModalRechazar,
      closeModalRechazar,
      rechazarLicencia
    };
  }
});
</script>
