<template >
  <div class="row pt-4 pb-3 border-top">
    <div class="col-lg-12">
      <div class="container">
        <!-- [ breadcrumb ] start -->
        <Breadcrumb :links="breadcrumbRoutes" />
        <!-- [ breadcrumb ] end -->

        <div class="row" >
          <div class="d-flex justify-content-between"> 
            <span class="f-16 f-w-500 mt-1 bg-success text-white px-3 
                  text-gray-300 py-2 rounded-top-2">1. Datos del Expediente:</span>
            <div class="align-content-center align-self-center">
              <h4 class="py-0 my-0 text-success">{{tramitedetalles.categoria}}</h4>
            </div>
          </div>
          <div class="col-12 p-4  b-success rounded-2 shadow-sm"> 
            <!-- ---------------------------- -->
            
            <div class="row">              
              <div class="col-md-12">
                <div class="d-flex  ">
                  <div class="form-check">
                    <input class="form-check-input" v-model="existeLicencia" type="checkbox" id="customCheckc1">
                    <label class="form-check-label f-w-600" for="customCheckc1">ES REGISTRO ANTIGUO</label>
                  </div>
                </div>                
              </div>              
              <div class="col-md-6">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Código de Expediente</label>
                  <input v-model="formLicencia.documento_codexpediente" type="text"  class="form-control"
                    placeholder="Ingrese el código del Expediente" >
                  <ErrorMessage :error="errors.documento_codexpediente" />
                </div>
              </div>
              <div  class="col-md-6">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Fecha de ingreso de solicitud</label>
                  <input v-model="formLicencia.fecharegistro" type="date" class="form-control"
                    placeholder="Número de documento">
                  <ErrorMessage :error="errors.fecharegistro" />
                </div>
              </div>
            </div>
            <!-- --------------------- -->
            <div class="mb-2">
              <label class="form-label align-content-top pt-2">Tipo de Tramite TUPA</label>
              <comboSelect_choices v-model="formLicencia.tipotramite_tupa"  @change="onChangeTramite"
                :options="StoreList.ListaTramitesTUPA_Oficina"
                valueField="id" labelField="nombretramite" />
              <ErrorMessage :error="errors.tipotramite_tupa" />
            </div>
            <!-- ------------------- -->
            <div class="alert alert-seccondary b-gray">
              <div class="alert alert-warning">
                <i class="fa fa-exclamation-triangle p-r-5"></i> Verifica el cumplimiento de la documentación solicitada:
              </div>
              <table  class="table table-hover table-xs" id="pc-dt-simple">
                <thead>
                    <tr>
                        <th width="5%">#</th>
                        <th width="45%">Requisito</th>
                        <th width="10%" class="text-center">Formato</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                      <td>
                        <input class="form-check-input"  type="checkbox" id="customCheckc1">
                      </td>
                      <td> Voucher de Pago con un monto de:
                          <span class="text-danger px-3 f-w-700"> 
                            S/ {{ tramitedetalles.monto }}</span>
                      </td>
                      <td class="text-center"></td>
                  </tr>
                  <tr  v-if="StoreList.ListaRequisitosAsignados.length>0"
                       v-for="(reqAsignado, index) in StoreList.ListaRequisitosAsignados" :key="reqAsignado.idreq">
                      <td>
                        <input class="form-check-input"  type="checkbox" id="customCheckc1">
                      </td>
                      <td>{{ reqAsignado.nombrerequisito }} 
                          <span class="text-danger px-3"> 
                            {{ reqAsignado.esobligatorio ? "(*Obligatorio)" : "" }}</span>
                      </td>
                      
                      <td class="text-center">
                        <a v-if="reqAsignado.esformato"
                            :href="HOST_URL + reqAsignado.formatopdf" target="_blank">
                          <img src="../../assets/images/pdf.png" class="img-fluid wid-25 p-0">
                        </a>
                      </td>
                  </tr>
                </tbody>
              </table>
              <!-- ------------------- -->
            </div>
            <!-- ----------------------- -->

            <div class="row">
              <div class="col-md-6 ">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Ingresa el monto Pagado</label>
                  <input v-model="formLicencia.pago_monto" type="Number" class="form-control" placeholder="Monto en S/.">
                  <ErrorMessage :error="errors.pago_monto" />
                </div>
              </div>
              <div class="col-md-6 ">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Codigo de Operación</label>
                  <input v-model="formLicencia.pago_codoperacion" type="text" class="form-control" placeholder="Codigo OP">
                  <ErrorMessage :error="errors.pago_codoperacion" />
                </div>
              </div>
            </div>
           
          </div>

          
          <div class="d-flex pt-4"> 
            <span class="f-16 f-w-500 mt-1 bg-blue-700 text-white  px-3
                  text-gray-300 py-2 rounded-top-2">2. Datos del Negocio:</span>
          </div>
          <div class="col-12 p-4 b-gray rounded-2 shadow-sm"> 
            <!-- ---------------------------- -->
            <div class="row">
              <div class="col-md-3">
                <div class="mb-2">
                  <label class="form-label align-content-top pt-2">Tipo Persona Jurídica</label>
                  <select class="form-select">
                    <option value="">Seleccione tipo Documento</option>
                    <option v-for="tipo in tiposPersonaJuridica" :key="tipo" :value="tipo">{{ tipo }}</option>
                  </select>
                </div>
              </div>
              <div  class="col-md-3">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">RUC</label>
                  <input v-model="formLicencia.negocio_ruc" type="text" @change="on_rucChange" class="form-control"
                    placeholder="Número de documento" @input="validateRUC">
                  <ErrorMessage :error="errors.negocio_ruc" />
                </div>
              </div>
              <div class="col-md-3 ">
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
              <div class="col-md-3">
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
            </div>
            <!-- ---------------------------- -->
            <div class="row " >
              <div class="col-md-12 ">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2 ">Razón Social</label>
                  <input v-model="formLicencia.negocio_razonsocial" type="text" class="form-control"
                    placeholder="Número de documento">
                  <ErrorMessage :error="errors.negocio_razonsocial" />
                </div>
              </div>
              
              
              <div class="col-md-12 ">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2 ">Dirección Fiscal</label>
                  <input v-model="formLicencia.negocio_direccionfiscal" type="text" class="form-control"
                    placeholder="Número de documento">
                  <ErrorMessage :error="errors.negocio_direccionfiscal" />
                </div>
              </div>
            </div>
            <!-- ---------------------------- -->

            <div class="row">
              <div class="col-md-3">
                <div class="mb-2 ">
                  <label class="form-label align-content-top pt-2">Tipo de Documento</label>
                  <select class="form-select" v-model="tipopersona" @change="on_changeTipoDoc">
                    <option >Seleccione</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3 ">
                <div class="mb-2 ">
                  <label class="form-label   align-content-top pt-2">DNI Representante Legal</label>
                  <input v-model="formLicencia.representantelegal_dni" type="text" @change="on_dniChange" class="form-control"
                    placeholder="Número de documento" :maxlength="tipopersona=='DNI' ? 8 : 9" @input="validateDNI">
                  <ErrorMessage :error="errors.representantelegal_dni" />
                </div>
              </div>
              <div class="col-md-6 ">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Nombre Completo del Representante Legal</label>
                  <input v-model="formLicencia.representantelegal_nombre" type="text" class="form-control"
                    placeholder="Nombres y Apellidos">
                  <ErrorMessage :error="errors.representantelegal_nombre" />
                </div>
              </div>
            </div>

            <!-- -------------------------------------------- -->
            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Nombre Comercial:</label>
                  <input v-model="formLicencia.negocio_nombrecomercial" type="text" class="form-control" placeholder="">
                  <ErrorMessage :error="errors.negocio_nombrecomercial" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Giro o actividad comercial:</label>
                  <input v-model="formLicencia.negocio_actividadcomercial" type="text" class="form-control" placeholder="">
                  <ErrorMessage :error="errors.negocio_actividadcomercial" />
                </div>
              </div>
            </div>
            
            <div class="row  ">
              <div class="col-md-12">
                <div class="alert b-gray">
                  <fechaview></fechaview>
                  <ErrorMessage :error="errors.negocio_actividadcomercial" />
                </div>
              </div>
            </div>
          <!-- -------------------------------------------- -->
          </div>



          <div class="d-flex pt-4"> 
            <span class="f-16 f-w-500 mt-1 bg-blue-700 text-white  px-3
                    text-gray-300 py-2 rounded-top-2">3. Ubicación del Negocio:</span>
          </div>
          <div class="col-12 p-4 shadow-sm b-gray rounded-2">  

            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Dirección del Establecimiento</label>
                  <input v-model="formLicencia.dir_direccioncomercial" type="text" class="form-control"
                    placeholder="Dirección del negocio">
                  <ErrorMessage :error="errors.dir_direccioncomercial" />
                </div>
              </div>
            </div>
            <div class="row" v-if="tramitedetalles.categoria!=='Autorización'">
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">NUMERO</label>
                  <input v-model="formLicencia.dir_numero" type="number" class="form-control" placeholder="">
                  <ErrorMessage :error="errors.dir_numero" />
                </div>
              </div>
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">LETRA</label>
                  <input v-model="formLicencia.dir_letra"  
                        type="text" class="form-control" placeholder="">
                </div>
              </div>
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">INT.</label>
                  <input v-model="formLicencia.dir_inter"  type="text" class="form-control" placeholder="">
                </div>
              </div>
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">MZ</label>
                  <input v-model="formLicencia.dir_mz"  type="text" class="form-control" placeholder="">
                </div>
              </div>
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">LOTE</label>
                  <input v-model="formLicencia.dir_lote"  type="text" class="form-control" placeholder="">
                </div>
              </div>
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">DPTO</label>
                  <input v-model="formLicencia.dir_dpto"  type="text" class="form-control" placeholder="">
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">REFERENCIA</label>
                  <textarea v-model="formLicencia.dir_referencia"   
                            type="text" class="form-control" placeholder="Referencia"></textarea>
                  <ErrorMessage :error="errors.dir_referencia" />
                </div>
              </div>
            </div>
            <div class="row" v-if="tramitedetalles.categoria!=='Autorización'">
              <div class="col-md-4 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Área del local utilizada (M2)</label>
                  <input  v-model="formLicencia.negocio_area" type="number" class="form-control" placeholder="">
                  <ErrorMessage :error="errors.negocio_area" />
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Capacidad de Aforo</label>
                  <input v-model="formLicencia.negocio_aforo" type="number" class="form-control" placeholder="">
                  <ErrorMessage :error="errors.negocio_aforo" />
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div v-if="formLicencia.epocatramite==='ACTUAL'" class="mb-2">
                  <label class="form-label align-content-top pt-2">Condición del Local</label>
                  <select class="form-control multi-line-select" v-model="formLicencia.negocio_condicionlocal" id="tipoinspeccion">
                    <option selected value="">Selecciona una opción</option>
                    <option v-for="condi in condicionlocal" :key="condi" :value="condi">{{ condi }}</option>           
                  </select>
                  <ErrorMessage :error="errors.negocio_condicionlocal" />
                </div>
              </div>
            
            </div>
            <!-- ---------------------------- -->
            <!-- ---------------------------- -->
          <!-- -------------------------------------------- -->
          </div>
          <div class="d-flex pt-4"> 
            <span class="f-16 f-w-500 mt-1 bg-blue-800 text-white  px-3
                    text-gray-300 py-2 rounded-top-2">4. ITSE y Observación:</span>
          </div>
          <div class="col-12 p-4 b-gray rounded-2 shadow-sm">  
         
            
            <!-- ---------------------------- -->
            <div class="row">
              <div class="col-md-3">
                <div class="mb-2">
                  <label for="tipoinspeccion" class="form-label pt-2">Tipo de Inspección</label>
                  <select class="form-control multi-line-select" v-model="formLicencia.itse_tipoinspeccion" id="tipoinspeccion">
                    <option selected value="">Selecciona una opción</option>
                    <option v-for="tipoes in tiposInspeccion" :key="tipoes" :value="tipoes">{{ tipoes }}</option>           
                  </select>
                  <ErrorMessage :error="errors.itse_tipoinspeccion" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="mb-2" v-if="formLicencia.itse_tipoinspeccion=='ITSE PREVIA'">
                  <label for="resultadoITSE" class="form-label pt-2">Resultado ITSE</label>
                  <select class="form-control multi-line-select" v-model="formLicencia.itse_resultado" id="riesgo">
                    <option value="" selected>Selecciona una opción</option>
                    <option v-for="item in resultadosITSE" :key="item" :value="item">{{ item }}</option>           
                  </select>
                  <ErrorMessage :error="errors.itse_resultado" />
                </div>
              </div>

              <div class="col-md-3">
                <div class="mb-2" v-if="formLicencia.itse_tipoinspeccion=='ITSE PREVIA'">
                  <label for="riesgo" class="form-label pt-2">Riesgo</label>
                  <select class="form-control multi-line-select" v-model="formLicencia.itse_riesgo" id="riesgo">
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
                  <textarea v-model="formLicencia.itse_observacion" type="text" class="form-control" rows="4"></textarea>
                  <ErrorMessage :error="errors.itse_observacion" />
                </div>
              </div>
            </div>

            <!-- ---------------------------- -->
            <hr class="mb-4 my-1 b-gray">
            <!-- ---------------------------- -->
            <div class="row">
              <div class="col-12">
                <div class="alert alert-danger">
                  <i class="fa fa-exclamation-triangle"></i>
                  Debe ingresar todos los campos obligatorios:
                  <div class="row">
                    
                    
                    <p class="col-6 my-0">{{errors.documento_codexpediente ? "- Código de expediente" : ""}}</p>
                    <p class="col-6 my-0">{{errors.fecharegistro ? "- Fecha Registro" : ""}}</p>
                    <p class="col-6 my-0">{{errors.negocio_ruc ? "- RUC" : ""}}</p>
                    <p class="col-6 my-0">{{errors.negocio_razonsocial ? "- Razon Social" : ""}}</p>
                    <p class="col-6 my-0">{{errors.representantelegal_dni ? "- DNI de Representante Legal" : ""}}</p>
                    <p class="col-6 my-0">{{errors.representantelegal_nombre ? "- Nombre de Representante Legal" : ""}}</p>
                    <p class="col-6 my-0">{{errors.negocio_direccionfiscal ? "- Dirección Fiscal" : ""}}</p>
                    <p class="col-6 my-0">{{errors.negocio_nombrecomercial ? "- Nombre Comercial" : ""}}</p>
                    <p class="col-6 my-0">{{errors.negocio_actividadcomercial ? "- Actividad Comercial" : ""}}</p>
                    <p class="col-6 my-0">{{errors.dir_direccioncomercial ? "- Dirección Comercial" : ""}}</p>
                    <p class="col-6 my-0">{{errors.dir_referencia ? "- Dirección de Referencia" : ""}}</p>
                    <p class="col-6 my-0">{{errors.negocio_area ? "- Área del negocio (En m2)" : ""}}</p>
                    <p class="col-6 my-0">{{errors.negocio_horario ? "- Horario del negocio" : ""}}</p>
                    <p class="col-6 my-0">{{errors.itse_tipoinspeccion ? "- Tipo de Inspección" : ""}}</p>
                    <p class="col-6 my-0">{{errors.itse_resultado ? "- Resultado ITSE" : ""}}</p>
                    <p class="col-6 my-0">{{errors.itse_riesgo ? "- Itse Riesgo" : ""}}</p>
                    <p class="col-6 my-0">{{errors.pago_monto ? "- Monto Pagado" : ""}}</p>
                    <p class="col-6 my-0">{{errors.pago_codoperacion ? "- Código de operación" : ""}}</p>
                  </div>
                 

                </div>
              </div>
            </div>

            <div class="row">
              <div  class="col-lg-6" >
                <button @click="RegistrarLicencia" class="btn btn-lg  btn-success mt-3 m-auto mx-3">
                    <i class="ph-duotone ph-plus-circle p-r-5"></i>Registrar Licencia </button>

                <router-link :to="{ name: 'ListarSolicitudesLicencia'}" class="mx-1">
                  <button  class="btn btn-lg  btn-danger mt-3 m-auto">
                    <i class="fas fa-times p-r-5"></i>Cancelar</button>
                </router-link>
                
              </div>     
            </div>

            <!-- **************************************** -->
          </div>
        </div>


    </div>
  </div>
