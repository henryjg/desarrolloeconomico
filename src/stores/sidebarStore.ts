import { ref, computed } from "vue";
import { defineStore } from 'pinia';
import { datos_stat_documentos, initialize_datos_stat_documentos } from "../interfaces/sidebarBagdes.interfaces";
import { Obtener_stat_documentos } from '../services/DocumentoServices';
import { usarAuthStore } from './autentificacionStore';

export const useSidebarStore = defineStore('SideBarDatos', () => {    
    
    // Estado para los datos estadísticos
    const datos_stat_documentos = ref<datos_stat_documentos>(initialize_datos_stat_documentos());
    

    
    // Estado para controlar el intervalo
    let intervalId: NodeJS.Timeout | null = null;
    const isAutoUpdateActive = ref(false);
    
    // Computed para obtener el usuario logueado
    const authStore = usarAuthStore();
    const usuarioLogueado = computed(() => authStore.usuario_Logueado);
    
    // Función para cargar datos estadísticos
    const cargarDatosEstadisticos = async (): Promise<boolean> => {
        try {
            if (!usuarioLogueado.value?.buzon_id) {
                console.warn('⚠️ Usuario o buzon_id no disponible para cargar estadísticas');
                return false;
            }

            console.log('🔄 Cargando datos estadísticos para buzon_id:', usuarioLogueado.value.buzon_id);
            const response = await Obtener_stat_documentos(usuarioLogueado.value.buzon_id);
            
            if (response.success) {
                const nuevos_datos = response.data.data;
                
                datos_stat_documentos.value= response.data;
                console.log('asasa');
                console.table(nuevos_datos);
                // console.log('📊 Datos estadísticos recibidos:', datos_stat_documentos.value.enviados);
                // Actualizar con los nuevos datos (convertir strings a números)
                // datos_stat_documentos.value = {
                //     buzon_nombres: nuevos_datos.buzon_nombres,
                //     buzon_id: parseInt(nuevos_datos.buzon_id),
                //     buzon_tipo: nuevos_datos.buzon_tipo,
                //     enviados: parseInt(nuevos_datos.enviados) || 0,
                //     recibidos: parseInt(nuevos_datos.recibidos) || 0,
                //     porrecibir: parseInt(nuevos_datos.porrecibir) || 0,
                //     archivado: parseInt(nuevos_datos.archivado) || 0
                // };
                
                return true;
            } else {
                console.error('❌ Error en respuesta del servicio:', response.message);
                return false;
            }
        } catch (error) {
            console.error('💥 Error al cargar datos estadísticos:', error);
            return false;
        }
    };
    
    // Función para iniciar la actualización automática cada 2 minutos
    const iniciarActualizacionAutomatica = () => {
        if (isAutoUpdateActive.value) {
            console.log('⚠️ La actualización automática ya está activa');
            return;
        }
        
        console.log('🚀 Iniciando actualización automática de badges cada 2 minutos');
        
        // Cargar datos inmediatamente
       // cargarDatosEstadisticos();
        
        // Configurar intervalo de 2 minutos (120000 ms)
        // intervalId = setInterval(() => {
        //     console.log('⏰ Ejecutando actualización automática programada');
        //     cargarDatosEstadisticos();
        // }, 120000);
        
        isAutoUpdateActive.value = true;
    };
    
    // Función para detener la actualización automática
    const detenerActualizacionAutomatica = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            isAutoUpdateActive.value = false;
            console.log('🛑 Actualización automática detenida');
        }
    };
    

    
    // Función para forzar recarga inmediata (útil para otros componentes)
    const forzarRecarga = async (): Promise<boolean> => {
        console.log('🔄 Forzando recarga inmediata de datos estadísticos');
        return await cargarDatosEstadisticos();
    };
    
    // Función para reiniciar el sistema de badges
    const reiniciarSistema = () => {
        detenerActualizacionAutomatica();
        datos_stat_documentos.value = initialize_datos_stat_documentos();
        console.log('🔄 Sistema de badges reiniciado');
    };
    
    // Getters computados para facilitar el acceso
   
    
    const tieneDocumentosPendientes = computed(() => 
        datos_stat_documentos.value.porrecibir > 0 || datos_stat_documentos.value.recibidos > 0
    );

    return {
        // Estados reactivos
        datos_stat_documentos,
        isAutoUpdateActive,
        
        // Acciones principales
        cargarDatosEstadisticos,
        iniciarActualizacionAutomatica,
        detenerActualizacionAutomatica,
        forzarRecarga,
        reiniciarSistema,
        
        // Getters computados
        tieneDocumentosPendientes
    };
});
