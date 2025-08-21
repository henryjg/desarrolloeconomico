// requisito.interfaces.ts

export interface Requisito {
    idreq: string;
    reqnombre: string;
    esobligatorio: boolean;
    esformato: boolean;
    formatopdf: string;
}

export const initializeRequisito = (): Requisito => {
    return {
        idreq: '',
        reqnombre: '',
        esobligatorio: false,
        esformato: false,
        formatopdf: ''
    };
};

export interface RequisitoUpload {
    idreq: string;
    idasignacion: string;
    nombrerequisito: string;
    formatopdf: string;
    
    ischecked: boolean;
    requisitocargado_url: string;
}

export const initializeRequisitoUpload = (): RequisitoUpload => {
    return {
        idreq: '',
        idasignacion: '',
        nombrerequisito: '',
        formatopdf: '',
        ischecked: false,
        requisitocargado_url: ''
    };
};

export interface RequisitoAsignado {
    idasignacion: string;
    idreq: string;
    nombrerequisito: string;
    esobligatorio: boolean;
    esformato: boolean;
    formatopdf: string;
}

export const initializeRequisitoAsignado = (): RequisitoAsignado => {
    return {
        idasignacion: '',
        idreq: '',
        nombrerequisito: '',
        esobligatorio: false,
        esformato: false,
        formatopdf: ''
    };
};
