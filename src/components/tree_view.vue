<!-- TreeView.vue -->
<template>
    <div class="accordion accordion-flush" id="acordionOficinas">
      <TreeNode 
        v-for="office in offices" 
        :key="office.ofi_id" 
        :node="office" 
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  import TreeNode from './tree_node.vue';
  
  interface OfficeNode {
    ofi_id: number;
    ofi_nombre: string;
    ofi_padre_id: number | null;
    hijas: OfficeNode[];
  }
  
  // Definir las propiedades que el componente recibirá del padre
  const props = defineProps<{ offices: OfficeNode[] }>();
  </script>
  
  <style scoped>
  .accordion {
    margin-top: 20px;
  }
  </style>
  