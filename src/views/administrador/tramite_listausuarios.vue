<template>
  <!-- [ breadcrumb ] start -->
  <Breadcrumb :links="breadcrumbRoutes" />
  <!-- [ breadcrumb ] end -->

  <div class="row">
    <div class="col-12">
      <div class="card table-card">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col-md-5 mt-2">
              <h4 class='text-primary'>
                Usuarios Trámite Documentario
              </h4>
            </div>
            <div class="col-md-5">
              <input type="text" class="form-control" placeholder="Buscar trabajador..." v-model="searchQuery">
            </div>
            <div class="col-md-2">
              <router-link to="/office/registrartrabajador" class="pc-link">
                <button type="button" class="btn btn-primary float-end">
                  <i class="fas fa-user-plus"></i>
                  Agregar
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="card-body pt-1">
          <div class="row">
            <!-- Tarjetas en pantallas pequeñas -->
            <div class="d-md-none">
              <div v-if="ListaTrabajadores.length===0" class="alert alert-warning mx-3">
                <i class="fa fa-user-friends"></i>
                No existen trabajadores registrados</div>
              <div v-else class="card mb-3" v-for="(trabajador, index) in paginatedTrabajadores" :key="trabajador.id">
                <div class="card-body">
                  
                  <table class="table table-xs">
                    <thead>
                      <tr>
                        <th style="width:30%">
                          <div class="badge text-bg-danger f-12">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
                        </th>
                        <th style="width:70%">
                          <img v-if="trabajador.fotourl===''" src="../../assets/images/avatar.png" class="img-thumbnail" style="width:50px;" alt="User image">
                          <img v-else :src="HOST_URL + trabajador.fotourl" class="img-thumbnail" style="width:50px;" alt="User image">
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Usuario:</strong></td>
                        <td class="text-wrap text-primary f-w-600">{{ trabajador.username }}</td>
                      </tr>
                      <tr>
                        <td><strong>Cargo:</strong></td>
                        <td>{{ trabajador.cargo }}</td>
                      </tr>
                      <tr>
                        <td><strong>Tipo Usuario:</strong></td>
                        <td>{{ trabajador.tipouser }}</td>
                      </tr>
                      <tr>
                        <td><strong>Celular:</strong></td>
                        <td>{{ trabajador.celular }}</td>
                      </tr>
                      <tr>
                        <td><strong>Estado:</strong></td>
                        <td>
                          <span :class="{'text-success': trabajador.esactivo, 'text-secondary': !trabajador.esactivo}">
                            <i class="fas fa-circle f-10 m-r-10"></i>
                            {{ trabajador.esactivo ? 'Activo' : 'Inactivo' }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Acciones:</strong></td>
                        <td>
                          <router-link :to="{ name: 'editarTrabajador', params: { id: trabajador.id } }" class="btn btn-primary btn-sm me-2">
                            <i class="ti ti-edit"></i> Editar
                          </router-link>
                          <button @click.prevent="del_Trabajador(trabajador.id)" class="btn btn-danger btn-sm">
                            <i class="ti ti-trash"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            
            <!-- Tabla en pantallas grandes -->
            <div class="table-responsive d-none d-md-block">
              <div v-if="ListaTrabajadores.length===0" class="alert alert-warning mx-3">
                <i class="fa fa-user-friends"></i>
                No existen trabajadores registrados</div>
              <table v-else class="table table-hover table-sm" id="pc-dt-simple">
                <thead>
                  <tr>
                    <th style="width:5%">N°</th>
                    <th style="width:35%">Usuario</th>
                    <th style="width:10%">Tipo Usuario</th>
                    <th style="width:10%">OFICINA</th>
                    <th style="width:10%">Celular</th>
                    <th style="width:10%">Estado</th>
                    <th style="width:10%">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(trabajador,index) in paginatedTrabajadores" :key="trabajador.id">
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <img v-if="trabajador.fotourl===''" src="../../assets/images/avatar.png" class="img-radius align-top m-r-15" 
                        style="width:50px; height: 50px" alt="User image">
                        <img v-else :src="HOST_URL + trabajador.fotourl" class="img-radius align-top m-r-15" style="width:50px;" alt="User image">

                        
                        <div class="d-inline-block text-wrap">
                          <h6 class="m-b-0">{{ trabajador.username }} </h6>
                          <p class="m-b-0 text-primary">{{ trabajador.cargo }}</p>
                        </div>
                      </div>
                    </td>
                    <td>{{ trabajador.tipouser }}</td>
                    <td>{{ trabajador.oficina_nombre }}</td>
                    <td>{{ trabajador.celular }} </td>
                    <td>
                      <span :class="trabajador.esactivo ? 'text-success' : 'text-secondary'">
                        <i class="fas fa-circle f-10 m-r-10"></i> 
                        {{ trabajador.esactivo ? 'Activo' : 'Inactivo' }}
                      </span>
                    </td>
                    <td>
                      <router-link :to="{ name: 'editarTrabajador', params: { id: trabajador.id } }" class="avtar avtar-xs btn btn-primary">
                        <i class="ti ti-edit f-20"></i>
                      </router-link>
                      <a href="#" @click.prevent="del_Trabajador(trabajador.id)" class="avtar avtar-xs btn btn-danger">
                        <i class="ti ti-trash f-20"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Paginación -->
          <div class="row mt-3">
            <div class="col-md-12">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="previousPage">Anterior</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                  <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="nextPage">Siguiente</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import Breadcrumb from '../../components/breadcrumb.vue';
import Alerta from '../../utils/alertas';
import { HOST_URL } from '../../config';
import { deleteTrabajador, getTrabajadores } from '../../services/trabajadorService';
import Notif from '../../utils/notificaciones';
import NProgress from 'nprogress'; // 
import { Trabajador } from '../../interfaces/trabajador.interface';

import imgdefault from "@/assets/images/avatar.png"

interface Link {
  path: string;
  name: string;
}

export default {
  components: {
    Breadcrumb
  },
  setup() {
    const breadcrumbRoutes = ref<Link[]>([
      { path: '/office', name: 'Home' },
      { path: '/office/trabajador', name: 'Trabajador' },
    ]);

    const ListaTrabajadores = ref<Trabajador[]>([]);

    const searchQuery = ref('');
    const isTableView = ref(true);
    const itemsPerPage = ref(10);
    const currentPage = ref(1);

    onMounted(async () => {
      await cargarTrabajadores();
    });

    const toggleView = () => {
      isTableView.value = !isTableView.value;
    };

    const cargarTrabajadores = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await getTrabajadores();
        if (RespuestaJSON.success) {
          ListaTrabajadores.value = RespuestaJSON.data;
        }else{
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        Alerta.Error('Error', 'No se pudieron cargar los trabajadores.');
      } finally {
        NProgress.done();
      }
    };

    const filteredTrabajadores = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return ListaTrabajadores.value.filter((trabajador: Trabajador) => {
        return Object.values(trabajador).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        });
      }) ?? [];
    });

    const paginatedTrabajadores = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredTrabajadores.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredTrabajadores.value.length / itemsPerPage.value);
    });

    

    const del_Trabajador = async (id: number) => {
      const isConfirmado = await Alerta.Confirmacion(
        '¿Estás seguro de que deseas eliminar este trabajador?',
        'Esta acción no se puede deshacer.'
      );
      if (isConfirmado) {
        const RespuestaJSON = await deleteTrabajador(id);
        if(RespuestaJSON.success){
          ListaTrabajadores.value = ListaTrabajadores.value.filter(item => item.id !== id);

          Notif.Success(RespuestaJSON.message);
        }else{
          Notif.Error(RespuestaJSON.message);
        }
      }
    };


    //-------------------------------------------------------------------------
    const previousPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const goToPage = (page: number) => {
      currentPage.value = page;
    };

    return {
      ListaTrabajadores,
      del_Trabajador,
      searchQuery,
      filteredTrabajadores,
      paginatedTrabajadores,
      toggleView,
      isTableView,
      HOST_URL,
      breadcrumbRoutes,
      currentPage,
      itemsPerPage,
      totalPages,
      previousPage,
      nextPage,
      goToPage,imgdefault

    };
  },
};
</script>

<style lang="scss" scoped>
/* Estilos opcionales para el input de búsqueda y paginación */
</style>
