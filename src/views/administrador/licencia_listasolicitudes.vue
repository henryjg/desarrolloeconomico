<template>
  <CardLayout :title="'Lista de Solicitudes'" :clase="'text-primary'" :clasehead="'bg-light-300'">
    <!-- Botones de la parte superior derecha -->
    <template #buttons>
      <button @click="cargarLicencias" class="btn btn-light   mx-1">
        <i class="ti ti-refresh"></i> </button>
      <router-link :to="{ name: 'CrearLicencia'}" class="mx-1">
              
                <button class="btn btn-warning">
                  <i class="ti ti-plus"></i> Nueva</button>
      </router-link>
    </template>

    <!-- Contenido principal de la tarjeta -->
    <template #default>
      <DataTable
            :headers="headers"
            :items="listaLicencias"
            :filterKeys="['negocio_razonsocial', 'documento_codexpediente', 'categoriatramite_tupa', 'itse_tipoinspeccion', 'fecharegistro', 'estado']"
          >
            <template #default="{ item, index, currentPage, itemsPerPage }">
              <tr>
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td class="text-wrap">
                  <div class="f-14 f-w-600 text-gray mb-0 mt-2 divb-0">{{ item.negocio_razonsocial }}</div>
                  <div class="f-14 text-gray-600 py-0 mb-0">
                        <span class="f-w-700"> RUC</span> {{ item.negocio_ruc }}</div>
                </td>
                <td class="text-wrap">
                  <div :class="item.categoriatramite_tupa==='Autorización' ? 'text-danger' : 'text-yellow-900'"
                      class=" f-w-700 text-wrap">{{ item.categoriatramite_tupa }}</div>
                </td>
                <td>{{ item.documento_codexpediente }}</td>
                <td>
                    {{
                      item.itse_tipoinspeccion === 'ITSE PREVIA'
                        ? "PREVIA"
                        : item.itse_tipoinspeccion === 'ITSE POSTERIOR'
                        ? "POSTERIOR"
                        : "NO APLICA"
                    }}
                </td>
                <td class="fw-bold text-center">
                    {{ FormatFecha.fecha_dd_mm_yyyy(item.fecharegistro) }}<br>
                    <div class="badge text-bg-secondary">{{ FormatFecha.fecha_hhmm_am_pm(item.fecharegistro) }}</div>
                </td>
                
                <td>
                  <!-- ------------------ -->                  
                  <router-link :to="{ name: 'Recibirlicencia', params: { idlic: item.idlic } }"
                               class=" btn btn-success px-2 d-inline-flex rounded-2">
                    <i class="ti ti-eye p-r-5"></i> Atender
                  </router-link>
                  <!-- ------------------ -->
                  
                  <!-- ------------------ -->
                </td>
              </tr>
            </template>
          </DataTable>
    </template>
  </CardLayout>
</template>

<script lang="ts">
import DataTable from '../../components/table/DataTable.vue';  
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent } from 'vue';
import { get_listar_licencias } from '../../services/LicenciaService';
import { filtros_licencia, initializeLicenciaFiltro } from '../../interfaces/filtros.interface'; 
import { Licencia_tabla } from '../../interfaces/licencia.interfaces';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { Tramite } from '../../types/interfaces';

import { ListasStore } from '../../stores/listasStore';



export default defineComponent({
  components: {
    CardLayout,
    DataTable,
  },
  setup() {

    const listaLicencias = ref<Licencia_tabla[]>([]);
    const filtros = ref<filtros_licencia>(initializeLicenciaFiltro());

    const StoreList = ListasStore();

    const tramitedetalles = ref<Tramite>({
      id: '',         
      nombretramite: '', 
      descripcion: '',
      codigo: '',      
      tipomonto: '',      
      monto: '',         
      plazo: '',    
      duracion: '',          
      comentario: '',          
      requisito: '',
      oficina_id: '',
      categoria: ''
    });
    

    const cargarLicencias = async () => {
      NProgress.start();
      filtros.value.f_estado = "INICIADO"; // Aseguramos que el filtro de estado esté establecido
      try {
        const respuesta = await get_listar_licencias(filtros.value);
        listaLicencias.value = respuesta.data;
        console.log(listaLicencias.value);
      } catch (error) {
        console.error('Error al cargar las licencias:', error);
      } finally {
        NProgress.done();
      }
    };

    const headers = ref([
      { text: '#', width: '5%', key: 'index' },
      { text: 'RAZON SOCIAL / RUC', width: '25%', key: 'negocio_razonsocial' },
      { text: 'Tipo de Trámite', width: '15%', key: 'categoriatramite_tupa' },
      { text: 'N° EXP', width: '10%', key: 'documento_codexpediente' },
      { text: 'TIPO ITSE', width: '10%', key: 'itse_tipoinspeccion' },
      { text: 'FECHA INGRESO', width: '10%', key: 'fecharegistro' },
      { text: '', width: '5%', key: 'acciones' },
    ]);

    onMounted(cargarLicencias);

    return {
      listaLicencias,
      cargarLicencias,
      headers,
      filtros,  
      HOST_URL,
      FormatFecha      
    };
  },
});
</script>





