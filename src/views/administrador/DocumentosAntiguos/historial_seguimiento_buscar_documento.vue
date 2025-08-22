<template>
      
          <div>
            <div class="d-print-none card mb-3">
              <div class="card-body p-3">
                <div class="d-flex columns justify-content-start flex-wrap">
                  <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">N° Documento Interno</label>
                  <input v-model="filtrosInternoBuscar.nrodocumento" type="number" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="N° Documento" />
                  <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Año</label>
                  <select v-model="filtrosInternoBuscar.anio" class="form-select form-select-sm bg-light wid-150 mx-2">
                    <option value="">Año</option>
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                  </select>
                  <button @click="BuscarDocumentoInternoPorNumero" class="btn btn-success mx-1">
                    <i class="ti ti-search"></i> Buscar
                  </button>
                  <button @click="resetearInternoBuscar" class="btn btn-secondary btn-sm mx-1">
                    <i class="fa fa-broom"></i>
                  </button>
                </div>
              </div>
            </div>


            <div class="card">
              <div class="card-body mx-0 p-1">
                <DataTable
                  :headers="headers"
                  :items="Lista_documentos"
                  :filterKeys="['asunto', 'procedencia',  'numerodocumento', 'cabecera', 'codigo', 
                                'administrado_nombre', 'administrado_apellidomat', 'administrado_apellidopat', 
                                'pase_nombre_destino', 'fecharegistro','usuario_nombre']"
                  :clasehead="'bg-info-100'"
                >
                  <template #default="{ item, index, currentPage, itemsPerPage }">
                    <tr>
                      <td  class="px-0 mx-0 text-center f-12 px-1">{{ index + 1 }}</td>
                      <td v-if="item.administrado_tipodocumento==='DNI'" class="text-wrap f-12 f-w-500" >
                          {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }}
                      </td>
                      <td v-else class="text-wrap f-12 f-w-600">{{ item.administrado_razonsocial }} </td>
                    
                    
                      <td class="px-2 mx-0 ">
                          <span v-if="item.procedencia==='ExternoCasilla'" class="badge bg-yellow f-10">
                            Casilla E.
                          </span>
                          <span v-if="item.procedencia==='Externo'" class="badge bg-red-300 f-10">
                            Presencial
                          </span> 
                          <span v-if="item.procedencia==='ExternoVirtual'" class="badge bg-primary f-10">
                            MP Virtual
                          </span> 
                          <span v-if="item.procedencia==='Interno'" class="badge bg-success f-10">Interno</span>
                      </td>
                      <td>{{ item.numerodocumento }} - {{ item.anio }}</td>
                      <td>
                        <div class="d-inline-block align-middle">
                          <div class="d-inline-block text-wrap">
                            <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                                {{ item.tipodocumento_nombre }} {{ item.cabecera }} 
                            </p>  
                            <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-600 f-12 uppercase text-gray-600">
                                <div v-if="item.administrado_numdocumento==='RUC'">(Adm: {{ item.administrado_razonsocial }})</div>
                                <div v-else>(Adm: {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }})</div>
                            </p>  
                            <p v-if="item.procedencia==='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                                {{ item.tipodocumento_nombre }} - N° - {{ item.numeracion_tipodoc_oficina }} - {{ item.anio }} - {{ item.buzon_sigla }} - MDVO/D
                            </p> 
                            <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                              {{ item.asunto }} 
                              <span v-if="item.prioridad==='Urgente'" class="badge  bg-red-300 f-w-600 f-10">
                                Urgente</span> 
                              <span v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600 f-10">
                                Proyectado</span> 
                            </p>
                            <p class="m-b-0 text-primary  text-justify f-12"  style=" line-height: 1.2;">
                                {{ item.descripcion }} 
                            </p>
                            <p class="m-b-0 text-orange-900 f-w-500 f-12 pt-2 text-italic"  style=" line-height: 1.2;">
                              <span v-if="item.proveido!==''" > {{ item.proveido }}</span>
                            </p>
                          </div>
                        </div>
                      </td> 
                      <td>
                        {{ item.folios }}
                      </td>
                      <td class="text-wrap f-12 f-w-500">
                        {{ item.pase_buzondestino_nombre }}
                      </td>
                    
                      <td  class="px-2 mx-0 text-center text-wrap">
                            <p class="m-b-0 text-gray-600 f-12">{{ item.fecharegistro }}</p> 
                      </td>
                      <td  class="px-2 mx-0 text-wrap  ">
                          <p class="m-b-0 text-yellow-900 f-12 f-w-500"> {{ item.usuario_nombre }}</p>
                      </td>
                    
                      <td  class="px-2 mx-0 text-center">
                        <button @click="openRuta_modal(item.iddoc)" class="btn btn-sm rounded-2 px-2 btn-success">
                          <i class="ti ti-search f-20"></i>
                        </button>
                      </td>
                    </tr>
                  </template>
                </DataTable>
              </div>
            </div>
          </div>
      
        <!-- Modal for document details -->
        <Modal_ruta :id="iddocumento_seleccionado" />
