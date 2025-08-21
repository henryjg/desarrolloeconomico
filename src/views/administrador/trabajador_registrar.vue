<template>
  <!-- [ breadcrumb ] start -->
  <Breadcrumb :links="breadcrumbRoutes" />
  <!-- [ breadcrumb ] end -->
  <div class="row">
    <!-- [ registrar_trabajador ] start -->
    <div class="col-md-2">
      <div class="chat-avtar d-inline-flex mx-auto">
        <img 
            class="rounded-circle img-fluid img-thumbnail" 
            src="../../assets/images/avatar.png">

        <i class="chat-badge bg-success me-2 mb-2"></i>
      </div>
      
    </div>
    <div class="col-md-5">
      <div class="card">
        <div class="card-header f-20 text-primary">
          <i class="fas fa-chevron-right m-r-10"></i> Datos Personales
        </div>
        <div class="card-body">
          <div class="mb-2">
            <label class="form-label">Tipo:</label>
            <select v-model="trabajadorForm.tipouser" class="form-select">
              <!-- <option value="Unidad Orgánica">Unidad Orgánica</option> -->
              <option value="Servidor Público">Servidor Público</option>
            </select>
            <ErrorMessage :error="errors.cargo" />
          </div>

          <div class="mb-2">
            <label class="form-label">DNI</label>
            <input type="text" v-model="frm_dni" @change="onDniChange" class="form-control" placeholder="Ingresa su DNI">
          </div>
          <div class="mb-2">
            <label class="form-label">Nombre</label>
            <input type="text" v-model="trabajadorForm.username"  class="form-control" placeholder="Ingresa nombre de usuario">
            <ErrorMessage :error="errors.username" />
          </div>
          <div class="mb-2" >
            <label class="form-label">Celular</label>
            <input type="text" v-model="trabajadorForm.celular" class="form-control" placeholder="Ingresa tu celular">
            <ErrorMessage :error="errors.celular" />
          </div>
          
          <div class="mb-2" >
            <label class="form-label">Correo</label>
            <input type="email" v-model="trabajadorForm.email" class="form-control" placeholder="Ingresa tu email">
            <ErrorMessage :error="errors.email" />
          </div>
          <div class="mb-2">
            <label class="form-label">Cargo:</label>
            <select v-model="trabajadorForm.cargo" class="form-select">
              <option value="Jefe">Jefe</option>
              <option value="Jefe">Profesional Especialista</option>
              <option value="Jefe">Técnico Especialista</option>
              <option value="Asistente Administrativo(a)">Asistente Administrativo</option>
              <option value="Secretaria(o)">Secretaria(o)</option>
              <option value="Secretaria(o)">Auxiliar</option>
            </select>
            <ErrorMessage :error="errors.cargo" />
          </div>

          <div class="mb-2">
            <label class="form-label">Oficina</label>
            <select v-model="trabajadorForm.oficina_id" class="form-select">
              <option>Elegir</option>
              <option v-for="oficina in listaOficinas"  :key="oficina.id"
                     :value="oficina.id">{{oficina.nombre}}</option>
            </select>
            <ErrorMessage :error="errors.cargo" />
          </div>
          <!-- v-if="trabajadorForm.tipouser!=='Unidad Orgánica'" -->
          <div class="mb-2" >
            <label class="form-label">Tipo Usuario:</label>
            <select v-model="trabajadorForm.rol_id" class="form-select">
              <option value="1">Administrador</option>
              <option value="2">Mesa de Partes</option>
              <option value="3">Trámite Documentario</option>
              <option value="4">Licecias</option>
            </select>
            <ErrorMessage :error="errors.cargo" />
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card">
        <div class="card-header f-20 text-primary">
          <i class="fas fa-chevron-right m-r-10"></i> Datos de Contacto
        </div>
        <div class="card-body">
          
          <div class="mb-2">
            <label class="form-label">Usuario</label>
            <input type="email" v-model="trabajadorForm.usuario" class="form-control" placeholder="Usuario">
            <ErrorMessage :error="errors.usuario" />
          </div>
          <div class="mb-2">
            <label class="form-label">Password</label>
            <input type="email" v-model="trabajadorForm.password" class="form-control" placeholder="Password">
            <ErrorMessage :error="errors.password" />
          </div>
          <div class="mb-2">
            <label class="form-label">Fotografía perfil</label>
            <div class="file-input-wrapper w-100">
              <input type="file" @change="onFileSelected_FotoPerfil" class="file-input">
              <div class="custom-file-label">
                  <img class="img-fluid wid-150 m-auto img-thumbnail "
                  v-if="trabajadorForm.fotourl" :src="HOST_URL+trabajadorForm.fotourl" />
                  <div  v-if="trabajadorForm.fotourl" Class="f-12 f-w-600">Fotografía Cargada</div>
                  <h5 class="pt-3 text-dark">Seleccione un archivo</h5>
              </div>
            <ErrorMessage :error="errors.fotourl" />
          </div>
          </div>
          <button :disable="isUploading" @click="guardarTrabajador" class="btn btn-primary mb-0">Guardar Trabajador</button>
          <button @click="cancelar" class="btn btn-danger mx-2 mb-0">Cancelar</button>

        </div>
      </div>
    </div>
    <!-- [ registrar_trabajador ] end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, reactive } from 'vue';
import { add_Trabajador, subir_foto, } from '../../services/trabajadorService';
import { useRoute, useRouter } from 'vue-router';
import { HOST_URL } from '../../config';
import { get_datosDNI } from '../../services/apisunat'; // Importa tu servicio
import Breadcrumb from '../../components/breadcrumb.vue';
import ErrorMessage from '../../components/ErrorMessage.vue';

