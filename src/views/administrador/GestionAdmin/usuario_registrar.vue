<template>
  <!-- [ breadcrumb ] end -->
  <div class="row">
    <!-- [ registrar_trabajador ] start -->
    <div class="col-md-2">
      <div class="chat-avtar d-inline-flex mx-auto">
        <img 
            class="rounded-circle img-fluid img-thumbnail" 
            src="../../../assets/images/avatar.png">

        <i class="chat-badge bg-success me-2 mb-2"></i>
      </div>
      
    </div>
     <div class="col-md-5">
      <div class="card">
        <div class="card-header f-20 text-primary">
          <i class="fas fa-chevron-right m-r-10"></i>  Datos de Contacto
        </div>
        <div class="card-body">
           <div class="mb-3">
            <label class="form-label">Tipo de documento</label>
            <div class="d-flex gap-3 w-100" role="group" aria-label="Tipo de documento">
              <div class="flex-fill">
                <input type="checkbox" class="btn-check" id="btncheck-dni" autocomplete="off"
                    :checked="nuevoUsuario.tipodocumento === 'DNI'"
                    @change="setTipoDocumento('DNI')">
                <label class="btn btn-outline-primary w-100" for="btncheck-dni">DNI</label>
              </div>
              <div class="flex-fill">
                <input type="checkbox" class="btn-check" id="btncheck-carnet" autocomplete="off"
                    :checked="nuevoUsuario.tipodocumento === 'Carnet de extranjeria'"
                    @change="setTipoDocumento('Carnet de extranjeria')">
                <label class="btn btn-outline-primary w-100" for="btncheck-carnet">Carnet de extranjería</label>
              </div>
            </div>
          </div>
             <div class="mb-3">
            <label class="form-label">Numero de documento</label>
            <input type="text"
              v-model="nuevoUsuario.numdocumento"
              class="form-control"
              placeholder="Ingresa tu numero de documento"
              :disabled="nuevoUsuario.tipodocumento !== 'DNI' && nuevoUsuario.tipodocumento !== 'Carnet de extranjeria'"
              @input="onNumeroDocumentoInput"
              @change="nuevoUsuario.tipodocumento === 'DNI' ? onDniChange() : null"
            >
          </div>
          <div class="mb-3">
            <label class="form-label">Nombres</label>
            <input type="text" v-model="nuevoUsuario.nombres" class="form-control" placeholder="Ingresa tu nombre"
              :disabled="nuevoUsuario.tipodocumento === 'DNI'">
          </div>
          <div class="mb-3">
            <label class="form-label">Apellidos</label>
            <input type="text" v-model="nuevoUsuario.apellidos" class="form-control" placeholder="Ingresa tu apellido"
              :disabled="nuevoUsuario.tipodocumento === 'DNI'">
          </div>
          <div class="mb-3">
            <label class="form-label">Celular (Opcional)</label>
            <input type="text" v-model="nuevoUsuario.celular" class="form-control" placeholder="Ingresa tu celular">
          </div>
          <div class="mb-3">
            <label class="form-label">Correo (Opcional)</label>
            <input type="text" v-model="nuevoUsuario.correo" class="form-control" placeholder="Ingresa tu correo">
          </div>
          
        </div>
      </div>
    </div>

    <div class="col-md-5">
      <div class="card">
        
         <div class="card-header f-20 text-primary">
          
           <i class="fas fa-chevron-right m-r-10"></i> Datos Generales
        </div>
        <div class="card-body">
            <!-- ------------------- -->
            <div class="mb-2">
              <label class="form-label">Nombre del Usuario:</label>
              <input type="text" v-model="nuevoUsuario.username" class="form-control" placeholder="">
              <ErrorMessage :error="errors.usuario" />
            </div>

            <!-- ------------------- -->
            <div class="mb-2">
              <label class="form-label">Usuario:</label>
              <input type="text" v-model="nuevoUsuario.usuario" class="form-control" placeholder="">
              <ErrorMessage :error="errors.usuario" />
            </div>

            <!-- ------------------- -->
            <div class="mb-2">
              <label class="form-label">Contraseña:</label>
              <input type="password" v-model="nuevoUsuario.password" class="form-control" placeholder="">
              <ErrorMessage :error="errors.password" />
            </div>

            <!-- ------------------- -->
            <div class="mb-2">
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
                <!-- ------------------- -->

            <div v-if="nuevoUsuario.rol_id===4" class="alert alert-info">
              <h6>Datos de Casilla</h6>
              <div class="mb-3">
                <label class="form-label">Nombre de Casilla</label>
                <input type="text" v-model="nuevoBuzon.nombre" class="form-control" />
              </div>
              <div class="mb-3">
                  <label class="form-label">Sigla</label>
                  <input type="text" v-model="nuevoBuzon.sigla" class="form-control" />
              </div>
            </div>

            <!-- ------------------- -->
            <div class="mb-2">
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
            </div>
            <!-- ------------------- -->

            <button :disable="isUploading" @click="guardarTrabajador" class="btn btn-primary mt-2 w-100">Guardar Trabajador</button>
            <button @click="cancelar" class="btn btn-danger my-1 mb-0 w-100">Cancelar</button>
        </div>
      </div>
      
    </div>
    
    <!-- [ registrar_trabajador ] end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { add_Trabajador, subir_foto, getRoles, add_Trabajador_y_buzon } from '../../../services/trabajadorService';
