<template>
  <div> 
    <!-- [ breadcrumb ] start -->
    <!-- [ breadcrumb ] end -->

    <div class="row pt-3">
      <!-- [ registrar_trabajador ] start -->
      <div class="col-md-2">
        <div class="chat-avtar d-inline-flex mx-auto">
          <img class="rounded-circle img-fluid img-thumbnail" src="../../../assets/images/avatar.png">
          <i class="chat-badge bg-success me-2 mb-2"></i>
        </div>
        <button @click="cancelar" class="btn btn-danger my-1 mb-0 w-100">Cancelar</button>
      </div>
      <!-- Datos del Trabajador -->
      <div class="col-md-10">
        <div class="card">
          <div class="card-header f-20 text-primary">
            <i class="fas fa-user m-r-10"></i> Editar Datos del Usuario
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-2">
                <label class="form-label">Tipo de documento</label>
                <div class="d-flex gap-3 w-100" role="group" aria-label="Tipo de documento">
                  <div class="flex-fill">
                    <input type="checkbox" class="btn-check" id="btncheck-dni-editar" autocomplete="off"
                        :checked="usuarioEdicion.tipodocumento === 'DNI'"
                        @change="setTipoDocumentoEditar('DNI')">
                    <label class="btn btn-outline-primary w-100" for="btncheck-dni-editar">DNI</label>
                  </div>
                  <div class="flex-fill">
                    <input type="checkbox" class="btn-check" id="btncheck-carnet-editar" autocomplete="off"
                        :checked="usuarioEdicion.tipodocumento === 'Carnet de extranjeria'"
                        @change="setTipoDocumentoEditar('Carnet de extranjeria')">
                    <label class="btn btn-outline-primary w-100" for="btncheck-carnet-editar">Carnet de extranjería</label>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">Oficina:</label>
                <multiselect
                  v-model="selectedOficina"
                  :options="listaOficinas"
                  :multiple="false"
                  :close-on-select="true"
                  :clear-on-select="true"
                  :preserve-search="true"
                  placeholder="Seleccione una oficina"
                  label="nombre"
                  track-by="id"
                  :searchable="true"
                />
                <ErrorMessage :error="errors.oficina_id" />
                <ErrorMessage :error="errors.rol_id" />
              </div>

              <div class="col-md-6 mb-2">
                <label class="form-label">Numero de documento</label>
                <input type="text"
                  v-model="usuarioEdicion.numdocumento"
                  class="form-control"
                  placeholder="Ingresa tu numero de documento"
                  :disabled="usuarioEdicion.tipodocumento !== 'DNI' && usuarioEdicion.tipodocumento !== 'Carnet de extranjeria'"
                  @input="onNumeroDocumentoInputEditar"
                  @change="usuarioEdicion.tipodocumento === 'DNI' ? onDniChangeEditar() : null"
                >
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">Rol del Usuario:</label>
                <multiselect
                  v-model="selectedRol"
                  :options="listaRoles"
                  :multiple="false"
                  :close-on-select="true"
                  :clear-on-select="true"
                  :preserve-search="true"
                  placeholder="Seleccione un rol"
                  label="nombre"
                  track-by="id"
                  :searchable="true"
                />
                <ErrorMessage :error="errors.rol_id" />
              </div>

              <div class="col-md-6 mb-2">
                <label class="form-label">Nombres</label>
                <input type="text" v-model="usuarioEdicion.nombres" class="form-control" placeholder="Ingresa tu nombre"
                  :disabled="usuarioEdicion.tipodocumento === 'DNI'">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">Nombre del usuario</label>
                <input type="text" v-model="usuarioEdicion.username" class="form-control" placeholder="Ingresa nombre de usuario" />
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">Apellidos</label>
                <input type="text" v-model="usuarioEdicion.apellidos" class="form-control" placeholder="Ingresa tu apellido"
                  :disabled="usuarioEdicion.tipodocumento === 'DNI'">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">Usuario</label>
                <input type="text" v-model="usuarioEdicion.usuario" class="form-control" placeholder="Ingresa tu celular" />
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">Celular (Opcional)</label>
                <input type="text" v-model="usuarioEdicion.celular" class="form-control" placeholder="Ingresa tu celular">
              </div>
            </div>
               <div class="row">
                   <div class="col-md-6 mb-2">
                <label class="form-label">Correo (Opcional)</label>
                <input type="text" v-model="usuarioEdicion.correo" class="form-control" placeholder="Ingresa tu correo">
              </div>
              </div>
            <button class="btn btn-primary mt-3" @click="guardarTrabajador">Guardar Cambios</button>
          </div>
        </div>
      </div>

      <!-- Tabla de Buzones -->
      <div class="col-md-10 offset-md-2">
        <div class="card">
          <div class="card-header f-20 text-primary">
            <i class="fas fa-envelope m-r-10"></i> Buzones Asignados
           
            <button class="btn btn-success btn-sm float-end" @click="abrirModalAsignarBuzon">
                <i class="fas fa-plus"></i> Asignar Buzón
            </button>
             <button class="btn btn-danger btn-sm float-end mx-2" @click="openAddBuzonModal">
                <i class="fas fa-plus"></i> Crear Buzón
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover table-sm">
                <thead>
                  <tr>
                    <th style="width: 5%">#</th>
                    <th style="width: 25%">Nombre de Buzon</th>
                    <th style="width: 20%">Sigla Documentos</th>
                    <th style="width: 20%">Estado</th>
                    <th style="width: 20%">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(buzon, index) in buzonesAsignados" :key="buzon.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ buzon.nombre }}</td>
                    <td>{{ buzon.sigla }}</td>
                    <td>{{ buzon.estado }}</td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="eliminarBuzon(buzon.id)">
                        <i class="fas fa-trash"></i>
                      </button>
                      <button class="btn btn-info btn-sm ms-1" @click="goToEditarBuzon(buzon.id)">
                        <i class="ti ti-edit"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Asignar Buzón -->
    <div class="modal modal-lg fade" id="asignarBuzonModal" tabindex="-1" aria-labelledby="asignarBuzonModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="asignarBuzonModalLabel">Asignar Buzón</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <!-- {{ listaBuzones }} -->
              <label for="buzonSelect" class="form-label">Seleccionar Buzón</label>
             <multiselect
                  v-model="selectedBuzon"
                  :options="listaBuzones"
                  :multiple="false"
                  :close-on-select="true"
                  :clear-on-select="true"
                  :preserve-search="true"
                  placeholder="Seleccionar Buzón"
                  label="nombre"
                  track-by="id"
                  :searchable="true"
                />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="asignarBuzon">Asignar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ------------------------------------------------- -->
   <!-- Modal para agregar buzón -->
  <div class="modal fade" id="addBuzonModal" tabindex="-1" aria-labelledby="addBuzonModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addBuzonModalLabel">Agregar Buzón</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" v-model="nuevoBuzon.nombre" class="form-control" placeholder="Ingrese el nombre del buzón" />
          </div>
          <div class="mb-3">
              <label class="form-label">Sigla</label>
              <input type="text" v-model="nuevoBuzon.sigla" class="form-control" placeholder="Ingrese la sigla del buzón" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="CrearBuzonAsignar(usuarioEdicion.id.toString())">Agregar</button>
        </div>
      </div>
    </div>
  </div>
    <!-- ------------------------------------------------- -->
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, reactive } from 'vue';
import {  get_Trabajador, subir_foto, upd_TrabajadorActual, asignarBuzonUsuario, getRoles } from '../../../services/trabajadorService';
import { useRoute, useRouter } from 'vue-router';
import { HOST_URL } from '../../../config';
import Multiselect from 'vue-multiselect';
import { get_datosDNI } from '../../../services/apisunat'; // Importa tu servicio
import Breadcrumb from '../../../components/breadcrumb.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import {  assign_user_to_buzon, remove_user_from_buzon, get_buzones_for_user, getBuzones } from '../../../services/BuzonServicio';
import  Alerta  from '../../../utils/alertas';
import NProgress from 'nprogress'; // Importa nprogress
import 'nprogress/nprogress.css'; // Importa el estilo de nprogress
import Notif from '../../../utils/notificaciones';
import { get_lista_oficinas } from '../../../services/OficinaServices';
import { Oficina, OficinaSelect } from '../../../types/interfaces';
import { initializeTrabajador, initializeTrabajadorErrors, Trabajador } from '../../../interfaces/trabajador.interface';
import { Buzon } from '../../../interfaces/buzon.interface';
import { Modal } from 'bootstrap'; // Importa Bootstrap Modal si lo necesitas
import { useBuzon } from '../../../composables/UseBuzon';


