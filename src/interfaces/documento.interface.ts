import { ref } from "vue";
import { usarAuthStore } from "../stores/autentificacionStore";
import { initializeUsuarioLog, UsuarioLog } from "../types/interfaces";

const authStore = usarAuthStore();
const Usuario = ref<UsuarioLog>(initializeUsuarioLog());

Usuario.value = authStore.usuario_Logueado;

export interface Documento {
  iddoc: string;
  numerodocumento: string;
  numeracion_tipodoc_oficina: string;
  procedencia: string;
  prioridad: string;
  usrorigen_id: number;
  asunto: string;
  folios: number;
  tipodocumento_id: number;
  descripcion: string;
  estado: string;
  referencias_id: string;
  otrasreferencias: string;
  estupa: boolean;
  tramitetupa_id: number;
  fechavencimiento: string;
  administrado_id: number;
  pdf_principal: string;
  pdf_anexo1: string;
  pdf_anexo2: string;
}

export const initialize_CrearDocumento = (ofiorigen_id?: number | null): Documento => {
  return {
    iddoc: '',
    numerodocumento: '',
    numeracion_tipodoc_oficina: '',
    procedencia: '',
    prioridad: 'Normal',
    usrorigen_id: parseInt(Usuario.value.id.toString()) ?? 0, // Usa 0 si el valor es null o undefined
    asunto: '',
    folios: 0,
    tipodocumento_id: 0,
    descripcion: '',
    estado: 'Iniciado',
    referencias_id: '',
    otrasreferencias: '',
    estupa: false,
    tramitetupa_id: 0,
    fechavencimiento: '',
    administrado_id: 0,
    pdf_principal: '',
    pdf_anexo1: '',
    pdf_anexo2: ''
  };
};


export const initialize_CrearDocumentoErrores = (): Documento => {
  return {
    iddoc: '',
    numerodocumento: '',
    numeracion_tipodoc_oficina: '',
    procedencia: '',
    prioridad: '',
    usrorigen_id: 0,
    asunto: '',
    folios: 0,
    tipodocumento_id: 0,
    descripcion: '',
    estado: '',
    referencias_id: '',
    otrasreferencias: '',
    estupa: false,
    tramitetupa_id: 0,
    fechavencimiento: '',
    administrado_id: 0,
    pdf_principal: '',
    pdf_anexo1: '',
    pdf_anexo2: ''
  };
};

export interface DocumentoExterno {
  iddoc: string;
  numerodocumento: string;
  numeracion_tipodoc_oficina: string;
  procedencia: string;
  prioridad: string;
  usrorigen_id: number;
  usrdestino_id: number;
  asunto: string;
  folios: number;
  tipodocumento_id: number;
  descripcion: string;
  estado: string;
  referencias_id: string;
  otrasreferencias: string;
  estupa: boolean;
  tramitetupa_id: number;
  fechavencimiento: string;
  administrado_id: number;
  pdf_principal: string;
  pdf_anexo1: string;
  pdf_anexo2: string;
  usuario_id: string;
  usuario_nombre:string;
}

export const initialize_CrearDocumentoExterno = (ofiorigen_id?: number | null): DocumentoExterno => {
  return {
    iddoc: '',
    numerodocumento: '',
    numeracion_tipodoc_oficina: '',
    procedencia: '',
    prioridad: 'Normal',
    usrorigen_id: Usuario.value.id ?? 0, 
    usrdestino_id: 0,
    asunto: '',
    folios: 0,
    tipodocumento_id: 0,
    descripcion: '',
    estado: 'Iniciado',
    referencias_id: '',
    otrasreferencias: '',
    estupa: false,
    tramitetupa_id: 0,
    fechavencimiento: '',
    administrado_id: 0,    
    pdf_principal: '',
    pdf_anexo1: '',
    pdf_anexo2: '',
    usuario_id: Usuario.value.id.toString() ?? '',
    usuario_nombre: Usuario.value.nombreusuario ?? '',
  };
};
export const initialize_CrearDocumentoExternoErrores = (): DocumentoExterno => {
  return {
    iddoc: '',
    numerodocumento: '',
    numeracion_tipodoc_oficina: '',
    procedencia: '',
    prioridad: '',
    usrorigen_id: 0, 
    usrdestino_id: 0,
    asunto: '',
    folios: 0,
    tipodocumento_id: 0,
    descripcion: '',
    estado: '',
    referencias_id: '',
    otrasreferencias: '',
    estupa: false,
    tramitetupa_id: 0,
    fechavencimiento: '',
    administrado_id: 0,
    pdf_principal: '',
    pdf_anexo1: '',
    pdf_anexo2: '',
    usuario_id: '',
    usuario_nombre: '',
  };
};




export interface Adjunto {
  id: number;
  nombrefile: string;
  url: string;
  documento_id: string;
  fecharegistro: string;
}
export const initialize_Adjunto = (): Adjunto => {  
  return {
    id: 0,
    nombrefile: "pdf_documentoprincipal",
    url: "",
    documento_id: "",
    fecharegistro: "",
  }
}

export interface ReferenciaDoc {
  iddoc: number;
  tipodocumento_id: number;
  numerodocumento: number;
  anio: number;
  usrorigen_id: number;
}

export const initialize_ReferenciaDoc = (): ReferenciaDoc => {  
  return {
    iddoc:0,
    tipodocumento_id: 0,
    numerodocumento: 0,
    anio: 0,
    usrorigen_id: 0,
  }
}
  
