<template>
  <CardLayout :title="'Autorizaciones Emitidas'" :clase="'text-white'"  :clasehead="'bg-pink-700'">
    <!-- Botones de la parte superior derecha -->
    <template #buttons>
          <div class="d-flex columns justify-content-end ">
            <label class="form-label px-2 text-white align-content-center " >Año:</label>
            <select class="form-select wid-80" v-model="filtros.f_anio_registro">
              <option value="">Año</option>
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
            <label class="form-label px-2 text-white align-content-center" >Mes:</label>
            <select class="form-select wid-120" v-model="filtros.f_mes_registro">
              <option value="">Mes</option>
              <option v-for="mes in list_meses" :key="mes.value" :value="mes.value">{{ mes.name }}</option>
            </select>
            <label class="form-label px-2 text-white align-content-center" >Rango:</label>
            <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_inicio">
            <label class="form-label px-2 text-white align-content-center" >-</label>
            <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_fin">
            <button @click="cargarLicencias" class="btn btn-blue b-dark btn-sm mx-1">
              <i class="ti ti-refresh"></i>
            </button>
            <button @click="resetear" class="btn btn-secondary btn-sm mx-1">
              <i class="fa fa-broom"></i>
            </button>
          </div>
    </template>

    <!-- Contenido principal de la tarjeta -->
    <template #default>
      <DataTable
            :headers="headers"
            :items="listaLicencias"
            :filterKeys="['negocio_razonsocial', 'negocio_ruc', 'representantelegal_nombre', 'dir_direccioncomercial', 'negocio_actividadcomercial', 'certificado_codigo', 'resolucion_codigo', 'resolucion_codigo', 'itse_tipoinspeccion', 'fecharegistro', 'estado']"
            :clasehead="'bg-info-100'"
          >
            <template #default="{ item, index, currentPage, itemsPerPage }">
              <tr>
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td class="text-wrap">
                  <div class="f-14 f-w-600 text-gray mb-0 mt-2 divb-0">{{ item.negocio_razonsocial }}</div>
                  <div class="f-14 text-gray-600 py-0 mb-0">
                        <span class="f-w-700"> RUC</span> {{ item.negocio_ruc }}</div>
                  <div class="f-14 text-gray-600 py-0  ">{{ item.representantelegal_nombre }}</div>
                  <div class="f-14 text-secondary py-0  "> <strong>DIRECCIÓN: </strong> {{ item.dir_direccioncomercial }}</div>
                </td>
                <td class="text-wrap text-sentence">{{ item.negocio_actividadcomercial }}</td>
                <td class="text-wrap">{{ item.autorizacion_codigo }}</td>
                <td class="text-wrap">{{ item.resolucion_codigo }}</td>
                <td class="text-wrap"><div class="badge bg-pink-700">{{ item.documento_codexpediente }}</div></td>
                <td class="fw-bold text-center">
                    {{ FormatFecha.fecha_yyyy(item.fechaemision) }}<br>
                    {{ FormatFecha.fecha_mm(item.fechaemision) }}<br>
                </td>
                <td class="fw-bold text-center">
                    {{ FormatFecha.fecha_dd_mm_yyyy(item.fechaemision) }}<br>
                    <div class="badge text-bg-secondary">{{ FormatFecha.fecha_hhmm_am_pm(item.fechaemision) }}</div>
                </td>
                
                <td class="text-wrap">
                  <!-- ------------------ -->                  
                  <router-link :to="{ name: 'Detalle_Emision', params: { idlic: item.idlic } }"
                               class=" btn btn-secondary px-2 d-inline-flex rounded-2">
                    <i class="ti ti-eye"></i>
                  </router-link>
                  <!-- ------------------ -->
                  <a v-if="checkValue(item.certificado_url) !== 'N/A'" :href="HOST_URL + item.certificado_url" target="_blank" class="text-dark">
                    <img src="../../assets/images/pdf.png" class="img-fluid wid-35">
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
import { ref, onMounted, defineComponent, computed } from 'vue';
import { get_tabla_licencias_emtidas } from '../../services/LicenciaService';
import { filtros_licencia, initializeLicenciaFiltro } from '../../interfaces/filtros.interface'; 
import { Licencia_tabla } from '../../interfaces/licencia.interfaces';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { list_meses } from '../../utils/listas.fijas';



export default defineComponent({
  components: {
    CardLayout,
    DataTable,
  },
  setup() {

    const listaLicencias = ref<Licencia_tabla[]>([]);
    const currentYear = new Date().getFullYear(); // Año actual
    const currentMonth = new Date().getMonth() + 1; // Mes actual (1-12)
    // Inicializa el filtro de año y mes con los valores actuales
    const filtros = ref<filtros_licencia>({
      ...initializeLicenciaFiltro(),
      f_anio_registro: currentYear,
      f_mes_registro: currentMonth
    });

    const cargarLicencias = async () => {
      NProgress.start();
      filtros.value.f_estado = "EMITIDO";
      filtros.value.f_categoria = "Autorización";
      // Si el año o mes no están definidos, los pone en el actual
      if (!filtros.value.f_anio_registro) {
        filtros.value.f_anio_registro = currentYear;
      }
      if (!filtros.value.f_mes_registro) {
        filtros.value.f_mes_registro = currentMonth;
      }
      try {
        const respuesta = await get_tabla_licencias_emtidas(filtros.value);
        listaLicencias.value = respuesta.data;
      } catch (error) {
        console.error('Error al cargar las licencias:', error);
      } finally {
        NProgress.done();
      }
    };
    const years = computed(() => {
      const yearList = [];
      for (let year = currentYear; year >= 2015; year--) {
        yearList.push(year);
      }
      return yearList;
    });

    const headers = ref([
      { text: '#', width: '3%', key: 'index' }, 
      { text: 'RAZON SOCIAL / RUC', width: '35%', key: 'negocio_razonsocial' },
      { text: 'ACTIVIDAD', width: '15%', key: 'negocio_actividadcomercial' },

      { text: 'CÓDIGO AUTORIZACIÓN', width: '10%', key: 'autorizacion_codigo' },
      { text: 'CÓDIGO RESOLUCIÓN', width: '10%', key: 'resolucion_codigo' },
      { text: 'CÓDIGO\n EXP', width: '10%', key: 'documento_codexpediente' },
      { text: 'AÑO', width: '5%', key: 'fechaemision' },
      { text: 'FECHA EMISIÓN', width: '10%', key: 'fechaemision' },
      { text: '', width: '7%', key: 'acciones' },
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    const resetear = () => {
      filtros.value = {
        ...initializeLicenciaFiltro(),
        f_anio_registro: currentYear,
        f_mes_registro: currentMonth
      };
      cargarLicencias();
    };

    onMounted(cargarLicencias);

    return {
      listaLicencias,
      headers,
      filtros,  
      HOST_URL,
      FormatFecha,
      checkValue,
      cargarLicencias,
      years,list_meses,
      resetear
    };
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





