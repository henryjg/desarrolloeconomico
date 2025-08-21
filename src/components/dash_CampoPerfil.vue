<template>
    <li class="dropdown pc-h-item header-user-profile">
      <a class="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button"
        aria-haspopup="false" data-bs-auto-close="outside" aria-expanded="false">
        <!-- <img v-if="Usuario.fotoperfil!==''" alt="user-image" 
                        :src="HOST_URL+ Usuario.fotoperfil"
                        class="wid-50 hei-50 rounded-circle" />
         -->
        <div class="wid-40 hei-40 rounded-circle bg-blue-900 text-center justify-content-center align-content-center">
            <i class="fa fa-user"></i>
        </div>

        <!-- <img :src="Usuario?.fotoperfil ? HOST_URL+Usuario.fotoperfil : '/src/assets/images/avatar.png'" alt="user-image" class="user-avtar hei-40" /> -->
      </a>
      <div class="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
        <div class="dropdown-header d-flex align-items-center justify-content-between">
          <h6 class="m-0">Perfil de Usuario </h6>
          <span class="badge bg-primary">{{Usuario?.oficina_nombre}}</span>
        </div>
        <div class="dropdown-body">
          <div class="profile-notification-scroll position-relative" style="max-height: calc(100vh - 225px)">
            <ul class="list-group list-group-flush w-100">
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                    <img v-if="Usuario.fotoperfil!==''" alt="user-image" 
                        :src="HOST_URL+ Usuario.fotoperfil"
                        class="wid-50 hei-50 rounded-circle" />
                  </div>
                  <div class="flex-grow-1 mx-3">
                    <h6 class="mb-0">{{Usuario?.nombreusuario}}</h6>
                    <a class="link-primary" href="mailto:carson.darrin@company.io">{{Usuario?.correo}}</a>
                  </div>
                  
                </div>
              </li>
              <!-- <li class="list-group-item">
                <a href="#" class="dropdown-item">
                  <span class="d-flex align-items-center">
                    <i class="ph-duotone ph-key"></i>
                    <span>Cambiar Contraseña</span>
                  </span>
                </a>
                <a href="#" class="dropdown-item">
                  <span class="d-flex align-items-center">
                    <i class="ph-duotone ph-user-circle"></i>
                    <span>Editar datos personales</span>
                  </span>
                </a>
           
              </li> -->
              <li class="list-group-item">
             
                <a  href="#" class="dropdown-item" @click="logout">
                  <span class="d-flex align-items-center">
                    <i class="ph-duotone ph-power text-warning"></i>
                    <span>Cerrar Sesión</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
</template>

<script lang="ts">
import { ref } from 'vue';
import { initializeUsuarioLog, type UsuarioLog } from '../types/interfaces';
import { HOST_URL } from '../config';
import { usarAutenticacion } from "../composables/AuthValidate"
import { usarAuthStore } from '../stores/autentificacionStore';

export default {
    setup () {
        const { logout } = usarAutenticacion();
        const authStore = usarAuthStore();
        const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
        Usuario.value = authStore.usuario_Logueado;
        return {Usuario, HOST_URL,logout,authStore}
    }
}
</script>

<style lang="scss" scoped>

</style>