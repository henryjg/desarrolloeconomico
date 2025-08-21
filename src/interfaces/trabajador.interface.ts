export interface Trabajador {
    id: number;
    tipouser: string;
    username: string;
    email: string;
    celular: string;
    fotourl: string;
    cargo: string;
    usuario: string;
    password: string;
    esactivo: boolean;
    fechareg: string;
    oficina_id: number;
    oficina_nombre: string;
    rol_id: number;
}

export const initializeTrabajador = (): Trabajador => {
    return {
        id: 0,
        tipouser: '',
        username: '',
        email: '',
        celular: '',
        fotourl: '',
        cargo: '',
        usuario: '',
        password: '',
        esactivo: true,
        fechareg: '',
        oficina_id: 0,
        oficina_nombre: '',
        rol_id: 0,
    };
};



// Define la interfaz de errores con todas las propiedades como string
export interface TrabajadorErrors {
    id: string;
    tipouser: string;
    username: string;
    email: string;
    celular: string;
    fotourl: string;
    cargo: string;
    usuario: string;
    password: string;
    esactivo: string;
    fechareg: string;
    oficina_id: string;
    oficina_nombre: string;
    rol_id: string;
}

// Inicializa el objeto errors con todas las propiedades en blanco
export const initializeTrabajadorErrors = (): TrabajadorErrors => {
    return {
        id: '',
        tipouser: '',
        username: '',
        email: '',
        celular: '',
        fotourl: '',
        cargo: '',
        usuario: '',
        password: '',
        esactivo: '',
        fechareg: '',
        oficina_id: '',
        oficina_nombre: '',
        rol_id: '',
    };
};