import { useRouter } from 'vue-router';
import { HOST_URL } from '../../../config';
import Breadcrumb from '../../../components/breadcrumb.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import Alerta from '../../../utils/alertas';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Multiselect from 'vue-multiselect';
import Notif from '../../../utils/notificaciones';
import { initializeTrabajador, Trabajador, TrabajadorErrors, initializeTrabajadorErrors } from '../../../interfaces/trabajador.interface';
import { useOficina } from '../../../composables/useOficina';
import { BuzonCreate, initializeBuzonCreate } from '../../../interfaces/buzon.interface';
import { Rol } from '../../../interfaces/rol.interface';
import { get_datosDNI } from '../../../services/apisunat';
import { Alert } from 'bootstrap';



export default defineComponent({
  components: {
    Breadcrumb, ErrorMessage, Multiselect
  },
  setup() {
    const frm_dni = ref("");

    const router = useRouter();
    const isUploading = ref(false);
    const nuevoUsuario = ref<Trabajador>(initializeTrabajador());
    const errors = ref<TrabajadorErrors>(initializeTrabajadorErrors());
    const registrarBuzon = ref(false);
    const listaRoles = ref<Rol[]>([]);
    const selectedRol = ref<Rol|null>(null);

    // Sincroniza rol_id con el multiselect
    watch(selectedRol, (rol) => {
      if (rol) {
        nuevoUsuario.value.rol_id = rol.id;
      } else {
        nuevoUsuario.value.rol_id = 0;
      }
    });
    const selectedOficina = ref<any|null>(null);

    // Limpia los campos cuando se cambia el tipo de documento
    const setTipoDocumento = (tipo: string) => {
      if (nuevoUsuario.value.tipodocumento !== tipo) {
        nuevoUsuario.value.numdocumento = '';
        nuevoUsuario.value.nombres = '';
        nuevoUsuario.value.apellidos = '';
      }
      nuevoUsuario.value.tipodocumento = tipo;
    };

    const onDniChange = async () => {
      if (nuevoUsuario.value.tipodocumento !== 'DNI') return;
      try {
        NProgress.start();
        if (/^\d{8}$/.test(nuevoUsuario.value.numdocumento)) {
          const data = await get_datosDNI(nuevoUsuario.value.numdocumento);
          nuevoUsuario.value.nombres = data.nombres;
          nuevoUsuario.value.apellidos = `${data.apellidoPaterno} ${data.apellidoMaterno}`;
        }
      } catch (error) {
        console.error('Error fetching usuario data:', error);
        Alerta.Error('Error', 'No se pudo obtener los datos del usuario.');
      } finally {
        NProgress.done();
      }
    };

    // Solo permite números y máximo 8 dígitos si es DNI
    const onNumeroDocumentoInput = (e: Event) => {
      const tipo = nuevoUsuario.value.tipodocumento;
      let valor = (e.target as HTMLInputElement).value;
      if (tipo === 'DNI') {
        valor = valor.replace(/\D/g, '').slice(0, 8);
      }
      nuevoUsuario.value.numdocumento = valor;
    };

    const ResetFormularioTrabajador = () => {
      nuevoUsuario.value = initializeTrabajador();
      errors.value = initializeTrabajadorErrors();
    };

    const nuevoBuzon = ref<BuzonCreate>(initializeBuzonCreate());

    watch(() => nuevoUsuario.value.username, (newUsername) => {
      if (newUsername) {
        nuevoBuzon.value.nombre = 'casilla_' + limpiarTexto(newUsername);
      }
    });

    const {cargarOficinas, listaOficinas} = useOficina();

    const limpiarTexto = (texto: string): string => {
      if (!texto) return '';
      
      return texto
        .normalize('NFD')              // Descompone caracteres con tildes
        .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (tildes)
        .replace(/[^\w\s]/g, '')      // Elimina símbolos que no sean alfanuméricos
        .replace(/\s+/g, '')          // Elimina espacios
        .toLowerCase();               // Convierte a minúsculas para consistencia
    };

    onMounted(async () => {
      const resRoles = await getRoles();
      if (resRoles.success) {
        listaRoles.value = resRoles.data;
      }
      await cargarOficinas();
    });


    const cancelar = () => {
      router.push('/office/trabajador');
    };

    const validateField = (field: string, value: any) => {
      switch (field) {
        case 'username':
          errors.value.username = value ? '' : 'Nombre de usuario obligatorio';
          break;
      }
    };

    watch(() => nuevoUsuario.value.rol_id, (newVal) => validateField('rol_id', newVal));
    watch(() => nuevoUsuario.value.usuario, (newVal) => validateField('usuario', newVal));

    const validate = () => {
      Object.keys(nuevoUsuario.value).forEach(key => {
        validateField(key, (nuevoUsuario.value as any)[key]);
      });
      return !Object.values(errors.value).some(error => error);
    };

    const guardarTrabajador = async () => {
      //Trámite documentario
      if (!validate()) {
        Notif.Error('Todos los campos son obligatorios');
        return;
      }
      if (selectedRol.value) {
        nuevoUsuario.value.rol_id = selectedRol.value.id;
      }
      if (selectedOficina.value) {
        nuevoUsuario.value.oficina_id = selectedOficina.value.id;
      }
      // Configurado campo TIpo
      if (nuevoUsuario.value.rol_id === 1 || nuevoUsuario.value.rol_id === 3) {
        nuevoBuzon.value.tipo = 'Casilla Oficina';
      }else if (nuevoUsuario.value.rol_id === 4) {
        nuevoBuzon.value.tipo = 'Casilla TrabajadorCAS';
      }else if (nuevoUsuario.value.rol_id === 7) {
        nuevoBuzon.value.tipo = 'Casilla Locador';
      }else if (nuevoUsuario.value.rol_id === 8) {
        nuevoBuzon.value.tipo = 'Casilla Consejero';
      }

      try {
        let RespuestaJSON;
        if(nuevoUsuario.value.rol_id === 4 || nuevoUsuario.value.rol_id === 7 || nuevoUsuario.value.rol_id === 8) {
            RespuestaJSON = await add_Trabajador_y_buzon(nuevoUsuario.value,nuevoBuzon.value);
        }else{
            RespuestaJSON = await add_Trabajador(nuevoUsuario.value);
        }
        if (RespuestaJSON.success) {
          Notif.Success('Trabajador registrado con éxito');
          ResetFormularioTrabajador();
          router.push('/office/trabajador');
        } else {
          Alerta.Error('Error', RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error guardando trabajador:', error);
        Alerta.Error('Error', 'Hubo un error guardando el trabajador');
      } finally {
        NProgress.done();
      }
    };

    return {
      isUploading,
      nuevoUsuario,
      HOST_URL,
      guardarTrabajador,
      cancelar,
      errors,
      frm_dni,
      registrarBuzon,
      listaRoles,
      listaOficinas,
      nuevoBuzon,
      selectedRol,
      selectedOficina,
      onDniChange,
      setTipoDocumento,
      onNumeroDocumentoInput
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

