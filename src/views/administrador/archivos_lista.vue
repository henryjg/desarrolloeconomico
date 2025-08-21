<template>
  <!-- [ breadcrumb ] start -->
  <Breadcrumb :links="breadcrumbRoutes" />
  <!-- [ breadcrumb ] end -->

  <div class="row">
    <div class="col-12">
      <div class="card table-card">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col-5 mt-2">
              <h4 class="text-primary">
                <i class="ph-duotone ph-house-line f-26"></i>
                Lista de Archivos
              </h4>
            </div>
            <div class="col-5">
              <input type="text" class="form-control" placeholder="Buscar Archivo..." v-model="searchQuery" />
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-primary float-end" @click="openModal">
                <i class="fa fa-plus-circle"></i>
                Agregar
              </button>
            </div>
          </div>
        </div>
        <div class="card-body pt-1">
          <div class="table-responsive">
            <table class="table table-hover table-sm" id="pc-dt-simple">
              <thead>
                <tr>
                  <th style="width: 5%">#</th>
                  <th style="width: 45%">Nombre de Archivo</th>
                  <th style="width: 10%">Tipo</th>
                  <th style="width: 10%">Descripción</th>
                  <th style="width: 20%">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(archivo, index) in filteredArchivos" :key="archivo.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ archivo.nombre }}</td>
                  <td>{{ archivo.tipo }}</td>
                  <td>{{ archivo.descripcion }}</td>
                  <td>
                    <a href="#" @click.prevent="deleteArchivo(archivo.id)" class="avtar avtar-xs btn btn-danger">
                      <i class="ti ti-trash f-20"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para agregar Archivo -->
  <div class="modal fade" id="addArchivoModal" tabindex="-1" aria-labelledby="addArchivoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title py-0" id="addArchivoModalLabel">
            <i class="fa fa-plus p-r-15"></i>AGREGAR ARCHIVO
          </h5>
          <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-1">
          <div class="mb-3">
            <label for="nombre" class="form-label text-dark f-w-600">Nombre del Archivo</label>
            <input type="text" id="nombre" class="form-control" v-model="archivo.nombre" placeholder="Ingresa el nombre">
            <ErrorMessage :error="errors.nombre" />
          </div>
          <div class="mb-3">
            <label for="tipo" class="form-label text-dark f-w-600">Tipo</label>
            <select id="tipo" class="form-select" v-model="archivo.tipo">
              <option value="normativa">Normativa</option>
              <option value="norma nacional">Norma Nacional</option>
              <option value="norma distrital">Norma Distrital</option>
              <option value="zonificacion">Zonificación</option>
              <option value="formulario">Formulario</option>
            </select>
            <ErrorMessage :error="errors.tipo" />
          </div>
          <div class="mb-3">
            <label for="descripcion" class="form-label text-dark f-w-600">Descripción</label>
            <input type="text" id="descripcion" class="form-control" v-model="archivo.descripcion" placeholder="Ingresa una descripción">
            <ErrorMessage :error="errors.descripcion" />
          </div>
          <div class="mb-3">
            <label for="file" class="form-label text-dark f-w-600">Archivo</label>
            <input type="file" id="file" class="form-control" @change="onFileSelected" required />
            <ErrorMessage :error="errors.file" />
          </div>
          <div class="mb-3">
            <label for="fechasubida" class="form-label text-dark f-w-600">Fecha de Subida</label>
            <input type="date" id="fechasubida" class="form-control" v-model="archivo.fechasubida" placeholder="Ingresa la fecha de subida">
            <ErrorMessage :error="errors.fechasubida" />
          </div>
        </div>
        <div class="modal-footer py-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="registrarArchivo">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import Breadcrumb from '../../components/breadcrumb.vue';
import Alerta from '../../utils/alertas';
import { Archivos } from '../../types/interfaces';
import ErrorMessage from '../../components/ErrorMessage.vue';
import { Modal } from 'bootstrap';
import Notif from '../../utils/notificaciones';

