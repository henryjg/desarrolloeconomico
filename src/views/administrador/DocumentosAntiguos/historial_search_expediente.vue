<template>
  <div class="row ">
    <div class="col-12">
      <!-- Tabs horizontales unificados -->
      
      <!-- Contenido de cada tab -->
      <CardLayout  :title="'Documentos Recepcionados'" :clase="'text-secondary'"  :clasehead="''">
        <!-- Botones de la parte superior derecha -->
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <!-- <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_inicio">
                <label class="form-label px-2 text-white align-content-center" >-</label>
                <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_fin"> -->
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
                :filterKeys="['asunto', 'procedencia',  'numerodocumento', 'cabecera', 'codigo', 
                              'administrado_nombre', 'administrado_apellidomat', 'administrado_apellidopat', 
                              'pase_nombre_destino', 'fecharegistro','usuario_nombre']"
                :clasehead="'bg-info-100'"
              >
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr>
                    <td  class="px-2 mx-0 text-center f-12 px-1">{{ index + 1 }}</td>
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
                          <p class="m-b-0 text-gray-600  text-justify f-12"  style=" line-height: 1.2;">
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
                  
                    <td  class="px-2 mx-0 text-center text-wrap">
                          <p class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_saltolinea(item.fecharegistro) }}</p> 
                    </td>
                    <td  class="px-2 mx-0 text-wrap  ">
                        <p class="m-b-0 text-yellow-900 f-12 f-w-500"> {{ item.usuario_nombre }}</p>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn btn-danger rounded-2 mx-1 btn-sm ">
                         <i class="fa fa-file-pdf f-20"></i> 
                      </a>
                    </td>
                    <td  class="px-2 mx-0 text-center">
                      
                      <router-link :to="{ name: 'MesadePartesEditar', params: { iddocumento: item.iddoc } }" class="btn btn-sm rounded-2 px-2 btn-success">
                        <i class="ti ti-edit f-20"></i>
                      </router-link>
                      <a href="#" @click.prevent="DerivarExpediente(item.pase_id)" class="btn btn-sm rounded-2 px-2 btn-warning">
                          <i class="ph-duotone ph-paper-plane-right f-20"></i>
                      </a>
                    </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
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
import { list_meses } from '../../../utils/listas.fijas';
import { DocumentoFull } from '../../../interfaces/documento.interface';

// import { del_documento, derivar_documento_mesapartes, get_listadocumentos_mesapartes_iniciado } from '../../../services/DocumentoServices';
import Notif from '../../../utils/notificaciones';
import Alerta from '../../../utils/alertas';
import { usarAuthStore } from '../../../stores/autentificacionStore';


export default defineComponent({
  components: {
    CardLayout,
    DataTable,
  },
  setup() {

    const authStore = usarAuthStore();
    const Usuario = computed(() => authStore.usuario_Logueado);
    const activeTab = ref('politicas');


    const Lista_documentos = ref<DocumentoFull[]>([]);
     const currentYear = new Date().getFullYear(); // Año actual

    const CargarExpedientes = async () => {
      try {
        NProgress.start();
        const RespuestaJSON = await get_listadocumentos_mesapartes_iniciado();
        if (RespuestaJSON.success) {
          if(RespuestaJSON.data.length>0){
            Lista_documentos.value = RespuestaJSON.data;
          }else{
            Lista_documentos.value = [];
          }
          
          // Notif.Success(RespuestaJSON.message);
        } else {
          Lista_documentos.value = [];
          Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al cargar la lista de Documentos:', error);
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
      { text: '#', width: '5px', key: 'index' }, 
      { text: 'ASUNTO', width: '30%', key: 'asunto' },
      { text: 'Origen', width: '5%', key: 'procedencia' },
      { text: 'Nº EXP.', width: '5%', key: 'codigo' },
      { text: 'SOLICITANTE', width: '20%', key: 'administrado_nombre' },
      { text: 'FOLIOS', width: '5%', key: 'folios' },
      { text: 'DESTINO', width: '10%', key: 'pase_nombre_destino' },
      { text: 'FECHA_REC', width: '5%', key: 'fecharegistro' },
      { text: 'USUARIO', width: '5%', key: 'usuario_nombre' },
      { text: 'PDF', width: '3%', key: 'acciones' },
      { text: '', width: '7%', key: 'acciones' },
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    const resetear= () =>{
      CargarExpedientes();
    };

    const DerivarExpediente = async (paseid: number) => {
      const isConfirmado = await Alerta.Confirmacion_envio(
        '¿Estás seguro de derivar este documento?',
        '¡Confirmar!'
      );
      if (isConfirmado) {
        try {
          
          const RespuestaJSON = await derivar_documento_mesapartes(paseid,'Enviado');
          if (RespuestaJSON.success) {
            Alerta.Sucessfull_timer('Envio Completado', 'El documento ha sido derivado');   
            CargarExpedientes();   
          } else {
            console.log(RespuestaJSON.message);
            Alerta.Error('Error', 'No se pudo eliminar');
          }
        } catch (error) {
          console.error('Error al eliminar la inscripción:', error);
        }
      }
    };


    onMounted(CargarExpedientes);

    return {
      headers,
      HOST_URL,
      FormatFecha,
      checkValue,
      CargarExpedientes,Lista_documentos,
      years,list_meses,
      resetear,
      NumberFormat,
      DerivarExpediente,
      Usuario,
      activeTab,
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