import  Alerta  from '../../utils/alertas';
import NProgress from 'nprogress'; // Importa nprogress
import 'nprogress/nprogress.css'; // Importa el estilo de nprogress
import Notif from '../../utils/notificaciones';
import { get_lista_oficinas } from '../../services/OficinaServices';
import { Oficina } from '../../types/interfaces';
import { initializeTrabajador, Trabajador,TrabajadorErrors,initializeTrabajadorErrors} from '../../interfaces/trabajador.interface';



interface Link {
  path: string;
  name: string;
}
export default defineComponent({
  components: {
    Breadcrumb, ErrorMessage
  },
  setup() {
    const frm_dni = ref(""); // Deshabilitar el botón

    const breadcrumbRoutes = ref<Link[]>([
      
      { path: '/office/trabajador', name: 'Trabajador' },
      { path: '', name: 'Registrar Trabajador' },
    ]);
    const router = useRouter();
    const isUploading = ref(false); // Deshabilitar el botón
    const listaOficinas = ref<Oficina[]>([]);
    
    const trabajadorForm  = ref<Trabajador>(initializeTrabajador());
    const errors          = ref<TrabajadorErrors>(initializeTrabajadorErrors()); 
   
    const ResetFormularioTrabajador = () => {
        trabajadorForm.value = initializeTrabajador();
        errors.value = initializeTrabajadorErrors();
    };
 
    onMounted(async () => {
      cargarOficinas();
    });


    // API RENIEC
    // -------------------------------------------------------------------------------
    const onDniChange = async () => {
      try {
        NProgress.start(); 
        if (frm_dni.value.length == 8) {
            const data = await get_datosDNI(frm_dni.value.toString());
            trabajadorForm.value.username = data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
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

        case 'email':    
          if(trabajadorForm.value.tipouser==='Unidad Orgánica'){
              errors.value.email = '';
          }else{
            errors.value.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? '' : 'El email no es válido';
          }
          break;

        case 'celular':
          if(trabajadorForm.value.tipouser==='Unidad Orgánica'){
              errors.value.celular = '';
          }else{
              errors.value.celular = /^[0-9]+$/.test(value) ? '' : 'El celular debe contener solo números';
          }
          break;
          
        case 'cargo':
          if(trabajadorForm.value.tipouser==='Unidad Orgánica'){
              errors.value.cargo = '';
          }else{
              errors.value.cargo = value ? '' : 'El cargo es obligatorio';
          }
          
          break;
          
        case 'oficina_id':
          errors.value.oficina_id = value ? '' : 'La oficina es obligatoria';
          break;
        
        case 'usuario':
          errors.value.usuario = value ? '' : 'Username obligatorio';
          break;
          
        case 'password':
          errors.value.password = value ? '' : 'Password obligatorio';
          break;
      }
    };
    watch(() => trabajadorForm.value.tipouser, (newVal)    => validateField('tipouser', newVal));
    watch(() => trabajadorForm.value.username, (newVal) => validateField('username', newVal));
    watch(() => trabajadorForm.value.email, (newVal)    => validateField('email', newVal));
    watch(() => trabajadorForm.value.celular, (newVal)  => validateField('celular', newVal));
    watch(() => trabajadorForm.value.cargo, (newVal)    => validateField('cargo', newVal));
    watch(() => trabajadorForm.value.oficina_id, (newVal)   => validateField('oficina_id', newVal));
    watch(() => trabajadorForm.value.rol_id, (newVal) => validateField('rol_id', newVal));
    watch(() => trabajadorForm.value.usuario, (newVal) => validateField('usuario', newVal));
    watch(() => trabajadorForm.value.password, (newVal) => validateField('password', newVal));
    
    const validate = () => {
      Object.keys(trabajadorForm.value).forEach(key => {
        validateField(key, (trabajadorForm.value as any)[key]);
      });
      console.log(errors.value);
      return !Object.values(errors.value).some(error => error);
    };

    //  ------------------------------------------------------

    const guardarTrabajador = async () => {
      if (!validate()) {
        return;
      }

      try {
        NProgress.start();
        const RespuestaJSON = await add_Trabajador(trabajadorForm.value);
        if (RespuestaJSON.success) {
          Notif.Success('Trabajadore registrado con éxito');
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

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/bmp'];
    const file_img = ref<File | null>(null);
    
    const onFileSelected_FotoPerfil = (event: Event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
      if (selectedFile) {
        if (!tiposPermitidos.includes(selectedFile.type)) {
          Notif.Error('Sólo se permiten los formatos: JPG, PNG, BMP');
          file_img.value = null;  
          return;
        }
        file_img.value = selectedFile;
        registrar_FotoPerfil();
      }
    };

    const registrar_FotoPerfil = async () => {
      if (!file_img.value) {
        Notif.Error('Debe cargar una fotografía');
        return;
      }
      const formData = new FormData();
      formData.append('file_fotoperfil', file_img.value);
      try {
        NProgress.start();
        isUploading.value=true;
        //--------
        const RespuestaJSON = await subir_foto(formData);
        if (RespuestaJSON.success) {
          trabajadorForm.value.fotourl = RespuestaJSON.data;
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        NProgress.done(); // Detiene la barra de progreso
        isUploading.value=false;
      }
    };

    // ---------------------------------------

    return {
      isUploading,
      listaOficinas,
      trabajadorForm,
      HOST_URL,
      guardarTrabajador,
      cancelar,
      onDniChange,
      breadcrumbRoutes,
      onFileSelected_FotoPerfil,
      errors,frm_dni
    };
  },
});
</script>


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
