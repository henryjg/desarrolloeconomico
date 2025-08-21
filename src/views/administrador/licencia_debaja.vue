<template>
    <CardLayout :title="'Licencias en Baja | Nulidad | Revocada'" :clase="'text-white'" :clasehead="'bg-red-300'">
      <!-- Botones de la parte superior derecha -->
      <template #buttons>
        <div class="d-flex columns justify-content-end ">
          <button @click="cargarLicencias" class="btn btn-light  btn-sm mx-1">
            <i class="ti ti-refresh"></i> </button>
          
        </div>
        
      </template>
  
      <!-- Contenido principal de la tarjeta -->
      <template #default>
        <DataTable
              :headers="headers"
              :items="listaLicencias"
              :filterKeys="['negocio_razonsocial', 'negocio_ruc', 'representantelegal_nombre', 'dir_direccioncomercial', 'documento_codexpediente', 'certificado_codigo', 'itse_tipoinspeccion', 'fecharegistro', 'estadotramite']"
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
                  <td>{{ item.certificado_codigo }}</td>
                  <td class="text-wrap">{{ item.vigencia_observacion }}</td>
                  <td class="fw-bold">
                      {{ FormatFecha.fecha_dd_mm_yyyy(item.fecharegistro) }}<br>
                      <div class="badge text-bg-secondary">{{ FormatFecha.fecha_hhmm_am_pm(item.fecharegistro) }}</div>
                  </td>
                  <td class="text-center">
                    <span v-if="item.estadotramite=='EMITIDO_BAJA'" class="badge bg-red-400  f-12"> DE BAJA </span>
                    <span v-if="item.estadotramite=='EMITIDO_NULIDAD'" class="badge bg-blue-700  f-12"> NULIDAD </span>
                    <span v-if="item.estadotramite=='EMITIDO_REVOCADA'" class="badge bg-yellow-800  f-12"> REVOCADA </span>
                  </td>
                  <td>
                    
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
  import { get_lista_bajas } from '../../services/LicenciaService';
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
        try {
          const respuesta = await get_lista_bajas(filtros.value);
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
        { text: 'CÓDIGO EXP', width: '10%', key: 'documento_codexpediente' },
        { text: 'CÓDIGO LICENCIA', width: '10%', key: 'motivo_rechazo' },
        { text: 'MOTIVO', width: '20%', key: 'motivo_rechazo' },
        { text: 'FECHA IN', width: '10%', key: 'fecharegistro' },
        { text: 'ESTADO', width: '5%', key: 'estado' },
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
  
  
  
  
  
  