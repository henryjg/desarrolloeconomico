<template>
  <div class="modulo-operaciones text-inter">
      

      <div class="container">
        <!-- ------------------ -->
        <div class="row">
          <dil class="col-12 pt-3">
              <div class="card rounded-0">
                <div class="card-body">
                   <h4 class="titulo text-gray-700">Bienvenido(a), {{ Usuario.nombreusuario}}</h4>
                   <p class="alert alert-info">Accede de manera sencilla a los siguientes servicios:</p>
                </div>
              </div>              
          </dil>
        </div>
        <!-- ------------------ -->

        <!-- ------------------ -->
        <div class="row">
          <dil class="col-12 text-center ">
              <h3 class="titulo text-blue-800">Servicios Virtuales</h3>
          </dil>
        </div>
        <!-- ------------------ -->
        
        <div class="row">
          <div class="col-4" v-for="servicio in servicios" :key="servicio.id" >
            <component
              :is="servicio.enlace==='externo' ? 'a' : 'router-link'"
              :to="servicio.enlace!=='externo' ? servicio.ruta : null"
              :href="servicio.enlace==='externo' ? servicio.ruta : null"
              :target="servicio.enlace==='externo' ? '_blank' : '_self'"
            >
              <div class="card rounded-0" >
                <div class="card-body " :class="servicio.color">
                  <div class="row">
                    <div class="col-4">
                      <img :src="servicio.icono" alt="Icono del servicio" class="w-100" />
                    </div>
                    <div class="col-8">
                      <h5 class="titulo-servicio">{{ servicio.titulo }}</h5>
                      <div class="btn btn-primary">INGRESAR</div>
                    </div>
                  </div>
                </div>
              </div>
            </component>
          </div>
        </div>

        <!-- ------------------ -->
      </div>
  </div>
</template>

<script  lang="ts">
import { ref } from 'vue'
import Breadcrumb from '../../components/breadcrumb.vue';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { initializeUsuarioLog, type UsuarioLog } from '../../types/interfaces';
import img1 from '../../assets/licencias.png';
import img2 from '../../assets/documentos.png';
import img3 from '../../assets/archivo.png';
import img4 from '../../assets/pago-movil.png';


interface Servicio {
  id: number;
  titulo: string;
  enlace: string;
  ruta: string;
  color: string;
  icono: string;
  nuevo?: boolean;
  enConstruccion?: boolean; // Nueva propiedad para indicar si está en construcción
}

export default {
    components: {
      Breadcrumb
    },
    setup() {
      const authStore = usarAuthStore();
      const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
        
      Usuario.value = authStore.usuario_Logueado;

      const servicios = ref<Servicio[]>([
        
        {
          id: 1,
          titulo: 'MESA DE PARTES VIRTUAL',
          enlace: 'interno',
          ruta: '/extranet/ingreso_expedientes',
          color: 'bg-gris',
          icono: img2,
          enConstruccion: true // Marcamos este servicio como "En construcción"
        },
        {
          id: 2,
          titulo: 'SEGUIMIENTO DE DOCUMENTOS',
          enlace: 'interno',
          ruta: '/extranet/formulariolicencias',
          color: 'bg-azul',
          icono: img3,
          nuevo: true
        },
        {
          id: 3,
          titulo: 'LICENCIA DE FUNCIONAMIENTO',
          enlace: 'interno',
          ruta: '/extranet/formulariolicencias',
          color: 'bg-azul',
          icono: img1,
          nuevo: true
        },
        {
          id: 4,
          titulo: 'PAGOS DE ARBITRIOS EN LINEA',
          enlace: 'externo',
          ruta: 'https://digital.muniveintiseisdeoctubre.gob.pe/pagos/pasarela',
          color: 'bg-azul',
          icono: img4,
          nuevo: true
        },
      ])
      return { servicios,Usuario };
    },
}



</script>



<style scoped>

</style>