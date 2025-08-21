<template>
    <CardLayout :title="'Solicitudes Rechazadas'" :clase="'text-white'" :clasehead="'bg-red-300'">
      <!-- Botones de la parte superior derecha -->
      <template #buttons>
        <button @click="cargarLicencias" class="btn btn-light   mx-1">
          <i class="ti ti-refresh"></i> </button>
        <div class="badge f-14 bg-red-300">Rechazados</div>
      </template>
  
      <!-- Contenido principal de la tarjeta -->
      <template #default>
        <DataTable
              :headers="headers"
              :items="listaLicencias"
              :filterKeys="['negocio_razonsocial', 'negocio_ruc', 'negocio_nombrecomercial', 'representantelegal_nombre', 'dir_direccioncomercial', 'categoriatramite_tupa', 'documento_codexpediente', 'itse_tipoinspeccion', 'fecharegistro', 'estado']"
              :clasehead="'bg-red-100'"
            >
              <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr>
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td class="text-wrap">
                    <div class="f-14 f-w-600 text-gray mb-0 mt-2 divb-0">{{ item.negocio_razonsocial }}</div>
                    <div class="f-14 text-gray-600 py-0 mb-0">
                          <span class="f-w-700"> RUC</span> {{ item.negocio_ruc }}</div>
                    <div class="f-14 text-gray-600 py-0 ">{{ item.representantelegal_nombre }}</div>
                  </td>
                  <td class="text-wrap">
                    {{ item.negocio_nombrecomercial }}
                  </td>
                  <td class="text-wrap">
                    <div v-if="item.categoriatramite_tupa==='Autorización'"
                        class=" f-w-700 text-wrap text-danger">Autorización</div>
                    <div v-if="item.categoriatramite_tupa==='Licencia de Funcionamiento'"
                        class=" f-w-700 text-wrap text-yellow-900">Licencia</div>
                  </td>
                  <td>{{ item.documento_codexpediente }}</td>
                  <td class="text-wrap">{{ item.vigencia_observacion }}</td>
                  <td >
                      {{ FormatFecha.fecha_dd_mm_yyyy(item.fecharegistro) }}<br>
                      <div class="badge text-bg-secondary">{{ FormatFecha.fecha_hhmm_am_pm(item.fecharegistro) }}</div>
                  </td>
                
                  <td>
                    <!-- ------------------ -->                  
                    <!-- <router-link :to="{ name: 'Editarlicencia', params: { idlic: item.idlic } }" class="avtar avtar-xs btn btn-primary mx-1">
                      <i class="ti ti-edit f-20"></i>
                    </router-link> -->
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
        filtros.value.f_estado = "RECHAZADA"; // Aseguramos que el filtro de estado esté establecido
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
        { text: 'NOMBRE COMERCIAL', width: '20%', key: 'negocio_nombrecomercial' },
        { text: 'Trámite', width: '5%', key: 'categoriatramite_tupa' },
        { text: 'N° EXP', width: '10%', key: 'documento_codexpediente' },
        { text: 'MOTIVO', width: '30%', key: 'motivo_rechazo' },
        { text: 'FECHA IN', width: '5%', key: 'fecharegistro' },
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
  
  
  
  
  
  