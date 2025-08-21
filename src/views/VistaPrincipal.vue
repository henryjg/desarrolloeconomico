<script lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  import Webfooter from '../components/web_footer.vue';
  import Webheader from '../components/web_header.vue';
  import WebModales from '../components/web_modales.vue';
  import { usePaginaStore } from '../stores/paginaStore';
 


  export default {
    components: {
      Webfooter, WebModales, Webheader, 
    },
    setup() {
      const route = useRoute();
      const showCarousel = ref(true);
      const pagStore = usePaginaStore();

      watch(route, (newRoute) => {
        showCarousel.value = newRoute.name == 'Inicio' || newRoute.name == 'Loggin' || newRoute.name == 'Contacto';
      }, { immediate: true });

      onMounted(() => {
        pagStore.almacenaPagina();
      });

      return {
        
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

  <!-- [ Header ] start -->
  <Webheader/>
  <!-- [ Header ] End -->
 
  <section class="py-0">
    <div class="container-fluid">
      <RouterView></RouterView>
    </div>
  </section>
 
  
  <Webfooter/>
  <WebModales/>
</template>

<style>
    .carousel_home {
      width: 80%;
      top: 0;
 
    }

    .text-franklin{
      font-family: "Franklin Gothic", Sans-serif;
      line-height: 1;
    }
</style>
