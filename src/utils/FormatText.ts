
// Función para convertir texto a mayúsculas
export class FormatTexto {
    static toUpperCase = (text: string): string => {
        // Verificar si el input es un string
        if (typeof text !== 'string') {
            return '';
        }
        
        // Convertir a mayúsculas
        return text.toUpperCase();
    }
    
}
