// src/stores/documentosStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { get_listadocumento } from '../services/DocumentoServices';
import { DocumentoFull } from '../interfaces/documento.interface';

export const useDocumentosStore = defineStore('documentos', () => {
  const listaDocumentos = ref<DocumentoFull[]>([]);

  // Función para listar documentos y actualizar el estado
  const listarDocumentos = async () => {
    try {
      const respuesta = await get_listadocumento();
      listaDocumentos.value = respuesta.data;
    } catch (error) {
      console.error('Error listando documentos:', error);
    }
  };

//   // Función para agregar un documento a la lista
//   const agregarDocumento = async (documento: DocumentoFull) => {
//     try {
//       const respuesta = await registerDocumento(documento);
//       if (respuesta.success) {
//         listaDocumentos.value.push(documento);
//       } else {
//         console.log('Error al registrar el documento:', respuesta.message);
//       }
//     } catch (error) {
//       console.error('Error agregando el documento:', error);
//     }
//   };

//   // Función para actualizar un documento
//   const actualizarDocumento = async (documento: DocumentoFull) => {
//     try {
//       const respuesta = await updateDocumento(documento);
//       if (respuesta.success) {
//         const index = listaDocumentos.value.findIndex((doc) => doc.iddoc === documento.iddoc);
//         if (index !== -1) {
//           listaDocumentos.value[index] = documento;
//         }
//       } else {
//         console.log('Error al actualizar el documento:', respuesta.message);
//       }
//     } catch (error) {
//       console.error('Error actualizando el documento:', error);
//     }
//   };

//   // Función para eliminar un documento de la lista
//   const eliminarDocumento = async (id: number) => {
//     try {
//       const respuesta = await deleteDocumento(id);
//       if (respuesta.success) {
//         listaDocumentos.value = listaDocumentos.value.filter((documento) => documento.iddoc !== id);
//       } else {
//         console.log('Error al eliminar el documento:', respuesta.message);
//       }
//     } catch (error) {
//       console.error('Error eliminando el documento:', error);
//     }
//   };

  return {
    listaDocumentos,
    listarDocumentos,
    // agregarDocumento,
    // actualizarDocumento,
    // eliminarDocumento,
  };
});
