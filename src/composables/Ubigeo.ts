// // useUbigeo.js
// import { useUbigeoStore } from '../stores/ubigeoStore';
// import { watch } from 'vue';

// export function useUbigeo() {
//   const ubigeoStore = useUbigeoStore();

//   // Cargar departamentos al iniciar
//   ubigeoStore.cargarDepartamentos();

//   // Observadores para cargar provincias y distritos según las selecciones
//   watch(ubigeoStore.departamentoSeleccionado, (newDepartamento) => {
//     if (newDepartamento) {
//       ubigeoStore.cargarProvincias(newDepartamento.id);
//     } else {
//       ubigeoStore.provincias = [];
//       ubigeoStore.distritos = [];
//     }
//   });

//   watch(ubigeoStore.provinciaSeleccionada, (newProvincia) => {
//     if (newProvincia) {
//       ubigeoStore.cargarDistritos(newProvincia.id);
//     } else {
//       ubigeoStore.distritos = [];
//     }
//   });

//   return {
//     ...ubigeoStore
//   };
// }