</div>
</template>

<script lang="ts">
import { ref,  onMounted,  watch } from 'vue';
import { add_licenciaPanel } from '../../services/LicenciaService';
import Breadcrumb from '../../components/breadcrumb.vue';
import Alerta from '../../utils/alertas';
import { get_datosRUC,get_datosDNI } from '../../services/apisunat';
import { FormInsertLicencia, initializeFormInsertLicencia } from '../../interfaces/licencia.interfaces';
import { PersonaJuridica } from '../../interfaces/sunat.interfaces';
import { tiposPersonaJuridica, tiposInspeccion, resultadosITSE, nivelesRiesgo,condicionlocal } from '../../utils/listas.fijas'; // Ajusta el path según tu estructura

import ErrorMessage from '../../components/ErrorMessage.vue';

import NProgress from 'nprogress';

import fechaview from '../../components/horario_select.vue';
import { Listas } from '../../composables/ListasIndependientes';

import { ListasStore } from '../../stores/listasStore';
import { usarAuthStore } from '../../stores/autentificacionStore';

import comboSelect_choices from '../../components/form/comboSelect_choices.vue';
import { initializeUsuarioLog, Tramite, UsuarioLog } from '../../types/interfaces';
import router from '../../router';
import { useRouter } from 'vue-router';
import { initializeRequisitoUpload, RequisitoUpload } from '../../interfaces/requisitos.interface';
import { HOST_URL } from '../../config';

