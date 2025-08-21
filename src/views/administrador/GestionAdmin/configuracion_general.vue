<template>
  <div class="row">
    <div class="col-md-10">
      <h3>Datos de la Página</h3>
      <hr class="mb-4 my-1">

      <!-- Nombre Corto Empresa -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Nombre Corto Empresa
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.nombreCorto" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('nombreCorto', EstaEmpresa.nombreCorto)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Razón Social -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Razón Social
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.razonsocial" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('razonsocial', EstaEmpresa.razonsocial)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RUC -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            RUC
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.ruc" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('ruc', EstaEmpresa.ruc)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Título de la Página -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Título de la Página
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.titulopagina" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('titulopagina', EstaEmpresa.titulopagina)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

     

      <!-- Nosotros -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Nosotros
          </label>
          <div class="col-md-9">  
            <div class="input-group">
              <textarea type="text" v-model="EstaEmpresa.nosotros" class="form-control" rows="8"></textarea>
              <button class="btn btn-light b-gray" @click="UpdCampo('nosotros', EstaEmpresa.nosotros)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
         
        </div>
      </div>

      <!-- Celular 2 -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Celular
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.celular" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('celular', EstaEmpresa.celular)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Dirección -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Dirección
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.direccion" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('direccion', EstaEmpresa.direccion)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Email
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="email" v-model="EstaEmpresa.email" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('email', EstaEmpresa.email)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contacto -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Contacto
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.contacto" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('contacto', EstaEmpresa.contacto)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Facebook -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Facebook
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.facebook" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('facebook', EstaEmpresa.facebook)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Instagram -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 align-content-top pt-2">
            Instagram
          </label>
          <div class="col-md-9">
            <div class="input-group">
              <input type="text" v-model="EstaEmpresa.instragram" class="form-control" />
              <button class="btn btn-light b-gray" @click="UpdCampo('instragram', EstaEmpresa.instragram)">
                <i class="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

     

       <!-- Reglamento URL -->
      <div class="mb-2">
        <div class="row">
          <label class="col-md-3 form-label text-primary align-content-top pt-2">Reglamento PDF</label>
          <div class="col-md-9">
            <a v-if="EstaEmpresa.reglamentoUrl!=''" :href="HOST_URL+EstaEmpresa.reglamentoUrl" target="_blank"> 
              <button class="btn btn-danger px-5 mx-1 my-2 mt-2">
                <i class="fa fa-file-pdf"></i>  Descargar Reglamento
              </button>
            </a>
            <div class="file-input-wrapper w-100">
              <input type="file" @change="onFileSelected" accept=".pdf" class="file-input">
              <div>
                <div class="custom-file-label">
                  <div v-if="EstaEmpresa.reglamentoUrl" class="f-12 f-w-600">Archivo Cargado</div>
                  <h5 v-else class="pt-3 text-dark">Seleccione un archivo</h5>
                </div>
              </div>
            </div>
            <!-- Botón para subir manualmente si es necesario -->
            <button class="btn btn-primary mt-2" @click="subir_reglamento" :disabled="isUploading">
              <i class="fa fa-upload"></i> {{ isUploading ? 'Subiendo...' : 'Subir PDF' }}
            </button>
          </div>
        </div>
      </div>

      <h3 class="mt-5">Slider 1</h3>
      <hr>
      <panelfoto/>

      <h3 class="mt-5">Slider 2</h3>
      <hr>
      <panelRuta/>

      <!-- <h3 class="mt-5">Marcas</h3>
      <hr> -->
      

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import panelfoto from '../../../components/form_registrarFotos.vue';
import panelRuta from '../../../components/form_registrarRutas.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import { get_datosEmpresa, Upd_Campo,upd_reglamento } from '../../../services/webServices';
import Notif from '../../../utils/notificaciones';
import NProgress from 'nprogress';
import { Empresa } from '../../../types/interfaces'; // Importa la interfaz
import { HOST_URL } from '../../../config';

export default defineComponent({
  components: { ErrorMessage,panelfoto,panelRuta},
  setup() {
    const isUploading = ref(false); // Deshabilitar el botón

    const EstaEmpresa = ref<Empresa>({
      id: '',
      nombreCorto: '',
      razonsocial: '',
      ruc: '',
      titulopagina: '',
      slogan: '',
      nosotros: '',
      mision: '',
      vision: '',
      valores: '',
      fechalimite: '',
      celular: '',
      celular2: '',
      direccion: '',
      email: '',
      contacto: '',
      metatag: '',
      facebook: '',
      instragram: '',
      youtube: '',
      pixel: '',
      reglamentoUrl: '',
      imagendestacadaUrl: '',
    });

    const errors = ref();

    onMounted(async () => {
      await ListarCampos();
    });

    const ListarCampos = async () => {
      try {
        NProgress.start();
        const RespuestaJSON = await get_datosEmpresa();
        if (RespuestaJSON.success) {
          EstaEmpresa.value = RespuestaJSON.data;
          Notif.Success(RespuestaJSON.message);
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        Notif.Error('Error de Servidor: No se cargaron los datos');
      } finally {
        NProgress.done(); // Detiene la barra de progreso
      }
    };

    const UpdCampo = async (campo: string, valor: string) => {
      try {
        NProgress.start();
        const RespuestaJSON = await Upd_Campo(campo, valor);
        if (RespuestaJSON.success) {
          Notif.Success(RespuestaJSON.message);
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error guardando trabajador:', error);
        Notif.Error('Error de Servidor: No se cargaron los datos');
      } finally {
        NProgress.done(); // Detiene la barra de progreso
      }
    };

    //  ------------------------------------------------------
    const file = ref<File | null>(null);
    const onFileSelected = (event: Event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
      if (selectedFile) {
        file.value = selectedFile;
        // O bien subir automáticamente, o el usuario puede presionar el botón:
        subir_reglamento();
      }
    };

    const subir_reglamento = async () => {
      if (!file.value) {
        Notif.Error('Debe cargar un archivo PDF');
        return;
      }

      const formData = new FormData();
      formData.append('file', file.value);

      try {
        NProgress.start();
        isUploading.value = true; // Deshabilitar el botón

        // Aquí se llama a la API para subir el reglamento
        const RespuestaJSON = await upd_reglamento(formData);
        if (RespuestaJSON.success) {
          ListarCampos();
          EstaEmpresa.value.reglamentoUrl = RespuestaJSON.data; // Asigna la URL del PDF subido
          Notif.Success('Archivo subido correctamente');
        } else {
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error subiendo archivo:', error);
        Notif.Error('Ocurrió un error durante la subida');
      } finally {
        NProgress.done(); // Detener la barra de progreso
        isUploading.value = false; // Habilitar el botón nuevamente
      }
    };

    return {
      errors,isUploading,
      EstaEmpresa,
      UpdCampo,
      onFileSelected,subir_reglamento,HOST_URL
    };
  }
});
</script>

<style scoped>
.image-container {
  width: 100%;
  height: auto;
  padding-bottom: 75%;
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
  object-fit: cover;
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

.input-group button {
  visibility: hidden;
}

.input-group input:focus + button, textarea:focus + button{
  visibility: visible;
}

.input-group button:hover {
  visibility: visible;
}

.input-group button:active {
  visibility: visible;
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