export interface tipodocumento {
  id: number;
  nombre: string;
  esactivo: boolean
}

export const initialize_tipodocumento = (): tipodocumento => {  
  return {
    id: 0,
    nombre: "",
    esactivo: true
  }
}
  
//------------------------------------------------------------------------------

export interface DocumentoFull {
  iddoc: number;
  numerodocumento: number;
  numeracion_tipodoc_oficina: string;
  procedencia: string;
  usrorigen_id: number;
  usrorigen_username: string;
  asunto: string;
  folios: number;
  administrado_id: number;
  administrado_nombre: string;
  administrado_apellidopat: string;
  administrado_apellidomat: string;
  administrado_tipodocumento: string;
  administrado_numdocumento: string;
  administrado_razonsocial: string;
  administrado_celular: string;
  administrado_correo: string;
  tipodocumento_id: number;
  tipodocumento_nombre: string;
  descripcion: string;
  estado: string;
  referencias_id: string;
  otrasreferencias: string;
  estupa: boolean;
  casilla_id: string | null;
  fechavencimiento: string | null;
  tramitetupa_id: number | null;
  tramitetupa_nombre: string | null;
  fecharegistro: string;
  pase_id: number;
  pase_idorigen: number;
  pase_nombre_origen: string;
  pase_iddestino: number;
  pase_nombre_destino: string;
  pase_fechaenvio: string;
  pase_fecharecepcion: string;
  pase_tipopase: string;
  pase_proveido: string;
  pase_observacion: string;
  pase_estadopase: string;
  usuario_id: string;
  usuario_nombre: string;
  pdf_principal: string;
  pdf_anexo1: string;
  pdf_anexo2: string;
}

export const initialize_DocumentoFull = (): DocumentoFull => {
  return {
    iddoc: 0,
    numerodocumento: 0,
    numeracion_tipodoc_oficina: '',
    procedencia: '',
    usrorigen_id: 0,
    usrorigen_username: '',
    asunto: '',
    folios: 0,
    administrado_id: 0,
    administrado_nombre: '',
    administrado_apellidopat: '',
    administrado_apellidomat: '',
    administrado_tipodocumento: '',
    administrado_numdocumento: '',
    administrado_razonsocial: '',
    administrado_celular: '',
    administrado_correo: '',
    tipodocumento_id: 0,
    tipodocumento_nombre: '',
    descripcion: '',
    estado: '',
    referencias_id: '',
    otrasreferencias: '',
    estupa: false,
    casilla_id: null,
    fechavencimiento: null,
    tramitetupa_id: null,
    tramitetupa_nombre: null,
    fecharegistro: '',
    pase_id: 0,
    pase_idorigen: 0,
    pase_nombre_origen: '',
    pase_iddestino: 0,
    pase_nombre_destino: '',
    pase_fechaenvio: '',
    pase_fecharecepcion: '',
    pase_tipopase: '',
    pase_proveido: '',
    pase_observacion: '',
    pase_estadopase: '',
    usuario_id: '',
    usuario_nombre: '',
    pdf_principal: '',
    pdf_anexo1: '',
    pdf_anexo2: ''
  };
};



export interface SigaPase {
  id: number;
  documento_id: number;
  oficina_idorigen: number;
  oficina_iddestino: number;
  tipopase: string;
  proveido: string;
  observacion: string;
  estado: string;
  
  fechaenvio: string;
  fecharecepcion: string;
  
  usuario_id: string;
  usuarionombre: string;
}

export const initialize_SigaPase = (): SigaPase => {
  return {
    id: 0,
    documento_id: 0,
    oficina_idorigen: 0,
    oficina_iddestino: 0,
    tipopase: '',
    proveido: '',
    observacion: '',
    estado: '',

    fechaenvio: '',
    fecharecepcion: '',

    usuario_id: '',
    usuarionombre: '',
  };
};

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------


export interface DocumentoPase {
  idpase: number;
  origen_id: number;
  origen_nombre: string;
  destino_id: number;
  destino_nombre: string;
  tipopase: string;
  proveido: string;
  observacion: string;
  estadopase: string;
  documento_id: number;
  usuario_remitente_id: number;
  usuari_remitente_onombre: string;
  pase_fechaenvio: string; // Si es una fecha, puedes usar Date en lugar de string
  pase_fecharecepcion: string; // Si es una fecha, puedes usar Date en lugar de string
  numerodocumento: number;
  numeracion_tipodoc_oficina: string;
  procedencia: string;
  asunto: string;
  folios: number;
  pdf_principal: string;
  pdf_anexo1: string;
  pdf_anexo2: string;
  tipodocumento_id : string;
  tipodocumento_nombre : string;
}
export const initialize_DocumentoPase = (): DocumentoPase => {
  return {
    idpase: 0,
    origen_id: 0,
    origen_nombre: '',
    destino_id: 0,
    destino_nombre: '',
    tipopase: '',
    proveido: '',
    observacion: '',
    estadopase: '',
    documento_id: 0,
    usuario_remitente_id: 0,
    usuari_remitente_onombre: '',
    pase_fechaenvio: '', 
    pase_fecharecepcion: '', 
    numerodocumento: 0,
    numeracion_tipodoc_oficina: '',
    procedencia: '',
    asunto: '',
    folios: 0,
    pdf_principal: '',
    pdf_anexo1: '',
    pdf_anexo2: '',
    tipodocumento_id : '',
    tipodocumento_nombre : '',
  };
};