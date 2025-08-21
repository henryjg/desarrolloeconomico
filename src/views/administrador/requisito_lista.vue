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
                Lista de Requisitos
              </h4>
            </div>
            <div class="col-5">
              <input type="text" class="form-control" placeholder="Buscar Requisito..." v-model="searchQuery" />
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
            <!-- Tabla -->
            <table class="table table-hover table-sm" id="pc-dt-simple">
              <thead>
                <tr>
                  <th Style="width: 5%">#</th>
                  <th Style="width: 60%">NOMBRE DE REQUISITO</th>
                  <th Style="width: 10%">OBLIGATORIO</th>
                  <th Style="width: 10%">¿ES UN FORMATO?</th>
                  <th Style="width: 10%">PDF</th>
                  <th Style="width: 5%">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(requisito, index) in filteredRequisitos" :key="requisito.idreq">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div class="d-inline-block align-middle">
                      <div class="d-inline-block text-wrap">
                        <p class="m-b-0 text-dark">{{ requisito.reqnombre }}</p>
                      </div>
                    </div>
                  </td>
                  <td>{{ requisito.esobligatorio === true ? 'Sí' : 'No' }}</td>
                  <td>{{ requisito.esformato === true ? 'Formato PDF' : 'NO' }}</td>
                  <td v-if="requisito.formatopdf!==''">
                      <a :href="HOST_URL + requisito.formatopdf" target="_blank">
                          <img src="../../assets/images/pdf.png" class="img-fluid wid-40">
                      </a>
                  </td>
                  <td v-else>-</td>
                  <td>
                      <a href="#" @click.prevent="deleteRequisito(requisito.idreq)" class="avtar avtar-xs btn btn-danger">
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

  <!-- Modal para agregar Requisito -->
  <div class="modal fade" id="addRequisitoModal" tabindex="-1" aria-labelledby="addRequisitoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title py-0" id="addRequisitoModalLabel">
            <i class="fa fa-plus p-r-15"></i>AGREGAR REQUISITO
          </h5>
          <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-1">
          <div class="mb-3">
            <label for="reqnombre" class="form-label text-dark f-w-600">Nombre del Requisito</label>
            <input type="text" id="reqnombre" class="form-control" v-model="requisito.reqnombre" placeholder="Ingresa el nombre">
            <ErrorMessage :error="errors.reqnombre" />
          </div>
          <div class="mb-3">
            <label for="esobligatorio" class="form-label text-dark f-w-600">¿Es Obligatorio?</label>
            <select id="esobligatorio" class="form-select" 
                    v-model="requisito.esobligatorio">
              <option :value="true">SI</option>
              <option :value="false">NO</option>
            </select>
            <ErrorMessage :error="errors.esobligatorio" />
          </div>
          <div class="mb-3">
            <label for="esformato" class="form-label text-dark f-w-600">¿Es documento Adjunto?</label>
            <select id="esformato" class="form-select" v-model="requisito.esformato">
              <option :value="true">SI</option>
              <option :value="false">NO</option>
            </select>
            <ErrorMessage :error="errors.esformato" />
          </div>
          <div class="mb-3" v-if="requisito.esformato">
            <label for="reqarchivo" class="form-label text-dark f-w-600">Formato Adjunto</label>
            <!-- VINCULAR EL ARCHIVO AL V-MODEL-->
            <input type="file" id="reqarchivo" class="form-control" @change="onFileChange" />
          </div>
        </div>
        <div class="modal-footer py-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" @click="registrarRequisito">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import { get_lista_requisitos, add_requisito, del_requisito } from '../../services/RequisitoServices';
import Breadcrumb from '../../components/breadcrumb.vue';
import Alerta from '../../utils/alertas';

import ErrorMessage from '../../components/ErrorMessage.vue';
import { Modal } from 'bootstrap';
import Notif from '../../utils/notificaciones';
import { HOST_URL } from '../../config';
import { Requisito } from '../../interfaces/requisitos.interface';

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
      { path: '/home', name: 'Home' },
      { path: '/requisitos', name: 'Requisitos' },
    ]);


    const archivoPDF = ref<File | null>(null);

    const listaRequisitos = ref<Requisito[]>([]);
    const searchQuery = ref('');
    const requisito = ref<Requisito>({
      idreq: '',
      reqnombre: '',
      esobligatorio: false,
      esformato: false,
      formatopdf: ''
    });
    const errors = ref({
      reqnombre: '',
      esobligatorio: '',
      esformato: '',
    });

    onMounted(async () => {
      await cargarRequisitos();
    });

    const cargarRequisitos = async () => {
      try {
        const respuesta = await get_lista_requisitos();
        listaRequisitos.value = respuesta.data;
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar los requisitos.');
      }
    };

    const validateField = (field: string, value: any) => {
      switch (field) {
        case 'reqnombre':
          errors.value.reqnombre = value ? '' : '* El nombre es obligatorio';
          break;
       
      }
    };

    const onFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        archivoPDF.value = target.files[0];
      }
    };

    const validate = () => {
      Object.keys(requisito.value).forEach(key => {
        validateField(key, (requisito.value as any)[key]);
      });
      return !Object.values(errors.value).some(error => error);
    };

    const registrarRequisito = async () => {
      if (!validate()) return;
      try {
        const formData = new FormData();
        formData.append('reqnombre', requisito.value.reqnombre);
        formData.append('esobligatorio', requisito.value.esobligatorio ? 'true' : 'false');
        formData.append('esformato', requisito.value.esformato ? 'true' : 'false');

        if (archivoPDF.value) {
          formData.append('archivopdf', archivoPDF.value);
        }
        const response = await add_requisito(formData);

        if (response.success) {
          Notif.Success('El requisito ha sido guardado con éxito');
          await cargarRequisitos();
           requisito.value = {
            idreq: '',
            reqnombre: '',
            esobligatorio: false,
            esformato: false,
            formatopdf: ''
          };
          closeModal();
        } else {
          Alerta.Error('Error', response.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'Hubo un error al agregar el requisito.');
      }
    };

    const deleteRequisito = async (idreq: string) => {
      const isConfirmado = await Alerta.Confirmacion('¿Estás seguro de eliminar este requisito?','a');
      if (isConfirmado) {
        try {
          const response = await del_requisito(idreq);
          if (response.success) {
            Notif.Success('El requisito ha sido eliminado con éxito');
            await cargarRequisitos();
          } else {
            Alerta.Error('Error', response.message);
          }
        } catch (error) {
          Alerta.Error('Error', 'Hubo un error al eliminar el requisito.');
        }
      }
    };

    const openModal = () => {
      const modalElement = document.getElementById('addRequisitoModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    const closeModal = () => {
      const modalElement = document.getElementById('addRequisitoModal');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };


    const filteredRequisitos = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return listaRequisitos.value?.filter((requisito: Requisito) => {
        return Object.values(requisito).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        });
      }) ?? [];
    });

    return {
      breadcrumbRoutes,
      listaRequisitos,
      searchQuery,
      filteredRequisitos,
      requisito,
      errors,
      registrarRequisito,
      deleteRequisito,
      openModal,
      closeModal,
      onFileChange,
      HOST_URL
    };
  },
};
</script>

<style lang="scss" scoped>
.text-primary {
  color: #007bff !important;
}
</style>
