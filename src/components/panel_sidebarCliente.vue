<template>
  <!-- [ Sidebar Menu ] start -->
  <nav class="pc-sidebar">
    <div class="navbar-wrapper">
      <div class="m-header d-flex justify-content-center align-items-center">
        <router-link to="/office" class="b-brand text-primary ">
          <img src="@/assets/images/logomdvo.jpg" alt="logo image" class="logo-lg wid-100" />
        </router-link>
      </div>
      <simplebar data-simplebar >
          <div class="navbar-content">
            <ul class="pc-navbar">
              <li class="pc-item pc-caption">
                <label class="text-primary">Operaciones</label>
              </li>
              <li class="pc-item pc-hasmenu">
                <router-link to="/office/expediente" class="pc-link">
                  <span class="pc-micon">
                    <i class="ph-duotone ph-gauge"></i>
                  </span>
                  <span class="pc-mtext">Expedientes</span>
                </router-link>
              </li>
              <li class="pc-item pc-caption">
                <label class="text-primary">Herramientas</label>
              </li>
              <li class="pc-item">
                <router-link to="/office/tramite" class="pc-link">
                  <span class="pc-micon">
                    <i class="fas fa-pen"></i>
                  </span>
                  <span class="pc-mtext">Tramites</span>
                </router-link>
              </li>

              <li class="pc-item">
                <router-link to="/office/requisito" class="pc-link">
                  <span class="pc-micon">
                    <i class="fas fa-pen"></i>
                  </span>
                  <span class="pc-mtext">Requisitos</span>
                </router-link>
              </li>
              
              <li class="pc-item">
                <router-link to="/office/licencia" class="pc-link">
                  <span class="pc-micon">
                    <i class="fas fa-pen"></i>
                  </span>
                  <span class="pc-mtext">Licencia</span>
                </router-link>
              </li>
             
              <li class="pc-item pc-caption">
                <label class="text-primary">Accesos</label>
              </li>
              
              <li class="pc-item pc-hasmenu">
                <router-link to="/office/configuracion" class="pc-link">
                  <span class="pc-micon">
                    <i class="ph-duotone ph-user-circle"></i>
                  </span>
                  <span class="pc-mtext">Pagina Web</span>
                  <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
                </router-link>
              </li>
            </ul>
          </div>
        </simplebar>
    </div>
  </nav>
  <!-- [ Sidebar Menu ] end -->
</template>

<script lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';
export default {
  components: {
    simplebar
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const highlightActiveLink = () => {
      const elem = document.querySelectorAll<HTMLAnchorElement>('.pc-sidebar .pc-navbar a');
      const pageUrl = window.location.href.split(/[?#]/)[0];

      elem.forEach((link) => {
        const parent = link.parentElement;
        if (link.href === pageUrl && link.getAttribute('href') !== '') {
          parent?.classList.add('active');
          let grandParent = parent?.parentElement?.parentElement;
          if (grandParent) {
            grandParent.classList.add('pc-trigger');
            grandParent.classList.add('active');
            grandParent.querySelector('ul')?.style.setProperty('display', 'block');
          }
          let greatGrandParent = grandParent?.parentElement?.parentElement;
          if (greatGrandParent) {
            greatGrandParent.classList.add('pc-trigger');
            greatGrandParent.querySelector('ul')?.style.setProperty('display', 'block');
          }
        } else {
          parent?.classList.remove('active');
          let grandParent = parent?.parentElement?.parentElement;
          if (grandParent) {
            grandParent.classList.remove('pc-trigger');
            grandParent.classList.remove('active');
            grandParent.querySelector('ul')?.style.removeProperty('display');
          }
          let greatGrandParent = grandParent?.parentElement?.parentElement;
          if (greatGrandParent) {
            greatGrandParent.classList.remove('pc-trigger');
            greatGrandParent.querySelector('ul')?.style.removeProperty('display');
          }
        }
      });
    };

    onMounted(() => {
      highlightActiveLink();
    });

    watch(route, () => {
      highlightActiveLink();
    });

    return {};
  },
};
</script>

<style lang="scss" scoped>
// @import 'simplebar/dist/simplebar.css'; /* Import SimpleBar CSS */
</style>
