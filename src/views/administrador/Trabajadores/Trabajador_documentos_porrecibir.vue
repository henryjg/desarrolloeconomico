<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Bandeja de Entrada | Por Recibir'" :clase="'text-secondary'"  :clasehead="'bg-green-800 border-0'">
        <!-- Botones de la parte superior derecha -->
         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <!-- <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_inicio">
                <label class="form-label px-2 text-white align-content-center" >-</label>
                <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_fin"> -->
                <span v-if="documentosSeleccionados.length > 0" class="badge bg-info mx-2 align-content-center">
                  {{ documentosSeleccionados.length }} documento(s) seleccionado(s)
                </span>
                <button 
                  :disabled="documentosSeleccionados.length === 0" 
                  @click="recibirDocumentosSeleccionados" 
                  class="btn btn-success b-dark btn-sm mx-1">
                  <i class="ti ti-check"></i> Recibir Seleccionados ({{ documentosSeleccionados.length }})
                </button>
                <button 
                  :disabled="documentosSeleccionados.length === 0" 
                  @click="limpiarSeleccionTabla" 
                  class="btn btn-warning btn-sm mx-1">
                  <i class="fa fa-times"></i> Limpiar Selección
                </button>
                <button @click="CargarExpedientes" class="btn btn-blue b-dark btn-sm mx-1">
                  <i class="ti ti-refresh"></i>
                </button>
                <button @click="resetear" class="btn btn-secondary btn-sm mx-1">
                  <i class="fa fa-broom"></i>
                </button>
              </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          <!-- {{ Lista_documentos }} -->
          <DataTable
                ref="datatableref"
                :headers="headers"
                :items="Lista_documentos"
                :itemIdKey="'idpase'"
                :selectable="true"
                @selection-change="onSelectionChange"
                :auto-height="true"
                :loading="isloading_expedientes"
                :loadingLabel="'Cargando documentos'"
                :page-size="50"
                :filterKeys="['tipopase', 'asunto', 'numerodocumento', 'origen_nombre', 'destino_nombre','proveido', 'pase_fechaenvio', 'pase_fecharecepcion']"
                :clasehead="'bg-info-100'"
              >
                <template #default="{ item, index, currentPage, itemsPerPage, selectable, isItemSelected, toggleSelectItem, itemIdKey, handleMouseDown, isDragging, focusedRowIndex, isKeyboardNavigation }">
                  <tr @click="handleRowClick(item, index, $event)" 
                      @mousedown="handleMouseDown(index, $event)"
                      :class="{ 
                        'nuevo-documento': item.nuevo,
                        'bg-light-danger': documento_seleccionado && documento_seleccionado.idpase === item.idpase && !(isKeyboardNavigation && focusedRowIndex === index),
                        'bg-blue-100 bg-opacity-25': selectable && isItemSelected(item[itemIdKey]) && !(isKeyboardNavigation && focusedRowIndex === index),
                        'keyboard-focused': isKeyboardNavigation && focusedRowIndex === index
                      }">
                    
                    <!-- Checkbox para selección múltiple -->
                    <td v-if="selectable" class="text-center mx-2  px-2" width="2%" @click.stop>
                      <div class="d-flex align-items-center">
                            <div class="form-check form-check-inline m-0 pc-icon-checkbox">
                              <input 
                                type="checkbox"
                                class="form-check-input form-check form-check-inline m-0 pc-icon-checkbox"
                                :checked="isItemSelected(item[itemIdKey])"
                                @change="toggleSelectItem(item[itemIdKey])"
                              />
                              <i class="material-icons-two-tone pc-icon-uncheck">check_box_outline_blank</i>
                              <i class="material-icons-two-tone text-primary pc-icon-check">check_box</i>
                            </div>
                          </div>
                    </td>
                    
                    <!-- {{ item.documento_id }} -->
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

                    <td class="px-2 mx-0 ">
                      <span v-if="item.tipopase==='Original'" class="badge bg-light f-12 text-secondary">Original</span>
                      <span v-if="item.tipopase==='Copia'" class="badge bg-light bg-gray-400 text-secondary f-12">Copia</span>
                    </td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p v-if="item.expediente_procedencia!=='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} {{ item.cabecera }} 
                          </p>  
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-600 f-12 uppercase text-gray-600">
                              <div v-if="item.administrado_numdocumento==='RUC'">(Adm: {{ item.administrado_razonsocial }})</div>
                              <div v-else>(Adm: {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }})</div>
                          </p>  
                          <p v-if="item.expediente_procedencia==='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} - N° - {{ item.numeracion_tipodoc_oficina }} - {{ item.anio }} - {{ item.origen_sigla }} - MDVO/D
                          </p>  
                          <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                            {{ item.asunto }} 
                            <span v-if="item.prioridad==='Urgente'" class="badge  bg-red-300 f-w-600 f-12">
                              <i class="fa fa-exclamation-triangle p-r-5"></i>Urgente</span> 
                            <span v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600 f-12">
                              Proyectado</span> 
                          </p>
                          <p class="m-b-0 text-primary  text-justify f-12"  style=" line-height: 1.2;">
                              {{ item.descripcion }} 
                          </p>
                          <p class="m-b-0 text-yellow-900 f-w-500 f-12 pt-2 text-italic"  style=" line-height: 1.2;">
                            <span v-if="item.pase_proveido!==''" > {{ item.pase_proveido }}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td v-if="item.expediente_procedencia!=='Interno'" class="text-wrap f-13">{{ item.expediente }} - {{ item.anio }}</td>
                    <td v-if="item.expediente_procedencia==='Interno'" class="text-wrap f-13">-</td>

                  
                    <td class="text-wrap" v-if="item.procedencia==='Interno'">Int</td>
                    <td class="text-wrap" v-else >Ext</td>


                    <td>
                      {{ item.folios }}
                    </td>
                    <td class="text-wrap  lh-sm f-12 f-w-500">
                      {{ item.origen_nombre }}
                    </td>
                 
                    
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_sola(item.pase_fechaenvio) }}</p>
                          <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_horasola(item.pase_fechaenvio) }}</p>                            
                        </div>
                      </div>
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
                       <button type="button" class="btn btn-warning bg-yellow-700 btn-sm border-0 mx-1" @click="handleDoubleClick(item.primogenio_id)">
                          <i class="fa fa-search"></i></button>
                      
                      <a href="#" @click.prevent="RecepcionarDocumento(item)" class="btn text-blue-900 btn-secondary b-success  bg-green-400 btn-sm">
                          <i class="ph-duotone ph-arrow-down-right"></i> Recibir
                      </a>

                    </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

  <!-- ------------------------------------------------- -->
    <!-- ------------------------------------------------- -->
  <Modal_ruta :id="iddocumento_seleccionado_dobleclik"/>

