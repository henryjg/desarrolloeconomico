export interface Rol {
    id: number;
    nombre: string;
}

export const initializeRol = (): Rol => {
    return {
        id: 0,
        nombre: '',
    };
}