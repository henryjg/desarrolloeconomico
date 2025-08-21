<template>
  <!-- [ breadcrumb ] start -->
  <Breadcrumb :links="breadcrumbRoutes" />
  <!-- [ breadcrumb ] end -->

  <div class="row">
    <!-- Datos del Buzón a la izquierda y Usuarios del Buzón a la derecha, a la misma altura -->
    <div class="col-md-5">
      <div class="card h-100">
        <div class="card-header f-20 text-primary">
          <i class="fas fa-envelope m-r-10"></i> Editar Datos del Buzón
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <div class="mb-2">
                <label class="form-label">Nombre</label>
                <input type="text" v-model="buzonForm.nombre" class="form-control" />
              </div>
              <div class="mb-2">
                <label class="form-label">Sigla</label>
                <input type="text" v-model="buzonForm.sigla" class="form-control" />
              </div>
              <button class="btn btn-primary mt-2" @click="guardarCambiosBuzon">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usuarios del Buzón a la derecha -->
    <div class="col-md-7">
      <div class="card h-100">
        <div class="card-header f-20 text-primary">
          <i class="fas fa-users m-r-10"></i> Usuarios del Buzón
          <button class="btn btn-success btn-sm float-end" @click="openAddUserModal">
            <i class="fas fa-user-plus"></i> Agregar Usuario
          </button>
        </div>
        <div class="card-body">
          <div v-if="usuariosBuzon.length === 0" class="alert alert-warning">
            No hay usuarios asignados a este buzón.
          </div>
          <div v-else class="table-responsive">
            <table class="table table-hover table-sm">
              <thead>
                <tr>
                  <th style="width: 5%">#</th>
                  <th style="width: 30%">Nombre de usuario</th>
                  <th style="width: 20%">Usuario</th>
                  <th style="width: 20%">Rol</th>
                  <th style="width: 10%">Estado</th>
                  <th style="width: 15%">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(usuario, index) in usuariosBuzon" :key="usuario.id">
                  <td class="text-wrap">{{ index + 1 }}</td>
                  <td class="text-wrap">{{ usuario.username }}</td>
                  <td class="text-wrap">{{ usuario.usuario }}</td>
                  <td class="text-wrap">{{ usuario.rol_nombre }}</td>
                  <td>
                    <span class="badge bg-success">Activo</span>
                  </td>
                  <td>
                    <button class="btn btn-danger btn-sm me-1" @click="removeUserFromBuzon(usuario.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-warning btn-sm me-1" @click="openChangePasswordModal(usuario)">
                      <i class="ti ti-key"></i>
                    </button>
                    <button class="btn btn-info btn-sm" @click="goToEditarTrabajador(usuario.id)">
                      <i class="ti ti-edit"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para agregar usuario -->
  <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addUserModalLabel">Agregar Usuario al Buzón</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <multiselect
            v-model="selectedUsers"
            :options="usuariosDisponibles"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Buscar y seleccionar usuarios"
            label="username"
            track-by="id"
            :searchable="true"
          >
            <template #option="{ option }">
              <span>{{ option.username }}</span>
            </template>
            <template #tag="{ option, remove }">
              <span class="multiselect__tag">
                {{ option.username }}
                <span @click="remove(option)">×</span>
              </span>
            </template>
          </multiselect>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="addUsersToBuzon">Agregar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para cambiar contraseña -->
  <div class="modal modal-sm fade" id="changePasswordModal2" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header py-2 modal_head_bg">
          <h5 class="modal-title" id="changePasswordModalLabel">
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
            <div class="mb-1">
              <label for="confirmPassword" class="form-label">Confirmar Contraseña:</label>
              <input type="password" class="form-control" v-model="confirmPassword" required />
            </div>
            
          </form>
        </div>
        <div class="modal-footer py-1">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Breadcrumb from '../../../components/breadcrumb.vue';
import { useRoute, useRouter } from 'vue-router';
import { get_Buzon, get_users_for_buzon, assign_user_to_buzon, remove_user_from_buzon, upd_buzon } from '../../../services/BuzonServicio';
import { getTrabajadores, getRolByUserId } from '../../../services/trabajadorService';
import { Buzon, BuzonCreate, initializeBuzon, initializeBuzonCreate } from '../../../interfaces/buzon.interface';
import { Trabajador } from '../../../interfaces/trabajador.interface';
import { CambiarPass } from '../../../services/autentificacion';
import { Modal } from 'bootstrap';
import Notif from '../../../utils/notificaciones';
import Multiselect from 'vue-multiselect';

interface Link {
  path: string;
  name: string;
}

