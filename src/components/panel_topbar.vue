<template>
  <!-- [ Header Topbar ] start -->
  <header class="pc-header">
    <div class="header-wrapper">
      <!-- [Mobile Media Block] start -->
      <div class="me-auto pc-mob-drp">
        <ul class="list-unstyled">
          <!-- ======= Menu collapse Icon ===== -->
          <li class="pc-h-item pc-sidebar-collapse">
            <a href="#" class="pc-head-link ms-0" id="sidebar-hide">
              <i class="ti ti-menu-2"></i>
            </a>
          </li>
          <li class="pc-h-item pc-sidebar-popup">
            <a href="#" class="pc-head-link ms-0" id="mobile-collapse">
              <i class="ti ti-menu-2"></i>
            </a>
          </li>
        </ul>
        <ul class="list-unstyled">
          <li class="pc-h-item">
            <router-link :to="{ name: 'CrearLicencia'}" class="mx-1 ">
              <div class="badge bg-gray-900 f-13 p-r-10 px-3" >Bienvenido</div> 
              <div class="badge bg-secondary f-13 px-4"  style="margin-left: -10px;">
                <i class=""></i> {{ Usuario.nombreusuario }}</div>
                <div class="badge bg-info f-13" style="margin-left: -10px;">
                <i class=""></i></div>
              <!-- <div class="badge bg-success f-13" style="margin-left: -10px;">
                <i class=""></i> {{ Usuario.oficina_nombre }}</div> -->
            </router-link>
          </li>
        </ul>
      </div>
      <!-- [Mobile Media Block end] -->
      <div class="ms-auto">
        <ul class="list-unstyled">
          <!-- <li class="pc-h-item">
            <router-link :to="{ name: 'CrearLicencia'}" class="mx-1">
              <button class="btn btn-secondary">
                <i class="ti ti-plus"></i> Licencia</button>
            </router-link>
          </li> -->
          <li class="pc-h-item">
            <a class="pc-head-link" href="#" @click.prevent="openFullscreen" role="button">
              <i class="fas fa-tv"></i>
            </a>
          </li>
         
          <li class="dropdown pc-h-item">
            <a class="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button"
              aria-haspopup="false" aria-expanded="false">
              <i class="ph-duotone ph-sun-dim"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end pc-h-dropdown">
              <a href="#!" class="dropdown-item" @click="() => layoutChange('dark')">
                <i class="ph-duotone ph-moon"></i>
                <span>Dark</span>
              </a>
              <a href="#!" class="dropdown-item" @click="() => layoutChange('light')">
                <i class="ph-duotone ph-sun-dim"></i>
                <span>Light</span>
              </a>
            </div>
          </li>
          
          <li class="pc-h-item">
            <a class="pc-head-link pct-c-btn" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_pc_layout">
              <i class="ph-duotone ph-gear-six"></i>
            </a>
          </li>
          <!-- **************************** -->
          <boxPerfil/>
          <!-- **************************** -->
        </ul>
      </div>
    </div>
  </header>
  <!-- [ Header ] end -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import boxPerfil from "../components/dash_CampoPerfil.vue";
import { Dropdown } from 'bootstrap';
import { usarAuthStore } from '../stores/autentificacionStore';
import { initializeUsuarioLog, UsuarioLog } from '../types/interfaces';


export default defineComponent({
  components: {
    boxPerfil
  },
  setup() {
    const authStore = usarAuthStore();
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());

    Usuario.value = authStore.usuario_Logueado;

    const layoutChange = (layout: string) => {
        document.getElementsByTagName('body')[0].setAttribute('data-pc-theme', layout);
        const btnControl = document.querySelector('.theme-layout .btn[data-value="default"]');
        if (btnControl) {
            btnControl.classList.remove('active');
        }
        const isDark = layout === 'dark';
        // const logoPath = isDark ? new URL('@/assets/images/logo_dark.png', import.meta.url).href : new URL('@/assets/images/logo.png', import.meta.url).href;
        // const logoPath = isDark ? '@/assets/images/logo_dark.png' : '@/assets/images/logo.png';

        // const updateLogo = (selector: string) => {
        //     const element = document.querySelector(selector);
        //     if (element) {
        //         element.setAttribute('src', logoPath);
        //     }
        // };
        // updateLogo('.pc-sidebar .m-header .logo-lg');
        // updateLogo('.navbar-brand .logo-lg');
        // updateLogo('.landing-logo');
        // updateLogo('.footer-top .footer-logo');

        const control = document.querySelector('.theme-layout .btn.active');
        if (control) {
            control.classList.remove('active');
            const activeBtn = document.querySelector(`.theme-layout .btn[data-value='${!isDark}']`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }
    };

    const initializeSidebarToggle = () => {
      const sidebarHide = document.querySelector('#sidebar-hide');
      const mobileCollapse = document.querySelector('#mobile-collapse');

      if (sidebarHide) {
        sidebarHide.addEventListener('click', () => {
          const sidebar = document.querySelector('.pc-sidebar');
          if (sidebar) {
            sidebar.classList.toggle('pc-sidebar-hide');
          }
        });
      }

      if (mobileCollapse) {
        mobileCollapse.addEventListener('click', () => {
          const tempSidebar = document.querySelector('.pc-sidebar');
          if (tempSidebar) {
            if (tempSidebar.classList.contains('mob-sidebar-active')) {
              rm_menu();
            } else {
              tempSidebar.classList.add('mob-sidebar-active');
              tempSidebar.insertAdjacentHTML('beforeend', '<div class="pc-menu-overlay"></div>');
              document.querySelector('.pc-menu-overlay')?.addEventListener('click', () => {
                rm_menu();
              });
            }
          }
        });
      }
    };

    const rm_menu = () => {
      const tempList = document.querySelector('.pc-sidebar');
      if (tempList) {
        tempList.classList.remove('mob-sidebar-active');
      }
      if (document.querySelector('.topbar')) {
        document.querySelector('.topbar')?.classList.remove('mob-sidebar-active');
      }
      document.querySelector('.pc-sidebar .pc-menu-overlay')?.remove();
      document.querySelector('.topbar .pc-menu-overlay')?.remove();
    };

    const openFullscreen = () => {
      const elem = document.documentElement as HTMLElement & {
        mozRequestFullScreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari y Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // Internet Explorer/Edge
        elem.msRequestFullscreen();
      }
    };

    const closeFullscreen = () => {
      const doc = document as Document & {
        mozCancelFullScreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
      };

      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) { // Firefox
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) { // Chrome, Safari y Opera
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) { // Internet Explorer/Edge
        doc.msExitFullscreen();
      }
    };

    const initializeDropdowns = () => {
      const dropdownElement = document.getElementById('dropdownMenuButton') as HTMLElement;
      if (dropdownElement) {
        new Dropdown(dropdownElement);
      }
    };

    onMounted(() => {
      initializeSidebarToggle();
      initializeDropdowns();
    });



    return {
      layoutChange,
      rm_menu,
      openFullscreen,
      closeFullscreen,
      Usuario
    };
  },
});
</script>

<style lang="scss" scoped>
/* Tu estilo aquí */
</style>
