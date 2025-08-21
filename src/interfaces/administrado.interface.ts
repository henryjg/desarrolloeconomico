export interface Administrado {
    id: string;
    tipodocumento: string;
    tipopersona: string;
    numdocumento: string;
    nombre: string;
    apellidopat: string;
    apellidomat: string;
    razonsocial: string;
    celular: string;
    correo: string;
    direccion: string;
    ubigeoid: string;
    fecharegistro: string;
    esactivo: string;
  }
  
  export const initializeAdministrado = (): Administrado => {
    return {
      id: '',
      tipodocumento: '',
      tipopersona: '',
      numdocumento: '',
      nombre: '',
      apellidopat: '',
      apellidomat: '',
      razonsocial: '',
      celular: '',
      correo: '',
      direccion: '',
      ubigeoid: '',
      fecharegistro: '', 
      esactivo: '' 
    };
  };
  