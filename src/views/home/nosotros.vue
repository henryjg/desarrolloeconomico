// inicio.vue (ejemplo de un componente hijo)
<script lang="ts">
import { ref, onMounted } from 'vue';
import { usePaginaStore } from '../../stores/paginaStore';
import carousel_fotos from '../../components/carousel_fotos.vue';
import type { Pagina } from '../../types/objetosweb';
import { Foto } from '../../types/interfaces';
import { get_fotos } from '../../services/fotosService';

export default {
  components: {
    carousel_fotos
  },
  setup() {
    const activeTab = ref('normativa'); // Controla qué pestaña está activa
    
    return {
      activeTab
    };
  }
};
</script>

<template>
  <div class="row fondocabecera text-center align-content-center" style="height:150px">
      <p class="text-white f-30 f-w-500 ">Procedimiento para la obtención de Licencia</p>
  </div>
   <div class="row  pt-4 pb-3 border-top ">
    <div class="col-lg-12">
      <div class="container">
        <div class="row ">

          <table style="margin: 0 auto; text-align: left; width: 100%;">
            <tr>
                <td class="text-center" style="margin: 0; width: 25%;">
                  [radio tipo-reclamo use_label_element default:1 "Reclamo" "Queja"]
                </td>
                <td class="text-center" style="margin: 0; width: 75%;">
                  <strong>RECLAMO:</strong> (disconformidad relacionada a los productos o servicios)<br>
                  <strong>QUEJA:</strong> (Disconformidad no relacionada a los productos o servicios; o malestar o descontento a la atención al pública).
                </td>
            </tr>
        </table>
          

          <!-- ----------------- col 9 - Inicio -->
         
          <div class="col-12">
            <!-- Pestañas -->
            <ul class="nav nav-pills m-auto  m-l-15" id="myTab" role="tablist">
              <li class="nav-item m-auto">
                <button 
                  class="btn btn-light-secondary f-16 f-w-600"  :class="{ active: activeTab === 'procedimiento' }" 
                  @click="activeTab = 'procedimiento'"
                  id="procedimiento-tab" role="tab" 
                  :aria-selected="activeTab === 'procedimiento' ? 'true' : 'false'"
                >
                  1. PROCEDIMIENTOS
                </button>
              </li>
              <li class="nav-item m-auto">
                <button 
                  class="btn btn-light-secondary f-16 f-w-600"  :class="{ active: activeTab === 'normativa' }" 
                  @click="activeTab = 'normativa'"
                  id="normativa-tab" role="tab" 
                  :aria-selected="activeTab === 'normativa' ? 'true' : 'false'"
                >
                  2. NORMATIVIDAD
                </button>
              </li>
              <li class="nav-item m-auto">
                <button 
                  class="btn btn-light-secondary f-16 f-w-600" :class="{ active: activeTab === 'zonificacion' }" 
                  @click="activeTab = 'zonificacion'"
                  id="zonificacion-tab" role="tab"
                  :aria-selected="activeTab === 'zonificacion' ? 'true' : 'false'"
                >
                  3. ZONIFICACIÓN
                </button>
              </li>
              <li class="nav-item m-auto">
                <button 
                  class="btn btn-light-secondary  f-16 f-w-600" :class="{ active: activeTab === 'formulario' }" 
                  @click="activeTab = 'formulario'"
                  id="formulario-tab" role="tab"
                  :aria-selected="activeTab === 'formulario' ? 'true' : 'false'"
                >
                  4. FORMULARIO
                </button>
              </li>
            
            </ul>

            <!-- Contenido de las Pestañas -->
            <div class="tab-content" id="myTabContent">

              <div v-if="activeTab === 'procedimiento'" class="tab-pane fade show active" id="procedimiento" role="tabpanel" aria-labelledby="procedimiento-tab">
                <div class="pt-5 px-5 f-16 text-inter">
                    <ul>
                      <li>Registrarse y/o Ingresar al Sitema de Operaciones en Linea de la MDVO.</li>
                      <li>Revisar si cumple con los parámetrps de Zonificación.</li>
                      <li>Registrar su solicitud cumpliendo los requisitos solicitados según el tipo de licencia.</li>
                      <ul>
                        <li>Llenar formatos solicitados</li>
                        <li>Declaraciones Juradas</li>
                        <li>Otros</li>
                      </ul>
                    </ul>
                </div>
              </div>

              <div v-if="activeTab === 'normativa'" class="tab-pane fade show active" id="normativa" role="tabpanel" aria-labelledby="normativa-tab">
                <div class="pt-2">
                    <div class="row">
                      
                       <!-- <ul class="w-75 m-auto pt-5">
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                        <li class="pb-2">
                          <i class="fa fa-file-pdf text-red-500 f-20"></i>  Normativa 1
                        </li>
                       </ul> -->
                      
                    </div>
                </div>
              </div>

              <div v-if="activeTab === 'zonificacion'" class="tab-pane fade show active" id="zonificacion" role="tabpanel" aria-labelledby="zonificacion-tab">
                  <div class="pt-2">
                    <!-- Contenido del tab REGISTRAR -->
                    <p class="px-2 f-20 f-w-500 text-success mt-2">Registro de Administrado.</p>
                    <hr class="b-gray">
                        <!-- -------------------------------------------- -->
                    <div class="row">
                      <div class="col-12 p-4">        
                        <!-- -------------------------------------------- -->
                       

                      </div>
                    
                    </div>
                  </div>
              </div>


              <div v-if="activeTab === 'formularios'" class="tab-pane fade show active" id="formularios" role="tabpanel" aria-labelledby="formularios-tab">
                  <div class="pt-2">
                    <!-- Contenido del tab REGISTRAR -->
                    <p class="px-2 f-20 f-w-500 text-success mt-2">Registro de Administrado.</p>
                    <hr class="b-gray">
                        <!-- -------------------------------------------- -->
                    <div class="row">
                      <div class="col-12 p-4">        
                        <!-- -------------------------------------------- -->
                       

                      </div>
                    
                    </div>
                  </div>
              </div>
            </div>


          </div>
        <!-- ----------------- col 9 - Fin -->



        </div>
      </div>
    </div>
  </div>
  
</template>

<style>

</style>
