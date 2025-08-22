<template>
  <div class="row ">
    <div class="col-12">
      <!-- Tabs horizontales unificados -->
      
      <!-- ---------------------------------------------------------- -->
      <!-- Contenido de cada tab -->
      <!-- ---------------------------------------------------------- -->
      <div class="card-body py-0 px-2">
        <ul class="nav nav-tabs profile-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <router-link :to="{ name: 'BuscarLicencia' }" class="nav-link" active-class="active" role="tab">
              <i class="ti ti-shield-check me-2"></i>Buscar Documentos Internos
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link :to="{ name: 'BuscarDocumento' }" class="nav-link" active-class="active" role="tab">
              <i class="ti ti-file-text me-2"></i>Buscar por Nro Documento
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'BuscarAdministrado' }" class="nav-link" active-class="active" role="tab">
              <i class="ti ti-user me-2"></i>Buscar por Administrado
            </router-link>
          </li> -->
        </ul>
      </div>
      <!-- ---------------------------------------------------------- -->
      <!-- Contenido de la segunda pestaña -->
      <!-- ---------------------------------------------------------- -->
   
      <!-- Contenido de la segunda pestaña -->
      <!-- ---------------------------------------------------------- -->
       <RouterView></RouterView>
      <!-- Contenido principal de la tarjeta -->
      <!-- <CardLayout  :title="'h'" :clase="'text-secondary'"  :clasehead="''">
        <template #buttons></template>
        <template #default>
          <RouterView></RouterView>
        </template>
      </CardLayout> -->


      <!-- ---------------------------------------------------------- -->
      <!-- Contenido de la segunda pestaña -->
      <!-- ---------------------------------------------------------- -->
    
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HistorialSearchExpediente from './historial_seguimiento_buscar_historial.vue';
import HistorialSeguimientoBuscarDocumento from './historial_seguimiento_buscar_documento.vue';
import HistorialSeguimientoBuscarAdministrado from './historial_seguimiento_buscar_administrado.vue';
import CardLayout from '../../../layout/CardLayout.vue';  
export default defineComponent({
  components: {
    CardLayout,
    HistorialSearchExpediente,
    HistorialSeguimientoBuscarDocumento,
    HistorialSeguimientoBuscarAdministrado,
  },
});
</script>

<style scoped>
.text-sentence {
    text-transform: lowercase; /* Capitaliza la primera letra de cada palabra */
}

.text-sentence::first-letter {
    text-transform: uppercase; /* Asegura que solo la primera letra de la oración esté en mayúscula */
}
</style>





