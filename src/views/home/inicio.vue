<template>
  <!-- <carousel :images="images"/> -->
  <div class="row fondocabecera pt-4 pb-3">
    <div class="col-lg-12">
      <div class="container">
          <div class="d-flex justify-content-center mt-0"  data-aos="fade-left">
              <img src="../../assets/images/licenciafunw.png" class="wid-250">
          </div>
      </div>
    </div>
  </div>

  <div class="row bg-white pt-2 pb-3">
    <div class="col-lg-12">
      <div class="container">
        <div class="row  my-5">
          <div class="col-12 text-center">
            <h2 class="text-gray-700 pb-4" data-aos="fade-right">¿Qué es una licencia de funcionamiento?</h2>
          </div>
          <div class="col-4 f-20 text-center">
              <img src="../../assets/images/document.png" class="w-75 p-3">
          </div>
          <div class="col-8 f-20">
            <div class=" text-center m-auto  text-inter ">
              <p class=" w-90 text-justify py-3 f-18" data-aos="fade-left">Es la autorización que otorgan las municipalidades a personas naturales, jurídicas o
                  entes colectivos, nacionales o extranjeros, de derecho privado o público, incluyendo
                  empresas o entidades del Estado, regionales o municipales.
                  para que puedan iniciar sus actividades económicas.</p>
              <p class="text-justify f-18">Con una licencia evitas una clausura y eventual multa o sanción.</p>
           
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>

  <!-- PRECIO ------------------------------------------ -->
  <div class="row bg-gray-200 pt-2 pb-3">
    <div class="col-lg-12">
      <div class="container">
        <div class="row my-5">
          <div class="col-12 f-20 ">
            <div class="w-75 text-center m-auto  text-inter ">
                    
              <h2  class="text-gray-700 pb-3" data-aos="fade-right">¿Qué aspectos se evalúan para otorgar la Licencia de Funcionamiento?   </h2>
              <ul class="text-justify py-3" data-aos="fade-left">
                <li>Zonificación y Compatibilidad de uso</li>
                <li>Condiciones de seguridad de la edificación</li>
                <li>Cualquier aspecto adicional será materia de fiscalización posterior</li>
              </ul>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  

   <!-- OTROS ---------------------- -->

  
  
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import CountdownTimer from '../../components/count_down.vue';
import carousel_fotos from '../../components/carousel_fotos.vue';
import { get_fotos, get_fotosRuta } from '../../services/fotosService';

