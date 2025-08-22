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
          <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Día</label>
          <input v-model="filtrosDia" type="text" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="Día" />
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
  <!-- Card principal -->
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
                     <!-- Botón Editar -->
              <button class="btn btn-warning btn-sm mx-1" @click="abrirModalEditar(item.idlic)">
                <i class="fas fa-edit"></i> Editar
              </button>            
                  <!-- Procesar ahora navega directo a Generarlicencia -->
                  <router-link :to="{ name: 'Generarlicencia', params: { idlic: item.idlic } }" class=" btn btn-success btn-sm mx-1">
                    <i class="f-20"></i> Procesar
                  </router-link>
                  <!-- ------------------ -->
                </td>
              </tr>
            </template>
          </DataTable>
            <!-- Modal de edición -->
      <ModalEditarLicencia
        v-if="showModalEditar && idLicenciaEditar > 0"
        :showModal="showModalEditar"
        :idlicencia="idLicenciaEditar"
        @close="cerrarModalEditar"
        @updated="onLicenciaActualizada"
      />
    </template>
  </CardLayout>
</template>

<script lang="ts">
import DataTable from '../../components/table/DataTable.vue';
import CardLayout from '../../layout/CardLayout.vue';
import { ref, onMounted, defineComponent, computed } from 'vue';
import { get_listar_licencias } from '../../services/LicenciaService';
import { filtros_licencia, initializeLicenciaFiltro } from '../../interfaces/filtros.interface';
import { Licencia_tabla } from '../../interfaces/licencia.interfaces';
import NProgress from 'nprogress';
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { list_meses } from '../../utils/listas.fijas';
import ModalEditarLicencia from '../../components/modal_editar_licencia.vue';

export default defineComponent({
  components: {
    CardLayout,
    DataTable,
    ModalEditarLicencia
  },
  setup() {
    const listaLicencias = ref<Licencia_tabla[]>([]);
    const filtros = ref<filtros_licencia>(initializeLicenciaFiltro());
    const showModalEditar = ref(false);
    const idLicenciaEditar = ref<number>(0);

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
    const filtrosDia = ref<string>('');

    const buscarLicencias = async () => {
      NProgress.start();
      // Setear los filtros en el objeto filtros
      filtros.value.f_estado = 'EN PROCESO';
      filtros.value.f_anio_registro = filtrosAnio.value ? Number(filtrosAnio.value) : null;
      filtros.value.f_mes_registro = filtrosMes.value ? Number(filtrosMes.value) : null;
      filtros.value.f_fecha_inicio = null;
      filtros.value.f_fecha_fin = null;
      // Si hay día, filtra por fecha exacta
      if (filtrosAnio.value && filtrosMes.value && filtrosDia.value) {
        const mes = String(filtrosMes.value).padStart(2, '0');
        const dia = String(filtrosDia.value).padStart(2, '0');
        filtros.value.f_fecha_inicio = `${filtrosAnio.value}-${mes}-${dia}`;
        filtros.value.f_fecha_fin = `${filtrosAnio.value}-${mes}-${dia}`;
      }
      try {
        const respuesta = await get_listar_licencias(filtros.value);
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
      filtrosDia.value = '';
      buscarLicencias();
    };

    const cargarLicencias = async () => {
      NProgress.start();
      filtros.value.f_estado = 'EN PROCESO';
      try {
        const respuesta = await get_listar_licencias(filtros.value);
        listaLicencias.value = respuesta.data;
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

    const abrirModalEditar = (idlic: number) => {
      idLicenciaEditar.value = idlic;
      showModalEditar.value = true;
    };
    const cerrarModalEditar = () => {
      showModalEditar.value = false;
      idLicenciaEditar.value = 0;
    };
    const onLicenciaActualizada = () => {
      cargarLicencias();
    };

    onMounted(cargarLicencias);

    return {
      cargarLicencias,
      listaLicencias,
      headers,
      filtros,
      HOST_URL,
      FormatFecha,
      showModalEditar,
      idLicenciaEditar,
      abrirModalEditar,
      cerrarModalEditar,
      onLicenciaActualizada,
      // Filtros
      years,
      list_meses,
      filtrosAnio,
      filtrosMes,
      filtrosDia,
      buscarLicencias,
      limpiarFiltros
    };
  },
});
</script>





