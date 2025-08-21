<template>
  <div class="row ">
    <div class="col-12">
      <CardLayout  :title="'Documentos Enviados'" :clase="'text-blue-900'"  :clasehead="'bg-green-800'">
        <!-- Botones de la parte superior derecha -->
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <button @click="generarLibroCargos" class="btn btn-blue b-dark btn-sm mx-1">
                  <i class="ti ti-printer"></i> Cargos
                </button>
                <button @click="() => CargarExpedientes()" class="btn btn-blue b-dark btn-sm mx-1">
                  <i class="ti ti-refresh"></i>
                </button>
                <button @click="resetear" class="btn btn-secondary btn-sm mx-1">
                  <i class="fa fa-broom"></i>
                </button>
              </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          <DataTablePaginated
            :headers="headerdatatable"
            :items="Lista_documentos"
            :paginationInfo="paginacionInfo"
            :searchTerm="busqueda"
            :perPage="registrosPorPagina"
            :currentPage="paginaActual"
            :loading="cargando"
            :clasehead="'bg-info-100'"
            searchPlaceholder="Buscar documentos..."
            @search="handleSearch"
            @page-change="handlePageChange"
            @per-page-change="handlePerPageChange"
            @clear-search="handleClearSearch"
            @sort="handleSort"
          >
            <template #default="{ item, index, globalIndex }">
              <tr>
                <td class="px-2 mx-0 text-center f-12">{{ globalIndex }}</td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                           <p class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} - {{ item.cabecera }}
                          </p>  
                          <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                            <span v-if="item.prioridad==='Urgente'" class="badge  bg-red-300 f-12">
                              <i class="fa fa-exclamation-triangle p-r-5"></i>Urgente</span> {{ item.asunto }} 
                          </p>
                          <p class="m-b-0 text-primary  text-justify f-12"  style=" line-height: 1.2;">
                              {{ item.descripcion }} 
                          </p>
                        </div>
                      </div>
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
                    <td>{{ item.numerodocumento }} - {{ item.anio }}</td>
                    <td v-if="item.administrado_tipodocumento==='DNI'" class="text-wrap f-12 f-w-500" >
                        {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }}
                    </td>
                    <td v-else class="text-wrap f-12 f-w-600">{{ item.administrado_razonsocial }} </td>
                    <td>
                      {{ item.folios }}
                    </td>
                    <td class="text-wrap f-12 f-w-500">
                      {{ item.pase_buzondestino_nombre }}
                    </td>
                     <td  class="px-2 mx-0 text-wrap  ">
                        <p class="m-b-0 text-yellow-900 f-12 f-w-500"> {{ item.usuario_nombre }}</p>
                    </td>
                    <td class="px-2 mx-0 text-center ">
                        <span v-if="item.pase_estadopase==='Enviado'" class="badge bg-yellow-700 f-12">
                          <i class="ph-duotone ph-clock"></i> {{item.pase_estadopase}}</span>
                        <span v-if="item.pase_estadopase==='Recibido' || item.pase_estadopase==='Tramitado'" class="badge bg-success f-12">
                          <i class="ph-duotone ph-check-circle"></i> Recibido</span>
                    </td>

                    <td  class="px-2 mx-0 text-center text-wrap">
                          <p class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_saltolinea(item.pase_fechaenvio) }}</p>                              
                    </td>
                    <td  class="px-2 mx-0 text-center text-wrap">
                          <p v-if="item.pase_fecharecepcion===null" class="m-b-0 text-gray-600"> 
                             -
                          </p>                              
                          <p v-else  class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_saltolinea(item.pase_fecharecepcion) }}</p>                              
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-danger rounded-2 mx-1 btn-sm ">
                         <i class="fa fa-file-pdf f-20"></i> 
                      </a>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <router-link v-if="item.pase_estadopase!=='Recibido' && item.pase_estadopase!=='Tramitado'"
                          :to="{ name: 'MesadePartesEditar', params: { iddocumento: item.iddoc } }" class="avtar avtar-xs btn btn-secondary">
                                <i class="ti ti-edit f-20"></i>
                      </router-link>
                      <button v-else type="button" class="btn btn-success avtar avtar-xs " @click="handleDoubleClick(item.primogenio_id)">
                        <i class="fa fa-search"></i></button>
                      <!-- <a href="#" @click.prevent="deleteExpediente(item.iddoc)" class="avtar avtar-xs btn btn-danger">
                          <i class="ti ti-trash f-20"></i>
                      </a> -->
                    </td>
                  </tr>
                </template>
              </DataTablePaginated>
        </template>
      </CardLayout>
    </div>
  </div>
  <Modal_ruta :id="iddocumento_seleccionado_dobleclik"/>
  