interface Link {
  path: string;
  name: string;
}
export default defineComponent({
  components: {
    Breadcrumb, ErrorMessage, Multiselect
  },
  setup() {
    const frm_dni = ref(""); // Deshabilitar el botón
    const breadcrumbRoutes = ref<Link[]>([
      { path: '/office/trabajador', name: 'Trabajador' },
      { path: '', name: 'Registrar Trabajador' },
    ]);
    const route = useRoute();
    const router = useRouter();
    const isUploading = ref(false); // Deshabilitar el botón
    const listaOficinas = ref<OficinaSelect[]>([]);
    const listaBuzones = ref<Buzon[]>([]);
    const buzonesAsignados = ref<Buzon[]>([]);
    const buzonSeleccionado = ref<string | null>(null);
    const selectedBuzon = ref<Buzon|null>(null);
    const selectedOficina = ref<OficinaSelect|null>(null);
    const selectedRol = ref<{id:number;nombre:string}|null>(null);
    const isLoading = ref(true);
    const listaRoles = ref<{ id: number; nombre: string }[]>([]);
    const { ListaBuzones, ListarBuzones, openAddBuzonModal,CrearBuzonAsignar, CrearBuzon,nuevoBuzon } = useBuzon();

     const setTipoDocumentoEditar = (tipo: string) => {
      if (usuarioEdicion.value.tipodocumento !== tipo) {
        usuarioEdicion.value.numdocumento = '';
        usuarioEdicion.value.nombres = '';
        usuarioEdicion.value.apellidos = '';
      }
      usuarioEdicion.value.tipodocumento = tipo;
    };

    const onDniChangeEditar = async () => {
      if (usuarioEdicion.value.tipodocumento !== 'DNI') return;
      try {
        NProgress.start();
        if (/^\d{8}$/.test(usuarioEdicion.value.numdocumento)) {
          const data = await get_datosDNI(usuarioEdicion.value.numdocumento);
          usuarioEdicion.value.nombres = data.nombres;
          usuarioEdicion.value.apellidos = `${data.apellidoPaterno} ${data.apellidoMaterno}`;
        }
      } catch (error) {
        console.error('Error fetching usuario data:', error);
        Alerta.Error('Error', 'No se pudo obtener los datos del usuario.');
      } finally {
        NProgress.done();
      }
    };

    // Solo permite números y máximo 8 dígitos si es DNI
    const onNumeroDocumentoInputEditar = (e: Event) => {
      const tipo = usuarioEdicion.value.tipodocumento;
      let valor = (e.target as HTMLInputElement).value;
      if (tipo === 'DNI') {
        valor = valor.replace(/\D/g, '').slice(0, 8);
      }
      usuarioEdicion.value.numdocumento = valor;
    };

    
     // Crear los objetos reactivos
    const usuarioEdicion = ref<Trabajador>(initializeTrabajador());
    const errors = ref<any>(initializeTrabajadorErrors());

    const ResetFormularioTrabajador = () => {
        usuarioEdicion.value = initializeTrabajador();
        errors.value = initializeTrabajadorErrors();
    };

    
 
    const idtrabajor = Number(route.params.id);

    onMounted(async () => {
        await cargarTrabajador(idtrabajor);
        await cargarOficinas();
        const resRoles = await getRoles();
        if (resRoles.success) {
          listaRoles.value = resRoles.data;
        }
        // Sincronizar los multiselect con los datos del usuario
        // Oficina
        if (usuarioEdicion.value.oficina_id && listaOficinas.value.length > 0) {
          selectedOficina.value = listaOficinas.value.find(of => Number(of.id) === Number(usuarioEdicion.value.oficina_id)) || null;
        }
        // Rol
        if (usuarioEdicion.value.rol_id && listaRoles.value.length > 0) {
          selectedRol.value = listaRoles.value.find(rol => rol.id === usuarioEdicion.value.rol_id) || null;
        }
        await cargarBuzones(idtrabajor);
        await cargarBuzonesDisponibles(); 
        // Inicializar el modal al montar el componente
        const modalElement = document.getElementById('asignarBuzonModal');
        if (modalElement) {
          modal_AsignarBuzon = new Modal(modalElement);
        }
        const modalElement2 = document.getElementById('CrearBuzonModal');
        if (modalElement2) {
          modal_CrearBuzon = new Modal(modalElement2);
        }
    });

    const cargarBuzonesDisponibles = async () => {
  try {
    const response = await getBuzones(); 
    if (response.success) {
      listaBuzones.value = response.data;
    }
  } catch (error) {
    console.error('Error al cargar buzones disponibles:', error);
  }
};

    const cargarBuzones = async (idUser: number) => {
      NProgress.start();
      try {
        const response = await get_buzones_for_user(idUser);
        if (response.success) {
          buzonesAsignados.value = response.data;
    
        } else {
          Notif.Error(response.message);
        }
      } catch (error) {
        console.error('Error al cargar buzones:', error);
        Notif.Error('Error al cargar buzones');
      } finally {
        NProgress.done();
        isLoading.value = false;
      }
    };

    let modal_AsignarBuzon: Modal | null = null;
    const abrirModalAsignarBuzon = () => {
      if (modal_AsignarBuzon) {
        modal_AsignarBuzon.show();
      }
    };

    let modal_CrearBuzon: Modal | null = null;
    const abrirModalCrearBuzon = () => {
      if (modal_CrearBuzon) {
        modal_CrearBuzon.show();
      }
    };

    const asignarBuzon = async () => {
        if (!selectedBuzon.value) {
          Notif.Error('Por favor, selecciona un buzón');
          return;
        }
        // Validar si el buzón ya está asignado
        const buzonYaAsignado = buzonesAsignados.value.some(
          (buzon) => selectedBuzon.value && buzon.id === selectedBuzon.value.id
        );
        if (buzonYaAsignado) {
          Notif.Error('Buzón ya agregado');
          return;
        }
        NProgress.start();
        try {
          // Convertir el id a string si es necesario
          const buzonId = String(selectedBuzon.value.id);
          const response = await asignarBuzonUsuario(usuarioEdicion.value.id, buzonId);
          if (response.success) {
            Notif.Success('Buzón asignado con éxito');
            await cargarBuzones(usuarioEdicion.value.id);
            if (modal_AsignarBuzon) {
              modal_AsignarBuzon.hide();
            }
            selectedBuzon.value = null;
          } else {
            Notif.Error(response.message || 'Error al asignar el buzón');
          }
        } catch (error) {
          console.error('Error al asignar buzón:', error);
          Notif.Error('Error al asignar el buzón');
        } finally {
          NProgress.done();
        }
    };

    // API RENIEC
    // ----------------------------------------------------------
    const onDniChange = async () => {
      try {
        NProgress.start(); 
        if (frm_dni.value.length == 8) {
            const data = await get_datosDNI(frm_dni.value.toString());
            usuarioEdicion.value.username = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
        }
      } catch (error) {
          Alerta.Error('Error', 'No se pudo obtener los datos del trabajador.');
      } finally {
          NProgress.done(); 
      }
    };

    // API RENIEC
    // ----------------------------------------------------------
    const cargarOficinas = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await get_lista_oficinas();
        if(RespuestaJSON.success){
          listaOficinas.value = RespuestaJSON.data;
        }else{
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
      }finally {
        NProgress.done();
      }
    };

    
    // API RENIEC
    // ----------------------------------------------------------
    const cargarTrabajador = async (idtrabajador: number) => {
      NProgress.start();
      try {
        const RespuestaJSON = await get_Trabajador(idtrabajador);
        if(RespuestaJSON.success){
          usuarioEdicion.value= RespuestaJSON.data;
        }else{
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudo cargar el trabajador');
      }finally {
        NProgress.done();
      }
    };

    // const asignarBuzon = async () => {
    //   if (!buzonSeleccionado.value) return;
    //   const response = await assign_user_to_buzon(usuarioEdicion.value.id, buzonSeleccionado.value);
    //   if (response.success) {
    //     Notif.Success('Buzón asignado con éxito');
    //     buzonesAsignados.value.push(response.data);
    //     buzonSeleccionado.value = null;
    //   }
    // };


    // const abrirModalAsignarBuzon = () => {
    //   const modal = new bootstrap.Modal(document.getElementById('asignarBuzonModal')!);
    //   modal.show();
    // };

    const eliminarBuzon = async (buzonId: number) => {
      const response = await remove_user_from_buzon(usuarioEdicion.value.id, buzonId);
      if (response.success) {
        Notif.Success('Buzón eliminado con éxito');
        buzonesAsignados.value = buzonesAsignados.value.filter(b => b.id !== buzonId);
      }
    };


    const cancelar = () =>{
      router.push('/office/trabajador');
    }
    

    const validateField = (field: string, value: any) => {
      switch (field) {
       
        case 'tipouser':
          errors.value.tipouser = value ? '' : 'Tipo de Usuario obligatorio';
          break;
          
        case 'username':
          errors.value.username = value ? '' : 'Nombre de usuario obligatorio';
          break;

        
        case 'oficina_id':
          errors.value.oficina_id = value ? '' : 'La oficina es obligatoria';
          break;
        
        case 'usuario':
          errors.value.usuario = value ? '' : 'Username obligatorio';
          break;
          
        // case 'password':
        //   errors.value.password = value ? '' : 'Password obligatorio';
        //   break;
      }
    };
    // watch(() => usuarioEdicion.value.tipouser, (newVal)    => validateField('tipouser', newVal));
    watch(() => usuarioEdicion.value.username, (newVal) => validateField('username', newVal));
    // watch(() => usuarioEdicion.value.email, (newVal)    => validateField('email', newVal));
    // watch(() => usuarioEdicion.value.celular, (newVal)  => validateField('celular', newVal));
    // watch(() => usuarioEdicion.value.cargo, (newVal)    => validateField('cargo', newVal));
    watch(() => usuarioEdicion.value.oficina_id, (newVal)   => validateField('oficina_id', newVal));
    watch(() => usuarioEdicion.value.rol_id, (newVal) => validateField('rol_id', newVal));
    watch(() => usuarioEdicion.value.usuario, (newVal) => validateField('usuario', newVal));
    watch(() => usuarioEdicion.value.password, (newVal) => validateField('password', newVal));


    const validate = () => {
      // Llama a validateField para cada campo
      Object.keys(usuarioEdicion.value).forEach(key => {
        validateField(key, (usuarioEdicion.value as any)[key]);
      });

      // Imprime el objeto errors para inspeccionar
      // console.log("Errors:", errors.value);
      console.table(errors.value);

      // Revisa si hay algún error en el formulario
      const hasErrors = Object.values(errors.value).some(error => error);
      console.log("Has Errors:", hasErrors);

      // Devuelve el estado final
      return !hasErrors;
    };


    //  ------------------------------------------------------

    const guardarTrabajador = async () => {
      if (!validate()) {
        Alerta.Error('Error', 'Todos los campos son obligatorios');
        return;
         }
        // Sincronizar los valores seleccionados del multiselect con el modelo
        if (selectedOficina.value) {
          usuarioEdicion.value.oficina_id = Number(selectedOficina.value.id);
        }
        if (selectedRol.value) {
          usuarioEdicion.value.rol_id = selectedRol.value.id;
        }
      try {
        NProgress.start();
        const RespuestaJSON = await upd_TrabajadorActual(usuarioEdicion.value);
        if (RespuestaJSON.success) {
          Notif.Success('Trabajadore Actualizado con éxito');
          ResetFormularioTrabajador();
          router.push('/office/trabajador');
        } else {
          Alerta.Error('Error', RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error guardando trabajador:', error);
        Alerta.Error('Error', 'Hubo un error guardando el trabajador');
      } finally {
        NProgress.done(); // Detiene la barra de progreso
      }
    };
    //  ------------------------------------------------------


    // ---------------------------------------

    const goToEditarBuzon = (buzonId: number) => {
      router.push({ name: 'BuzonEditar', params: { id: buzonId } });
    };

    return {
      isUploading,
      listaOficinas,
      usuarioEdicion,
      HOST_URL,
      guardarTrabajador,
      cancelar,
      onDniChange,
      breadcrumbRoutes,
      // onFileSelected_FotoPerfil,
      errors,
      frm_dni,
      buzonSeleccionado,
      selectedBuzon,
      listaBuzones,
      buzonesAsignados,
      abrirModalAsignarBuzon,
      asignarBuzon,
      eliminarBuzon,
      goToEditarBuzon,
      listaRoles,
      selectedOficina, selectedRol,
      CrearBuzon,nuevoBuzon,openAddBuzonModal,CrearBuzonAsignar,
      
      setTipoDocumentoEditar,
      onDniChangeEditar,
      onNumeroDocumentoInputEditar,
    };
  },
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.text-amarillo {
  color: rgb(217, 144, 4) !important;
}
.image-container{
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* This maintains the 4:3 aspect ratio */
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

</style>
