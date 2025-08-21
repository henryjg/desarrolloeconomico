<template>
  <PlantillaExtranet>
        <!-- [ Main Content ] start -->
        <RouterView></RouterView>
        <!-- [ Main Content ] end -->
  </PlantillaExtranet>
</template>


<script lang="ts" >
  import { onMounted} from 'vue';
  import { useRoute } from 'vue-router';
  import PlantillaExtranet from "../layout/extranet_layout.vue"
  
  export default {
    components: {
      PlantillaExtranet
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