interface Link {
  path: string;
  name: string;
}

export default {
  components: {
    Breadcrumb,
    ErrorMessage,
    fechaview,
    comboSelect_choices
  },
  setup() {
    const router = useRouter();
    const isDisabled = ref(false);
    const existeLicencia = ref(false);
    const secuencia = ref(1);

    const breadcrumbRoutes = ref<Link[]>([
      { path: '/office/licencia_solicitudes', name: 'Licencias' },
      { path: '/office/crearlicencia', name: 'Registro de Licencias' },
    ]);

    const Requisitos_obligatorios = ref<RequisitoUpload[]>([]);

    // Listas Dependientes.
    const StoreList = ListasStore();
    const FunList = Listas();
    const AuthStore = usarAuthStore();
    const usuario =  ref<UsuarioLog>(initializeUsuarioLog());

    const tipopersona = ref("");
    

    
    // Objetos
    const PersonaJuridicaSUNAT = ref<PersonaJuridica>();
    const formLicencia = ref<FormInsertLicencia>(initializeFormInsertLicencia());
    const errors = ref<any>(initializeFormInsertLicencia());


    const tramitedetalles = ref<Tramite>({
      id: '',         
      nombretramite: '', 
      descripcion: '',
      codigo: '',      
      tipomonto: '',      
      monto: '',         
      plazo: '',    
      duracion: '',          
      comentario: '',          
      requisito: '',
      oficina_id: '',
      categoria: ''
    });

    onMounted(async () => {
      usuario.value = AuthStore.usuario_Logueado
      formLicencia.value.usuarioid = usuario.value.id;
      formLicencia.value.usuarionombre = usuario.value.nombreusuario;
      FunList.load_TramitesTupa_Oficina(usuario.value.oficina_id);
      StoreList.HorarioLicencia="";
    });

    // ---Validación de DNI -------------------------

    const on_dniChange = async () => {
      try {
        if (formLicencia.value.representantelegal_dni.length == 8) {
            NProgress.start();
            const data = await get_datosDNI(formLicencia.value.representantelegal_dni);
            formLicencia.value.representantelegal_nombre =  `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
        }else{
            formLicencia.value.representantelegal_nombre = "";
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alerta.Error('Error', 'No se pudo obtener los datos.');
      } finally {
        NProgress.done();
      }
    };
    const on_changeTipoDoc = async () => {
        formLicencia.value.representantelegal_nombre = "";
        formLicencia.value.representantelegal_dni = "";
    };
    
    const on_rucChange = async () => {
      try {
        if (formLicencia.value.negocio_ruc.length === 11) {
          NProgress.start();
          const data = await get_datosRUC(formLicencia.value.negocio_ruc);
            PersonaJuridicaSUNAT.value= data;
            formLicencia.value.negocio_razonsocial = data.razonSocial;
            formLicencia.value.negocio_direccionfiscal = data.direccion;
        }else{
            formLicencia.value.negocio_razonsocial = "";
            formLicencia.value.negocio_direccionfiscal ="";
            PersonaJuridicaSUNAT.value = {} as PersonaJuridica;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alerta.Error('Error', 'No se pudo obtener los datos.');
      } finally {
        NProgress.done();
      }
    };
    watch(() => formLicencia.value.negocio_ruc, (newVal)     => on_rucChange);
    watch(() => existeLicencia.value, (newVal)     => existeLicencia.value ? formLicencia.value.epocatramite="NO ACTUAL": formLicencia.value.epocatramite="ACTUAL");

    // VALIDACIONES ---------------------------------------------------------
    // ----------------------------------------------------------------------
    const validateField = (field: string, value: any) => {
      switch (field) {
        case 'documento_codexpediente':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'fecharegistro':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;          
        case 'negocio_ruc':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'negocio_razonsocial':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'negocio_direccionfiscal':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'representantelegal_dni':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'representantelegal_nombre':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        
        case 'negocio_actividadcomercial':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;        
        case 'dir_direccioncomercial':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'negocio_nombrecomercial':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'negocio_actividadcomercial':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'dir_referencia':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'negocio_area':    
          if(tramitedetalles.value.categoria==="Autorización"){
              errors.value.negocio_area = '';
          }else{
              errors.value.negocio_area = value ? '' : 'Campo obligatorio';
          }
          break;
        case 'negocio_horario':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;          
        case 'tipotramite_tupa':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;  
        case 'itse_tipoinspeccion':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;  
        case 'itse_resultado':
          errors.value.itse_resultado = formLicencia.value.itse_tipoinspeccion==="ITSE PREVIA" && !value ? '* Campo obligatorio' : '';
          break;  
        case 'itse_riesgo':
          errors.value.itse_riesgo = formLicencia.value.itse_tipoinspeccion==="ITSE PREVIA" && !value ? '* Campo obligatorio' : '';
          break;  
        case 'pago_codoperacion':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;  
        case 'pago_monto':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;   
      }
    };
    watch(() => formLicencia.value.negocio_ruc, (newVal)          => validateField('negocio_ruc', newVal));
    watch(() => formLicencia.value.documento_codexpediente, (newVal)          => validateField('documento_codexpediente', newVal));
    watch(() => formLicencia.value.fecharegistro, (newVal)          => validateField('fecharegistro', newVal));
    watch(() => formLicencia.value.negocio_razonsocial, (newVal)        => validateField('negocio_razonsocial', newVal));
    watch(() => formLicencia.value.negocio_direccionfiscal, (newVal)    => validateField('negocio_direccionfiscal', newVal));
    watch(() => formLicencia.value.representantelegal_dni, (newVal)     => validateField('representantelegal_dni', newVal));
    watch(() => formLicencia.value.representantelegal_nombre, (newVal)  => validateField('representantelegal_nombre', newVal));
    watch(() => formLicencia.value.dir_direccioncomercial, (newVal)     => validateField('dir_direccioncomercial', newVal));
    watch(() => formLicencia.value.negocio_nombrecomercial, (newVal) => validateField('negocio_nombrecomercial', newVal));
    watch(() => formLicencia.value.negocio_actividadcomercial, (newVal) => validateField('negocio_actividadcomercial', newVal));
    watch(() => formLicencia.value.dir_referencia, (newVal)       => validateField('dir_referencia', newVal));
    watch(() => formLicencia.value.negocio_horario, (newVal)      => validateField('negocio_horario', newVal));
    watch(() => formLicencia.value.tipotramite_tupa, (newVal)     => validateField('tipotramite_tupa', newVal));
    watch(() => formLicencia.value.itse_tipoinspeccion, (newVal)  => validateField('itse_tipoinspeccion', newVal));

    if(formLicencia.value.itse_tipoinspeccion==="ITSE PREVIA"){
      watch(() => formLicencia.value.itse_resultado, (newVal)     => validateField('itse_resultado', newVal));
      watch(() => formLicencia.value.itse_riesgo, (newVal)     => validateField('itse_riesgo', newVal));
    }   
    // if(tramitedetalles.value.categoria!=="Autorización"){
      watch(() => formLicencia.value.negocio_area, (newVal)         => validateField('negocio_area', newVal));
    // }
    watch(() => formLicencia.value.pago_monto, (newVal)           => validateField('pago_monto', newVal));
    watch(() => formLicencia.value.pago_codoperacion, (newVal)    => validateField('pago_codoperacion', newVal));

    watch(() => StoreList.HorarioLicencia, (newVal)    => formLicencia.value.negocio_horario = newVal);

    


    const validate = () => {
      Object.keys(formLicencia.value).forEach(key => {
        validateField(key, (formLicencia.value as any)[key]);
      });
      console.log(errors.value);
      return !Object.values(errors.value).some(error => error);
    };

    // -----------------------------------------------

    const RegistrarLicencia = async () => {
      formLicencia.value.negocio_horario = StoreList.HorarioLicencia;
      
      if (!validate()) {
        return;
      }  
      if(existeLicencia.value){
        formLicencia.value.epocatramite="NO ACTUAL";
      }else{
        formLicencia.value.epocatramite="ACTUAL";
      }
      const isConfirmado = await Alerta.ConfirmacionRegistro(
        '¿La información ingresada fue revisada?',
        'Confirma para poder proceder el registro.'
      );
      if (isConfirmado) {
        Send_FormularioRegistro();
      }
    };

    const Send_FormularioRegistro = async () => {
      try {
        const respuesta = await add_licenciaPanel(formLicencia.value);
        if (respuesta.success) {
          Alerta.Sucessfull_timer('Registro Completado', 'La licencia fue ingresada con éxito');
          //RESET VARIABLES
          StoreList.HorarioLicencia="";
          formLicencia.value = initializeFormInsertLicencia();
          errors.value = initializeFormInsertLicencia();
          router.push('/office/licencias_enproceso');
        } else {
          Alerta.Error('Error', respuesta.message);
        }
        
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al guardar la licencia.');
      }
    };

    const onChangeTramite = async () =>{
      await  FunList.load_Requisitos_TramitesTupa(formLicencia.value.tipotramite_tupa.toString());
      const tramiteSeleccionado = StoreList.ListaTramitesTUPA_Oficina.find(
        (tramite) => tramite.id.toString() === formLicencia.value.tipotramite_tupa.toString()
      );

      if (tramiteSeleccionado) {
        tramitedetalles.value=tramiteSeleccionado
      } else {
        console.error("No se encontró el trámite seleccionado.");
      }
      ;
      if(StoreList.ListaRequisitosAsignados.length>0){
        Requisitos_obligatorios.value = [];
        for (let i = 0; i < StoreList.ListaRequisitosAsignados.length; i++) {
          const requisito = ref<RequisitoUpload>(initializeRequisitoUpload());
          requisito.value.idreq= StoreList.ListaRequisitosAsignados[i].idreq;
          requisito.value.formatopdf= StoreList.ListaRequisitosAsignados[i].formatopdf;
          requisito.value.idasignacion= StoreList.ListaRequisitosAsignados[i].idasignacion;
          requisito.value.nombrerequisito= StoreList.ListaRequisitosAsignados[i].nombrerequisito;
          Requisitos_obligatorios.value.push(requisito.value);
        }
      }else{
        Requisitos_obligatorios.value = [];
      }
    }

    // VALIDACION DE INPUTS
    const validateDNI = (event: Event) => {
      const target = event.target as HTMLInputElement;
      let value = target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
      if(tipopersona.value==="DNI"){
        formLicencia.value.representantelegal_dni = value.slice(0, 8); // Limita a 8 dígitos
      }else{
        formLicencia.value.representantelegal_dni = value.slice(0, 9); // Limita a 8 dígitos
      }
    };
    const validateRUC = (event: Event) => {
      const target = event.target as HTMLInputElement;
      let value = target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
      formLicencia.value.negocio_ruc = value.slice(0, 11); // Limita a 8 dígitos
    };



    return {
      condicionlocal,
      tiposPersonaJuridica,
      tiposInspeccion,
      resultadosITSE,
      nivelesRiesgo,
      breadcrumbRoutes,
      RegistrarLicencia,
      secuencia, 
      isDisabled,
      formLicencia,
      on_dniChange,on_rucChange,
      StoreList,
      PersonaJuridicaSUNAT,
      errors,
      HOST_URL,
      Requisitos_obligatorios,
      onChangeTramite,
      validateDNI,
      validateRUC,
      existeLicencia,
      tramitedetalles,
      tipopersona,
      on_changeTipoDoc
    };
  },
};
</script>

<style lang="scss" scoped>
.text-primary {
  color: #007bff !important;
}
.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
