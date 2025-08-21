// inicio.vue (ejemplo de un componente hijo)
<script lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { usePaginaStore } from '../../stores/paginaStore';
import type { Pagina } from '../../types/objetosweb';

interface FormData {
    tipoDocumento: string;
    numeroDocumento: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    tipoExpediente: string;
    esTUPA: boolean;
    cabeceraExpediente: string;
    folios: number;
    observaciones: string;
    centroResponsabilidad: string;
    responsable: string;
  }
  
  const formData = reactive<FormData>({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
    tipoExpediente: '',
    esTUPA: false,
    cabeceraExpediente: '',
    folios: 0,
    observaciones: '',
    centroResponsabilidad: '',
    responsable: ''
  })
  
  
export default {
  setup() {
    const pagStore = usePaginaStore();
    const DatosPagina = ref<Pagina | null>(null);

    onMounted(() => {
      DatosPagina.value = pagStore.pagina;
    });

    const handleSubmit = () => {
      console.log('Form submitted:', formData)
      // Add your form submission logic here
    }
    
    const agregarTipoExpediente = () => {
      console.log('Agregar Tipo Expediente clicked')
      // Add your logic for adding a new expedition type here
    }

    return {
      DatosPagina,
      handleSubmit,
      agregarTipoExpediente,
      formData
    };
  }
};
</script>

<template>
   <div class="row  pt-4 pb-3 border-top">
    <div class="col-lg-12">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">

          </div>
          <div class="col-lg-10">
   
                <p class=" f-28 f-w-500">Registro de Expediente</p>
                
                <form @submit.prevent="handleSubmit">
                  <!-- Datos del Solicitante -->
                  <div class="seccion-titulo f-16 pb-4 ">
                    <hr class="mb-4 my-1 ">
                      <div>Estimado(a) ciudadano(a), los documentos se considerarán presentados en los siguientes horarios*:</div>
                      <ul>
                        <li>Desde las 08:00 am hasta las 4:30 pm el mismo día.</li>
                        <li>Después de las 4:30 pm horas, partir del día hábil siguiente.</li>
                        <li>Los sábados, domingos, feriados o cualquier otro día inhábil, a partir del día hábil siguiente.</li>
                      </ul>
                      <div>Para más información, puede comunicarse con nosotros:</div>
                      <div>Correo: mesadepartes@muniveintiseisdeoctubre.gob.pe</div>
                      *De acuerdo al artículo 46.3 del DS N° 029-2021-PCM
                  </div>
                  <div class="seccion-titulo">
                    <h3 class="pt-2 fw-bold">INFORMACIÓN DEL SOLICITANTE</h3>
                    <hr class="mb-4 my-1">
                  </div>
                  <div class="seccion-titulo">
                    <h4 class="py-3">1. Persona natural o jurídica</h4>
                    
                  </div>
                  <!-- ---------------------------- -->
                  <div class="row">
                    <div class="col-md-6 mb-2">
                      <div class="mb-1">
                          <select class="form-select">
                              <option value="">Seleccione tipo Documento</option>
                              <option value="Persona Natural">Persona Natural</option>
                              <option value="Persona Jurídica">Persona Jurídica</option>
                              <!-- Add options here -->
                          </select>
                      </div>
                    </div>  
                    <div class="col-md-6">
                    </div>
                  </div>
                  
                  <!-- ---------------------------- -->
                  <hr class="mb-4 my-1 b-primary">
                  <!-- ---------------------------- -->
                  <div class="row">
                    <div class="col-md-6 mb-2">
                      <div class="mb-1">
                          <label class="col-4 form-label align-content-top pt-2">Tipo Documento</label>
                          <select v-model="formData.tipoDocumento" class="form-select">
                              <option value="">Seleccione tipo Documento</option>
                              <option value="DNI">DNI</option>
                              <option value="Carnet Extranjería">Carnet Extranjería</option>
                              <!-- Add options here -->
                          </select>
                      </div>
                    </div>  
                    <div class="col-md-6 mb-2">
                      <div class="mb-1 ">
                          <label class="col-4 form-label  align-content-top pt-2">N° Documento</label>
                          <input v-model="formData.numeroDocumento" type="text" class="form-control" placeholder="Número de documento">
                      </div>
                    </div>
                  </div>
                  <!-- ---------------------------- -->


                  <div class="row mb-2">
                    <div class="col-md-4">
                        <label class="form-label  align-content-top pt-2">Nombres</label>
                        <div >
                          <input v-model="formData.nombres" type="text" class="form-control" placeholder="Nombres">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label  align-content-top pt-2">Apellido Paterno</label>
                        <div >
                          <input v-model="formData.apellidoPaterno" type="text" class="form-control" placeholder="Apellido Paterno">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label  align-content-top pt-2">Apellido Materno</label>
                        <div >
                          <input v-model="formData.apellidoMaterno" type="text" class="form-control" placeholder="Apellido Materno">
                        </div>
                    </div>
                    
                  </div>
                   
                  <div class="row">
                    
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Dirección</label>
                        <div>
                          <input v-model="formData.direccion" type="text" class="form-control" placeholder="Dirección">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Teléfono</label>
                        <div>
                          <input v-model="formData.telefono" type="tel" class="form-control" placeholder="Teléfono">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Correo Electrónico</label>
                        <div>
                          <input v-model="formData.correoElectronico" type="email" class="form-control" placeholder="Correo Electrónico">
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <!-- Datos del Expediente -->
                  <div class="seccion-titulo">
                    <h4 class="pt-2">1. Persona natural o jurídica</h4>
                  </div>
                  <div class="row">
                    
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Tipo Expediente</label>
                        <div class="d-flex align-items-center">
                          <input v-model="formData.esTUPA" type="checkbox" id="esTUPA" class="me-2">
                          <label for="esTUPA" class="form-label">¿Es Expediente TUPA?</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Tipo</label>
                        <div>
                          <select v-model="formData.tipoExpediente" class="form-select">
                            <option value="">Selecciona un Tipo</option>
                            <!-- Add options here -->
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-md-12 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Asunto</label>
                        <div>
                          <input v-model="formData.cabeceraExpediente" type="text" class="form-control" placeholder="Cabecera Expediente">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2"># Folios</label>
                        <div >
                          <input v-model="formData.folios" type="number" class="form-control" placeholder="Número de Folios">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Observaciones</label>
                        <dark>
                          <textarea v-model="formData.observaciones" rows="3" class="form-control" placeholder="Observaciones"></textarea>
                        </dark>
                      </div>
                    </div>
                  </div>
                  <!-- Oficina Destino -->
                  <div class="seccion-titulo">
                    <h5 class="pt-2">Oficina Destino</h5>
                    <hr class="mb-4 my-1">
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Centro de Responsabilidad</label>
                        <div >
                          <select v-model="formData.centroResponsabilidad" class="form-select">
                            <option value="">Selecciona oficina</option>
                            <!-- Add options here -->
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="row">
                        <label class="form-label  align-content-top pt-2">Responsable</label>
                        <div>
                          <input v-model="formData.responsable" type="text" class="form-control" placeholder="Responsable">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 text-center">
                      <button type="submit" class="btn btn-primary">Enviar</button>
                    </div>
                  </div>
                </form>
                
                
             
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  /* ... tu CSS ... */
</style>
