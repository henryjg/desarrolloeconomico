// licencia.interfaces.ts

export interface Licencia {
  idlic: number;
  tipotramite_tupa: number;
  categoriatramite_tupa: string;
  nombretramite_tupa: string;
  negocio_ruc: string;
  negocio_razonsocial: string;
  negocio_direccionfiscal: string;
  negocio_nombrecomercial: string;
  negocio_actividadcomercial: string;
  negocio_condicionlocal: string;
  representantelegal_dni: string;
  representantelegal_nombre: string;
  negocio_area: string;
  negocio_aforo: number;
  negocio_horario: string | null;
  pago_monto: string;
  pago_codoperacion: string;
  pagovoucher_url: string;
  dir_direccioncomercial: string;
  dir_numero: string;
  dir_letra: string;
  dir_inter: string;
  dir_mz: string;
  dir_lote: string;
  dir_dpto: string;
  dir_referencia: string;
  itse_tipoinspeccion: string;
  itse_resultado: string;
  itse_riesgo: string;
  itse_observacion: string;
  vigencia_estado: string;
  vigencia_tipo: string;
  vigencia_duracionmeses: number;
  fechaemision: string; // Formato fecha 'YYYY-MM-DD'
  fechavencimiento: string; // Formato fecha 'YYYY-MM-DD'
  fecharegistro: string; // Formato fecha 'YYYY-MM-DD HH:mm:ss'
  fechaultimamod: string; // Formato fecha 'YYYY-MM-DD HH:mm:ss'
  resolucion_numero: string;
  resolucion_codigo: string;
  resolucion_url: string;
  certificado_numerosequencia: number;
  certificado_codigo: string;
  certificado_qrverificacion: string;
  certificado_url: string;
  certificado_numconsultas: number;
  procedencia_solicitud: string;
  usuarioid: number;
  usuarionombre: string;
  ubigeoid: number;
  estadotramite: string;
  documento_codexpediente: string;
  documento_id: number;
  epocatramite: string;
  zonificacion: string;
  autorizacion: string;
  autorizacion_numero: string;
  autorizacion_codigo: string;
  autorizacion_archivourl: string;
  itse_fechavencimiento: string;
  autorizacion_carnet_numero:string;
  autorizacion_carnet_fecha:string;
  autorizacion_modulo:string;

}

export const initializeLicencia = (): Licencia => {
  return {
      idlic: 0,
      tipotramite_tupa: 0,
      categoriatramite_tupa: '',
      nombretramite_tupa: '',
      negocio_ruc: '',
      negocio_razonsocial: '',
      negocio_direccionfiscal: '',
      negocio_nombrecomercial: '',
      negocio_actividadcomercial: '',
      negocio_condicionlocal: '',
      representantelegal_dni: '',
      representantelegal_nombre: '',
      negocio_area: '',
      negocio_aforo: 0,
      negocio_horario: null, // Puede ser nulo
      pago_monto: '', // Se mantiene como string para reflejar los decimales
      pago_codoperacion: '',
      pagovoucher_url: '',
      dir_direccioncomercial: '',
      dir_numero: '',
      dir_letra: '',
      dir_inter: '',
      dir_mz: '',
      dir_lote: '',
      dir_dpto: '',
      dir_referencia: '',
      itse_tipoinspeccion: '',
      itse_resultado: '',
      itse_riesgo: '',
      itse_observacion: '',
      vigencia_estado: '',
      vigencia_tipo: '',
      vigencia_duracionmeses: 0,
      fechaemision: '', // Formato fecha 'YYYY-MM-DD'
      fechavencimiento: '', // Formato fecha 'YYYY-MM-DD'
      fecharegistro: '', // Formato fecha 'YYYY-MM-DD HH:mm:ss'
      fechaultimamod: '', // Formato fecha 'YYYY-MM-DD HH:mm:ss'
      resolucion_numero: '',
      resolucion_codigo: '',
      resolucion_url: '',
      certificado_numerosequencia: 0,
      certificado_codigo: '',
      certificado_qrverificacion: '',
      certificado_url: '',
      certificado_numconsultas: 0,
      procedencia_solicitud: '',
      usuarioid: 0,
      usuarionombre: '',
      ubigeoid: 0,
      estadotramite: '',
      documento_codexpediente: '',
      documento_id: 0,
      epocatramite: '',
      zonificacion: '',
      autorizacion: '',
      autorizacion_numero: '',
      autorizacion_codigo: '',
      autorizacion_archivourl: '',
      itse_fechavencimiento:'',
      autorizacion_carnet_numero:'',
      autorizacion_carnet_fecha:'',
      autorizacion_modulo:''
  };
};


// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

export interface FormInsertLicencia {
    tipotramite_tupa: number;
    negocio_ruc: string;
    negocio_razonsocial: string;
    negocio_direccionfiscal: string;
    negocio_nombrecomercial: string;
    negocio_actividadcomercial: string;
    negocio_condicionlocal: string;
    representantelegal_dni: string;
    representantelegal_nombre: string;
    negocio_area: string;
    negocio_aforo: number;
    negocio_horario: string;
    pago_monto: string; // Se mantiene como string para reflejar los decimales
    pago_codoperacion: string;
    pago_pagovoucher_url: string;
    dir_direccioncomercial: string;
    dir_numero: string;
    dir_letra: string;
    dir_inter: string;
    dir_mz: string;
    dir_lote: string;
    dir_dpto: string;
    dir_referencia: string;
    itse_tipoinspeccion: string;
    itse_resultado: string;
    itse_riesgo: string;
    itse_observacion: string;
    procedencia_solicitud: string;
    usuarioid: number;
    usuarionombre: string;
    ubigeoid: number;
    estadotramite: string;
    documento_id: number;
    documento_codexpediente: string;
    fecharegistro: string;
    epocatramite: string
  }
  
  export const initializeFormInsertLicencia = (): FormInsertLicencia => {
    return {
      tipotramite_tupa: 0,
      negocio_ruc: '',
      negocio_razonsocial: '',
      negocio_direccionfiscal: '',
      negocio_nombrecomercial: '',
      negocio_actividadcomercial: '',
      negocio_condicionlocal: '',
      representantelegal_dni: '',
      representantelegal_nombre: '',
      negocio_area: '',
      negocio_aforo: 0,
      negocio_horario: '',
      pago_monto: '', // Se mantiene como string para reflejar los decimales
      pago_codoperacion: '',
      pago_pagovoucher_url: '',
      dir_direccioncomercial: '',
      dir_numero: '',
      dir_letra: '',
      dir_inter: '',
      dir_mz: '',
      dir_lote: '',
      dir_dpto: '',
      dir_referencia: '',
      itse_tipoinspeccion: '',
      itse_resultado: '',
      itse_riesgo: '',
      itse_observacion: '',
      procedencia_solicitud: '',
      usuarioid: 0,
      usuarionombre: '',
      ubigeoid: 0,
      estadotramite: '',
      documento_id: 0,
      documento_codexpediente: '',
      fecharegistro: '',
      epocatramite: ''
      
    };
  };
  

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------


  export interface Licencia_tabla {
    idlic: number;
    tipotramite_tupa: number;
    nombretramite_tupa: string;
    categoriatramite_tupa: string;
    tramite_plazo: number;
    negocio_ruc: string;
    negocio_razonsocial: string;
    negocio_nombrecomercial: string;
    negocio_actividadcomercial: string;
    representantelegal_dni: string;
    representantelegal_nombre: string;
    negocio_area: string;
    negocio_aforo: number;
    negocio_horario: string | null;
    itse_tipoinspeccion: string;
    itse_riesgo: string;
    vigencia_estado: string;
    vigencia_tipo: string;
    vigencia_duracionmeses: number;
    vigencia_observacion: string;
    fecharecepcion:string;
    fechaemision: string;  
    fechavencimiento: string; 
    fecharegistro: string;  
    resolucion_numero: string;
    resolucion_codigo: string;
    certificado_numerosequencia: number;
    certificado_codigo: string;
    certificado_url: string;
    procedencia_solicitud: string;
    usuarioid: number;
    usuarionombre: string;
    estadotramite: string;
    documento_codexpediente: string;
    documento_id: number;
    zonificacion: string;
    itse_fechavencimiento: string;
  }
  