import NumberFormat from '../../utils/FormatNumber';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePaginaStore } from '../../stores/paginaStore';
import { Pagina, Precio } from '../../types/objetosweb';
import { Foto } from '../../types/interfaces';
import { API_URL, HOST_URL } from '../../config';
import carousel from '../../components/carousel.vue';
export default defineComponent({
  components: {
    CountdownTimer,carousel_fotos,carousel
  },
  setup() {
    const pagStore = usePaginaStore();
    const DatosPagina = ref<Pagina | null>(null);
    const ListaPrecios = ref<Precio[]>([]);
    const Preventa =ref(false);

      // Importa las imágenes usando la función import.meta.glob
    const images = [
      { nombre: 'Banner 1', url: new URL('@/assets/images/banner/b1.avif', import.meta.url).href }
    ];

    const ListaFotos = ref<Foto[]>([]);
    const ListaFotosRutas = ref<Foto[]>([]);
    const fechaLimite = ref<Date | null>(null);

    const obtenerPrecio = (categoria: string, tipo: 'preventa' | 'venta') => {
      const precioEncontrado = ListaPrecios.value.find((precio) => precio.categoria === categoria);
      if (precioEncontrado) {
        return tipo === 'preventa' ? precioEncontrado.preventa : precioEncontrado.venta;
      }
      return "";
    };

    const obtenerPrecioActual = (categoria: string, fechaLimiteTexto: string) => {
      const precioEncontrado = ListaPrecios.value.find((precio) => precio.categoria === categoria);

      if (precioEncontrado) {
        if (EsPreventa(fechaLimiteTexto)) {
          return  precioEncontrado.preventa;
        } else {
          return precioEncontrado.venta;
        }
      }else{
         return "";
      }
     
    };

    function EsPreventa(fechaLimiteTexto: string){
      const fechaLimite = new Date(fechaLimiteTexto);
      const hoy = new Date();

      const fechaLimiteSinHoras = new Date(fechaLimite.getFullYear(), fechaLimite.getMonth(), fechaLimite.getDate());
      const hoySinHoras = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

      if (hoySinHoras <= fechaLimiteSinHoras) {
        return  true;
      } else {
        return false;
      }
    }
 
    
    function formatearFecha(fecha: Date): string {
      // Opciones para formatear el día de la semana y el mes
      const opcionesDia: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const opcionesFecha: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long' };

      // Obtenemos el nombre del día de la semana y el mes
      const nombreDia = new Intl.DateTimeFormat('es-ES', opcionesDia).format(fecha);
      const fechaFormateada = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(fecha);

      // Capitalizar el nombre del día
      const nombreDiaCapitalizado = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);

      return `${nombreDiaCapitalizado} ${fechaFormateada}`;
    }

    onMounted(async () => {
      try {
        //cargo fotos

        const fotos = await get_fotos();
        if (Array.isArray(fotos.data)) {
          ListaFotos.value = fotos?.data || [];
        } else {
          ListaFotos.value = [];
        }
        //cargoRutas
        const rutas = await get_fotosRuta();
        if (Array.isArray(rutas.data)) {
          ListaFotosRutas.value = rutas?.data || [];
        } else {
          ListaFotosRutas.value = [];
        }
      } catch (error) {
        console.error("Error al obtener las fotos:", error);
      }
      DatosPagina.value = pagStore.pagina;
   
      if(DatosPagina.value?.fechalimite){
        const fechaStr = DatosPagina.value?.fechalimite;
        const [yearStr, monthStr, dayStr] = fechaStr.split('-');

        // Convertimos las partes a números
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);

        fechaLimite.value = new Date(`${DatosPagina.value?.fechalimite}T00:00:00`);
        if(EsPreventa(DatosPagina.value?.fechalimite)){
          Preventa.value=true;
        }
       
      }
     
        
    });

    return {
      NumberFormat,obtenerPrecio,formatearFecha,
      DatosPagina,ListaFotos,API_URL,HOST_URL,ListaFotosRutas,
      fechaLimite,ListaPrecios,obtenerPrecioActual,EsPreventa,Preventa,
      images
    };
  },
  mounted() {
        AOS.init({
            easing: 'ease-in-out-sine',
            duration: 700
        });
  }
});
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.top150 {
  margin-top: 35vh;
}

.top10vh {
  margin-top: 10vh;
}

// .pad_pant{
//   margin-top: 20vh;
// }
.btnhover {
  background-color: initial; /* Define el color de fondo inicial */
  background-image: initial; /* Define la imagen de fondo inicial */
  transition: background-color 1.0s ease, background-image 0.5s ease; /* Define la transición */
}

.btnhover:hover {
  background-color: #102ab8;
  
  background-size: cover;
}
.imghover0:hover{
  background-image: url("../../assets/images/banner/b1.avif");
}
.imghover1:hover{
  background-image: url("../../assets/images/banner/b4.avif");
}
.imghover2:hover{
  background-image: url("../../assets/images/banner/b2.avif");
}
.imghover3:hover{
  background-image: url("../../assets/images/banner/b3.avif");
}

.btnhover:hover  .btn{
  background-color: #030a30;
}
.btnhover:hover  .text-primary{
  color: #e9e9e9 !important;
}


.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Ocupa toda la altura de la pantalla */
  text-align: center;
  flex-direction: column; /* Asegura que los elementos estén en columna */
}

.pad_pant {
  margin-top: 0; /* Asegúrate de que no haya margen superior que desplace el contenido */
}

@media (max-width: 768px) {
  .center-content {
    height: 100vh; /* También ocupa toda la pantalla en dispositivos móviles */
  }
}

</style>
