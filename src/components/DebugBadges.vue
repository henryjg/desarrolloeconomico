<!-- Test component para verificar badges -->
<template>
  <div class="debug-badges p-3">
    <h4>🔍 Debug del Sistema de Badges</h4>
    
    <div class="mb-3">
      <h5>📊 Datos del Store:</h5>
      <pre>{{ JSON.stringify(storeData, null, 2) }}</pre>
    </div>
    
    <div class="mb-3">
      <h5>🎯 Menú con Badges:</h5>
      <ul>
        <li v-for="item in menuWithBadges" :key="item.route">
          <strong>{{ item.text }}</strong> 
          <span v-if="item.badge_count" 
                :class="`badge bg-${item.badge_color} ms-2`">
            {{ item.badge_count }}
          </span>
          <small class="text-muted ms-2">({{ item.route }})</small>
        </li>
      </ul>
    </div>
    
    <div class="mb-3">
      <button @click="forceReload" class="btn btn-primary me-2">
        🔄 Forzar Recarga
      </button>
      <button @click="startAutoUpdate" class="btn btn-success me-2">
        ▶️ Iniciar Auto-Update
      </button>
      <button @click="stopAutoUpdate" class="btn btn-danger">
        ⏹️ Detener Auto-Update
      </button>
    </div>
    
    <div class="alert alert-info">
      <strong>Estado:</strong> 
      <span v-if="isAutoActive" class="text-success">✅ Auto-update activo</span>
      <span v-else class="text-warning">⚠️ Auto-update inactivo</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../stores/sidebarStore';
import { useMenuItems } from '../utils/lista_menulateral';

const sidebarStore = useSidebarStore();
const { menuItems: menuWithBadges } = useMenuItems();

// Datos del store para debugging
const storeData = computed(() => ({
  datos_stat_documentos: sidebarStore.datos_stat_documentos,
  isAutoUpdateActive: sidebarStore.isAutoUpdateActive
}));

const isAutoActive = computed(() => sidebarStore.isAutoUpdateActive);

// Funciones para testing
const forceReload = async () => {
  console.log('🔄 Forzando recarga manual...');
  //await sidebarStore.forzarRecarga();
};

const startAutoUpdate = () => {
  console.log('▶️ Iniciando auto-update...');
  // sidebarStore.iniciarActualizacionAutomatica();
};

const stopAutoUpdate = () => {
  console.log('⏹️ Deteniendo auto-update...');
  // sidebarStore.detenerActualizacionAutomatica();
};

// Inicializar automáticamente al montar
startAutoUpdate();
</script>

<style scoped>
.debug-badges {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-family: monospace;
}

pre {
  background: #e9ecef;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
