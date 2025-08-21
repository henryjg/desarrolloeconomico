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
                Oficinas / Áreas
              </h4>
            </div>
            <div class="col-5">
              
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
          <div class="row">
            
            <div class="col-md-6">
              
              <div class=" m-2">
                <input type="text" class="form-control mb-2" placeholder="Buscar Oficina..." v-model="searchQuery" />
                  <!-- ---------------------------------- -->
                  <div class="table-responsive b-gray">
                      <!-- Tabla -->
                      <table class="table table-hover table-xs" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th style="width: 5%">#</th>
                            <th style="width: 40%">Nombre de la Oficina</th>
                            <th style="width: 20%">SIGLA</th>
                            <th style="width: 22%">Responsable</th>
                            <th style="width: 5%"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(oficina, index) in filteredOficinas" :key="oficina.id">
                            <td>{{ index + 1 }}</td>
                            <td class="text-wrap">{{ oficina.nombre }}</td>
                            <td>{{ oficina.sigla }}</td>
                            <td>{{ oficina.responsable }}</td>
                            <td>
                                <i class="ti ti-trash f-20 py-0 px-1 btn btn-danger " @click.prevent="deleteOficina(oficina.id)"></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>                   
                  <!-- ---------------------------------- -->
              </div> 
            </div>
            <div class="col-md-6">
              <div class="b-gray m-2">
                <TreeView :offices="offices" />
              </div>
            </div>
          </div>

          

          <br>
          <hr>
          
          
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para agregar Oficina -->
  <div class="modal fade" id="addOficinaModal" tabindex="-1" aria-labelledby="addOficinaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title py-0" id="addOficinaModalLabel">
            <i class="fa fa-plus p-r-15"></i>Agregar Oficina
          </h5>
          <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-1">
          <div class="mb-3">
            <label for="nombreOficina" class="form-label text-dark f-w-600">Nombre de la Oficina</label>
            <input type="text" id="nombreOficina" class="form-control" v-model="oficina.nombre" placeholder="Ingresa el nombre">
            <ErrorMessage :error="errors.nombre" />
          </div>
          <div class="mb-3">
            <label for="nombreOficina" class="form-label text-dark f-w-600">Sigla</label>
            <input type="text" id="nombreOficina" class="form-control" v-model="oficina.sigla" placeholder="Ingresa el nombre">
            <ErrorMessage :error="errors.sigla" />
          </div>
          <div class="mb-3">
            <label for="nombreOficina" class="form-label text-dark f-w-600">Responsable</label>
            <input type="text" id="nombreOficina" class="form-control" v-model="oficina.responsable" placeholder="Ingresa el nombre">
            <ErrorMessage :error="errors.sigla" />
          </div>
          <div class="mb-3">
              <label for="oficinaPadre" class="form-label text-dark f-w-600">Oficina Padre</label>
              <multiselect
                v-model="selectedOficinaPadre"
                :options="listaOficinas"
                :multiple="false"
                :close-on-select="true"
                :clear-on-select="true"
                :preserve-search="true"
                placeholder="Ruta Raíz.."
                label="nombre"
                track-by="id"
                :searchable="true"
              />
          </div>
        </div>
        <div class="modal-footer py-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" @click="registrarOficina">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import Multiselect from 'vue-multiselect';
import { get_lista_oficinas, add_oficina, del_oficina, get_lista_oficinasArbol } from '../../../services/OficinaServices';
import Breadcrumb from '../../../components/breadcrumb.vue';
import TreeView from '../../../components/tree_view.vue';

import Alerta from '../../../utils/alertas';
import { Oficina } from '../../../types/interfaces';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import { Modal } from 'bootstrap';
import Notif from '../../../utils/notificaciones';
import NProgress from 'nprogress'; // 

export interface Link {
  path: string;
  name: string;
}

export interface OfficeNode {
  ofi_id: number;
  ofi_nombre: string;
  ofi_padre_id: number | null;
  hijas: OfficeNode[];
}

