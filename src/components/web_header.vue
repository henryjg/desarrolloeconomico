<script lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePaginaStore } from '../stores/paginaStore'; // Asegúrate de que la ruta sea correcta
  import type { Pagina } from '../types/objetosweb';
import { usarAuthStore } from '../stores/autentificacionStore';
import { usarAutenticacion } from '../composables/AuthValidate';
import { initializeUsuarioLog, UsuarioLog } from '../types/interfaces';
  

  export default {
    setup() {
      const isModeDark = ref(false);
      const authStore = usarAuthStore();

      const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
      
      Usuario.value = authStore.usuario_Logueado;

      onMounted(() => {
        document.body.classList.add('landing-page');

        const currentTheme = document.getElementsByTagName('body')[0].getAttribute('data-pc-theme');
        isModeDark.value = currentTheme === 'dark';

        let ost = 0;
        document.addEventListener('scroll', function () {
          let cOst = document.documentElement.scrollTop;
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            if (cOst == 0) {
              navbar.classList.add('top-nav-collapse');
            } else if (cOst > ost) {
              navbar.classList.add('top-nav-collapse');
              navbar.classList.remove('default');
            } else {
              navbar.classList.add('default');
              navbar.classList.remove('top-nav-collapse');
            }
          }
          ost = cOst;
        });
      });

      const updateLogo = (selector: string, logoPath: string) => {
        const element = document.querySelector(selector);
        if (element) {
          element.setAttribute('src', logoPath);
        }
      };

      const toggleTheme = () => {
        const layout = isModeDark.value ? 'light' : 'dark';
        document.getElementsByTagName('body')[0].setAttribute('data-pc-theme', layout);
        isModeDark.value = !isModeDark.value;
        
        // const isDark =  === 'dark';
        // const logoPath = isModeDark.value ? new URL('@/assets/images/logo_dark.png', import.meta.url).href : new URL('@/assets/images/logo.png', import.meta.url).href;

        // updateLogo('.navbar-brand .logo-lg', logoPath);
        // updateLogo('.landing-logo', logoPath);

        const btnControl = document.querySelector('.theme-layout .btn[data-value="default"]');
        if (btnControl) {
          btnControl.classList.remove('active');
        }

        const control = document.querySelector('.theme-layout .btn.active');
        if (control) {
          control.classList.remove('active');
          const activeBtn = document.querySelector(`.theme-layout .btn[data-value='${isModeDark.value}']`);
          if (activeBtn) {
            activeBtn.classList.add('active');
          }
        }
      };
      return {
        toggleTheme, isModeDark, Usuario
      };
    }
  };
</script>

<template>
  <div class="loader-bg">
    <div class="loader-track">
      <div class="loader-fill"></div>
    </div>
  </div>
  <!-- [ Pre-loader ] End -->

  <!-- [ Header ] start -->
  <header id="home" class="bg-blue-600">
    <!-- [ Nav ] start -->
    <nav class="navbar navbar-expand-md ">
      <div class="container">
        <a class="pc-navbar-brand " href="#">
          <div class=" text-white f-w-200 f-24">
            <img src="../assets/mdvologo.png" alt="logo" class="logo-lg " height="40px">
          </div>
          <!-- <img src="@/assets/images/logo.png" alt="logo" class="logo-lg landing-logo" width="100px"> -->
        </a>
        <!-- <p class="f-16 f-w-500 text-white  text-uppercase  py-0 my-0 px-3 text-right">Municipalidad Distrital <br>Veintiséis de Octubre</p> -->
        <button class="navbar-toggler rounded" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav ms-auto mt-lg-0 mt-2 mb-2 mb-lg-0 align-items-start ">
            <!-- <li class="nav-item  px-1">
              <router-link to="/" class="nav-link uppercase text-dark f-16 text-Aleo  ">
                <i class="fa fa-home f-18 text-white"></i> 
              </router-link>
            </li> -->
            <!-- //----------------------------------- -->
            <!-- <li class="nav-item f-16  px-1 dropdown">
              <a class="nav-link nav-item  f-16" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-caret-right p-r-5"></i> SERVICIOS
              </a>
              <ul class="dropdown-menu">
                <li>
                    <router-link  to="/licenciadefuncionamiento" class="dropdown-item ">
                      Licencia de Funcionamiento
                    </router-link>
                </li>
                <li><a class="dropdown-item" href="#">Casilla Electrónica</a></li>
              </ul>
            </li> -->
            <!-- //----------------------------------- -->
         
            
            <!-- //----------------------------------- -->
          </ul>
          <!-- <ul class="navbar-nav mb-2 mb-lg-0 align-items-start">
            <li class="nav-item">
              <a href="#" class="btn p-2 mx-2" @click="toggleTheme">
                <i v-if="!isModeDark" class="ph-duotone ph-sun-dim text-warning"></i>
                <i v-else class="ph-duotone ph-moon text-info"></i>
              </a>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="btn text-info text-hover-warning ">
                <i class="ph-duotone ph-user"></i> 
              </router-link>
            </li>
          </ul> -->
        </div>
      </div>
    </nav>
  </header>
</template>
<style>
</style>
