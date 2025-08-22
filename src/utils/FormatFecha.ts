// src/utils/FechaFormatter.ts
export class FormatFecha {
    private static diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    static fecha_mmmm_yyyy(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha);
        if (isNaN(date.getTime())) return '';
        const mes = date.toLocaleString('es-ES', { month: 'long' });
        const anio = date.getFullYear();
        return `${mes.charAt(0).toUpperCase() + mes.slice(1)} - ${anio}`;
    }

    static fecha_dd_mm_yyyy(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha);
        if (isNaN(date.getTime())) return '';
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const anio = date.getFullYear();
        return `${dia}-${mes}-${anio}`;
    }

    static fecha_yyyy(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha);
        if (isNaN(date.getTime())) return '';
        const anio = date.getFullYear();
        return `${anio}`;
    }
    static fecha_mm(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha);
        if (isNaN(date.getTime())) return '';
        const mes = date.toLocaleString('es-ES', { month: 'long' });
        return `${mes.charAt(0).toUpperCase() + mes.slice(1)}`;
    }

    static fecha_dd_mm_yyyy_dddd(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha);
        if (isNaN(date.getTime())) return '';
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const anio = date.getFullYear();
        const diaSemana = this.diasSemana[date.getDay()];
        return `${dia}-${mes}-${anio} (${diaSemana})`;
    }

    static fecha_larga(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha + 'T00:00:00');  // Se agrega la hora para evitar problemas con la zona horaria
        if (isNaN(date.getTime())) return '';
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = date.toLocaleString('es-es', { month: 'long' });
        const anio = date.getFullYear();
        return `${dia} de ${mes} de ${anio}`;
    }
    
    
    static fecha_larga_masuno(fecha: string = ''): string {
        const date = fecha ? new Date(fecha + 'T00:00:00') : new Date();
        if (isNaN(date.getTime())) return '';
        
        // Incrementa el año en 1
        date.setFullYear(date.getFullYear() + 1);
        
        // Restar un día
        date.setDate(date.getDate() - 1);
        
        // Si la fecha ajustada da el día anterior al inicio de un mes, se maneja bien
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = date.toLocaleString('es-ES', { month: 'long' });
        const anio = date.getFullYear();
        
        return `${dia} de ${mes} de ${anio}`;
    }
    
    static convertirFecha_saltolinea(fechaStr: string): string {
        const fecha = new Date(fechaStr);
    
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
    
        const diaStr = dia < 10 ? `0${dia}` : `${dia}`;
        const mesStr = mes < 10 ? `0${mes}` : `${mes}`;
        const horasStr = horas < 10 ? `0${horas}` : `${horas}`;
        const minutosStr = minutos < 10 ? `0${minutos}` : `${minutos}`;
    
        return `${diaStr}/${mesStr}/${año} ${horasStr}:${minutosStr}`;
    };



    static convertirFecha(fechaStr: string): string {
        if (!fechaStr) return '';
        const fecha = new Date(fechaStr);
        if (isNaN(fecha.getTime())) return '';
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();

        const diaStr = dia < 10 ? `0${dia}` : `${dia}`;
        const mesStr = mes < 10 ? `0${mes}` : `${mes}`;
        const horasStr = horas < 10 ? `0${horas}` : `${horas}`;
        const minutosStr = minutos < 10 ? `0${minutos}` : `${minutos}`;

        return `${diaStr}/${mesStr}/${año} - ${horasStr}:${minutosStr}`;
    }

    static fecha_hhmm_24(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha.split('.')[0].replace(' ', 'T'));
        if (isNaN(date.getTime())) return '';
        const horas = date.getHours().toString().padStart(2, '0');
        const minutos = date.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    static fecha_hhmm_am_pm(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha.split('.')[0].replace(' ', 'T'));
        if (isNaN(date.getTime())) return '';
        let horas = date.getHours();
        const minutos = date.getMinutes().toString().padStart(2, '0');
        const ampm = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12;
        horas = horas ? horas : 12; // El 0 se convierte en 12 (12 AM o 12 PM)
        const horasStr = horas.toString().padStart(2, '0');
        return `${horasStr}:${minutos} ${ampm}`;
    }

    

    static diasTranscurridos(fechaStr: string): number {
        if (!fechaStr) return 0;
        const fechaInicial = new Date(fechaStr);
        if (isNaN(fechaInicial.getTime())) return 0;
        const fechaActual = new Date();
        
        const diferenciaTiempo = fechaActual.getTime() - fechaInicial.getTime();
        
        const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
        
        return diasTranscurridos;
    }
    static diasTranscurridos_entredosfechas(fecha_a: string, fecha_b: string): number {
        if (!fecha_a) return 0;
        if (!fecha_b) return 0;
        
        const fechaInicial = new Date(fecha_a);
        if (isNaN(fechaInicial.getTime())) return 0;

        const fechaFin = new Date(fecha_b);
        if (isNaN(fechaFin.getTime())) return 0;
        
        
        const diferenciaTiempo = fechaFin.getTime() - fechaInicial.getTime();
        
        const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
        
        return diasTranscurridos;
    }
}
