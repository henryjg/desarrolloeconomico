<template>
  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ Usuario}} -->
      <CardLayout  :title="'Casillas de Trámite Documentario'" :clase="'text-secondary'"  :clasehead="'bg-orange-200 border-0'">
        <!-- Botones de la parte superior derecha -->
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <button @click="openAddBuzonModal" class="btn btn-success btn-sm mx-1">
                  <i class="fas fa-plus"></i> Agregar
                </button>
                <button @click="ListarBuzones" class="btn btn-blue b-dark btn-sm mx-1">
                  <i class="ti ti-refresh"></i>
                </button>
                <button @click="resetear" class="btn btn-secondary btn-sm mx-1">
                  <i class="fa fa-broom"></i>
                </button>
              </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          <!-- {{ Lista_CasillaBuzon }} -->
          <DataTable
                :headers="headers"
                :items="ListaBuzones"
                :filterKeys="['tipo', 'nombre', 'sigla', 'responsable', 'correonotificaion', 'usuarios']"
                :clasehead="'bg-info-100'"
              >
                <template #default="{ item, index, currentPage, itemsPerPage }">
                  <tr :key="item.id + '-' + index" :class="{ 'nuevo-documento': item.nuevo }">
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

                    <td class="px-2 mx-0 text-md text-wrap ">
                      {{ item.nombre }} 
                    </td>
                    <td class="px-2 mx-0 text-md f-w-500">
                      {{ item.sigla }} 
                    </td>
                    <td class="px-2 mx-0 text-sm">
                      <span v-if="item.responsable===''" class="badge bg-red-300 py-1 text-sm">Sin Responsable</span>
                      <span v-if="item.responsable!==''" class="text-sm text-uppercase">{{item.responsable}}</span>
                    </td>
                    <td class="px-2 mx-0 text-sm">
                      {{ item.correonotificaion }} 
                    </td>
                    <td class="px-2 mx-0 text-12">
                      <div class="d-flex flex-row mb-1" v-if="item.usuarios && item.usuarios.length > 0"
                            v-for="us,index in item.usuarios">{{ us }}
                      </div>
                      <span v-else class="text-muted">Sin Usuarios</span>
                    </td>
                    <td  class="px-2 mx-0  text-center align-content-center">                      
                      <span v-if="item.estado==='Activo'" class="badge bg-green-900 py-1 text-sm">Activo</span>
                      <span v-if="item.estado==='Inactivo'" class="badge bg-red-700 py-1 text-sm">Inactivo</span>
                    </td>
     
                    <td  class="px-2 mx-0 text-center">
                    <router-link :to="{ name: 'BuzonEditar', params: { id: item.id } }" class="btn btn-primary btn-sm">
                      Gestionar
                    </router-link>
                     <button class="btn btn-danger btn-sm me-1" @click="EliminarBuzon(item.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                    <!-- <a href="#" @click.prevent="eliminar_buzon(buzon.id)" class="avtar avtar-xs btn btn-danger">
                      <i class="ti ti-trash f-20"></i>
                    </a> -->
                    <!-- <a href="#" @click.prevent="RecepcionarDocumento(item)" class="btn text-blue-900 btn-secondary b-success  bg-green-400 btn-sm">
                        <i class="ph-duotone ph-arrow-down-right"></i> Recibir
                    </a> -->
                  </td>
                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

  <!-- ------------------------------------------------- -->
   <!-- Modal para agregar buzón -->
  <div class="modal modal-sm fade" id="addBuzonModal" tabindex="-1" aria-labelledby="addBuzonModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header py-1">
          <h5 class="modal-title py-1" id="addBuzonModalLabel">Agregar Buzón</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3">
          <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" v-model="nuevoBuzon.nombre" class="form-control" placeholder="Ingrese el nombre del buzón" />
          </div>
          <div class="mb-3">
              <label class="form-label">Sigla</label>
              <input type="text" v-model="nuevoBuzon.sigla" class="form-control" placeholder="Ingrese la sigla del buzón" />
          </div>
          <div class="mb-3">
              <label class="form-label">Sigla</label>
              <input type="text" v-model="nuevoBuzon.sigla" class="form-control" placeholder="Ingrese la sigla del buzón" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="CrearBuzon">Agregar</button>
        </div>
      </div>
    </div>
  </div>
    <!-- ------------------------------------------------- -->


</template>

<script lang="ts">
import DataTable from '../../../components/table/DataTable.vue';  
import CardLayout from '../../../layout/CardLayout.vue';  

import Multiselect from 'vue-multiselect'
import { ListasStore } from '../../../stores/listasStore';
import { Listas } from '../../../composables/ListasIndependientes';
import { defineComponent, onMounted, ref } from 'vue';
import { useBuzon } from '../../../composables/UseBuzon';


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
  },
  setup() {
    const StoreList = ListasStore();
    const FunList = Listas();
    const { ListaBuzones, ListarBuzones, openAddBuzonModal,EliminarBuzon, CrearBuzon,nuevoBuzon } = useBuzon();

     // -----------------------------------------------

    const headers = ref([
      { text: '#', width: '3%', key: 'index' }, 
      { text: 'NOMBRE CASILLA', width: '30%', key: 'nombre' },
      { text: 'SIGLA DOCUMENTOS', width: '10%', key: 'sigla' },
      { text: 'Responsable', width: '20%', key: 'responsable' },
      { text: 'NOTI', width: '4%', key: 'correonotificaion' },
      { text: 'Usuarios', width: '15%', key: 'usuarios' },
      { text: 'Estado', width: '5%', key: 'estado' },
      { text: 'Acción', width: '7%', key: 'acciones' },
    ]);

  

    const resetear= () =>{
      ListarBuzones();
    };

    let intervalId: ReturnType<typeof setInterval>; // Corregido aquí

    
    onMounted(async () => {
      ListarBuzones();
      FunList.load_Destinos();

    });
   

    return {
      headers,
      ListaBuzones,
      ListarBuzones,
      resetear,
      openAddBuzonModal,
      EliminarBuzon,
      CrearBuzon,nuevoBuzon
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
</style>