<template>

    <div class="row">
      <div class="col-md-4">
            <div class="card">
                <div class="card-body py-2 px-1">
                    <div class="mx-2 p-4 upload-area" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
                        <img v-if="imageUrl" :src="imageUrl" alt="Image Preview" class="img-fluid border-2 rounded-2 p-1" />
                        <div v-else class="upload-placeholder">
                            <i class="ti ti-camera f-40"></i>
                            <p>Arrastra aquí la  <span class="browse-link">imágen a subir</span></p>
                        </div>
                        <input type="file" @change="onFileChange" ref="fileInput" class="file-input" />
                    </div>
                </div>
                <div class="card-footer px-2 py-0">
                    <div v-if="file" class="uploaded-files">
                        <p>{{ file.name }}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <button type="button" @click="registrarFoto" class="btn btn-secondary d-inline-flex">
                      <i class="ph-duotone ph-upload m-r-10"></i> Subir</button>
                </div>
            </div>
        </div>
        <div class="col-md-8">

            <div class="row">
                <!-- alerta de vacios -->
                <div v-if="ListaFotos.length==0" class="alert alert-warning d-flex align-items-center" role="alert">
                  <i class="ph-duotone ph-warning f-24 p-r-10"></i> No se han agregado fotografías (Tamaño rectangular)</div>
               
                <div v-for="(FotoActual, index) in ListaFotos" :key="FotoActual.id"  class="col-md-4">
                    <div class="card product-card">
                        <div class="card-img-top">                
                                <div class="rounded-2 overflow-hidden m-auto align-items-center align-middle" style="height: 100px">
                                    <img class="align-top img-fluid "  alt="User image"
                                            :src="FotoActual.url ? HOST_URL+FotoActual.url : '/src/assets/images/avatar.png'">
                                </div>
                        </div>
                        <div class="card-body m-0 p-1">
                            <div class="d-flex">
                                <div class="flex-shrink-1">
                                    <a href="#" class="avtar avtar-s btn-link-secondary btn-prod-card" data-bs-toggle="offcanvas" data-bs-target="#productOffcanvas">
                                        <i class="ph-duotone ph-eye f-18"></i>
                                    </a>
                                </div>
                                <div class="flex-shrink-1 ms-1">
                                    <div class="d-grid">
                                        <button @click="delete_Foto(FotoActual.id)"  type="button"
                                        class="avtar avtar-s btn-link-danger btn-prod-card btn-light-danger"><i class=" feather icon-trash-2"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



           
        </div>
    </div>
    
</template>
  
  <script lang="ts">

  import { ref, computed, onMounted, PropType, watch } from 'vue';
  import Alerta from '../utils/alertas';
  import NProgress from 'nprogress'; // Importa nprogress  
  import { HOST_URL } from '../config';
  import { Foto } from '../types/interfaces';
  import { get_fotos, del_foto, add_FotoActual } from '../services/fotosService';
import Notif from '../utils/notificaciones';

  export default {
    name: 'Fotos',
    setup() {
        const file = ref<File | null>(null);
        const imageUrl = ref<string | null>(null);
        const fileInput = ref<HTMLInputElement | null>(null);

        // -----------------

        const ListaFotos = ref<Foto[]>([]);
        const FotoActual = ref<Foto>({
              id: 0,
              url: ''
        });

        onMounted(async () => {
          Listar_Fotos();
        });

        // ----------------------------------------------------------------------
        const Listar_Fotos = async () => {
              try {
                  ListaFotos.value = [];
                  NProgress.start(); // Inicia la barra de progreso
                  //-------------------------------------------------------        
                  const RespuestaJSON = await get_fotos();
                  if(RespuestaJSON.success){
                      ListaFotos.value = RespuestaJSON.data;
                  }else{
                       ListaFotos.value = [];
                  }
              } catch (error) {
                  Notif.Error('No se cargaron los datos');
              }finally {
                  NProgress.done(); // Detiene la barra de progreso
              }
        }
      
        // ----------------------------------------------------------------------
        const delete_Foto = async (id: number) => {
          const isConfirmado = await Alerta.Confirmacion(
            '¿Desea eliminar este Item?',
            'Esta acción no se puede deshacer.'
          );
          if (isConfirmado) {
              const RespuestaJSON = await del_foto(id);
              if(RespuestaJSON.success){
                ListaFotos.value = ListaFotos.value.filter(item => item.id !== id);
                Notif.Success(RespuestaJSON.message);
              }else{
                Notif.Error(RespuestaJSON.message);
              }
          }
        };
        
        // -----------------------------------------------------------------------
        const triggerFileInput = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };

        const onFileChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const fileType = target.files[0].type;
                const allowedTypes = ['image/jpeg','image/jpg', 'image/png', 'image/bmp'];
                
                if (!allowedTypes.includes(fileType)) {
                    Notif.Error('Formato de archivo no permitido.\n Formatos permitidos:\n *.jpg - *.jpeg - *.png - *.bmp.');
                    return;
                }
                file.value = target.files[0];
                imageUrl.value = URL.createObjectURL(file.value);
            }
        };

        const handleDrop = (event: DragEvent) => {
            event.preventDefault();
            if (event.dataTransfer && event.dataTransfer.files.length > 0) {
                file.value = event.dataTransfer.files[0];
                imageUrl.value = URL.createObjectURL(file.value);
            }
        };

        const resetFileInput = () => {
            file.value = null;
            imageUrl.value = null;
            if (fileInput.value) {
                fileInput.value.value = '';
            }
        };
    
        const registrarFoto = async () => {
              if (!file.value) {
                   Notif.Error('Debe cargar una fotografía');
                  return;
              }
              const formData = new FormData();
              formData.append('file', file.value);
              try {
                NProgress.start();
                //--------
                const RespuestaJSON = await add_FotoActual(formData);
                if(RespuestaJSON.success){
                    Listar_Fotos();
                    Notif.Success(RespuestaJSON.message);
                    resetFileInput();
                }else{
                    Notif.Error(RespuestaJSON.message);
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }finally {
                NProgress.done(); // Detiene la barra de progreso
              }
        };
    
        return {
          HOST_URL,
          file,
          imageUrl,
          fileInput,
          onFileChange,
          registrarFoto,
          triggerFileInput,
          handleDrop,
          ListaFotos,
          FotoActual,
          delete_Foto
         };
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .upload-area {
    border: 2px dashed #ddd;
    cursor: pointer;
  }
  
  .upload-area img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .upload-placeholder {
    text-align: center;
    color: #aaa;
  }
  
  .browse-link {
    color: #007bff;
    cursor: pointer;
  }
  
  .file-input {
    display: none;
  }
  
  .register-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .register-button:hover {
    background-color: #0056b3;
  }
  
  .uploaded-files {
    margin-top: 20px;
  }
  
  .uploaded-files h3 {
    margin-bottom: 10px;
  }
  
  .uploaded-files ul {
    list-style-type: none;
    padding: 0;
  }
  
  .uploaded-files li {
    margin-bottom: 5px;
  }
  </style>
  