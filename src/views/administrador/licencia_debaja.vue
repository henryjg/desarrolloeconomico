<template>
  <!-- Card de filtros -->
  <div class="card mb-3">
    <div class="card-body p-3">
      <div class="d-flex pt-1">
        <div class="d-flex">
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Año</label>
          <select v-model="filtrosAnio" class="form-select form-select-sm bg-light ">
            <option value="">Año</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="d-flex">
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Mes</label>
          <select v-model="filtrosMes" class="form-select form-select-sm bg-light  mx-2">
            <option value="">Mes</option>
            <option v-for="mes in list_meses" :key="mes.value" :value="mes.value">{{ mes.name }}</option>
          </select>
        </div>
        <div class="d-flex">
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Fecha Inicio</label>
          <input v-model="filtrosFechaInicio" type="date" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="Fecha Inicio" />
        </div>
        <div class="d-flex">
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Fecha Fin</label>
          <input v-model="filtrosFechaFin" type="date" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="Fecha Fin" />
        </div>
        <button @click="buscarLicencias" class="btn btn-primary mx-1">
          <i class="ti ti-search"></i> Buscar
        </button>
        <button @click="limpiarFiltros" class="btn btn-secondary btn-sm mx-1">
          <i class="fa fa-broom"></i>
        </button>
      </div>
    </div>
  </div>
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
  import { ref, onMounted, defineComponent, computed } from 'vue';
  import { get_lista_bajas } from '../../services/LicenciaService';
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
      const filtros = ref<filtros_licencia>(initializeLicenciaFiltro());

      // Filtros para el card de arriba
      const currentYear = new Date().getFullYear();
      const years = computed(() => {
        const yearList = [];
        for (let year = currentYear; year >= 2015; year--) {
          yearList.push(year);
        }
        return yearList;
      });
      const filtrosAnio = ref<string | number>('');
      const filtrosMes = ref<string | number>('');
      const filtrosFechaInicio = ref<string>('');
      const filtrosFechaFin = ref<string>('');

      const buscarLicencias = async () => {
        NProgress.start();
        filtros.value.f_anio_registro = filtrosAnio.value ? Number(filtrosAnio.value) : null;
        filtros.value.f_mes_registro = filtrosMes.value ? Number(filtrosMes.value) : null;
        filtros.value.f_fecha_inicio = filtrosFechaInicio.value || null;
        filtros.value.f_fecha_fin = filtrosFechaFin.value || null;
        try {
          const respuesta = await get_lista_bajas(filtros.value);
          listaLicencias.value = respuesta.data;
        } catch (error) {
          console.error('Error al buscar licencias:', error);
        } finally {
          NProgress.done();
        }
      };

      const limpiarFiltros = () => {
        filtrosAnio.value = '';
        filtrosMes.value = '';
        filtrosFechaInicio.value = '';
        filtrosFechaFin.value = '';
        buscarLicencias();
      };

      const cargarLicencias = async () => {
        NProgress.start();
        try {
          const respuesta = await get_lista_bajas(filtros.value);
          listaLicencias.value = respuesta.data;
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
        // Filtros
        years,
        list_meses,
        filtrosAnio,
        filtrosMes,
        filtrosFechaInicio,
        filtrosFechaFin,
        buscarLicencias,
        limpiarFiltros
      };
    },
  });
  </script>
  
  
  
  
  
  