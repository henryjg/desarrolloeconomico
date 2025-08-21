import { Trabajador } from "../interfaces/trabajador.interface";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface UsuarioLog {
  id: number;
  usuario: string;
  nombreusuario: string;
  fotoperfil: string;
  correo: string;
  celular: string;
  idrol: string;
  oficina_id:string;
  oficina_nombre:string;

}

export const initializeUsuarioLog = (): UsuarioLog => {
  return {
    id: 0,
    usuario: '',
    nombreusuario: '',
    fotoperfil: '',
    correo: '',
    celular: '',
    idrol: '',
    oficina_id:'',
    oficina_nombre:''
  };
};


export interface Ubigeo {
  id: number;
  ubigeo: string;
  departamento: string;
  provincia: string;
  distrito: string;
}

export interface EstadoAuth {
  trabajador: Trabajador | null;
  token_id: string | null;
}

// Modelo ----------------------------


export interface PersonaRegistro {
  tipodocumento: string;
  tipopersona: string;
  numdocumento: string;
  nombre: string;
  apellidopat: string;
  apellidomat: string;
  razonsocial: string;
  celular: string;
  correo: string;
  password: string;
}

export interface Solicitante {
  id: number;
  tipopersona: string;
  numdoc: string;
  razonsocial: string;
  nombreComercial: string;
  email: string;
  celular: string;
  usuario: string;
  estado: string;
  dnirepresentante: string;
  representantelegal: string;
  representantedomicilio: string;
  fechareg: string;
}

export interface Expediente {
  id: number;
  codigo: string;
  asunto: string;
  fecharecepcion: string;
  folios: number;
  fecharegistro: string;
  solicitanteId: number;
  tipotramiteId: number;
  observacion: string;
}


export interface Oficina{
  id: string;
  nombre: string;
  padre_id: string;
}

export interface Destino{
  id: string;
  destino: string;
  tipouser: string;
}


export interface Tramite {
  id: string;         
  nombretramite: string; 
  descripcion: string;
  codigo: string;      
  tipomonto: string;      
  monto: string;         
  plazo: string;    
  duracion: string;          
  comentario: string;          
  requisito: string;
  oficina_id: string;
  categoria: string
}



export interface Empresa {
  id: string;
  nombreCorto: string;
  razonsocial: string;
  ruc: string;
  titulopagina: string;
  slogan: string;
  nosotros: string;
  mision: string;
  vision: string;
  valores: string;
  fechalimite: string;
  celular: string;
  celular2: string;
  direccion: string;
  email: string;
  contacto: string;
  metatag: string;
  facebook: string;
  instragram: string;
  youtube: string;
  pixel: string;
  reglamentoUrl: string;
  imagendestacadaUrl: string;
}


export interface Foto {
  id: number;
  url: string;
}

export interface ExpedienteDetalle {
  idexp: number;
  codigo: string;
  asunto: string;
  fecharecepcion: string;
  folios: number;
  fecharegistro: string;
  observacion: string;
  estadoexp: string;
  // Datos del solicitante
  idSol: number;
  tipopersona: string;
  numdoc: string;
  razonsocial: string;
  nombreComercial: string;
  email: string;
  celular: string;
  estado: string;
  dnirepresentante: string;
  representantelegal: string;
  fechareg: string;
  // Datos del tipo de trámite
  idtra: number;
  nombretramite: string;
}

export interface item_id_nombre {
  id: string;
  nombre: string;
}


export interface PersonaJuridica {
  razonSocial: string;
  numeroDocumento: string;
  estado: string;
  condicion: string;
  direccion: string;
  ubigeo: string;
}

export interface PersonaNatural {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numeroDocumento: string;
  digitoVerificador: string;
}

export interface Archivos {
  id: number;
  tipo: string;
  nombre: string;
  descripcion: string;
  url: string;
  fechasubida: string;
}