</template>

<script lang="ts">
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { list_meses } from '../../utils/listas.fijas';
import { DocumentoFull } from '../../interfaces/documento.interface';

// Interfaz para la información de paginación
interface PaginacionInfo {
  pagina_actual: number;
  registros_por_pagina: number;
  total_registros: number;
  total_paginas: number;
  pagina_anterior: number | null;
  pagina_siguiente: number | null;
  paginas_visibles: (number | string)[];
  desde: number;
  hasta: number;
}

import { del_documento, generarHojaCargos, get_listadocumentos_mesapartes_enviados, get_listadocumentos_mesapartes_enviados_paginado } from '../../services/DocumentoServices';
import Notif from '../../utils/notificaciones';
import { Modal } from 'bootstrap';
import Modal_ruta from '../../components/Modal_ruta.vue';
import DataTablePaginated from '../../components/table/DataTablePaginated.vue';
import  Alerta  from '../../utils/alertas';

export default defineComponent({
  components: {
    CardLayout,
    DataTablePaginated,
    Modal_ruta
  },
  setup() {

    const Lista_documentos = ref<DocumentoFull[]>([]);
    const currentYear = new Date().getFullYear(); // Año actual

    // Variables de paginación y búsqueda
    const paginaActual = ref(1);
    const registrosPorPagina = ref(25);
    const busqueda = ref('');
    const ordenarPor = ref('');
    const direccionOrden = ref('desc');
    const paginacionInfo = ref<PaginacionInfo | null>(null);
    const cargando = ref(false);

    const CargarExpedientes = async (
      pagina: number = paginaActual.value,
      registros: number = registrosPorPagina.value,
      termino: string = busqueda.value,
      orden: string = ordenarPor.value,
      direccion: string = direccionOrden.value
    ) => {
      try {
        cargando
        
        .value = true;
        NProgress.start();
        
        const RespuestaJSON = await get_listadocumentos_mesapartes_enviados_paginado(
          pagina, registros, termino, '', orden, direccion
        );
        
        if (RespuestaJSON.success) {
          Lista_documentos.value = RespuestaJSON.data.datos || [];
          paginacionInfo.value = RespuestaJSON.data.paginacion;
          paginaActual.value = pagina;
          
          if (termino) {
            Notif.Success(`Se encontraron ${RespuestaJSON.data.paginacion.total_registros} documentos`);
          }
        } else {
          Notif.Error(RespuestaJSON.message);
          Lista_documentos.value = [];
          paginacionInfo.value = null;
        }
      } catch (error) {
        console.error('Error al cargar la lista de documentos:', error);
        Notif.Error('Error al cargar los documentos');
        Lista_documentos.value = [];
        paginacionInfo.value = null;
      } finally {
        cargando.value = false;
        NProgress.done();
      }
    };


    const headerdatatable = ref([
      { text: '#', width: '30px', key: 'index', type: 'string' as const, sortable: false }, 
      { text: 'ASUNTO', width: '35%', key: 'asunto', type: 'string' as const, sortable: true },
      { text: 'Origen', width: '5%', key: 'procedencia', type: 'string' as const, sortable: true },
      { text: 'Nº EXP.', width: '5%', key: 'numerodocumento', type: 'number' as const, sortable: true },
      { text: 'SOLICITANTE', width: '20%', key: 'administrado_nombre', type: 'string' as const, sortable: true },
      { text: 'FOL', width: '5%', key: 'folios', type: 'number' as const, sortable: true },
      { text: 'DESTINO', width: '10%', key: 'pase_buzondestino_nombre', type: 'string' as const, sortable: true },
      { text: 'USUARIO', width: '5%', key: 'usuario_nombre', type: 'string' as const, sortable: true },
      { text: 'Estado', width: '5%', key: 'pase_estadopase', type: 'string' as const, sortable: true },
      { text: 'ENVIADO', width: '5%', key: 'pase_fechaenvio', type: 'date' as const, sortable: true },
      { text: 'RECEPCIÓN', width: '5%', key: 'pase_fecharecepcion', type: 'date' as const, sortable: true },
      { text: 'PDF', width: '3%', key: 'pdf', type: 'string' as const, sortable: false },
      { text: '', width: '10%', key: 'acciones', type: 'string' as const, sortable: false },
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    const resetear= () =>{
      busqueda.value = '';
      paginaActual.value = 1;
      CargarExpedientes();
    };

    // Funciones para manejar eventos del DataTablePaginated
    const handleSearch = ({ term, field }: { term: string; field: string }) => {
      busqueda.value = term;
      paginaActual.value = 1;
      CargarExpedientes();
    };

    const handlePageChange = (page: number) => {
      paginaActual.value = page;
      CargarExpedientes();
    };

    const handlePerPageChange = (perPage: number) => {
      registrosPorPagina.value = perPage;
      paginaActual.value = 1;
      CargarExpedientes();
    };

    const handleClearSearch = () => {
      busqueda.value = '';
      paginaActual.value = 1;
      CargarExpedientes();
    };

    const handleSort = ({ key, order, type }: { key: string; order: string; type: string }) => {
      ordenarPor.value = key;
      direccionOrden.value = order;
      CargarExpedientes();
    };

    const iddocumento_seleccionado_dobleclik = ref(0);
    const openRuta_modal = (idoc:number) => {
      iddocumento_seleccionado_dobleclik.value = idoc;
      const modalElement = document.getElementById('ruta_Modal');
      if (modalElement) {
        const modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
    };
    const handleDoubleClick = (iddoc:number) => {
      openRuta_modal(iddoc);
    };

    // Cargar los documentos al montar el componente
    // Import the alert function

    const generarLibroCargos = async () => {
      try {
      // Show range dialog to user
      const rango = await Alerta.ObtenerRango('Hoja de Cargos','Ingrese el rango de documentos a Imprimir', 'Generar Cargos');
      
      // If user canceled the dialog
      if (!rango) return;
      
      NProgress.start();
      // Pass the range values to the API function
      const RespuestaJSON = await generarHojaCargos(rango.desde, rango.hasta);
      
      if (RespuestaJSON.success) {         
        Notif.Success(RespuestaJSON.message);
          window.open(HOST_URL+RespuestaJSON.data.url, '_blank');
       
      } else {
        Notif.Error(RespuestaJSON.message);
      }
      } catch (error) {
      console.error('Error al cargar Cargo:', error);
      } finally {
      NProgress.done();
      }
    };

    onMounted(CargarExpedientes);

    return {
      headerdatatable,
      HOST_URL,
      FormatFecha,
      checkValue,
      CargarExpedientes,
      Lista_documentos,
      list_meses,
      resetear,
      handleDoubleClick, 
      iddocumento_seleccionado_dobleclik,
      generarLibroCargos,
      // Variables de paginación y búsqueda
      paginaActual,
      registrosPorPagina,
      busqueda,
      ordenarPor,
      direccionOrden,
      paginacionInfo,
      cargando,
      // Funciones para DataTablePaginated
      handleSearch,
      handlePageChange,
      handlePerPageChange,
      handleClearSearch,
      handleSort
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