export default {
  components: {
    Breadcrumb,
    ErrorMessage,
    TreeView,
    Multiselect
  },
  setup() {
    const breadcrumbRoutes = ref<Link[]>([
      { path: '/home', name: 'Home' },
      { path: '/oficinas', name: 'Oficinas' },
    ]);

    const listaOficinas = ref<Oficina[]>([]);
    const selectedOficinaPadre = ref<Oficina|null>(null);
    const searchQuery = ref('');
    const oficina = ref<Oficina>({
      id: '',
      nombre: '',
      sigla:'',
      responsable:'',
      padre_id: '',
    });

    const errors = ref({
      nombre: '',
      sigla:''
    });



    const offices = ref<OfficeNode[]>([]);

    onMounted(async () => {
      await cargarOficinas();
      await cargarArbol();
    });

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

    
    const cargarArbol = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await get_lista_oficinasArbol();
        if(RespuestaJSON.success){
          offices.value = RespuestaJSON.data;
        }else{
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
      }finally {
        NProgress.done();
      }
    };

    const getOficinaNombre = (id: string) => {
      const oficina = listaOficinas.value.find(of => of.id === id);
      return oficina ? oficina.nombre : 'Ninguna';
    };

    const validateField = (field: string, value: any) => {
      switch (field) {
        case 'nombre':
          errors.value.nombre = value ? '' : '* El nombre es obligatorio';
          break;
        case 'sigla':
          errors.value.sigla = value ? '' : '* La sigla es obligatoria';
          break;
      }
    };

    const validate = () => {
      validateField('nombre', oficina.value.nombre);
        return !Object.values(errors.value).some(error => error);
    };

    const registrarOficina = async () => {
      if (!validate()) return;
      NProgress.start();
      try {
        const formData = new FormData();
        formData.append('nombre', oficina.value.nombre);
        formData.append('responsable', oficina.value.responsable);
        formData.append('sigla', oficina.value.sigla);
          // Sincronizar el valor seleccionado del multiselect con el modelo
          if(selectedOficinaPadre.value && selectedOficinaPadre.value.id!=="" && selectedOficinaPadre.value.id!==null){
            formData.append('padre_id', selectedOficinaPadre.value.id);
          }
        const response = await add_oficina(formData);
        if (response.success) {
          Notif.Success('La oficina ha sido guardada con éxito');
          await cargarOficinas();
          await cargarArbol();
          resetFormModal();
          closeModal();
        } else {
          Alerta.Error('Error', response.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al agregar la oficina.');
      }finally {
        NProgress.done();
      }
    };
    const resetFormModal =() =>{
      const oficina = {
        id: '',
        nombre: '',
        padre_id: '',
      };
    }

    const deleteOficina = async (id: string) => {
      const isConfirmado = await Alerta.Confirmacion('¿Estás seguro de eliminar esta oficina?', 'Eliminar');
      if (isConfirmado) {
        try {
          const response = await del_oficina(id);
          if (response.success) {
            Alerta.Sucessfull('Completado','La oficina ha sido eliminada con éxito');
            await cargarOficinas();
          } else {
            Alerta.Error('Error', response.message);
          }
        } catch (error) {
          Alerta.Error('Error', 'Hubo un error al eliminar la oficina.');
        }
      }
    };

    const openModal = () => {
      const modalElement = document.getElementById('addOficinaModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    const closeModal = () => {
      const modalElement = document.getElementById('addOficinaModal');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };

    const filteredOficinas = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return listaOficinas.value.filter(oficina =>
        oficina.nombre.toLowerCase().includes(query)
      );
    });

    return {
      breadcrumbRoutes,
      listaOficinas,
      offices,
      searchQuery,
      filteredOficinas,
      oficina,
      errors,
      registrarOficina,
      deleteOficina,
      openModal,
      closeModal,
      getOficinaNombre,
      selectedOficinaPadre
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.text-primary {
  color: #007bff !important;
}
</style>