</template>

<script lang="ts">
import DataTable from '../../../components/table/DataTable.vue';  
import CardLayout from '../../../layout/CardLayout.vue';  
import Modal_ruta from '../../../components/Modal_ruta.vue';
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../../config';
import { FormatFecha } from '../../../utils/FormatFecha';
import { list_meses } from '../../../utils/listas.fijas';
import { DocumentoFull } from '../../../interfaces/documento.interface';
// import { get_listadocumentos_mesapartes_enviados, get_lista_documento_Interno_buscar } from '../../../services/DocumentoServices';
import Notif from '../../../utils/notificaciones';
import { usarAuthStore } from '../../../stores/autentificacionStore';
// import { initializeFiltro,filtros } from '../../../interfaces/filtros.interface';
import { Modal } from 'bootstrap';

export default defineComponent({
  components: {
    CardLayout,
    DataTable,
    Modal_ruta,
  },
  setup() {

    const authStore = usarAuthStore();
    const Usuario = computed(() => authStore.usuario_Logueado);
    const activeTab = ref('politicas');
    const filtros = ref<filtros>(initializeFiltro());

    const Lista_documentos = ref<DocumentoFull[]>([]);
    const currentYear = new Date().getFullYear(); // Año actual

    
    const years = computed(() => {
      const yearList = [];
      for (let year = currentYear; year >= 2015; year--) {
        yearList.push(year);
      }
      return yearList;
    });

    const headers = ref([
      { text: '#', width: '8px', key: 'index', type: 'string' as const, sortable: false, filterable: false }, 
      { text: 'SOLICITANTE', width: '20%', key: 'administrado_nombre', type: 'string' as const, sortable: true, filterable: false },
      { text: 'Origen', width: '5%', key: 'procedencia', type: 'string' as const, sortable: false, filterable: false },
      { text: 'Nº EXP.', width: '5%', key: 'codigo', type: 'string' as const, sortable: true, filterable: false },
      { text: 'ASUNTO', width: '35%', key: 'asunto', type: 'string' as const, sortable: false, filterable: false },
      { text: 'FOLIOS', width: '5%', key: 'folios', type: 'number' as const, sortable: false, filterable: false },
      { text: 'DESTINO', width: '10%', key: 'pase_buzondestino_nombre', type: 'string' as const, sortable: true, filterable: true },
      { text: 'FECHA_REC', width: '5%', key: 'fecharegistro', type: 'date' as const, sortable: true, filterable: false },
      { text: 'USUARIO', width: '5%', key: 'usuario_nombre', type: 'string' as const, sortable: true, filterable: false },
      { text: '', width: '7%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    const resetear= () =>{
      resetearInternoBuscar();
    };

    // onMounted(CargarExpedientes);

    const filtrosInternoBuscar = ref({
      nrodocumento: '',
      anio: ''
    });

    // Método para buscar documentos internos por número y año
    const BuscarDocumentoInternoPorNumero = async () => {
      try {
        NProgress.start();
        const params: any = { ...filtrosInternoBuscar.value };
        Object.keys(params).forEach(key => {
          if (params[key] === '' || params[key] === null) delete params[key];
        });
        const respuesta = await get_lista_documento_Interno_buscar(params);
        if (respuesta.success) {
          Lista_documentos.value = respuesta.data || [];
        } else {
          Lista_documentos.value = [];
          Notif.Error(respuesta.message);
        }
      } catch (error) {
        console.error('Error en la búsqueda de documento interno por número:', error);
      } finally {
        NProgress.done();
      }
    };

    // Método para limpiar el formulario y resultados de búsqueda por número interno
    const resetearInternoBuscar = () => {
      filtrosInternoBuscar.value = {
        nrodocumento: '',
        anio: ''
      };
      Lista_documentos.value = [];
    };

    const iddocumento_seleccionado = ref(0);

    const openRuta_modal = (idoc: number) => {
      iddocumento_seleccionado.value = idoc;
      const modalElement = document.getElementById('ruta_Modal');
      if (modalElement) {
        const modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
    };

    return {
      headers,
      HOST_URL,
      FormatFecha,
      checkValue,
      Lista_documentos,
      years,
      list_meses,
      resetear,
      NumberFormat,
      Usuario,
      activeTab,
      filtros,
      filtrosInternoBuscar,
      BuscarDocumentoInternoPorNumero,
      resetearInternoBuscar,
      iddocumento_seleccionado,
      openRuta_modal,
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





