<template>
  
             <!-- -------------------------- -->
            <div class="d-print-none card mb-3">
              <div class="card-body p-3">
                <!-- -------------------------- -->
                <div class="row">
                  <!-- -------------------------- -->
                  <div class="col-6 d-flex align-items-center">
                    <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center text-nowrap">Oficina Origen</label>
                    <Multiselect
                      v-model="filtrosInternos.buzonorigen_nombre"
                      class="f-6 mx-2"
                      style="min-width: 250px; "
                      :options="ListaOficinas"
                      label="nombre"
                      track-by="id"
                      placeholder="Seleccionar"
                      selectLabel=""
                      deselectLabel=""
                      selectedLabel=""
                      :allow-empty="true"
                      :clear-on-select="true"
                    />
                  </div>
                  <!-- --------------------------- -->
                   <div class="col-4 d-flex align-items-center">
                    <label class="form-label px-2 text-secondary text-sm f-w-600 text-nowrap">Tipo Documento</label>
                    <Multiselect
                      v-model="filtrosInternos.tipodocumento_nombre"
                      class="f-6 mx-2"
                      style="min-width: 220px;"
                      :options="ListaSinProveido_TipoDocumento"
                      label="nombre"
                      track-by="id"
                      placeholder="Seleccionar"
                      selectLabel=""
                      deselectLabel=""
                      selectedLabel=""
                      :allow-empty="true"
                      :clear-on-select="true"
                    />
                  </div>
                </div>
                <!-- -------------------------- -->
                <div class="d-flex pt-1">
                    <div class="d-flex">
                      <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Año</label>
                      <select v-model="filtrosInternos.anio" class="form-select form-select-sm bg-light ">
                        <option value="">Año</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                      </select>
                    </div>
                    <div class="d-flex">
                      <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Mes</label>
                      <select v-model="filtrosInternos.mes" class="form-select form-select-sm bg-light  mx-2">
                        <option value="">Mes</option>
                        <option v-for="mes in list_meses" :key="mes.value" :value="mes.value">{{ mes.name }}</option>
                      </select>
                    </div>

                    <div class="d-flex">
                      <label class="form-label px-2 text-secondary text-sm f-w-600 align-content-center">Dia</label>
                      <input v-model="filtrosInternos.dia" type="text" class="form-control form-control-sm bg-light wid-150 mx-2" placeholder="Dia" />
                    </div>

                    <button @click="BuscarDocumentosInternos" class="btn btn-primary mx-1">
                      <i class="ti ti-search"></i> Buscar
                    </button>
                    <button @click="resetearInternos" class="btn btn-secondary btn-sm mx-1">
                      <i class="fa fa-broom"></i>
                    </button>
                </div>
                <!-- -------------------------- -->
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
                  :clasehead="'bg-info-200'"
                  style=" line-height: 1.2; font-size: 12px;"
                >
                  <template #default="{ item, index, currentPage, itemsPerPage }">
                    <tr>
                      <td  class=" mx-0 text-center f-12 px-1">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>
                      <td  class="text-wrap f-12 f-w-500" >
                          {{ item.buzonorigen_nombre }}
                      </td>
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
                      <td class="f-12">{{ item.numerodocumento }} - {{ item.anio }}</td>
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
                              <badge v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600 f-10">
                                Proyectado</badge> 
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
                        {{ item.pase_nombre_destino }}
                      </td>
                
                      <td  class="px-2 mx-0 text-center text-wrap">
                        <p class="m-b-0 text-gray-600 text-sm">{{ FormatFecha.convertirFecha_sola(item.fecharegistro) }}</p>
                        <p class="m-b-0 text-gray-600 text-sm">{{ FormatFecha.convertirFecha_horasola(item.fecharegistro) }}</p>
                      </td>
                      <td  class="px-2 mx-0 text-left">
                          <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-danger btn-sm">
                            <i class="fa fa-file-pdf f-20"></i> 
                          </a>
                          <a v-if="item.pdf_anexo1!==null"  :href="item.pdf_anexo1" target="_blank"  class="btn btn-danger bg-gray-800 border-0 btn-sm mx-1">
                            <i class="fa fa-file-pdf text-white f-20"></i> 
                          </a>
                          <a v-if="item.pdf_anexo2!==null"  :href="item.pdf_anexo2" target="_blank"  class="btn btn-danger  bg-gray-600 border-0 btn-sm">
                            <i class="fa fa-file-pdf text-white f-20"></i> 
                          </a>
                       </td>
                       <td  class="px-2 mx-0 text-center">
                         <button @click="openRuta_modal(item.primogenio_id)" class="btn btn-sm rounded-2 px-2 btn-success">
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
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../../config';
import { FormatFecha } from '../../../utils/FormatFecha';
import { list_meses } from '../../../utils/listas.fijas';
import {  DocumentoFull } from '../../../interfaces/documento.interface';
import { buscar_documentos_internos, get_listadocumentos_mesapartes_enviados, get_lista_documento_Interno_buscar } from '../../../services/DocumentoServices';
import Notif from '../../../utils/notificaciones';
import Alerta from '../../../utils/alertas';
import { usarAuthStore } from '../../../stores/autentificacionStore';
import { initializeFiltro,filtros } from '../../../interfaces/filtros.interface';
import { ListasStore } from '../../../stores/listasStore';
import { Listas } from '../../../composables/ListasIndependientes';
import Multiselect from 'vue-multiselect'
import { Modal } from 'bootstrap';
import Modal_ruta from '../../../components/Modal_ruta.vue';


