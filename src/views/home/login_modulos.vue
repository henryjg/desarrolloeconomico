<template>
  <div class="row bg-blue-800 "  style="min-height: calc(100vh - 124px)"  >
    <!-- ------------------------ -->
    <div class="col-md-8 d-none d-sm-block px-0">
    
      <div class="overflow-hidden d-flex align-items-center justify-content-center custom-div">
        <img src="/src/assets/bglogin.jpg" class="img-centered">
      </div>
    </div>
    <!-- ------------------------ -->    
    <div class="col-md-4 justify-content-center align-content-center">
      <div class="p-5">
        <div class="text-center">
            <h3 class="f-w-500 mb-1 text-white f-w-700">SISTEMA DE GESTIÓN DE DOCUMENTAL</h3>
            <p class="text-white pt-4 mb-0 f-w-500">USUARIOS.</p>
            <!-- {{ Usuariolog }} -->
            <p class=" text-info">Inicio de Sesión.</p>
        </div>
        <div class="mb-3">
            <input type="text" v-model="usuario" class="form-control bg-white"  placeholder="Usuario">
        </div>
        <div class="mb-3">
            <input type="password" v-model="contrasena" class="form-control bg-white" placeholder="Contraseña">
        </div>
        <div class="d-grid mt-2">
            <button type="button" @click="IniciarSession" class="btn btn-danger ">
              <i class="fas fa-lock m-r-10"></i> Iniciar Sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {  computed, onMounted, ref } from 'vue';
import { usarAutenticacion } from '../../composables/AuthValidate';
import { usarAuthStore } from '../../stores/autentificacionStore';
const isDarkTheme = ref(false);

export default {
    setup () {
      const authStore = usarAuthStore();
    const Usuariolog = computed(() => authStore.usuario_Logueado);
    
      const { login } = usarAutenticacion();
        const usuario = ref("");
        const contrasena = ref("");
        onMounted(() => {
          isDarkTheme.value = checkIfDarkTheme();

          console.log(isDarkTheme.value);
        });
        const checkIfDarkTheme = () => {
          return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        };  

        const IniciarSession = async () => {
          try {
            await login(usuario.value, contrasena.value);
          } catch (error) {
            console.error('Error al iniciar sesión', error);
          }
        };

    return { IniciarSession, usuario, contrasena,Usuariolog };
  },
};
</script>

<style lang="scss" scoped>


/* El contenedor debe ocupar espacio y ocultar cualquier contenido que se desborde */
.custom-div {
  width: 100%; /* Ajusta al ancho total del contenedor */
  height: calc(100vh - 124px); /* Altura dinámica restando 124px (por el header, por ejemplo) */
  display: flex; /* Habilita flexbox para centrar */
  justify-content: center; /* Centra horizontalmente el contenido */
  align-items: center; /* Centra verticalmente el contenido */
  overflow: hidden; /* Oculta cualquier parte de la imagen que desborde */
  background-color: #000; /* Opcional: color de fondo */
}

/* La imagen se ajustará dinámicamente */
.img-centered {
  width: 100%; /* Imagen ocupa el 100% del ancho inicialmente */
  height: auto; /* Mantiene la proporción de la imagen */
  min-height: 100%; /* Asegura que siempre ocupe el alto del contenedor */
  object-fit: cover; /* Llena el espacio disponible del contenedor, recortando si es necesario */
}

/* Opcional: asegúrate de que el body no tenga desplazamiento no deseado */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}



</style>