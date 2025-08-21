// src/services/inmuebleService.ts
interface frmPase{
  pasetipo:string;
  destinoid:number;
  proveido:string;
  observacion:string;
}


import axios from 'axios';

import { API_URL } from '../config';
import { Documento, DocumentoExterno, ReferenciaDoc } from '../interfaces/documento.interface';
import { Destino, PersonaRegistro } from '../types/interfaces';


export const get_lista_tiposdocumento = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_lista_tiposdocumento', 
  });
  return response.data;
};

export const get_listadocumento = async () => {
  const response = await axios.post(API_URL, {
      op: 'get_listadocumentos'
  });
  return response.data;
};

// LISTAR DOCUMENTOS
// Listar para modulo mesa de partes
export const get_listadocumento_mesapartes = async (stado:string) => {
  const response = await axios.post(API_URL, {
      op: 'get_listadocumentos_mesapartes',
      pase_estado: stado

  });
  return response.data;
};

export const get_listadocumento_estado_UsuarioDestino = async (stado:string, iddestino:number) => {
  const response = await axios.post(API_URL, {
      op: 'get_listadocumentos_usuarioDestino_Estado',
      pase_estado: stado,
      usrdestino_id: iddestino,

  });
  return response.data;
};

// Lista de referenciados para Oficinas
export const get_resultadoreferencias = async (refer: ReferenciaDoc) => {
  const response = await axios.post(API_URL, {
      op: 'get_documento_referenciado',
      ...refer
  });
  return response.data;
};


//Obtener Documentos
export const get_documentocreado_mesapartes = async (iddocumento: String) => {
  const response = await axios.post(API_URL, {
      op: 'get_documentoCompleto',
      id: iddocumento
  });
  return response.data;
};


//MesaPartes
export const add_documentoMesaPartes = async (documentoAdd: DocumentoExterno) => {
  const response = await axios.post(API_URL, {
    op: 'add_documento_mesapartes', 
    ...documentoAdd
  });
  return response.data;
};
//Casilla
export const add_documentoExterno = async (documentoAdd: DocumentoExterno) => {
  const response = await axios.post(API_URL, {
    op: 'add_documento_externo', 
    ...documentoAdd
  });
  return response.data;
};


//Casilla
export const add_pase = async (pase: frmPase) => {
  const response = await axios.post(API_URL, {
    op: 'add_pase', 
    ...pase
  });
  return response.data;
};

//Oficinas
export const add_documentoInterno = async (documentoAdd: DocumentoExterno, arrayoriginal: Destino[], arraycopia: Destino[]) => {
  const response = await axios.post(API_URL, {
    op: 'add_documento_interno',
    documentoAdd, // Incluye el documento como una propiedad
    arrayoriginal, // Incluye el array original
    arraycopia // Incluye el array copia
  });
  return response.data;
};


export const upd_documentoMesaPartes = async (documentoUpd: DocumentoExterno) => {
  const response = await axios.post(API_URL, {
    op: 'upd_documento_mesapartes',
    ...documentoUpd
  });
  return response.data;
};

export const del_documento = async (iddocumento: number) => {
  const response = await axios.post(API_URL, {
      op: 'del_documento',
      id: iddocumento
  });
  return response.data;
};


export const registrar_UsarioCasilla = async (Persona: PersonaRegistro) => {
  const response = await axios.post(API_URL, {
    op: 'add_UsuarioCasilla', 
    ...Persona
  });
  return response.data;
};

export const Activar_UsarioCasilla = async (codigo: string, idpersona: string) => {
  const response = await axios.post(API_URL, {
    op: 'activar_UsuarioCasilla', 
    id: idpersona,
    codigo: codigo,
  });
  return response.data;
};


export const subir_adjunto = async (formData: FormData) => {
    formData.append("op", "subir_adjunto");
    const response = await axios.post(API_URL, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
  };

  //PASES *************************************************************************
  export const derivar_documento_mesapartes = async (idpase: number, stdo: string) => {
    const response = await axios.post(API_URL, {
      op: 'Confirmar_enviomesapartes', 
      id: idpase,
      estado: stdo,
    });
    return response.data;
  };
