<template>
  
      
        <div class="d-print-none card mb-3">
          <div class="card-body p-3 ">
              <div class="row g-1">
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Tipo Doc.</label>
                  <select v-model="filtrosBusqueda.tipodocumento" class="form-select form-select-sm bg-light">
                    <option value="">Tipo Doc.</option>
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Nro Doc.</label>
                  <input v-model="filtrosBusqueda.numdocumento" type="text" class="form-control form-control-sm bg-light" placeholder="Nro Expediente" />
                </div>
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Nombre</label>
                  <input v-model="filtrosBusqueda.nombre" type="text" class="form-control form-control-sm bg-light" placeholder="Nombre" />
                </div>
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Apellido Pat.</label>
                  <input v-model="filtrosBusqueda.apellidopat" type="text" class="form-control form-control-sm bg-light" placeholder="Apellido Paterno" />
                </div>
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Apellido Mat.</label>
                  <input v-model="filtrosBusqueda.apellidomat" type="text" class="form-control form-control-sm bg-light" placeholder="Apellido Materno" />
                </div>
              </div>
              <div class="row g-1 mt-0">
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Año</label>
                  <select v-model="filtrosBusqueda.anio" class="form-select form-select-sm bg-light" >
                    <option value="">Año</option>
                    <option v-for="year in years" :key="year" :value="year">
                      {{ year }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Mes</label>
                  <select v-model="filtrosBusqueda.mes" class="form-select form-select-sm bg-light">
                    <option value="">Mes</option>
                    <option v-for="mes in list_meses" :key="mes.value" :value="mes.value">{{ mes.name }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-2">
                  <label class="form-label text-secondary text-sm f-w-600">Dia</label>
                  <div class="input-group input-group-sm bg-white">
                    <button type="button" class="btn btn-secondary btn-sm" @click="Number(filtrosBusqueda.dia) > 1 && (filtrosBusqueda.dia = String(Number(filtrosBusqueda.dia) - 1))">-</button>
                    <input
                      type="number"
                      min="1"
                      class="form-control text-center no-arrows"
                      v-model.number="filtrosBusqueda.dia"
                    />
                    <button type="button" class="btn btn-secondary btn-sm" @click="filtrosBusqueda.dia = String(Number(filtrosBusqueda.dia) + 1)">+</button>
                  </div>
                </div>
                <div class="col-12 col-md-2 d-flex align-items-end">
                  <button @click="BuscarPersonas" class="btn btn-success w-100">
                    <i class="ti ti-search"></i> Buscar
                  </button>
                </div>
                <div class="col-12 col-md-2 d-flex align-items-end">
                  <button @click="resetear" class="btn btn-secondary btn-sm w-100">
                    <i class="fa fa-broom"></i>
                  </button>
                </div>
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
                  <td>{{ item.numerodocumento }} - 2022</td>
                  <td>
                    <div class="d-inline-block align-middle">
                      <div class="d-inline-block text-wrap">
                        <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                          <span v-if="item.prioridad==='Urgente'" class="badge  bg-red-300 f-12">
                            <i class="fa fa-exclamation-triangle p-r-5"></i>Urgente</span> {{ item.asunto }} 
                        </p>
                        <p class="m-b-0 text-gray-600  text-justify f-12"  style=" line-height: 1.2;">
                            {{ item.descripcion }} 
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
                        <p class="m-b-0 text-gray-600 f-12">{{ item.fecharegistro}}</p> 
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
// import { get_listadocumentos_mesapartes_enviados, buscar_documentos_personas } from '../../../services/DocumentoServices';
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
    // Filtros para búsqueda de personas
    const filtrosBusqueda = ref({
      nombre: '',
      apellidopat: '',
      apellidomat: '',
      tipodocumento: '',
      numdocumento: '',
      dia: '',
      mes: '',
      anio: ''
    });

    const iddocumento_seleccionado = ref(0);

    const openRuta_modal = (idoc: number) => {
      iddocumento_seleccionado.value = idoc;
      const modalElement = document.getElementById('ruta_Modal');
      if (modalElement) {
        const modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
    };

    // Función para buscar personas with los filtros
    const BuscarPersonas = async () => {
      try {
        NProgress.start();
        const params = { ...filtrosBusqueda.value };
        (Object.keys(params) as Array<keyof typeof filtrosBusqueda.value>).forEach(key => {
          if (params[key] === '') delete params[key];
        });
        const RespuestaJSON = await buscar_documentos_personas(params);
        if (RespuestaJSON.success) {
          Lista_documentos.value = RespuestaJSON.data || [];
        } else {
          Lista_documentos.value = [];
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error en la búsqueda de personas:', error);
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
        filtrosBusqueda.value = {
          nombre: '',
          apellidopat: '',
          apellidomat: '',
          tipodocumento: '',
          numdocumento: '',
          dia: '',
          mes: '',
          anio: ''
        };
    };

    // onMounted(CargarExpedientes);


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
      filtrosBusqueda,
      BuscarPersonas,
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

