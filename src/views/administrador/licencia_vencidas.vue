<template>
    <CardLayout :title="'Licencias Vencidas'" :clase="'text-danger'" :clasehead="'bg-light'">
      <!-- Botones de la parte superior derecha -->
      <template #buttons>
        <button @click="cargarLicencias" class="btn btn-light   mx-1">
          <i class="ti ti-refresh"></i> </button>
        <div class="badge f-14 bg-red-300">Nulidad</div>
      </template>
  
      <!-- Contenido principal de la tarjeta -->
      <template #default>
        <DataTable
              :headers="headers"
              :items="listaLicencias"
              :filterKeys="['negocio_razonsocial', 'documento_codexpediente', 'itse_tipoinspeccion', 'fecharegistro', 'estado']"
            >
              <template #default="{ item, index, currentPage, itemsPerPage }">
                <tr>
                  <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                  <td class="text-wrap">
                    <div class="f-14 f-w-600 text-gray-600 mb-1 divb-0 uppercase">{{ item.tramite_nombretupa }}</div>
  
                    <div class="f-14 f-w-700 text-dark mb-0 mt-2 divb-0">{{ item.negocio_razonsocial }}</div>
                    <div class="f-14 text-gray-600 py-0 mb-0">
                          <span class="f-w-700"> RUC</span> {{ item.negocio_ruc }}</div>
                    <div class="f-14 text-gray-600 py-0 ">{{ item.representantelegal_nombre }}</div>
                  </td>
                  <td>{{ item.documento_codexpediente }}</td>
                  <td class="text-wrap">{{ item.vigencia_observacion }}</td>
                  <td class="fw-bold">
                      {{ FormatFecha.fecha_dd_mm_yyyy(item.fecharegistro) }}<br>
                      <div class="badge text-bg-secondary">{{ FormatFecha.fecha_hhmm_am_pm(item.fecharegistro) }}</div>
                  </td>
                  <td class="text-center">
                    <span   class="badge bg-red-400  f-12"> Rechazadas
                    </span>
                  </td>
                  <td>
                    <!-- ------------------ -->                  
                    <router-link :to="{ name: 'Editarlicencia', params: { idlic: item.idlic } }" class="avtar avtar-xs btn btn-primary mx-1">
                      <i class="ti ti-edit f-20"></i>
                    </router-link>
                    <!-- ------------------ -->
                    <a v-if="item.certificado_url && item.certificado_url !== ''" :href="HOST_URL + item.certificado_url" target="_blank" class="text-dark">
                      <img src="../../assets/images/pdf.png" class="img-fluid w-50">
                    </a>
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
  
  
  
  export default defineComponent({
    components: {
      CardLayout,
      DataTable,
    },
    setup() {
  
      const listaLicencias = ref<Licencia_tabla[]>([]);
      const filtros = ref<filtros_licencia>(initializeLicenciaFiltro());
  
      const cargarLicencias = async () => {
        NProgress.start();
        filtros.value.f_estado = "NULIDAD"; // Aseguramos que el filtro de estado esté establecido
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
        { text: 'RAZON SOCIAL / RUC', width: '30%', key: 'negocio_razonsocial' },
        { text: 'N° EXP', width: '10%', key: 'documento_codexpediente' },
        { text: 'MOTIVO', width: '20%', key: 'motivo_rechazo' },
        { text: 'FECHA IN', width: '10%', key: 'fecharegistro' },
        { text: 'DÍAS', width: '5%', key: 'estado' },
        { text: '', width: '5%', key: 'acciones' },
      ]);
  
      onMounted(cargarLicencias);
  
      return {
        cargarLicencias,
        listaLicencias,
        headers,
        filtros,  
        HOST_URL,
        FormatFecha,
      };
    },
  });
  </script>
  
  
  
  
  
  