export default {
  components: {
    Breadcrumb,
    ErrorMessage,
  },
  setup() {
    const breadcrumbRoutes = ref([
      { path: '/office', name: 'Office' },
      { path: '/office/archivos', name: 'Archivos' },
    ]);

    const listaArchivos = ref<Archivos[]>([]);
    const searchQuery = ref('');
    const archivo = ref({
      id: 0,
      tipo: '',
      nombre: '',
      descripcion: '',
      fechasubida: '',
      file: null as File | null // Asegúrate de que este campo almacena un archivo
    });
    const errors = ref({
      nombre: '',
      tipo: '',
      descripcion: '',
      fechasubida: '',
      file: ''
    });

    onMounted(async () => {
      await cargarArchivos();
    });

    const cargarArchivos = async () => {
      // try {
      //   const respuesta = await get_lista_archivos();
      //   listaArchivos.value = respuesta.data;
      // } catch (error) {
      //   Alerta.Error('Error', 'No se pudieron cargar los archivos.');
      // }
    };

    const validateField = (field: string, value: any) => {
      switch (field) {
        case 'nombre':
          errors.value.nombre = value ? '' : '* El nombre es obligatorio';
          break;
        case 'tipo':
          errors.value.tipo = value ? '' : '* El tipo es obligatorio';
          break;
        case 'descripcion':
          errors.value.descripcion = value ? '' : '* La descripción es obligatoria';
          break;
        case 'fechasubida':
          errors.value.fechasubida = value ? '' : '* La fecha de subida es obligatoria';
          break;
        case 'file':
          errors.value.file = value ? '' : '* El archivo es obligatorio';
          break;
      }
    };





   //  ------------------------------------------------------
   const file = ref<File | null>(null);
    const onFileSelected = (event: Event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
      if (selectedFile) {
        file.value = selectedFile;
        // O bien subir automáticamente, o el usuario puede presionar el botón:
        
      }
    };

const registrarArchivo = async () => {
    if (!file.value) {
        Alerta.Error('Error', 'El archivo es obligatorio'); // Mensaje de error si no hay archivo
        return; // Detener la ejecución si no hay archivo
    }

    const formData = new FormData();
    formData.append('file', file.value); // Asegúrate de que 'file' no sea null
    formData.append('tipo', archivo.value.tipo);
    formData.append('nombre', archivo.value.nombre);
    formData.append('descripcion', archivo.value.descripcion);
    formData.append('fechasubida', archivo.value.fechasubida);

    try {
        // const response = await add_archivos(formData); // Envía el FormData a la API
        // if (response.success) {
        //     Notif.Success('El archivo ha sido guardado con éxito'); // Notificación de éxito
        //     await cargarArchivos(); // Recargar la lista de archivos
        //     closeModal(); // Cerrar el modal
        // } else {
        //     Alerta.Error('Error', response.message); // Manejo de errores
        // }
    } catch (error) {
        Alerta.Error('Error', 'Hubo un error al agregar el archivo.'); // Manejo de errores
    }
};


    const deleteArchivo = async (id: number) => {
      const isConfirmado = await Alerta.Confirmacion('¿Estás seguro de eliminar este archivo?', 'a');
      if (isConfirmado) {
        try {
          // const response = await del_archivo(id);
          // if (response.success) {
          //   Notif.Success('El archivo ha sido eliminado con éxito');
          //   await cargarArchivos();
          // } else {
          //   Alerta.Error('Error', response.message);
          // }
        } catch (error) {
          Alerta.Error('Error', 'Hubo un error al eliminar el archivo.');
        }
      }
    };

    const openModal = () => {
      const modalElement = document.getElementById('addArchivoModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    const closeModal = () => {
      const modalElement = document.getElementById('addArchivoModal');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };

    const filteredArchivos = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return listaArchivos.value?.filter((archivo: Archivos) => {
        return Object.values(archivo).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        });
      }) ?? [];
    });

    return {
      breadcrumbRoutes,
      listaArchivos,
      onFileSelected,
      searchQuery,
      filteredArchivos,
      archivo,
      errors,
      registrarArchivo,
      deleteArchivo,
      openModal,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-primary {
  color: #007bff !important;
}
</style>
