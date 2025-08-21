<template>
  <div class="row">
    <div class="col-12">
      <CardLayout  :title="'Documentos Proyectados'" :clase="'text-secondary'"  :clasehead="''">
        <!-- Botones de la parte superior derecha -->         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
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
          <DataTable
                :headers="headers"
                :items="Lista_documentos"
                :filterKeys="['fecharegistro', 'tipodocumento_nombre', 'numerodocumento', 'asunto', 'prioridad','fecharegistro']"
                :clasehead="'bg-info-400'"> 
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr>
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>
                    <td class="px-2 mx-0 ">
                      <span v-if="item.pase_tipopase==='Original'" class="badge  bg-light f-12 text-secondary">Original</span>
                      <span v-if="item.pase_tipopase==='Copia'" class="badge bg-light bg-gray-400 text-secondary f-12">Copia</span>
                    </td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p class="text-wrap mb-0 f-w-600">
                            <span>{{ item.cabecera }}</span>
                            <badge v-if="item.prioridad==='Urgente'" class="badge  bg-red-200 ">
                              Urgente</badge>
                            <badge v-if="item.proyectar" class="badge bg-orange-400  mx-1 f-w-600">
                              PROYECTADO</badge> 
                          </p>
                          <p class="mb-0 text-md text-secondary  text-justify">
                              {{ item.asunto }} 
                          </p>
                          <span  v-if="item.proveido!==''" > {{ item.proveido }}</span>   
                        </div>
                      </div>
                    </td>
                    <td class="text-wrap" v-if="item.procedencia==='Interno'">Int</td>
                    <td class="text-wrap" v-else >Ext</td>
                    <td class="text-wrap lh-sm">
                        {{ item.pase_nombre_destino }}
                    </td>
                 
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap text-md">
                            <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_sola(item.pase_fechaenvio) }}</p>
                            <p class="m-b-0 text-gray-600 text-md">{{ FormatFecha.convertirFecha_horasola(item.pase_fechaenvio) }}</p>                            
                        </div>
                      </div>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <a  v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn-sm w-50 text-start align-content-center text-sm p-r-5">
                        <img src="../../../assets/images/pdf.png" class="wid-20" > Principal
                      </a>
                      <a  v-if="item.pdf_anexo1!==null"  :href="item.pdf_anexo1" target="_blank"  class="btn-sm w-50 text-start align-content-center text-sm">
                        <img src="../../../assets/images/pdf.png" class="wid-20" > Anexo1
                      </a>
                    </td>
                    <td  class="px-2 mx-0 text-center align-content-center ">
                      
                      <div v-if="item.estado==='Iniciado'" 
                            class="badge bg-light-success py-1 text-md">Aprobado</div>
                      <div v-if="item.estado==='Proyectado'"
                            class="badge bg-light-warning py-1 text-md">Pendiente</div>
                       
                    </td>
                    <td  class="px-2 mx-0 text-center align-content-center ">
                        <div @click="openModal(item.iddoc)" 
                              v-if="Usuario.rol_id===1 && item.estado==='Proyectado'" 
                              class="btn btn-danger py-1 mx-1 bg-red-300">Observar</div>
                        <div @click="Aprobar_documento_proyectado(item.iddoc)" 
                             v-if="Usuario.rol_id===1 && item.estado==='Proyectado'"
                             class="btn btn-success py-1">Aprobar</div>
                        <div v-else>
                          <div v-if="Usuario.rol_id!==1 && item.estado==='Iniciado'"
                               @click="Enviar_documento_proyectado(item.iddoc)"  class="btn btn-warning py-1">Enviar</div>
                        </div>
                    </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

  
  <!-- Modal para agregar Requisito -->
  <div class="modal modal-sm fade" id="modalRechazar" tabindex="-1" aria-labelledby="modalRechazarLabel" 
       aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                
                <div class="modal-header bg-red-400 pt-3 pb-2 ">
                    <h6 class="modal-title text-white" id="modalRechazarLabel">
                        <i class="fa fa-exclamation-triangle p-r-15"></i>Observar Documento
                    </h6>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-1">
                    <div class="mb-3">
                        <label for="reqnombre" class="form-label text-dark f-w-600">Motivo</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="frm_motivo" placeholder="Ingresa el nombre" rows="3"></textarea>
                    </div>
                    
                </div>
                <div class="modal-footer py-0 justify-content-center">                    
                    <div type="button" class="btn btn-danger" @click="Rechazar_documento">Confirmar</div>
                    <div type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import DataTable from '../../../components/table/DataTable.vue';  
import CardLayout from '../../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed } from 'vue';
import NumberFormat from '../../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../../config';
import { FormatFecha } from '../../../utils/FormatFecha';
import { DocumentoFull } from '../../../interfaces/documento.interface';

