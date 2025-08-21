<template>
  <div class="row pt-3">
    <div class="col-12">
      <h4 class="text-secondary"><iconDocument class="wid-25 "/> Bienvenidos</h4>
      <!-- {{ Usuario }} -->
    </div>
  </div>

  <div class="row pt-3">
    <div class="col-md-7">
      
    </div>
    <div class="col-md-5">
      <h4 class="text-secondary"> Instaladores</h4>
      <p class="text-secondary"> Para poder utilizar correctamente la firma electrónica es necesrio instalar los siguientes componentes.</p>
      <div class="">
          <a  class="btn btn-danger bg-red-300" target="_blank"
              href="https://apps.firmaperu.gob.pe/web/firmador.xhtml"> 
              <i class="ph-duotone ph-signature p-r-5"></i>1. Firmador Web</a>

          <a  class="btn btn-info " target="_blank"
              href="https://chromewebstore.google.com/detail/cegid-peoplenet-clickonce/jkncabbipkgbconhaajbapbhokpbgkdc">
              <i class="ph-duotone ph-codesandbox-logo p-r-5"></i>2.Click One Launcher</a>

          <a  class="btn btn-warning bg-yellow-600 bg-red-300" target="_blank"
              href="https://digital.muniveintiseisdeoctubre.gob.pe/testfirma/app/">
              <i class="ph-duotone ph-person-simple-run p-r-5"></i>3. Probar Firma</a>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import DataTable from '../../components/table/DataTable.vue';  
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';

import { get_listadocumentos_Archivados, get_listadocumentos_EnviadosOficina } from '../../services/DocumentoServices';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';



export default defineComponent({
  components: {
    CardLayout,
  },
  setup() {
    const DestinoOficina = ref<Destino>();
    const authStore = usarAuthStore();
  
    const Usuario = computed(() => authStore.usuario_Logueado);
    
    
    return {
      HOST_URL,
      FormatFecha,Usuario
    
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.text-sentence {
    text-transform: lowercase; /* Capitaliza la primera letra de cada palabra */
}

.text-sentence::first-letter {
    text-transform: uppercase; /* Asegura que solo la primera letra de la oración esté en mayúscula */
}
</style>





