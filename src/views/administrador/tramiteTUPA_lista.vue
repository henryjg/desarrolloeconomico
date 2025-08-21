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
                Lista de Trámites
              </h4>
            </div>
            <div class="col-5">
              <input type="text" class="form-control" placeholder="Buscar Trámite..." v-model="searchQuery" />
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-primary float-end" @click="openModal()">
                <i class="fa fa-plus-circle"></i>
                Agregar
              </button>
            </div>
          </div>
        </div>
        <div class="card-body pt-1">
          <div class="table-responsive">
            <!-- Tabla -->
            <table class="table table-hover table-xs" id="pc-dt-simple">
              <thead>
                <tr>
                  <th Style="width: 2%" class="px-3">#</th>
                  <th Style="width: 45%">NOMBRE DEL TRÁMITE TUPA</th>
                  <th Style="width: 10%">CATEGORÍA</th>
                  <th Style="width: 10%">CÓDIGO</th>
                  <th Style="width: 10%">DERECHO</th>
                  <th Style="width: 10%">PLAZO</th>
                  <th Style="width: 10%">Acciones</th>
                </tr>
              </thead>
              <tbody>
                
                <tr v-for="(tramite, index) in filteredTramites" :key="tramite.id">
                  <td class="px-3">{{ index + 1 }}</td>
                  <td class="text-wrap">{{ tramite.nombretramite }}</td>
                  <td>{{ tramite.categoria }}</td>
                  <td>{{ tramite.codigo }}</td>
                  <td>{{ tramite.monto }}</td>
                  <td>{{ tramite.plazo }} días</td>
                  <td>
                    <router-link  :to="{ name: 'Editartramite', params: { idtra: tramite.id } }" class="avtar avtar-xs btn btn-primary mx-1">
                      <i class="ti ti-edit f-20"></i>
                    </router-link>                    
                    <a href="#" @click.prevent="deleteTramite(tramite.id)" class="avtar avtar-xs btn btn-danger">
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

  <!-- Modal para agregar o editar Trámite -->
  <div class="modal modal-lg fade ui-border-dialogo" id="addTramiteModal" tabindex="-1" aria-labelledby="addTramiteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header py-2 ">
          <h5 class="modal-title py-0 f-14 f-w-600 " id="addTramiteModalLabel">
            <i class="fa fa-plus p-r-15"></i>NUEVO TRÁMITE
          </h5>
          <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-1 px-4">
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
          
        </div>
        <div class="modal-footer py-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" @click="registrarTramite">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { get_lista_tramites, add_tramite, upd_tramite, del_tramite } from '../../services/TramiteServicios';
import Breadcrumb from '../../components/breadcrumb.vue';
import Alerta from '../../utils/alertas';
import { Tramite } from '../../types/interfaces';
import ErrorMessage from '../../components/ErrorMessage.vue';
import { Modal } from 'bootstrap';
import Notif from '../../utils/notificaciones';

interface Link {
  path: string;
  name: string;
}

export default {
  components: {
    Breadcrumb,
    ErrorMessage,
  },
  setup() {
    const breadcrumbRoutes = ref<Link[]>([
      { path: '', name: 'Home' },
      { path: '/office/tramite', name: 'Trámites' },
    ]);

    const listaTramites = ref<Tramite[]>([]);
    const searchQuery = ref('');
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
    let modalInstance: Modal;

    onMounted(async () => {
      await cargarTramites();
    });

    const cargarTramites = async () => {
      try {
        const respuesta = await get_lista_tramites();
        listaTramites.value = respuesta.data;
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar los trámites.');
      }
    };

    const validateField = (field: string, value: any) => {
      switch (field) {
        case 'categoria':
          errors.value.categoria = value ? '' : 'Categoría de trámite obligatoria';
          break;
        case 'nombretramite':
          errors.value.nombretramite = value ? '' : 'El nombre del trámite es obligatorio';
          break;
        case 'descripcion':
          errors.value.descripcion = value ? '' : 'Descripción Obligatoria';
          break;
        case 'codigo':
          errors.value.codigo = value ? '' : 'El código es obligatorio';
          break;
        case 'tipomonto':
          errors.value.tipomonto = value  ? '' : 'Tipo de monto Obligatorio';
          break;
        case 'monto':
          errors.value.monto = value >= 0 ? '' : 'El monto debe ser mayor a 0';
          break;
        case 'plazo':
          errors.value.plazo = value > 0 ? '' : 'El plazo debe ser mayor a 0';
          break;
        case 'duracion':
          errors.value.duracion = value > 0 ? '' : 'La duración debe ser mayor que 0';
          break;
      }
    };

    watch(() => tramite.value.categoria, (newVal) => validateField('categoria', newVal));
    watch(() => tramite.value.nombretramite, (newVal) => validateField('nombretramite', newVal));
    watch(() => tramite.value.codigo, (newVal) => validateField('codigo', newVal));
    watch(() => tramite.value.descripcion, (newVal) => validateField('descripcion', newVal));
    watch(() => tramite.value.tipomonto, (newVal) => validateField('tipomonto', newVal));
    watch(() => tramite.value.monto, (newVal) => validateField('monto', newVal));
    watch(() => tramite.value.plazo, (newVal) => validateField('plazo', newVal));
    watch(() => tramite.value.duracion, (newVal) => validateField('duracion', newVal));

    const validate = () => {
      Object.keys(tramite.value).forEach((key) => {
        validateField(key, (tramite.value as any)[key]);
      });
      console.log(errors.value);  // Add this line to debug validation issues
      return !Object.values(errors.value).some((error) => error);
    };

    const registrarTramite = async () => {
      if (!validate()) return;

      try {
        const response = await add_tramite(tramite.value);
        if (response.success) {
          Alerta.Sucessfull('Completado', 'Trámite agregado con éxito');
          await cargarTramites();
          closeModal();
        } else {
          Alerta.Error('Error', response.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al guardar el trámite.');
      }
    };

    const deleteTramite = async (idtra: string) => {
      const isConfirmado = await Alerta.Confirmacion('¿Estás seguro de eliminar este trámite?','Confirmar');
      if (isConfirmado) {
        try {
          const response = await del_tramite(idtra);
          if (response.success) {
            Notif.Success('Trámite eliminado con éxito');
            await cargarTramites();
          } else {
            Alerta.Error('Error', response.message);
          }
        } catch (error) {
          Alerta.Error('Error', 'Hubo un error al eliminar el trámite.');
        }
      }
    };

    const openModal = () => {
      const modalElement = document.getElementById('addTramiteModal');
      if (modalElement) {
        modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
    };

    const closeModal = () => {
      if (modalInstance) {
        modalInstance.hide();
        resetForm();
      }
    };

    const resetForm = () => {
      tramite.value = {
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
      };
    };

    const filteredTramites = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return listaTramites.value.filter((tramite: Tramite) => {
        return (
          tramite.nombretramite.toLowerCase().includes(query) ||
          tramite.codigo.toLowerCase().includes(query)
        );
      });
    });

    return {
      breadcrumbRoutes,
      listaTramites,
      searchQuery,
      filteredTramites,
      tramite,
      errors,
      registrarTramite,
      deleteTramite,
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
