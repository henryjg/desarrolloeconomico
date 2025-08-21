<template>
  <div class="row">
    <div class="col-12">
      <Breadcrumb :links="breadcrumbRoutes"/>
    </div>
  </div>
  <div class="row">
      <div class="col-md-6">
        <!-- ------------------------------ -->
        <div class="card">
            <div class="card-header bg-blue-700 pb-1 pb-0">
              <h5 class="text-white">
                <i class="fa fa-edit"></i> Editar Licencia
              </h5>
            </div>
            <div class="card-body">
                <!-- ----------------------------------- -->
                  <div class="mb-3">
                      <label for="categoria" class="form-label text-gray-600 f-w-500">Categoría</label>
                      <select class="form-control multi-line-select" v-model="tramite.categoria" id="categoria">
                          <option selected>Selecciona una opción</option>
                          <option value="Autorización">Autorización</option>
                          <option value="Licencia de Funcionamiento">Licencia de Funcionamiento</option>
                      </select>
                      <ErrorMessage :error="errors.categoria" />
                  </div>  
                  <div class="mb-3 mt-2">
                      <label for="nombreTramite" class="form-label  text-gray-600 f-w-500">Nombre del Trámite</label>
                      <input type="text" id="nombreTramite" class="form-control" v-model="tramite.nombretramite">
                      <ErrorMessage :error="errors.nombretramite" />
                  </div>
                  <div class="mb-3">
                      <label  class="form-label  text-gray-600 f-w-500">Descripción</label>
                      <textarea v-model="tramite.descripcion" rows="3" class="form-control"></textarea>
                      <ErrorMessage :error="errors.descripcion" />
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                          <label for="monto" class="form-label text-gray-600 f-w-500">Tipo de monto</label>
                          <select class="form-control multi-line-select" v-model="tramite.tipomonto" id="riesgo">
                            <option selected>Selecciona una opción</option>
                            <option value="montofijo">Monto fijo</option>
                            <option value="porcentaje">Porcentaje UIT</option>
                          </select>
                          <ErrorMessage :error="errors.tipomonto" />
                        </div>              
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="monto" class="form-label text-gray-600 f-w-500">Derecho de tramitación (Monto S/)</label>
                            <input type="number" id="monto" class="form-control" v-model="tramite.monto" placeholder="Ejemplo: 15.00">
                            <ErrorMessage :error="errors.monto" />
                        </div>              
                    </div>
                              
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="codigo" class="form-label  text-gray-600 f-w-500">Código</label>
                        <input type="text" id="codigo" class="form-control" v-model="tramite.codigo">
                        <ErrorMessage :error="errors.codigo" />
                      </div>             
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                            <label for="plazo" class="form-label  text-gray-600 f-w-500">Plazo de atención (días)</label>
                            <input type="number" id="plazo" class="form-control" v-model="tramite.plazo" placeholder="Número entero">
                            <ErrorMessage :error="errors.plazo" />
                      </div>      
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                          <label for="duracion" class="form-label  text-gray-600 f-w-500">Vigencia o Duración</label>
                          <input type="number" id="duracion" class="form-control" v-model="tramite.duracion" placeholder="Número entero">
                          <ErrorMessage :error="errors.duracion" />
                      </div>           
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary" @click="actualizarTramite">Guardar</button>
                    </div>
                  </div>
                <!-- ----------------------------------- -->
            </div>
          </div>    
        <!-- -------------- -->
      </div>
      <div class="col-md-6">
            <div class="card">
                  <div class="card-header bg-blue-700 pb-1 pb-0">
                    <h5 class="text-white">
                      <i class="fa fa-edit"></i> Requisitos
                    </h5>
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-8">
                          <select id="esformato" class="form-select" v-model="registro_asignar.idrequisito">
                            <option>Seleccione ...</option>
                            <option v-for="(requisito, index) in listaRequisitos" :key="requisito.idreq"
                                  :value="requisito.idreq">{{requisito.reqnombre}}</option>
                          </select>
                      </div>
                      <div class="col-4">
                          <div @click="AsingarRequisito()" class="btn btn-danger  w-100">
                            <i class="ti ti-plus"></i> Requisito
                          </div>
                      </div>
                    </div>
                   
                    <!-- ------------------- -->
                    <table v-if="ListaRequisitosAsignados.length>0" class="table table-hover table-xs" id="pc-dt-simple">
                        <thead>
                            <tr>
                                <th width="10%">#</th>
                                <th width="65%">Requisito</th>
                                <th width="10%">*</th>
                                <th width="10%"></th>
                                <th width="7%"></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(reqAsignado, index) in ListaRequisitosAsignados" :key="reqAsignado.idreq">
                            <td>{{ index+1 }}</td>
                            <td>{{ reqAsignado.nombrerequisito }}</td>
                            <td>{{ reqAsignado.esobligatorio ? "*" : "-" }}</td>
                            <td>
                              <a v-if="reqAsignado.esformato"
                                 :href="HOST_URL + reqAsignado.formatopdf" target="_blank">
                                <img src="../../assets/images/pdf.png" class="img-fluid wid-25 p-0">
                              </a>
                            </td>
                            <td>
                                <button @click="EliminarRequisitoAsignados(reqAsignado.idasignacion)" type="button" 
                                class="btn btn-sm btn-light-danger"><i class=" feather icon-trash-2"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div v-else class="alert alert-danger"><i class="fas fa-times"></i> No se encontraron requisitos asignados</div>
                  </div>
            </div>
      </div>
  </div>  
    
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { get_tramite, add_tramite, upd_tramite, del_tramite } from '../../services/TramiteServicios';
import Breadcrumb from '../../components/breadcrumb.vue';
import { Tramite } from '../../types/interfaces';
import ErrorMessage from '../../components/ErrorMessage.vue';
import Alerta from '../../utils/alertas';
import { HOST_URL } from '../../config';

