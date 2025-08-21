import { ref } from "vue";

import  {Destino, item_id_nombre, Oficina, Tramite} from "../types/interfaces"
import { defineStore } from 'pinia';
import { RequisitoAsignado } from "../interfaces/requisitos.interface";

export const ListasStore = defineStore('TiendaListas', () => {    
    
    const ListaRequisitosAsignados  = ref<RequisitoAsignado[]>([]);
    const ListaTipoDocumentos       = ref<item_id_nombre[]>([]);
    const ListaTramitesTUPA         = ref<Tramite[]>([]);
    const ListaTramitesTUPA_Oficina = ref<Tramite[]>([]);
    const ListaOficinas             = ref<Oficina[]>([]);
    const ListaDestinos             = ref<Destino[]>([]);

    const HorarioLicencia = ref("");


    const cargarListaDocumentos = (documentos: item_id_nombre[]) => {
        ListaTipoDocumentos.value = documentos;
    };


    const Set_HorarioLicencia = (horario: string) => {
        HorarioLicencia.value = horario;
    };

    const limpiarListaRequisitosAsignados = () => {
        ListaRequisitosAsignados.value = [];
    };

    return {
        ListaTipoDocumentos,
        ListaTramitesTUPA,
        HorarioLicencia,
        ListaTramitesTUPA_Oficina,
        ListaRequisitosAsignados,
        limpiarListaRequisitosAsignados,
        ListaOficinas,
        ListaDestinos,
        cargarListaDocumentos,
        Set_HorarioLicencia
    };

});
