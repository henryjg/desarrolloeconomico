<template>
  <PlantillaAdmin>
        <!-- [ Main Content ] start -->
        <RouterView></RouterView>
        <!-- [ Main Content ] end -->
  </PlantillaAdmin>
</template>


<script lang="ts" >
  import { onMounted} from 'vue';
  import { useRoute } from 'vue-router';
  import PlantillaAdmin from "../layout/dashboard_layout.vue"
  
  export default {
    components: {
      PlantillaAdmin
    },
    setup() {
      const route = useRoute();
      
      onMounted(() => {
        document.body.classList.remove('landing-page');
      });
      return {
     
      };
    }
  };
</script>

