const formatWithCommas = (value: string): string => {
    // Función para agregar comas como separadores de miles
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

const formatNumber = (number: string): string => {
    // Remover cualquier carácter no numérico excepto puntos y comas
    let value = number.replace(/,/g, '').replace(/[^\d.]/g, '');

    // Convertir a número y formatear
    if (value) {
        value = parseFloat(value).toFixed(2);
        number = formatWithCommas(value);
    } else {
        number = "0.00";
    }
    return number;
}
function convertirFecha(fechaStr: string): string {
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

    return `${diaStr}/${mesStr}/${año} - ${horasStr}:${minutosStr}`;
  };

const NumberFormat = {
    formatNumber,convertirFecha
}

export default NumberFormat;
