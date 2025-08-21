import jsPDF from "jspdf";
import QRCode from 'qrcode';
import { ref } from 'vue';
import escudomunicipal from "@/assets/logomuni26.png"
import IMGunidos from "@/assets/unidos_isotipo.png"
import { DocumentoExterno, DocumentoFull, initialize_CrearDocumentoExterno } from "../interfaces/documento.interface";
import Notif from "../utils/notificaciones";
import NProgress from 'nprogress';
import { FormatFecha } from '../utils/FormatFecha';
import { Destino, Destino_Oficina, initializeUsuarioLog, UsuarioLog } from "../types/interfaces";
import { usarAuthStore } from "../stores/autentificacionStore";
import { subir_adjunto } from "../services/DocumentoServices";
import { BASE_URL } from "../config";
import html2canvas from 'html2canvas';

export function pdf_generar_documentotramite() {
    const Usuario = ref<UsuarioLog>(initializeUsuarioLog());
    const authStore = usarAuthStore();
    Usuario.value = authStore.usuario_Logueado;
    const url_doc_pdf = ref("");

    const DocumentoNuevo = ref<DocumentoExterno>(initialize_CrearDocumentoExterno());

    const generar_documento = async (Encabezado: String, cuerpo: string, documento: DocumentoExterno, ListaOficinas: Destino_Oficina[], ListaReferencias: DocumentoFull[]) => {
        if (!documento) {
            Notif.Error('No existe un documento registrado');
            return;
        }

        NProgress.start();
        const textocodigo = BASE_URL + "seguimientoqr/" + documento.numerodocumento.toString();
        await generateQRCode(textocodigo);

        // Configuración del documento con opciones más precisas
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true // Mejor compresión
        });

        // Definir márgenes
        const margin = 20;
        const marginTop = 45; // Margen superior aumentado para el encabezado
        const marginBottom = 20; // Margen inferior

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const col1 = margin;
        const col2 = margin + 40;
        const maxWidth = pageWidth - margin - margin; // Ancho total disponible
        const contentWidth = pageWidth - col2 - margin; // Ancho para el contenido

        // Función para agregar el encabezado a cualquier página
        const agregarEncabezado = (): void => {
            let PosicionY_encabezado = 10;
            
            // Garantizar que estamos trabajando con una página limpia para el encabezado
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, pageWidth, marginTop, "F");
            
            doc.setTextColor(0, 0, 0); 
            doc.addImage(escudomunicipal, "PNG", margin, PosicionY_encabezado, 25, 31);
            doc.addImage(qrCode.value, "JPEG", pageWidth*3/4+15, PosicionY_encabezado+2, 24, 24); 
            PosicionY_encabezado = PosicionY_encabezado + 10;

            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("MUNICIPALIDAD DISTRITAL VEINTISÉIS DE OCTUBRE", pageWidth / 2, PosicionY_encabezado, { align: "center" });
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            PosicionY_encabezado = PosicionY_encabezado + 4;
            doc.text("Año de la recuperación y consolidación de la economía peruana", pageWidth / 2, PosicionY_encabezado, { align: "center" });
            PosicionY_encabezado = PosicionY_encabezado + 6;
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.text(Usuario.value.oficina_nombre, pageWidth / 2, PosicionY_encabezado, { align: "center" });
        };

        // Configuración mejorada para el texto en HTML
        const prepararContenidoHTML = (htmlContent: string): HTMLDivElement => {
            const container = document.createElement("div");
            container.innerHTML = htmlContent;
            
            // Aplicar estilos específicos que jsPDF pueda manejar mejor
            container.style.width = `${maxWidth}mm`;
            container.style.padding = "0";
            container.style.margin = "0";
            container.style.fontFamily = "Arial, Helvetica, sans-serif";
            container.style.fontSize = "11pt";
            container.style.lineHeight = "1.3";
            container.style.color = "#000000";
            container.style.textAlign = "justify";
            
            // Aplicar estilos a los párrafos internos para mejor renderizado
            const parrafos = container.querySelectorAll("p");
            parrafos.forEach(p => {
                p.style.margin = "0 0 8px 0";
                p.style.padding = "0";
                p.style.breakInside = "avoid"; // Propiedad moderna para evitar cortes en párrafos
                // También aplicar la versión prefijada para mayor compatibilidad
                (p.style as any).WebkitColumnBreakInside = "avoid";
                (p.style as any).MozColumnBreakInside = "avoid";
            });
            
            return container;
        };

        // Función para convertir HTML a PDF con mejor manejo de paginación
        const renderizarHTMLaPDF = (htmlElement: HTMLElement, x: number, y: number, options: any) => {
            return new Promise<void>((resolve) => {
                // Aumentar el margen inferior para asegurar que no se pase del límite
                const safetyMarginBottom = marginBottom + 10; // Añadimos 10mm extra de seguridad
                
                // Escala para mejor calidad
                const scale = 2; 
                
                // Renderizar el contenido usando html2canvas
                html2canvas(htmlElement, {
                    scale: scale,
                    logging: false,
                    useCORS: true,
                    allowTaint: true
                }).then(canvas => {
                    const imgData = canvas.toDataURL('image/jpeg', 1.0);
                    const imgProps = doc.getImageProperties(imgData);
                    
                    // Calcular la escala para que se ajuste al ancho disponible
                    const pdfWidth = options.width || (pageWidth - x - margin);
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    
                    // Calcular si el contenido cabe en la primera página
                    const firstPageAvailableHeight = pageHeight - y - safetyMarginBottom;
                    
                    if (pdfHeight <= firstPageAvailableHeight) {
                        // El contenido cabe completo en la primera página
                        doc.addImage(imgData, 'JPEG', x, y, pdfWidth, pdfHeight);
                        resolve();
                        return;
                    }
                    
                    // Si no cabe completo, dividimos el contenido usando el canvas
                    // Calculamos cuánto de la imagen puede ir en la primera página
                    const firstPageRatio = firstPageAvailableHeight / pdfHeight;
                    const firstPageCanvasHeight = canvas.height * firstPageRatio;
                    
                    // Crear canvas para la primera parte
                    const firstPageCanvas = document.createElement('canvas');
                    firstPageCanvas.width = canvas.width;
                    firstPageCanvas.height = firstPageCanvasHeight;
                    const firstPageCtx = firstPageCanvas.getContext('2d');
                    if (!firstPageCtx) {
                        console.error('No se pudo obtener el contexto del canvas');
                        resolve();
                        return;
                    }
                    
                    // Dibujar la primera parte del contenido
                    firstPageCtx.drawImage(
                        canvas, 
                        0, 0, canvas.width, firstPageCanvasHeight,
                        0, 0, canvas.width, firstPageCanvasHeight
                    );
                    
                    // Añadir la primera parte a la página actual
                    const firstPartImgData = firstPageCanvas.toDataURL('image/jpeg', 1.0);
                    doc.addImage(firstPartImgData, 'JPEG', x, y, pdfWidth, firstPageAvailableHeight);
                    
                    // Calcular lo que queda para páginas adicionales
                    let remainingHeight = canvas.height - firstPageCanvasHeight;
                    let processedHeight = firstPageCanvasHeight;
                    
                    // Generar páginas adicionales según sea necesario
                    while (remainingHeight > 0) {
                        doc.addPage();
                        agregarEncabezado();
                        
                        const availablePageHeight = pageHeight - marginTop - safetyMarginBottom;
                        const pageCanvasHeight = Math.min(
                            remainingHeight, 
                            (availablePageHeight / pdfHeight) * canvas.height
                        );
                        
                        // Crear canvas para esta parte
                        const pageCanvas = document.createElement('canvas');
                        pageCanvas.width = canvas.width;
                        pageCanvas.height = pageCanvasHeight;
                        const pageCtx = pageCanvas.getContext('2d');
                        
                        if (!pageCtx) {
                            console.error('No se pudo obtener el contexto del canvas');
                            break;
                        }
                        
                        // Dibujar esta parte del contenido
                        pageCtx.drawImage(
                            canvas, 
                            0, processedHeight, canvas.width, pageCanvasHeight,
                            0, 0, canvas.width, pageCanvasHeight
                        );
                        
                        // Calcular altura proporcional para el PDF
                        const partHeightInPdf = (pageCanvasHeight / canvas.height) * pdfHeight;
                        
                        // Añadir esta parte al PDF
                        const partImgData = pageCanvas.toDataURL('image/jpeg', 1.0);
                        doc.addImage(partImgData, 'JPEG', x, marginTop, pdfWidth, partHeightInPdf);
                        
                        // Actualizar para la siguiente iteración
                        processedHeight += pageCanvasHeight;
                        remainingHeight -= pageCanvasHeight;
                    }
                    
                    resolve();
                }).catch(error => {
                    console.error('Error al renderizar HTML:', error);
                    resolve(); // Resolvemos para que el proceso continúe
                });
            });
        };

        // Override del método addPage para siempre incluir encabezado
        const addPageOriginal = doc.addPage.bind(doc);
        doc.addPage = function() {
            addPageOriginal();
            agregarEncabezado();
            return this;
        };

        // Función mejorada para agregar texto con formato y control de párrafos
        const agregarTextoPorParrafo = (texto: string, x: number, y: number, anchoMax: number, esNegrita: boolean = false): number => {
            if (esNegrita) {
                doc.setFont("helvetica", "bold");
            } else {
                doc.setFont("helvetica", "normal");
            }
            
            // Dividir el texto en líneas según el ancho disponible
            const lineas = doc.splitTextToSize(texto, anchoMax);
            const alturaLinea = 6; // altura reducida para texto más compacto
            const alturaTotal = lineas.length * alturaLinea;
            
            // Verificar si necesitamos cambiar de página
            if (y + alturaTotal > pageHeight - marginBottom) {
                doc.addPage();
                y = marginTop;
            }
            
            // Dibujar el texto respetando la alineación y formato
            doc.text(lineas, x, y, { 
                align: "left",
                baseline: "top",
                maxWidth: anchoMax
            });
            
            return alturaTotal + 2; // Agregar un pequeño espacio para separación
        };

        // Agregar encabezado a la primera página
        agregarEncabezado();

        let PosicionY = marginTop;

        // Agregar la fecha en la esquina superior derecha
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Veintiséis de Octubre, " + FormatFecha.fecha_larga(Date()), pageWidth - margin, PosicionY, { align: "right" });

        PosicionY = PosicionY + 12;

        // Título principal
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(Encabezado.toString().toUpperCase(), margin, PosicionY, { align: "left" });

        PosicionY = PosicionY + 10;

        // Sección "DE:"
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("DE:", col1, PosicionY);
        PosicionY = PosicionY-3;
        PosicionY += agregarTextoPorParrafo(`${checkValue(Usuario.value.buzon_responsable)}`, col2, PosicionY, contentWidth, true);
        PosicionY = PosicionY-3;
        PosicionY += agregarTextoPorParrafo(`${checkValue(Usuario.value.oficina_nombre)}`, col2, PosicionY, contentWidth);
        // PosicionY = PosicionY-2;
        PosicionY = PosicionY + 5;

        // Sección "A:"
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("A:", col1, PosicionY);
        
        for (const item of ListaOficinas) {
            PosicionY = PosicionY-3;
            PosicionY += agregarTextoPorParrafo(`${checkValue(item.buzon_responsable)}`, col2, PosicionY, contentWidth, true);
            PosicionY = PosicionY-3;
            PosicionY += agregarTextoPorParrafo(`${checkValue(item.destino)}`, col2, PosicionY, contentWidth);
            // PosicionY = PosicionY-2;
        }
        
        PosicionY = PosicionY + 5;

        // Sección "Asunto:"
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Asunto:", col1, PosicionY);
        PosicionY = PosicionY-3;
        PosicionY += agregarTextoPorParrafo(documento.asunto, col2, PosicionY, contentWidth, true);
        
        PosicionY = PosicionY + 5;

        // Preparar el cuerpo del documento con mejor estructura para HTML
        const contenidoFormateado = prepararContenidoHTML(cuerpo);

        // Insertar en el DOM temporalmente para procesarlo con html2canvas
        document.body.appendChild(contenidoFormateado);
        
        return new Promise<string>(async (resolve, reject) => {
            try {
                // Renderizar el contenido HTML al PDF con mejor manejo de paginación
                await renderizarHTMLaPDF(contenidoFormateado, col1, PosicionY, {
                    width: maxWidth,
                    height: pageHeight - PosicionY - marginBottom
                });
                
                // Eliminar el elemento temporal
                document.body.removeChild(contenidoFormateado);
                
                // Asegurar que todas las páginas tengan encabezado (por si acaso)
                const totalPaginas = doc.getNumberOfPages();
                for (let numeroPagina = 1; numeroPagina <= totalPaginas; numeroPagina++) {
                    doc.setPage(numeroPagina);
                    agregarEncabezado();
                }
                
                // Generar y subir el PDF
                const pdfBlob = doc.output('blob');
                const formData = new FormData();
                const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
                const randomNum = Math.floor(Math.random() * 10000);
                formData.append('archivopdf', pdfBlob, `Documento_${documento.numeracion_tipodoc_oficina}_${timestamp}_${randomNum}.pdf`);

                await subir_documento_pdf(formData);
                resolve(url_doc_pdf.value);
                
            } catch (error) {
                console.error("Error al generar PDF:", error);
                reject('Error al generar o subir el documento');
            } finally {
                NProgress.done();
            }
        });
    };

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    const qrCode = ref("");
    const pdfContent = ref<HTMLDivElement | null>(null);

    // -------------------------------------------------------------
    const generateQRCode = async (text: string) => {
        try {
            const url = await QRCode.toDataURL(text, {
                width: 90,  
                scale: 3,
                margin: 1,
                errorCorrectionLevel: 'Q'
            });
            qrCode.value = url;
        } catch (err) {
            console.error(err);
        }
    };

    const subir_documento_pdf = async (formData: FormData) => {
        try {
            NProgress.start();
            const RespuestaJSON = await subir_adjunto(formData);
            if (RespuestaJSON.success) {
                url_doc_pdf.value = RespuestaJSON.data;
            } else {
                Notif.Error(RespuestaJSON.message);
            }
        } catch (error) {
            console.error('Error subiendo archivo:', error);
            Notif.Error('Ocurrió un error durante la subida');
        } finally {
            NProgress.done(); 
        }
    }

    return {
        generar_documento, url_doc_pdf
    };
}