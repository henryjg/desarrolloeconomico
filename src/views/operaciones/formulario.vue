<template >
  <div class="row pt-4 pb-3 border-top">
    <div class="col-lg-12">
      <div class="container">
        <!-- [ breadcrumb ] start -->
        
        <!-- [ breadcrumb ] end -->
        <div id="bar" class="progress mb-3" style="height: 7px;">
          <div class="bar progress-bar progress-bar-striped progress-bar-animated bg-success" :style="{ width: secuencia / 3*100 + '%' }"></div>
        </div>
        
        <div class="row" >

          <!-- ************************************************ -->

          <div class="d-flex pt-4"> 
            <span class="f-16 f-w-600  mt-1 bg-blue-700  px-3
                  text-gray-300 py-2 rounded-top-2">1. Inicio:</span>
          </div>
          <div class="col-12 p-4 b-gray card rounded-2 shadow-sm">   
          <!-- -------------------------------------------- -->
            
          <p class="form-label text-secondary f-14">Para iniciar el procedimiento de solicitud de una licencia de funcionamiento, es indispensable verificar el cumplimiento de los requisitos y la compatibilidad de uso establecidos por la Municipalidad Distrital de Veintiséis de Octubre.</p>
          <p class="form-label text-secondary f-14 pt-2">Es fundamental cumplir con todos los requisitos indicados para que la solicitud pueda ser admitida.</p>
          <h4 class="pt-4">1. Compatibilidad de uso:</h4>

          <a  class="btn btn-light-secondary px-4" :href="HOST_URL+'/uploads/matrizriesgo.pdf'" target="_blank">
              <img src="../../assets/images/pdf.png" class="img-fluid wid-20 p-0">
              Ver Zonificación
          </a>

          <h4 class="pt-5">2. Requisitos:</h4>
          <p class="form-label text-secondary f-14 pt-2">Seleccione el tipo de trámite a realizar.</p>

          <select class="form-select "
                   v-model="formLicencia.tipotramite_tupa" @change="onChangeTramite">
                    <option value="">Seleccione tipo Documento</option>
                    <option v-for="tramite in StoreList.ListaTramitesTUPA_Oficina"  :value="tramite.id">{{ tramite.nombretramite }}</option>
                  </select>
            
          <div class="alert alert-seccondary" v-if="StoreList.ListaRequisitosAsignados.length>0">
              <!-- ------------------- -->
             
              <table  class="table table-xs" id="pc-dt-simple">
                <thead>
                    <tr>
                        <th width="3%"></th>
                        <th width="77%">Requisito</th>
                        <th width="20%" class="text-center">Formato</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(reqAsignado, index) in StoreList.ListaRequisitosAsignados" :key="reqAsignado.idreq">
                      <td>
                        {{ index+1 }} 
                      </td>
                      <td>{{ reqAsignado.nombrerequisito }} 
                          <span class="text-danger px-3"> 
                            {{ reqAsignado.esobligatorio ? "(*Obligatorio)" : "" }}</span>
                      </td>
                      <td class="text-center">
                        <a v-if="reqAsignado.formatopdf!==''" class="btn btn-light py-1"
                            :href="HOST_URL + reqAsignado.formatopdf" target="_blank">
                          <img src="../../assets/images/pdf.png" class="img-fluid wid-20 p-0">
                          Descargar
                        </a>
                      </td>
                      
                  </tr>
                </tbody>
              </table>
              <!-- ------------------- -->
          </div>
          <div v-else class="alert alert-seccondary mt-2">
            <i class="fa fa-info p-r-5"></i>
            No hay requisitos asignados a este trámite TUPA
          </div>
          
          

          <h4 class="pt-0">3. Pagos:</h4>
          <p class="form-label text-secondary f-16 pt-2">Seleccione el tipo de trámite a realizar.</p>
          <a  class="btn btn-light-secondary px-4" href="https://digital.muniveintiseisdeoctubre.gob.pe/pagos/pasarela" target="_blank">
              <i class="fa fa-link p-r-10"></i>
              Realizar Pago Online
          </a>
          <!-- -------------------------------------------- -->
          <div class="row mt-4">
            <div class="col-12 text-center">
              <hr>
                <div class="btn btn-success" @click="paso_dos">Continuar</div>
            </div>
          </div>
          <!-- -------------------------------------------- -->
          </div>