export default defineComponent({
  components: {
    CardLayout,
    DataTable,
    Multiselect,
    Modal_ruta
  },
  setup() {
    const StoreList = ListasStore();
    const FunList   = Listas();
    const authStore = usarAuthStore();
    const Usuario = computed(() => authStore.usuario_Logueado);
    const activeTab = ref('politicas');
    const filtros = ref<filtros>(initializeFiltro());

    const Lista_documentos = ref<DocumentoFull[]>([]);
    const currentYear = new Date().getFullYear(); // Año actual

  // Lista de oficinas para el multiselect
  const ListaOficinas = computed(() => StoreList.ListaOficinas);


    // Filtros para Historial de Documentos (internos)
    const filtrosInternos = ref({
      tipodocumento_nombre: '',
      buzonorigen_nombre: '',
      dia: '',
      mes: '',
      anio: ''
    });

    // Método para buscar documentos internos
    const BuscarDocumentosInternos = async () => {
      try {
        NProgress.start();
        const params: any = { ...filtrosInternos.value };
        // Si tipodocumento_nombre es un objeto, extrae el nombre
        if (params.tipodocumento_nombre && typeof params.tipodocumento_nombre === 'object') {
          params.tipodocumento_nombre = params.tipodocumento_nombre.nombre;
        }
        // Si buzonorigen_nombre es un objeto, extrae el nombre
        if (params.buzonorigen_nombre && typeof params.buzonorigen_nombre === 'object') {
          params.buzonorigen_nombre = params.buzonorigen_nombre.nombre;
        }
        Object.keys(params).forEach(key => {
          if (params[key] === '' || params[key] === null) delete params[key];
        });
        const respuesta = await buscar_documentos_internos(params);
        if (respuesta.success) {
          Lista_documentos.value = respuesta.data || [];
        } else {
          Lista_documentos.value = [];
          Notif.Error(respuesta.message);
        }
      } catch (error) {
        console.error('Error en la búsqueda de documentos internos:', error);
      } finally {
        NProgress.done();
      }
    };

    // Método para limpiar el formulario y resultados de internos
    const resetearInternos = () => {
      filtrosInternos.value = {
        tipodocumento_nombre: '',
        buzonorigen_nombre: '',
        dia: '',
        mes: '',
        anio: ''
      };
      Lista_documentos.value = [];
    };
  


    
    const years = computed(() => {
      const yearList = [];
      for (let year = currentYear; year >= 2015; year--) {
        yearList.push(year);
      }
      return yearList;
    });

     const headers = ref([
      { text: '#', width: '3%', key: 'index', type: 'string' as const, sortable: false, filterable: false }, 
      { text: 'ORIGEN', width: '10%', key: 'buzonorigen_nombre', type: 'string' as const, sortable: true, filterable: true },
      { text: 'Origen', width: '5%', key: 'procedencia', type: 'string' as const, sortable: false, filterable: false },
      { text: 'Nº EXP.', width: '5%', key: 'numerodocumento', type: 'number' as const, sortable: true, filterable: false },
      { text: 'ASUNTO', width: '35%', key: 'asunto', type: 'string' as const, sortable: false, filterable: false },
      { text: 'FOLIOS', width: '5%', key: 'folios', type: 'number' as const, sortable: false, filterable: false },
      { text: 'DESTINO', width: '10%', key: 'pase_nombre_destino', type: 'string' as const, sortable: true, filterable: true },
      { text: 'FECHA_REC', width: '5%', key: 'fecharegistro', type: 'date' as const, sortable: true, filterable: false },
      { text: '', width: '5%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
      { text: '', width: '5%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
    ]);


    const resetear= () =>{
      resetearInternos();
    };

    onMounted(() => {
      // CargarExpedientes();
      FunList.load_TiposDocumentos();
      FunList.load_Oficinas();
    });


    const ListaSinProveido_TipoDocumento = computed(() =>
        StoreList.ListaTipoDocumentos.filter(
          doc => doc.nombre !== 'Proveido'
        )
      );

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
      Lista_documentos,
      years,
      list_meses,
      resetear,
      NumberFormat,
      Usuario,
      activeTab,
      filtros,
      filtrosInternos,
      BuscarDocumentosInternos,
      resetearInternos,
      ListaSinProveido_TipoDocumento,
      ListaOficinas,
      iddocumento_seleccionado,
      openRuta_modal,
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.text-sentence {
    text-transform: lowercase; /* Capitaliza la primera letra de cada palabra */
}

.text-sentence::first-letter {
    text-transform: uppercase; /* Asegura que solo la primera letra de la oración esté en mayúscula */
}
</style>