export default defineComponent({
  components: { Breadcrumb, Multiselect },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const breadcrumbRoutes = ref<Link[]>([
      { path: '/office/buzon', name: 'Buzones' },
      { path: '', name: 'Editar Buzón' },
    ]);

    const buzonForm = ref<BuzonCreate>(initializeBuzonCreate());
    const usuariosBuzon = ref<Trabajador[]>([]);
    const usuariosDisponibles = ref<Trabajador[]>([]);
    const selectedUserId = ref<number | null>(null);
    const newPassword = ref('');
    const confirmPassword = ref('');
    const selectedUsuario = ref<Trabajador | null>(null);
    const selectedUsers = ref<any[]>([]);
    let modalInstance: Modal | null = null;
    let modalChangePass: Modal | null = null;

    const cargarBuzon = async () => {
      const id = Number(route.params.id);
      try {
        const response = await get_Buzon(id);
        if (response.success) {
          buzonForm.value = response.data;
          await cargarUsuariosBuzon(id);
          await cargarUsuariosDisponibles();
        } else {
          Notif.Error(response.message);
        }
      } catch (error) {
        Notif.Error('Error al cargar el buzón.');
      }
    };

    const cargarUsuariosBuzon = async (buzonId: number) => {
      try {
        const response = await get_users_for_buzon(buzonId.toString());
        if (response.success) {
          const usuarios = response.data || [];
          const usuariosConRol = await Promise.all(
            usuarios.map(async (usuario: Trabajador) => {
              let rol_nombre = '';
              try {
                const rolResp = await getRolByUserId(usuario.id);
                if (rolResp && rolResp.success && rolResp.data && rolResp.data.nombre) {
                  rol_nombre = rolResp.data.nombre;
                }
              } catch (e) {
                // No mostrar error por consola
              }
              return { ...usuario, rol_nombre };
            })
          );
          usuariosBuzon.value = usuariosConRol;
        } else {
          usuariosBuzon.value = [];
        }
      } catch (error) {
        Notif.Error('Error al cargar los usuarios del buzón.');
      }
    };

    const cargarUsuariosDisponibles = async () => {
      try {
        const response = await getTrabajadores();
        if (response.success) {
          usuariosDisponibles.value = response.data;
        } else {
          usuariosDisponibles.value = [];
        }
      } catch (error) {
        Notif.Error('Error al cargar los usuarios disponibles.');
      }
    };

    const openAddUserModal = () => {
      const modalElement = document.getElementById('addUserModal');
      if (modalElement) {
        modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
    };

    const addUsersToBuzon = async () => {
      if (!selectedUsers.value.length) {
        Notif.Error('Seleccione al menos un usuario.');
        return;
      }
      try {
        for (const user of selectedUsers.value) {
          await assign_user_to_buzon(user.id, buzonForm.value.id.toString());
        }
        Notif.Success('Usuarios agregados al buzón.');
        await cargarUsuariosBuzon(buzonForm.value.id);
        if (modalInstance) modalInstance.hide();
        selectedUsers.value = [];
      } catch (error) {
        Notif.Error('Error al agregar los usuarios al buzón.');
      }
    };

    const removeUserFromBuzon = async (userId: number) => {
      console.log('Eliminando usuario con ID:', userId, 'del buzón con ID:', buzonForm.value.id);
      try {
        const response = await remove_user_from_buzon(userId, buzonForm.value.id);
        console.log('Respuesta de remove_user_from_buzon:', response);
        if (response.success) {
          Notif.Success('Usuario eliminado del buzón.');
          await cargarUsuariosBuzon(buzonForm.value.id); // Actualizar lista de usuarios asignados
        } else {
          Notif.Error(response.message);
          console.error('Error en remove_user_from_buzon:', response.message);
        }
      } catch (error) {
        Notif.Error('Error al eliminar el usuario del buzón.');
        console.error('Error en removeUserFromBuzon:', error);
      }
    };

    const openChangePasswordModal = (usuario: Trabajador) => {
      selectedUsuario.value = usuario;
      newPassword.value = '';
      confirmPassword.value = '';
      const modalElement = document.getElementById('changePasswordModal2');
      if (modalElement) {
        modalChangePass = new Modal(modalElement);
        modalChangePass.show();
      }
    };

    const changePassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        Notif.Error('Las contraseñas no coinciden');
        return;
      }
      if (!selectedUsuario.value) {
        Notif.Error('No se seleccionó un usuario');
        return;
      }
      try {
        const response = await CambiarPass(selectedUsuario.value.id.toString(), newPassword.value);
        if (response.success) {
          Notif.Success('Contraseña cambiada con éxito');
          if (modalChangePass) modalChangePass.hide();
        } else {
          Notif.Error(response.message);
        }
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        Notif.Error('Error al cambiar la contraseña');
      }
    };

    const guardarCambiosBuzon = async () => {
      try {
        const response = await upd_buzon(buzonForm.value);
        if (response.success) {
          Notif.Success('Datos del buzón actualizados correctamente');
        } else {
          Notif.Error(response.message || 'Error al actualizar el buzón');
        }
      } catch (error) {
        Notif.Error('Error al actualizar el buzón');
      }
    };

    const goToEditarTrabajador = (userId: number) => {
      router.push({ name: 'editarTrabajador', params: { id: userId } });
    };

    const cancelar = () => {
      router.push('/office/buzon');
    };

    onMounted(() => {
      cargarBuzon(); // Cargar datos al montar el componente
    });

    return {
      breadcrumbRoutes,
      buzonForm,
      usuariosBuzon,
      usuariosDisponibles,
      selectedUserId,
      newPassword,
      confirmPassword,
      selectedUsers,
      openAddUserModal,
      addUsersToBuzon,
      removeUserFromBuzon,
      openChangePasswordModal,
      changePassword,
      guardarCambiosBuzon,
      goToEditarTrabajador,
      cancelar,
    };
  },
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