{{secuencia}}


          <div class="d-flex pt-4"> 
            <span class="f-16 f-w-600  mt-1 bg-blue-700  px-3
                  text-gray-300 py-2 rounded-top-2">2. Datos del Negocio:</span>
          </div>
          <div class="col-12 p-4  b-gray rounded-2 shadow-sm">   

            <!-- ********************************************* -->
            
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
                    placeholder="Número de documento">
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
              <div class="col-md-4 ">
                <div class="mb-2 ">
                  <label class="form-label   align-content-top pt-2">DNI Representante Legal</label>
                  <input v-model="formLicencia.representantelegal_dni" type="text" @change="on_dniChange" class="form-control"
                    placeholder="Número de documento">
                  <ErrorMessage :error="errors.representantelegal_dni" />
                </div>
              </div>
              <div class="col-md-8 ">
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
                  <label class="form-label  align-content-top pt-2">Giro o actividad comercial:</label>
                  <input v-model="formLicencia.negocio_actividadcomercial" type="text" class="form-control" placeholder="">
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-12">
                <div class="alert b-gray">
                  <fechaview></fechaview>
                  <ErrorMessage :error="errors.negocio_actividadcomercial" />
                </div>
              </div>
            </div>

          <!-- -------------------------------------------- -->
          <div class="row mt-2">
            <div class="col-12 text-center">
              <hr>
                <div class="btn btn-secondary mx-2" @click="regresar">Regresar</div>
                <div class="btn btn-success mx-2" @click="paso_tres">Continuar</div>
            </div>
          </div>
          <!-- -------------------------------------------- -->
          </div>

          <!-- ********************************************************** -->

          <div class="d-flex pt-4"> 
            <span class="f-16 f-w-600  mt-1 bg-blue-700  px-3
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
              <div class="col-md-2 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">NUMERO</label>
                  <input v-model="formLicencia.dir_numero" type="text" class="form-control" placeholder="">
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
              <div class="col-md-4">
                <div class="mb-2">
                  <label class="form-label align-content-top pt-2">Condición del Local</label>
                  <select class="form-control multi-line-select" v-model="formLicencia.negocio_condicionlocal" id="tipoinspeccion">
                    <option selected value="">Selecciona una opción</option>
                    <option v-for="condi in condicionlocal" :key="condi" :value="condi">{{ condi }}</option>           
                  </select>
                  <ErrorMessage :error="errors.negocio_condicionlocal" />
                </div>
              </div>
              
              <div class="col-md-4 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Área del local utilizada (M2)</label>
                  <input  v-model="formLicencia.negocio_area" type="text" class="form-control" placeholder="">
                  <ErrorMessage :error="errors.negocio_area" />
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Capacidad de Aforo</label>
                  <input v-model="formLicencia.negocio_aforo" type="text" class="form-control" placeholder="">
                  <ErrorMessage :error="errors.negocio_aforo" />
                </div>
              </div>
            
            </div>
            <!-- -------------------------------------------- -->
            <div class="row mt-2">
              <div class="col-12 text-center">
                <hr>
                  <div class="btn btn-secondary mx-2" @click="regresar">Regresar</div>
                  <div class="btn btn-success mx-2" @click="paso_cuatro">Continuar</div>
              </div>
            </div>
            <!-- -------------------------------------------- -->
          </div>
          <div class="d-flex pt-4"> 
            <span class="f-16 f-w-600  mt-1 bg-blue-700 px-3
                    text-gray-300 py-2 rounded-top-2">4. Respecto de la Solicitud de Licencia:</span>
          </div>
          <div class="col-12 p-4 b-gray rounded-2 shadow-sm">  
            
            <label class="form-label">Tipo de Trámite TUPA</label>
            <comboSelect_choices v-model="formLicencia.tipotramite_tupa"
                                @change="onChangeTramite"
                                :options="StoreList.ListaTramitesTUPA_Oficina"
                                valueField="id" labelField="nombretramite" />
            <ErrorMessage :error="errors.tipotramite_tupa" />
            
            <div class="alert alert-seccondary" v-if="StoreList.ListaRequisitosAsignados.length>0">
              <!-- ------------------- -->
                <div class="alert alert-warning">
                <i class="fa fa-exclamation-triangle p-r-5"></i> Debes adjuntar de manera independiente cada requisito solicitado:
                </div>
              <table  class="table table-hover table-xs" id="pc-dt-simple">
                <thead>
                    <tr>
                        <th width="5%">#</th>
                        <th width="45%">Requisito</th>
                        <th width="40%">Requisito</th>
                        <th width="10%" class="text-center">Formato</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(reqAsignado, index) in StoreList.ListaRequisitosAsignados" :key="reqAsignado.idreq">
                      <td>
                        <input class="form-check-input"  type="checkbox" id="customCheckc1">
                      </td>
                      <td>{{ reqAsignado.nombrerequisito }} 
                          <span class="text-danger px-3"> 
                            {{ reqAsignado.esobligatorio ? "(*Obligatorio)" : "" }}</span>
                      </td>
                      <td>
                        <input class="form-control" type="file"/>
                      </td> 
                      <td class="text-center">
                        <a v-if="reqAsignado.formatopdf!==''"
                            :href="HOST_URL + reqAsignado.formatopdf" target="_blank">
                          <img src="../../assets/images/pdf.png" class="img-fluid wid-25 p-0">
                        </a>
                      </td>
                      
                  </tr>
                </tbody>
              </table>
              <!-- ------------------- -->
                <h1>{{Requisitos_obligatorios.length}}</h1>
            </div>
            <div v-else class="alert alert-info mt-2">
              <i class="fa fa-info p-r-5"></i>
              No hay requisitos asignados a este trámite TUPA
            </div>
            <!-- ---------------------------- -->
            <div class="row">
              <div class="col-md-4 ">
                <div class="mb-1 ">
                  <label class="form-label  align-content-top pt-2">Monto Pagado</label>
                  <input v-model="formLicencia.pago_monto" type="text" class="form-control" placeholder="Monto en S/.">
                  <ErrorMessage :error="errors.pago_monto" />
                </div>
              </div>
              <div class="col-md-4 ">
                <div class="mb-2 ">
                  <label class="form-label  align-content-top pt-2">Codigo de Operación</label>
                  <input v-model="formLicencia.pago_codoperacion" type="text" class="form-control" placeholder="Codigo OP">
                  <ErrorMessage :error="errors.pago_codoperacion" />
                </div>
              </div>
            </div>
            <!-- -------------------------------------------- -->
            <div class="row mt-2">
              <div class="col-12 text-center">
                <hr>
                  <div class="btn btn-secondary mx-2" @click="regresar">Regresar</div>
                  <div class="btn btn-success mx-2" @click="paso_cinco">Continuar</div>
              </div>
            </div>
            <!-- -------------------------------------------- -->
          </div>


          <!-- -------------------------------------- -->
          <!-- VERIFICACIÓN         ----- ----------- -->

          <div class="d-flex"> 
            <span class="f-16 f-w-600 text-dark mt-4 bg-blue-800  px-3 text-white
                    py-2 rounded-top-2">5. Vista Previa:</span>
          </div>
          <div class="col-lg-12 f-14 text-inter text-center mb-2 p-4 b-success rounded-2 card">
            <table class="table table-xs table-bordered text-start">
              <thead>
                <tr>
                  <th style="width: 30%">Item</th>
                  <th style="width: 70%"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="f-w-600 text-dark">Tipo de Trámite TUPA:</td>
                  <td>{{ formLicencia.tipotramite_tupa }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">RUC:</td>
                  <td>{{ formLicencia.negocio_ruc }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Razón Social:</td>
                  <td>{{ formLicencia.negocio_razonsocial }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Dirección Fiscal:</td>
                  <td>{{ formLicencia.negocio_direccionfiscal }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Representante Legal:</td>
                  <td>{{ formLicencia.representantelegal_nombre }}
                      <div class="badge f-14 text-bg-success">DNI |  {{ formLicencia.representantelegal_dni }}</div>
                  </td>
                </tr>

                <tr>
                  <td class="f-w-600 text-dark">Nombre Comercial:</td>
                  <td>{{ formLicencia.negocio_nombrecomercial }}</td>
                </tr>
                
                <tr>
                  <td class="f-w-600 text-dark">Actividad Comercial:</td>
                  <td>{{ formLicencia.negocio_actividadcomercial }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Condición del Local:</td>
                  <td>{{ formLicencia.negocio_condicionlocal }}</td>
                </tr>
                
                <tr>
                  <td class="f-w-600 text-dark">Dirección Comercial:</td>
                  <td>{{ formLicencia.dir_direccioncomercial }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Detalle Dirección:</td>
                  <td>Núm: {{ formLicencia.dir_numero }} 
                     |  Letra: {{ formLicencia.dir_letra }} 
                     |  Int: {{ formLicencia.dir_inter }}
                     |  Mz: {{ formLicencia.dir_mz }} 
                     |  Lote: {{ formLicencia.dir_lote }}
                     |  Dpto: {{ formLicencia.dir_dpto }}
                  </td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Referencia:</td>
                  <td>{{ formLicencia.dir_referencia }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Área del Negocio:</td>
                  <td>{{ formLicencia.negocio_area }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Aforo del Negocio:</td>
                  <td>{{ formLicencia.negocio_aforo }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Horario del Negocio:</td>
                  <td>{{ formLicencia.negocio_horario }}</td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Monto del Pago:</td>
                  <td>{{ formLicencia.pago_monto }}
                      <div class="badge f-14 text-bg-success">OP | {{ formLicencia.pago_codoperacion }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="f-w-600 text-dark">Voucher de Pago</td>
                  <td>{{ formLicencia.pago_pagovoucher_url }}</td>
                </tr>
                
                <tr>
                  <td class="f-w-600 text-dark">Tipo de Inspección ITSE:</td>
                  <td>{{ formLicencia.itse_tipoinspeccion }}</td>
                </tr>
              </tbody>
            </table>
            <!-- -------------------------------------------- -->
            <hr class="mb-4 my-1 b-primary">
            <div class="row">
              <div class="col-lg-6" >
                <button @click="RegistrarLicencia" class="btn btn-lg  btn-primary mt-3 ">
                    <i class="fas fa-user-plus p-r-5"></i>Registrar Licencia </button>

                <router-link :to="{ name: 'ListarSolicitudesLicencia'}" class="mx-1">
                  <button  class="btn btn-lg  btn-danger mt-3 m-auto">
                    <i class="fas fa-times p-r-5"></i>Cancelar</button>
                </router-link>
              </div>     
            </div>
            <!-- -------------------------------------------- -->
          </div>
          
          
          <!-- ********************************************     -->
          <!-- <div class="row mb-1" v-if="secuencia === 6"> -->
            <div class="d-flex">
              <span class="f-16 f-w-600 text-dark mt-4 bg-success  px-3 text-white
                      py-2 rounded-top-2">6. Registro Completado:</span>
            </div>
            <div class="col-lg-12 f-16 text-inter text-center mb-2 p-3 b-success rounded-2">
                <i class="fa fa-check-circle f-72 text-success mt-4"></i>
                <p class="f-20 f-w-600 text-dark mt-1 ">Registro Completado.</p>
                <p class="f-16  mt-1 mb-4">Tu registro ha sido completado, ahora ya puedes iniciar sesión</p>
                <!-- -------------------------------------------- -->
                <button  class="btn btn-success btn-lg mt-3 ">
                    <i class="fas fa-chevron-right p-r-5"></i>Nuevo Registro</button>
            </div>
          <!-- </div> -->
            <!-- -------------------------------------- -->

            
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
import { tiposPersonaJuridica, tiposInspeccion, resultadosITSE, nivelesRiesgo, condicionlocal } from '../../utils/listas.fijas'; // Ajusta el path según tu estructura

import ErrorMessage from '../../components/ErrorMessage.vue';

import NProgress from 'nprogress';

import fechaview from '../../components/horario_select.vue';
import { Listas } from '../../composables/ListasIndependientes';

import { ListasStore } from '../../stores/listasStore';
import { usarAuthStore } from '../../stores/autentificacionStore';

import comboSelect_choices from '../../components/form/comboSelect_choices.vue';
import { initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { useRouter } from 'vue-router';
import { HOST_URL, LINK_MAPA } from '../../config';
import { initializeRequisitoUpload, RequisitoUpload } from '../../interfaces/requisitos.interface';

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
    const secuencia = ref(1);

    const breadcrumbRoutes = ref<Link[]>([
      { path: '/office/licencia_solicitudes', name: 'Licencias' },
      { path: '/office/crearlicencia', name: 'Registro de Licencias' },
    ]);

    // Listas Dependientes.
    const StoreList = ListasStore();
    const FunList = Listas();
    const AuthStore = usarAuthStore();
    const usuario =  ref<UsuarioLog>(initializeUsuarioLog());
    
    // Objetos
    const PersonaJuridicaSUNAT = ref<PersonaJuridica>();
    const formLicencia = ref<FormInsertLicencia>(initializeFormInsertLicencia());
    const Requisitos_obligatorios = ref<RequisitoUpload[]>([]);
    const errors = ref<any>(initializeFormInsertLicencia());

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
        NProgress.start();
        if (formLicencia.value.representantelegal_dni.length == 8) {
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
    
    const on_rucChange = async () => {
      try {
        NProgress.start();
        if (formLicencia.value.negocio_ruc.length === 11) {
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

    
    // VALIDACIONES ---------------------------------------------------------
    // ----------------------------------------------------------------------
    const validateField = (field: string, value: any) => {
      switch (field) {
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
        case 'negocio_actividadcomercial':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'dir_referencia':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'negocio_area':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;
        case 'negocio_aforo':
          errors.value[field] = value ? '' : 'Campo obligatorio';
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
        case 'pago_codoperacion':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;  
        case 'pago_monto':
          errors.value[field] = value ? '' : 'Campo obligatorio';
          break;            
     
      }
    };
    watch(() => formLicencia.value.negocio_ruc, (newVal)          => validateField('negocio_ruc', newVal));
    watch(() => formLicencia.value.negocio_razonsocial, (newVal)        => validateField('negocio_razonsocial', newVal));
    watch(() => formLicencia.value.negocio_direccionfiscal, (newVal)    => validateField('negocio_direccionfiscal', newVal));
    watch(() => formLicencia.value.representantelegal_dni, (newVal)     => validateField('representantelegal_dni', newVal));
    watch(() => formLicencia.value.representantelegal_nombre, (newVal)  => validateField('representantelegal_nombre', newVal));
    watch(() => formLicencia.value.dir_direccioncomercial, (newVal)     => validateField('dir_direccioncomercial', newVal));
    watch(() => formLicencia.value.negocio_actividadcomercial, (newVal) => validateField('negocio_actividadcomercial', newVal));
    watch(() => formLicencia.value.dir_referencia, (newVal)       => validateField('dir_referencia', newVal));
    watch(() => formLicencia.value.negocio_area, (newVal)         => validateField('negocio_area', newVal));
    watch(() => formLicencia.value.negocio_aforo, (newVal)        => validateField('negocio_aforo', newVal));
    watch(() => formLicencia.value.negocio_horario, (newVal)      => validateField('negocio_horario', newVal));
    watch(() => formLicencia.value.tipotramite_tupa, (newVal)     => validateField('tipotramite_tupa', newVal));
    watch(() => formLicencia.value.itse_tipoinspeccion, (newVal)  => validateField('itse_tipoinspeccion', newVal));

    
    watch(() => formLicencia.value.pago_monto, (newVal)           => validateField('pago_monto', newVal));
    watch(() => formLicencia.value.pago_codoperacion, (newVal)    => validateField('pago_codoperacion', newVal));

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
          Alerta.Sucessfull('Actualizado', 'Licencia actualizada con éxito');
          //RESET VARIABLES
          StoreList.HorarioLicencia="";
          formLicencia.value = initializeFormInsertLicencia();
          errors.value = initializeFormInsertLicencia();
          router.push('/office/licencia_solicitudes');
        } else {
          Alerta.Error('Error', respuesta.message);
        }
        
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al guardar la licencia.');
      }
    };
    const regresar = () => {
      secuencia.value --;
    }
    const paso_dos = () => {
      secuencia.value = 2;
    }
    const paso_tres = () => {
      validate();
      if(formLicencia.value.negocio_ruc!='' && formLicencia.value.representantelegal_dni!=''){
        secuencia.value = 3;
      }else{
        Alerta.Error('Error', 'Debe ingresar todos los campos.');
      }
      
    }

    const paso_cuatro = () => {
      validate();
      if(formLicencia.value.dir_direccioncomercial!='' && formLicencia.value.dir_referencia!=''){
        secuencia.value = 4;
      }else{
        Alerta.Error('Error', 'Debe ingresar todos los campos.');
      }
      
    }
    const paso_cinco = () => {
      validate();
      if(formLicencia.value.pago_monto!='' && formLicencia.value.pago_codoperacion!=''){
        secuencia.value = 5;
      }else{
        Alerta.Error('Error', 'Debe ingresar todos los campos.');
      }
      
    }

    const onChangeTramite = async () =>{
      
      await  FunList.load_Requisitos_TramitesTupa(formLicencia.value.tipotramite_tupa.toString());
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

    return {
      paso_cinco,
      paso_cuatro,
      paso_tres,
      paso_dos, regresar,
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
      onChangeTramite,
      HOST_URL,Requisitos_obligatorios
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