import { Aceptar_documento_proyectado, ConfirmarEnvio_documento_proyectado, get_listadocumentos_Proyectados, Observar_documento } from '../../../services/DocumentoServices';
import Notif from '../../../utils/notificaciones';
import { Destino, initializeUsuarioLog, UsuarioLog } from '../../../types/interfaces';
import { usarAuthStore } from '../../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../../composables/ListasIndependientes';
import { ListasStore } from '../../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Alerta from '../../../utils/alertas';

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
    DataTable
  },
  setup() {
    const DestinoOficina = ref<Destino>();
    const authStore = usarAuthStore();
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
    const Pase = ref<frmPase>({
        pasetipo:   'Original',
        destinoid:  0,
        proveido:   '',
        observacion:'',
    })
    Usuario.value = authStore.usuario_Logueado;
    const StoreList = ListasStore();
    const FunList = Listas();
    const Lista_documentos = ref<DocumentoFull[]>([]);
    const frm_motivo = ref("");
    const id_documento_seleccionado = ref("");
    //-----------------------------------------------------------------------------
    const CargarExpedientes = async () => {
        try {
          Lista_documentos.value=[];
          NProgress.start();
          const RespuestaJSON = await get_listadocumentos_Proyectados(Usuario.value.buzon_id);
          if (RespuestaJSON.success) {
            Lista_documentos.value = RespuestaJSON.data;
          } else {
            // Notif.Error(RespuestaJSON.message);
          }
        } catch (error) {
          console.error('Error al cargar la lista de Proyectados:', error);
        } finally {
          NProgress.done();
        }
    };

    //-----------------------------------------------------------------------------
    const Aprobar_documento_proyectado = async (iddoc: number) => {
        try {
          const isConfirmado = await Alerta.ConfirmacionRegistro('Desea Aprobar el Documento',"Esta acción indica que el documento está listo para ser enviado a sus destinatarios");
          if (isConfirmado) {
              NProgress.start();
              const RespuestaJSON = await Aceptar_documento_proyectado(iddoc);
              if (RespuestaJSON.success) {
                  CargarExpedientes();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          }  
        } catch (error) {
          console.error('Error al cargar la lista de inscripciones:', error);
        } finally {
          NProgress.done();
        }
    };

    
    
    //-----------------------------------------------------------------------------
    const Enviar_documento_proyectado = async (iddoc: number) => {
        try {
          const isConfirmado = await Alerta.ConfirmacionRegistro('Desea Confirmar el envío del Documento',"Confirmar");
          if (isConfirmado) {
              NProgress.start();
              const RespuestaJSON = await ConfirmarEnvio_documento_proyectado(iddoc);
              if (RespuestaJSON.success) {
                  CargarExpedientes();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          }  
        } catch (error) {
          console.error('Error al cargar la lista de inscripciones:', error);
        } finally {
          NProgress.done();
        }
    };

    //-----------------------------------------------------------------------------
    const iddocumento_seleccionado_dobleclik = ref(0);
    const openRuta_modal = (idoc:number) => {
        iddocumento_seleccionado_dobleclik.value = idoc;
        const modalElement = document.getElementById('ruta_Modal');
        if (modalElement) {
          const modalInstance = new Modal(modalElement);
          modalInstance.show();
        }
    };

    // openRuta_modal
    const handleDoubleClick = (iddoc:number) => {
      openRuta_modal(iddoc);
    };

    const headers = ref([
      { text: '#', width: '3%', key: 'index' }, 
      { text: 'TIPO', width: '5%', key: 'tipopase' },
      { text: 'ASUNTO', width: '35%', key: 'asunto' },
      { text: 'P.', width: '5%', key: 'numerodocumento' },
      { text: 'DESTINO', width: '15%', key: 'origen_nombre' },
      { text: 'CREADO EL', width: '5%', key: 'pase_fechaenvio' },
      { text: 'PDF', width: '2%', key: 'DOC' },
      { text: 'Estado', width: '5%', key: 'estado' },
      { text: '', width: '5%', key: 'acciones' },
    ]);
    
    const resetear= () =>{
      CargarExpedientes();
    };

    onMounted(async () => {
      CargarExpedientes();
      FunList.load_Destinos();
    });

    const Rechazar_documento = async () => {
      const isConfirmado = await Alerta.ConfirmacionRegistro(
            'Confirmación',
            '¿Desea Observar este documento?'
        );
        if (isConfirmado) {
          NProgress.start();
          try {
              const response = await Observar_documento(id_documento_seleccionado.value, frm_motivo.value);
              if(response.success){
                CargarExpedientes();
                Notif.Success("Registro Completado");
                closeModal();
              }
          } catch (error) {
              Alerta.Error('Error', 'No se pudo cargar el documento.');
          } finally {
              NProgress.done();
          }
        }
     };
     const openModal = (iddoc:string) => {
      id_documento_seleccionado.value = iddoc;
      const modalElement = document.getElementById('modalRechazar');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    const closeModal = () => {
      const modalElement = document.getElementById('modalRechazar');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };
    
    return {
      headers,
      HOST_URL,
      FormatFecha,
      CargarExpedientes,Lista_documentos,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,Pase,DestinoOficina,StoreList,
      iddocumento_seleccionado_dobleclik,handleDoubleClick,
      Aprobar_documento_proyectado,Enviar_documento_proyectado,
      frm_motivo,
      Rechazar_documento
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>