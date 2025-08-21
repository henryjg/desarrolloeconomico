<template>
  <div class="row">
    <div class="col-12">
      <CardLayout :title="'Lista de Usuarios'" :clase="'text-primary'" :clasehead="' border-0'">
        <!-- Botones de la parte superior derecha -->
        <template #buttons>
          <div class="d-flex columns justify-content-end">
            <div class=" d-flex align-items-center ">
              <label class="form-label p-r-5 ">Rol</label>
              <select  v-model="selectedRol_id" class="form-select">
                <option value="">Seleccione un rol</option>
                <option v-for="rol in listaRoles" :key="rol.id" :value="rol.id">{{ rol.nombre }}</option>
              </select>
            </div>

            <router-link to="/office/registrartrabajador" class="btn btn-primary btn-sm mx-1">
              <i class="fas fa-user-plus"></i> Agregar
            </router-link>
            <button @click="Cargar_Usuarios" class="btn btn-blue b-dark btn-sm mx-1">
              <i class="ti ti-refresh"></i>
            </button>
          </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          
          <DataTable
            :headers="headers"
            :items="filteredUsuarios"
            :filterKeys="['username', 'usuario', 'rol_nombre', 'tipouser','oficina_nombre']"
            :auto-height="true"
                :height-offset="120"
            :clasehead="'bg-info-100'"
          >
            <template #default="{ item, index }">
              <tr>
                <td class="px-2 mx-0 text-center">{{ index + 1 }}</td>
                <td class="px-2 mx-0 text-md text-wrap">
                  <h6 class="m-b-0">{{ item.username }}</h6>
                  <p class="m-b-0 text-primary">{{ item.cargo }}</p>
                </td>
                <td class="px-2 mx-0 text-md">{{ item.usuario }}</td>
                <td class="px-2 mx-0 text-md">{{ item.rol_nombre }}</td>
                <td class="px-2 mx-0 text-md text-wrap">{{ item.oficina_nombre }}</td>
                <td class="px-2 mx-0 text-center">
                  <span v-if="item.esactivo" class="badge bg-green-900 py-1 text-sm">Activo</span>
                  <span v-else class="badge bg-red-700 py-1 text-sm">Inactivo</span>
                </td>
                <td class="px-2 mx-0 text-center">
                  <router-link :to="{ name: 'editarTrabajador', params: { id: item.id } }" class="avtar avtar-xs btn btn-primary">
                    <i class="ti ti-edit f-20"></i>
                  </router-link>
                  <a href="#" @click.prevent="del_Usuario(item.id)" class="avtar avtar-xs btn btn-danger">
                    <i class="ti ti-trash f-20"></i>
                  </a>
                  <button class="avtar avtar-xs btn btn-warning" @click="openChangePasswordModal(item)">
                    <i class="ti ti-key f-20"></i>
                  </button>
                </td>
              </tr>
            </template>
          </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

  <!-- Modal para cambiar contraseña -->
  <div class="modal fade modal-sm" id="changePasswordModal_uadmin" tabindex="-1" aria-labelledby="changePasswordModalLabel_uadmin" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header py-2 modal_head_bg">
          <h5 class="modal-title" id="changePasswordModalLabel_uadmin">
            <i class="ti ti-key"></i> Cambiar Contraseña
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="changePassword">
            <div class="mb-3">
              <label for="newPassword" class="form-label">Nueva Contraseña:</label>
              <input type="password" class="form-control" v-model="newPassword" required />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirmar Nueva Contraseña:</label>
              <input type="password" class="form-control" v-model="confirmPassword" required />
            </div>
            <div class="modal-footer py-1 justify-content-center">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardLayout from '../../../layout/CardLayout.vue';
import DataTable from '../../../components/table/DataTable.vue';
import { useUsuario } from '../../../composables/useUsuario';

// Destructura TODO lo que necesitas del composable
const {
  ListaUsuario,
  listaRoles,
  filteredUsuarios,
  selectedRol_id,
  Cargar_Usuarios,
  cargarRolesUnicos,
  del_Usuario,
  openChangePasswordModal,
  changePassword,
  newPassword,
  confirmPassword
} = useUsuario();   

const headers = ref([
  { text: '#', width: '2%', key: 'index', type: 'string' as const, sortable: false, filterable: false },
  { text: 'Nombre', width: '25%', key: 'username', type: 'string' as const, sortable: false, filterable: false },
  { text: 'Usuario', width: '10%', key: 'usuario', type: 'string' as const, sortable: false, filterable: false },
  { text: 'Rol', width: '10%', key: 'rol_nombre', type: 'string' as const, sortable: false, filterable: false },
  { text: 'Oficina', width: '25%', key: 'oficina_nombre', type: 'string' as const, sortable: false, filterable: true },
  { text: 'Estado', width: '10%', key: 'esactivo', type: 'string' as const, sortable: false, filterable: false },
  { text: 'Acciones', width: '10%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
]);

onMounted(async () => {
  await Cargar_Usuarios();
  await cargarRolesUnicos();
});
</script>

<style lang="scss" scoped>
.text-sentence {
  text-transform: lowercase;
}

.text-sentence::first-letter {
  text-transform: uppercase;
}
</style>