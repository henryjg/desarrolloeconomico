export interface Buzon {
    id: number;
    nombre: string;
    sigla: string;
    estado:string
    responsable:string
    correonotificacion: string;
    usuarios: string;
}

export const initializeBuzon = (): Buzon => {
    return {
        id: 0,
        nombre: '',
        sigla: '',
        estado:'',
        responsable: '',
        correonotificacion: '',
        usuarios: ''
    };
};



export interface BuzonCreate {
    id: number;
    nombre: string;
    sigla: string;
    estado:string;
    tipo: string;
    correonotificacion: string;
    usuarios: string;
}

export const initializeBuzonCreate = (): BuzonCreate => {
    return {
        id: 0,
        nombre: '',
        sigla: '',
        estado:'Activo',
        tipo: '',
        correonotificacion: 'NO',
        usuarios: ''
    };
};

// Define la interfaz de errores con todas las propiedades como string
export interface BuzonErrors {
    id: string;
    nombre: string;
    sigla: string;
    estado:string
    correonotificaion: string;
}

// Inicializa el objeto errors con todas las propiedades en blanco
export const initializeBuzonErrors = (): BuzonErrors => {
    return {
        id: '',
        nombre: '',
        sigla: '',
        estado:'',
        correonotificaion: '',
    };
};
