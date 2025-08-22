// utils/listas.ts

export interface MenuItem {
  tipe: string;
  text: string;
  icon: string;
  route: string;
  role_ids?: number[];  
}

export const menuItems: MenuItem[] = [
  
  //  OFICINAS TRÁMITE DOCUMENTARIO ---------------------------------------
  //********************************************************************* */
  {
    tipe: 'link',
    text: 'Nuevo Documento',
    icon: 'ph-duotone ph-duotone ph-file-doc',
    route: '/office/nuevodocumento',
    role_ids: [1,3] 
  },
  //---------------------------------------------------
  {
    tipe: 'titulo',
    text: 'Documentos Pendientes',
    icon: '',
    route: '', 
    role_ids: [1,3]
  },
  {
    tipe: 'link',
    text: 'Por Recibir',
    icon: 'ph-duotone ph-duotone ph-hand',
    route: '/office/documentos_porrecibir',
    role_ids: [1,3]
  },
  {
    tipe: 'link',
    text: 'Recibidos',
    icon: 'ph-duotone ph-file-arrow-down',
    route: '/office/documentos_recibidos',
    role_ids: [1,3] 
  },
  //---------------------------------------------------
  {
    tipe: 'titulo',
    text: 'Documentos Trámitados',
    icon: '',
    route: '', 
    role_ids: [1,3]  
  },
  {
    tipe: 'link',
    text: 'Enviados',
    icon: 'ph-duotone ph-duotone ph-hand',
    route: '/office/documentos_enviados',
    role_ids: [1,3] 
  },
  {
    tipe: 'link',
    text: 'Atendidos',
    icon: 'ph-duotone ph-file-arrow-down',
    route: '/office/documentos_porrecibir',
    role_ids: [1,3]  
  },
  
  
  //MESA DE PARTES ------------------------------------------------------
  //********************************************************************* */

  {
    tipe: 'titulo',
    text: 'Mesa de Partes',
    icon: 'ph-folder-notch-plus',
    route: '', 
    role_ids: [1,2]  
  },
  //--------------------------------------------
  {
    tipe: 'link',
    text: 'Nuevo Documento',
    icon: 'ph-duotone ph-folder-notch-plus',
    route: '/office/mesapartes_crear',
    role_ids: [1,2] 
  },
  //----------------------------------------------
  {
    tipe: 'titulo',
    text: 'Documentos',
    icon: 'ph-folder-notch-plus',
    route: '', 
    role_ids: [1,2]  
  },
  {
    tipe: 'link',
    text: 'Recibidos',
    icon: 'ph-duotone ph-hand',
    route: '/office/mesapartes_recibidos',
    role_ids: [1,2]  
  },
  {
    tipe: 'link',
    text: 'Enviados',
    icon: 'ph-duotone ph-file-arrow-up',
    route: '/office/mesapartes_enviados',
    role_ids: [1,2]  
  },


  //MÓDULO LICENCIAS ---------------------------------------------------- */
  //********************************************************************* */
  {
    tipe: 'titulo',
    text: 'Solicitudes',
    icon: '',
    route: '', 
    role_ids: [1, 4] 
  },
  //-----------------------------------------------
  {
    tipe: 'link',
    text: 'Solicitudes',
    icon: 'fas fa-pen',
    route: '/office/licencia_solicitudes',
    role_ids: [1, 4,] 
  },
  {
    tipe: 'link',
    text: 'En Proceso',
    icon: 'ph-duotone ph-gear-six ',
    route: '/office/licencias_enproceso',
    role_ids: [1, 4] 
  },
  {
    tipe: 'link',
    text: 'Rechazadas',
    icon: 'ph-duotone ph-x-circle',
    route: '/office/licencias_rechazadas',
    role_ids: [1, 4] 
  },
  //-----------------------------------------------
  {
    tipe: 'titulo',
    text: 'Licencias Funcionamiento',
    icon: '',
    route: '', 
    role_ids: [1, 4] 
  },
  //-----------------------------------------------
  {
    tipe: 'link',
    text: 'Licencias',
    icon: 'ph-duotone ph-certificate',
    route: '/office/licencias_emitidas',
    role_ids: [1,  4]  
  },
  {
    tipe: 'link',
    text: 'De Baja',
    icon: 'ph-duotone ph-arrow-fat-down',
    route: '/office/licencias_debaja',
    role_ids: [1, 4]  
  },
  {
    tipe: 'link',
    text: 'Autorizaciones',
    icon: 'ph-duotone ph-check',
    route: '/office/autorizaciones_emitidas',
    role_ids: [1, 4]  
  },

  // TRAMITE DOCUMENTARIO CONFIGURACIÓN
  
  //-----------------------------------------------
  {
    tipe: 'titulo',
    text: 'Gestión Documentaria',
    icon: '',
    route: '', 
  },
  {
    tipe: 'link',
    text: 'Usuarios',
    icon: 'ph-duotone ph-user-list',
    route: '/office/trabajador',
    role_ids: [1,2, 4,3]  // Solo visible para Administrador
  },  
  {
    tipe: 'link',
    text: 'Oficinas',
    icon: 'ph-duotone ph-buildings ',
    route: '/office/oficina',
    role_ids: [1,2, 3]  // Visible para Administrador y Oficinas
  },
  {
    tipe: 'link',
    text: 'Tramites TUPA',
    icon: 'fas fa-file-contract',
    route: '/office/tramite',
    role_ids: [1,2,3,4]   
  },
  {
    tipe: 'link',
    text: 'Requisitos',
    icon: 'fas fa-check-circle',
    route: '/office/requisito',
    role_ids: [1,3,2, 4]  
  },


  //-----------------------------------------------
  {
    tipe: 'titulo',
    text: 'Configuración',
    icon: '',
    route: '', 
    role_ids: [1,3,2, 4]  
  },
  
    {
    tipe: 'link',
    text: 'Busqueda ',
    icon: 'fas fa-search',
    route: '/office/modulo_busqueda/buscar_licencia',
    role_ids: [1,4]  
  },
];