</template>

<script lang="ts">
import DataTable from '../../../components/table/DataTable.vue';  
import CardLayout from '../../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed, onBeforeUnmount } from 'vue';
import NumberFormat from '../../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../../config';
import { FormatFecha } from '../../../utils/FormatFecha';
import { DocumentoPase, initialize_DocumentoPase } from '../../../interfaces/documento.interface';

import { get_listadocumento_estado_UsuarioDestino, recepcionar_pase } from '../../../services/DocumentoServices';
import Notif from '../../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../../types/interfaces';
import { usarAuthStore } from '../../../stores/autentificacionStore';
import { Listas } from '../../../composables/ListasIndependientes';
import { ListasStore } from '../../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Alerta from '../../../utils/alertas';
import Modal_ruta from '../../../components/Modal_ruta.vue';
import { Modal } from 'bootstrap';



interface frmPase{
  pasetipo:string;
  destinoid:number;
  proveido:string;
  observacion:string;
}

export default defineComponent({
  components: {
    CardLayout,
    Multiselect,
    DataTable,
    Modal_ruta,
  },
  setup() {
    const anioactual    = ref(new Date().getFullYear());        
    const DestinoOficina = ref<Destino>();
    const authStore = usarAuthStore();
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
    const Pase = ref<frmPase>({
      pasetipo:'Original',
      destinoid: 0,
      proveido:'',
      observacion:'',
    })
    
    Usuario.value = authStore.usuario_Logueado;
    const StoreList = ListasStore();
    const FunList = Listas();

    const documento_elegido = ref<DocumentoPase>(initialize_DocumentoPase());
    const currentYear = new Date().getFullYear(); // Año actual



    const Lista_documentos = ref<DocumentoPase[]>([]);
    const Lista_documentos_anteriores = ref<DocumentoPase[]>([]);
    const isloading_expedientes = ref(false);

    // Variables para selección múltiple
    const documentosSeleccionados = ref<DocumentoPase[]>([])

    // Variable computada para compatibilidad con sistema anterior
    const documento_seleccionado = computed(() => {
      return documentosSeleccionados.value.length > 0 ? documentosSeleccionados.value[0] : null;
    });

    // Funciones para selección múltiple ----------------------------------------

    const onSelectionChange = (selectionData: { selectedIds: string[], selectedItems: DocumentoPase[], count: number }) => {
      documentosSeleccionados.value = selectionData.selectedItems;
      console.log('Documentos seleccionados:', selectionData);
    };

    // Función para seleccionar un documento específico
    const seleccionar_documento = (docseleccionado: DocumentoPase) => {
      // Limpiar selección anterior y seleccionar solo este documento
      documentosSeleccionados.value = [docseleccionado];
    };

    // Función para manejar el click en la fila
    const handleRowClick = (item: DocumentoPase, index: number, event: Event) => {
      const target = event.target as HTMLElement;
      
      // Establecer foco de teclado en la fila clickeada
      if (datatableref.value && datatableref.value.setKeyboardFocus) {
        datatableref.value.setKeyboardFocus(index);
        // Enfocar el contenedor de la tabla para habilitar navegación por teclado
        const tableContainer = datatableref.value.$el.querySelector('.table-container');
        if (tableContainer) {
          tableContainer.focus();
        }
      }
      
      // Verificar si el click fue en botones, enlaces o elementos de acción
      if (target.closest('button') || target.closest('a') || target.closest('.btn')) {
        // Si es en un botón o acción, solo seleccionar el documento para funcionalidad de modales
        seleccionar_documento(item);
        return;
      }
      
      // Si no es en un botón y la tabla es seleccionable, alternar la selección del checkbox
      const checkbox = (event.currentTarget as HTMLElement).querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (checkbox) {
        // Simular click en el checkbox
        const changeEvent = new Event('change', { bubbles: true });
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(changeEvent);
      }
      
      // NO llamar a seleccionar_documento aquí ya que interfiere con la selección múltiple
      // La selección se maneja a través del checkbox y onSelectionChange
    };

    // Reference to DataTable component
    const datatableref = ref<InstanceType<typeof DataTable>>()
    const primeraCarga = ref(true); // Variable para detectar la primera carga

    const CargarExpedientes = async () => {
      try {
        NProgress.start();
        isloading_expedientes.value = true;
        const RespuestaJSON = await get_listadocumento_estado_UsuarioDestino('Enviado', Usuario.value.buzon_id);

        if (RespuestaJSON.success) {
          const nuevaLista = RespuestaJSON.data.map((doc:DocumentoPase) => ({
            ...doc,
            nuevo: !primeraCarga.value && !Lista_documentos_anteriores.value.some((d) => d.idpase === doc.idpase),
          }));

          Lista_documentos_anteriores.value = [...nuevaLista]; // Guardamos la lista actual
          Lista_documentos.value = nuevaLista;

        } else {
          Lista_documentos.value=[];
          // Notif.Error(RespuestaJSON.message);
          console.log(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al cargar la lista de inscripciones:', error);
      } finally {
        NProgress.done();
        isloading_expedientes.value = false;
        primeraCarga.value = false; // Después de la primera ejecución, ya no se marcarán todos como nuevos
      }
    };


    // REGISTRAR PERSONA -------------------
    const RecepcionarDocumento = async (docpase:DocumentoPase) => {   
      const isConfirmado = await Alerta.Confirmacion_Recepción('Confirmar Recepción',docpase.tipodocumento_nombre + " " + docpase.cabecera);
      if (isConfirmado) {
        try {
          const RespuestaJSON = await recepcionar_pase(docpase.idpase);
          if (RespuestaJSON.success) {
            CargarExpedientes();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
        } catch (error) {
          Alerta.Error('Error', 'Hubo un error al eliminar la oficina.');
        }
      }       
    };

    // Función para recibir múltiples documentos seleccionados
    const recibirDocumentosSeleccionados = async () => {
      if (documentosSeleccionados.value.length === 0) {
        Notif.Error('No hay documentos seleccionados para recibir.');
        return;
      }

      const documentosText = documentosSeleccionados.value.map(doc => doc.numerodocumento || doc.tipodocumento_nombre).join(', ');
      const isConfirmado = await Alerta.Confirmacion_Recepción(
        `Confirmar la recepción de ${documentosSeleccionados.value.length} documento(s):`, 
        documentosText
      );
      
      if (isConfirmado) {
        try {
          NProgress.start();
          
          // Procesar documentos uno por uno
          for (const documento of documentosSeleccionados.value) {
            const RespuestaJSON = await recepcionar_pase(documento.idpase);
            if (!RespuestaJSON.success) {
              Notif.Error(`Error al recibir documento ${documento.numerodocumento}: ${RespuestaJSON.message}`);
            }
          }
          
          // Limpiar selección y recargar
          documentosSeleccionados.value = [];
          if (datatableref.value) {
            datatableref.value.limpiarSeleccion();
          }
          CargarExpedientes();
          Notif.Success(`Se recibieron ${documentosSeleccionados.value.length} documentos correctamente.`);
          
        } catch (error) {
          console.error('Error al recibir documentos:', error);
          Alerta.Error('Error', 'Hubo un error al recibir los documentos.');
        } finally {
          NProgress.done();
        }
      }
    };

    // Función para limpiar la selección
    const limpiar_seleccion = () => {
      documentosSeleccionados.value = [];
      // Solo limpiar la tabla si existe la referencia
      if (datatableref.value && datatableref.value.limpiarSeleccion) {
        datatableref.value.limpiarSeleccion();
      }
    };

    // Función para limpiar selección desde el padre (alias para compatibilidad)
    const limpiarSeleccionTabla = () => {
      limpiar_seleccion();
    };

     // -----------------------------------------------

    const headers = ref([
      { text: '#', width: '3%', key: 'index' }, 
      { text: 'TIPO', width: '5%', key: 'tipopase' },
      { text: 'ASUNTO', width: '30%', key: 'asunto' },
      { text: 'Exp.', width: '10%', key: 'asunto' },
      { text: 'P', width: '5%', key: 'numerodocumento' },
      { text: 'FOLIOS', width: '5%', key: 'folios' },
      { text: 'ORIGEN', width: '15%', key: 'origen_nombre' },
      { text: 'ENVIADO EL', width: '5%', key: 'pase_fechaenvio' },
      { text: 'PDF', width: '2%', key: 'acciones' },
      { text: '', width: '5%', key: 'acciones' },
    ]);

    const resetear= () =>{
      CargarExpedientes();
    };

    let intervalId: ReturnType<typeof setInterval>; // Corregido aquí

    
    onMounted(async () => {
      CargarExpedientes();
      intervalId = setInterval(CargarExpedientes, 60000); // 120000 ms = 2 minutos

    });
    onBeforeUnmount(() => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se destruya
    });




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


    return {
      headers,
      HOST_URL,
      FormatFecha,
      CargarExpedientes,Lista_documentos,
      resetear,
      NumberFormat,
      Usuario,
      Pase,DestinoOficina,StoreList,RecepcionarDocumento,documento_elegido,
      anioactual,
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      // Variables y funciones de selección múltiple
      documentosSeleccionados,
      documento_seleccionado,
      datatableref,
      recibirDocumentosSeleccionados,
      limpiarSeleccionTabla,
      limpiar_seleccion,
      onSelectionChange,
      seleccionar_documento,
      handleRowClick,
      isloading_expedientes
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

.nuevo-documento {
  font-weight: bold;
  background-color: #f2e2ac; /* Color de fondo opcional */
}

/* Asegurar que el foco de teclado sea visible por encima de otros estilos */
.keyboard-focused {
  background-color: #fef3c7 !important; /* bg-yellow-100 */
  /* border: 2px solid #f59e0b !important;  */
  /* box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3) !important; */
  position: relative !important;
  z-index: 10 !important;
}
</style>





