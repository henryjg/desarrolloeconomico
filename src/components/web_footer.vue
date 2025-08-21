<template>
    <!-- [ footer apps ] start -->
    <footer class="footer  bg-blue-800 fondo_img">
        <!-- Footer botton ---------------------------------------- -->
        <div class="footer-bottom bg-blue-900 mt-1 py-2">
            <div class="container">
                <div class="row align-items-center">
                <div class="col my-1 wow animate__fadeInUp" data-wow-delay="0.4s">
                    <p class="m-0 text-white">© Todos los derechos reservados. </p>
                </div>
                <div class="col-auto my-1">
                    <ul class="list-inline footer-sos-link mb-0">
                    <li class="list-inline-item wow animate__fadeInUp" data-wow-delay="0.4s">
                        <a :href="DatosPagina?.facebook">
                        <i class="ph-duotone ph-facebook-logo f-20 text-white"></i>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
  </footer>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { usePaginaStore } from '../stores/paginaStore';
import type { Pagina } from '../types/objetosweb';
import icon_instagram  from '../components/icons/icon_instagram.vue';
import icon_facebook  from '../components/icons/icon_facebook.vue';
import icon_face  from '../components/icons/icon_face.vue';
import icon_whatsapp  from '../components/icons/icon_whatsapp.vue';

export default {
  components: {
    icon_instagram,icon_facebook,icon_whatsapp,
    icon_face
  },
  setup() {
    const pagStore = usePaginaStore();
    const DatosPagina = ref<Pagina | null>(null);

    onMounted(() => {
      DatosPagina.value = pagStore.pagina;
    });

    return {
      DatosPagina
    };
  }
};
</script>

<style lang="scss" scoped>
.fondo_img {
  background-image: url("../assets/images/banner/b2.avif");
  background-color: rgb(0, 15, 37); /* color de fondo semitransparente */
  background-blend-mode: multiply;
}
</style>