import Notif from '../../utils/notificaciones';
import NProgress from 'nprogress';
import { add_RequisitosAsignados, del_RequisitosAsignados, get_lista_requisitos, get_lista_RequisitosAsignados } from '../../services/RequisitoServices';
import { Requisito, RequisitoAsignado } from '../../interfaces/requisitos.interface';
import router from '../../router';
import { useRouter } from 'vue-router';

interface Link {
  path: string;
  name: string;
}

interface registro_asignar {
  idrequisito: string;
  idtramite: string;
}

export default defineComponent({
  components: {
    ErrorMessage,
    Breadcrumb
  },
  props: {
    idtra: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isUploading = ref(false); // Deshabilitar el botón
    const router = useRouter();
    const breadcrumbRoutes = ref<Link[]>([
      { path: '/office/tramite', name: 'Trámites' },
      { path: '', name: 'Editar' },
    ]);
    const tramite = ref<Tramite>({
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
    
    const errors = ref({
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

    const registro_asignar = ref<registro_asignar>({
      idrequisito: '',   
      idtramite: ''
    });
    const ListaRequisitosAsignados = ref<RequisitoAsignado[]>([]);
    const listaRequisitos = ref<Requisito[]>([]);

    const cargarTramite = async () => {
      try {
        const response = await get_tramite(props.idtra);
        if (response.success) {
          tramite.value = response.data;
          console.log(tramite.value)
        } else {
          Alerta.Error('Error', response.message);
        }        
      } catch (error) {
        Alerta.Error('Error', 'No se pudo cargar la licencia.');
      }
    };

    const actualizarTramite = async () => {
      try {
        const response = await upd_tramite(tramite.value);
        if (response.success) {
          Notif.Success('Trámite actualizado con éxito');
          router.push('/office/tramite');
        } else {
          Alerta.Error('Error', response.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al actualizar la licencia.');
      }
    };

    // ********************************************************************
    const cargarRequisitos = async () => {
      try {
        const respuesta = await get_lista_requisitos();
        listaRequisitos.value = respuesta.data;
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar los requisitos.');
      }
    };

    // ********************************************************************
    const cargarRequisitosAsignados = async () => {
      try {
        const response = await get_lista_RequisitosAsignados(props.idtra);
        if (response.success) {
          ListaRequisitosAsignados.value = response.data;
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudo cargar los requisitos asignados.');
      }
    };


    const EliminarRequisitoAsignados = async (idasignacion: string) => {
      const isConfirmado = await Alerta.Confirmacion(
        '¿Desea eliminar este Item?',
        'Esta acción no se puede deshacer.'
      );
      if (isConfirmado) {
        const RespuestaJSON = await del_RequisitosAsignados(idasignacion);
        if(RespuestaJSON.success){
          // Lista_CaracteristicaInmueble(props.inmueble.id);
          ListaRequisitosAsignados.value = ListaRequisitosAsignados.value.filter(item => item.idasignacion !== idasignacion);

          Notif.Success(RespuestaJSON.message);
        }else{
          Notif.Error(RespuestaJSON.message);
        }
      }
    };

    const AsingarRequisito = async () => {        
          // Verificar si ya existe el idcarac en la lista
          //----------------------------------------------------------------
          const existe = ListaRequisitosAsignados.value.some(item => item.idreq === registro_asignar.value.idrequisito);
          if (existe) {
              Notif.Error('Este requisito ya ha sido asignado');
              return;
          }
          //----------------------------------------------------------------
          try {
              NProgress.start(); // Inicia la barra de progreso
              //-------------------------------------------------------
              registro_asignar.value.idtramite=props.idtra;
              const formData = new FormData();
              Object.keys(registro_asignar.value).forEach(key => {
                  formData.append(key, (registro_asignar.value as any)[key]);
              });
              const RespuestaJSON = await add_RequisitosAsignados(formData);
              //-------------------------------------------------------
              if(RespuestaJSON.success){
                  cargarRequisitosAsignados();
                  Notif.Success(RespuestaJSON.message);
                  registro_asignar.value.idrequisito="";
                  
              }else{
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              Notif.Error('Error al asignar requisito.');
          }finally {
              NProgress.done(); // Detiene la barra de progreso
          }
    }; 




    const volver = () => {
      // Lógica para volver a la lista de licencias
    };

    onMounted(() => {
      cargarTramite();
      cargarRequisitos();
      cargarRequisitosAsignados();
    });


   


    return {
      tramite,
      errors,
      actualizarTramite,
      volver,
      breadcrumbRoutes,
      HOST_URL,
      listaRequisitos,
      ListaRequisitosAsignados,
      EliminarRequisitoAsignados,
      AsingarRequisito,
      registro_asignar
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
