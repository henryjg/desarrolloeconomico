<template>
  <CardLayout :title="'Solicitudes en Proceso'" :clase="'text-success'" :clasehead="'bg-light-300'">
    <!-- Botones de la parte superior derecha -->
    <template #buttons>
      <button @click="cargarLicencias" class="btn btn-light   mx-1">
        <i class="ti ti-refresh"></i> </button>
      <div class="badge f-14 bg-success">En Proceso</div>
    
    </template>

    <!-- Contenido principal de la tarjeta -->
    <template #default>
      
      <DataTable
            :headers="headers"
            :items="listaLicencias"
            :filterKeys="['negocio_razonsocial', 'negocio_ruc', 'representantelegal_nombre', 'negocio_nombrecomercial', 'dir_direccioncomercial', 'documento_codexpediente', 'itse_tipoinspeccion', 'fecharegistro', 'estado']"
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
                    {{ item.negocio_nombrecomercial }}
                </td>
                <td class="text-wrap">
                  <div v-if="item.categoriatramite_tupa==='Autorización'"
                      class=" f-w-700 text-wrap text-danger">Autorización</div>
                  <div v-if="item.categoriatramite_tupa==='Licencia de Funcionamiento'"
                      class=" f-w-700 text-wrap text-yellow-900">Licencia</div>
                </td>
                <td>{{ item.documento_codexpediente }}</td>
                
                <td >
                    {{ FormatFecha.fecha_dd_mm_yyyy(item.fecharegistro) }}<br>
                    <div class="badge text-bg-secondary">{{ FormatFecha.fecha_hhmm_am_pm(item.fecharegistro) }}</div>
                </td>
                <td >
                    {{ FormatFecha.fecha_dd_mm_yyyy(item.fecharecepcion) }}<br>
                    <div class="badge text-bg-secondary">{{ FormatFecha.fecha_hhmm_am_pm(item.fecharecepcion) }}</div>
                </td>
                <td class="text-center">
                  <span v-if="item.epocatramite=='ACTUAL'"
                    :class="FormatFecha.diasTranscurridos(item.fecharecepcion)<=item.tramite_plazo ?
                     'bg-yellow-800' : 'bg-danger' "
                    class="badge   f-12">
                    {{FormatFecha.diasTranscurridos_entredosfechas(item.fecharegistro, item.fecharecepcion)}}
                  </span>
                  
                </td>
                <td>
                  <!-- ------------------ -->                  
                  <router-link :to="{ name: 'Editarlicencia', params: { idlic: item.idlic } }" class=" btn btn-success btn-sm mx-1">
                    <i class="f-20"></i> Procesar
                  </router-link>
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
      filtros.value.f_estado = "EN PROCESO"; // Aseguramos que el filtro de estado esté establecido
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
      { text: '#', width: '2%', key: 'index' },
      { text: 'RAZON SOCIAL / RUC', width: '25%', key: 'negocio_razonsocial' },
      { text: 'Nombre Comercial', width: '20%', key: 'negocio_nombrecomercial' },
      { text: 'Trámite', width: '5%', key: 'categoriatramite_tupa' },
      { text: 'N° EXP', width: '10%', key: 'documento_codexpediente' },
      { text: 'FECHA\nINGRESO', width: '5%', key: 'fecharegistro' },
      { text: 'FECHA\nRECEPCIÓN', width: '5%', key: 'fecharecepcion' },
      { text: 'DÍAS', width: '3%', key: 'estado' },
      { text: 'ACCIÓN', width: '5%', key: 'acciones' },
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





