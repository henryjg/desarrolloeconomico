<template>
  <!-- Card de filtros -->
  <div class="card mb-3">
    <div class="card-body p-3">
      <div class="d-flex pt-1 flex-wrap">
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
        <div class="d-flex">
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Código</label>
          <input v-model="filtrosCodigo" type="text" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="Código" />
        </div>
        <div class="d-flex">
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">N° Documento</label>
          <input v-model="filtrosNumeroDocumento" type="text" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="N° Documento" />
        </div>
        <div class="d-flex">
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Dirección</label>
          <input v-model="filtrosDireccion" type="text" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="Dirección" />
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

  <div class="card">
    <div class="card-body mx-0 p-1">
      <DataTable
        :headers="headers"
        :items="listaLicencias"
        :filterKeys="['negocio_razonsocial', 'negocio_ruc', 'representantelegal_nombre', 'dir_direccioncomercial', 'documento_codexpediente', 'certificado_codigo', 'itse_tipoinspeccion', 'fecharegistro', 'estado']"
        :clasehead="'bg-info-200'"
        style=" line-height: 1.2; font-size: 12px;"
      >
        <template #default="{ item, index, currentPage, itemsPerPage }">
          <tr>
            <td class="mx-0 text-center f-12 px-1">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td class="text-wrap f-12 f-w-500">{{ item.negocio_razonsocial }}</td>
            <td class="text-wrap">{{ item.negocio_ruc }}</td>
            <td class="text-wrap">{{ item.representantelegal_nombre }}</td>
            <td class="text-wrap">{{ item.dir_direccioncomercial }}</td>
            <td class="text-wrap">{{ item.documento_codexpediente }}</td>
            <td class="text-wrap">{{ item.certificado_codigo }}</td>
            <td class="text-wrap">{{ item.itse_tipoinspeccion }}</td>
            <td class="text-wrap">{{ FormatFecha.fecha_dd_mm_yyyy(item.fecharegistro) }}</td>
            <td class="text-wrap">{{ item.estado }}</td>
          </tr>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import DataTable from '../../../components/table/DataTable.vue';
import { ref, onMounted, defineComponent, computed } from 'vue';
import NProgress from 'nprogress';
import { HOST_URL } from '../../../config';
import { FormatFecha } from '../../../utils/FormatFecha';
import { list_meses } from '../../../utils/listas.fijas';
import { get_tabla_licencias_emtidas } from '../../../services/LicenciaService';

export default defineComponent({
  components: {
    DataTable,
  },
  setup() {
    const listaLicencias = ref<any[]>([]);
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
    const filtrosCodigo = ref<string>('');
    const filtrosNumeroDocumento = ref<string>('');
    const filtrosDireccion = ref<string>('');

    const buscarLicencias = async () => {
      NProgress.start();
      const filtros: any = {
        f_estado: "EMITIDO",
        f_categoria: "Licencia de Funcionamiento",
        f_anio_registro: filtrosAnio.value ? Number(filtrosAnio.value) : null,
        f_mes_registro: filtrosMes.value ? Number(filtrosMes.value) : null,
        f_fecha_inicio: filtrosFechaInicio.value || null,
        f_fecha_fin: filtrosFechaFin.value || null,
        f_codigo: filtrosCodigo.value || null,
        f_numero_documento: filtrosNumeroDocumento.value || null,
        f_direccion: filtrosDireccion.value || null,
      };
      try {
        const respuesta = await get_tabla_licencias_emtidas(filtros);
        listaLicencias.value = respuesta.data || [];
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
      filtrosCodigo.value = '';
      filtrosNumeroDocumento.value = '';
      filtrosDireccion.value = '';
      buscarLicencias();
    };

    const headers = ref([
      { text: '#', width: '3%', key: 'index' },
      { text: 'RAZON SOCIAL', width: '15%', key: 'negocio_razonsocial' },
      { text: 'RUC', width: '10%', key: 'negocio_ruc' },
      { text: 'REPRESENTANTE', width: '15%', key: 'representantelegal_nombre' },
      { text: 'DIRECCIÓN', width: '15%', key: 'dir_direccioncomercial' },
      { text: 'CÓDIGO EXP', width: '10%', key: 'documento_codexpediente' },
      { text: 'CÓDIGO LICENCIA', width: '10%', key: 'certificado_codigo' },
      { text: 'TIPO INSPECCIÓN', width: '10%', key: 'itse_tipoinspeccion' },
      { text: 'FECHA REGISTRO', width: '10%', key: 'fecharegistro' },
      { text: 'ESTADO', width: '7%', key: 'estado' },
    ]);

    onMounted(() => {
      buscarLicencias();
    });

    return {
      listaLicencias,
      headers,
      HOST_URL,
      FormatFecha,
      years,
      list_meses,
      filtrosAnio,
      filtrosMes,
      filtrosFechaInicio,
      filtrosFechaFin,
      filtrosCodigo,
      filtrosNumeroDocumento,
      filtrosDireccion,
      buscarLicencias,
      limpiarFiltros,
    };
  },
});
</script>