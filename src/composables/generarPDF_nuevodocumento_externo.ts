import jsPDF from "jspdf";
import QRCode from 'qrcode';

import { ref } from 'vue';

import escudomunicipal from "@/assets/logomuni26.png"
import IMGunidos from "@/assets/unidos_isotipo.png"
import { DocumentoFull } from "../interfaces/documento.interface";
import Notif from "../utils/notificaciones";
import NProgress from 'nprogress';
import { FormatFecha } from '../utils/FormatFecha';
import { BASE_URL } from "../config";


export function pdf_documento() {
    const generarPDF =  async (documento: DocumentoFull) => { 
        if(!documento){
        Notif.Error('No existe un documento registrado');
        return;
        }
        
        NProgress.start();
        const textocodigo = BASE_URL+"seguimientoqr/"+documento.numerodocumento.toString();
        await generateQRCode(textocodigo); 

        const doc = new jsPDF({
            orientation: "portrait",  
            unit: "mm",
            format: "a4",
        });


        let PosicionY = 0;
        const margin = 15;
        const pageWidth = doc.internal.pageSize.getWidth();  
        const pageHeight = doc.internal.pageSize.getHeight(); 
        const col1 = margin; 
        const col2 = margin + 40; 
        const maxWidth = pageWidth - col2 - margin; 


        // Función para agregar texto que salte de línea automáticamente
        const addTextWithWrap = (text: string, x: number, y: number, maxWidth: number): number => {
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y); 
          return lines.length * 7; 
        };
        const addTextWithWrapCenter = (text: string, x: number, y: number, maxWidth: number): number => {
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y, { align: "center" }); 
        return lines.length * 7; 
        };

        // Borde azul
        doc.setDrawColor(0, 40, 133);
        doc.setLineWidth(1);
        doc.roundedRect(margin - 7, margin - 7, pageWidth - margin * 2 + 14, 135, 2, 2); // Rectángulo como borde

        // Borde azul
        doc.setDrawColor(0, 40, 133);
        doc.setLineWidth(0);
        doc.roundedRect(margin - 4, margin - 4, pageWidth - margin * 2 + 8, 30, 2, 2); // Rectángulo como borde



        // Título de la licencia
        const imgData = qrCode;
        PosicionY=PosicionY+12;
        
        doc.addImage(escudomunicipal, "PNG", margin , PosicionY, 25, 31);
        doc.addImage(IMGunidos, "PNG", pageWidth*3/4+5 , PosicionY+5, 32, 23);

        
        PosicionY=PosicionY+8;
        
        // Título de la licencia

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold"); // Establecer la fuente en negrita
        doc.text("SISTEMA DE TRÁMITE DOCUMENTARIO", pageWidth / 2, PosicionY, { align: "center" });

        //doc.text("ORIGINAL", pageWidth - margin, PosicionY, { align: "right" });

      
        doc.setTextColor(0, 0, 0); 
        
        doc.setFontSize(10);
        PosicionY=PosicionY+4;
        doc.text("CARGO DE RECEPCIÓN - MESA DE PARTES", pageWidth / 2, PosicionY, { align: "center" });
        
        
    
        PosicionY=PosicionY+12;


        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("CODIGO DE EXPEDIENTE N° "+ documento.numerodocumento.toString(), pageWidth / 2, PosicionY, { align: "center" });

        //---------------------------------------
        
        // Títulos y contenido
        PosicionY = PosicionY + 15;
        // -------------------------------------------------
        doc.setFontSize(10);
        doc.text("DATOS PERSONALES", col1, PosicionY);
        const imgData2 = qrCode;
        doc.setFontSize(9);
        doc.text("QR de Seguimiento", pageWidth*3/4+6, PosicionY-4);
        doc.addImage(imgData2.value, "JPEG", pageWidth*3/4, PosicionY-2, 42, 42); // Modifica la posición 

        PosicionY = PosicionY+6;

        // -------------------------------------------------
        doc.setFontSize(9);
        doc.setFillColor(0, 0, 0);          
        doc.setFont("helvetica", "bold");
        
        // -------------------------------------------------
        doc.text("- NRO DOCUMENTO:", col1, PosicionY);
        // QR
        

        PosicionY += addTextWithWrap(`${checkValue(documento.administrado_tipodocumento  + ' - ' + documento.administrado_numdocumento )}`, col2, PosicionY, pageWidth*3/4-10);
        PosicionY = PosicionY-2;

        
        

        if(documento.administrado_tipodocumento==="RUC"){
            doc.setFont("helvetica", "bold");
            doc.text("- REMITENTE:", col1, PosicionY);
            doc.setFont("helvetica", "normal");
            PosicionY += addTextWithWrap(`${checkValue(documento.administrado_razonsocial)}`, col2, PosicionY, maxWidth-47);
            PosicionY = PosicionY-2;
        }else{
            doc.setFont("helvetica", "bold");
            doc.text("- REMITENTE:", col1, PosicionY);
            doc.setFont("helvetica", "normal");
            PosicionY += addTextWithWrap(checkValue(documento.administrado_nombre + ' ' + documento.administrado_apellidopat + ' ' +  documento.administrado_apellidomat), col2, PosicionY, maxWidth);
            PosicionY = PosicionY-2;
        }

        // QR
        

        // ----------------------
        
        doc.setFont("helvetica", "bold");
        doc.text("- CELULAR:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(documento.administrado_celular), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;

        // ----------------------
        
        doc.setFont("helvetica", "bold");
        doc.text("- CORREO:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(documento.administrado_correo), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;

        // ----------------------
        PosicionY = PosicionY + 7;
        // ----------------------
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold")
        doc.text("DATOS DEL EXPEDIENTE", col1, PosicionY);
        PosicionY = PosicionY+6;
        doc.setFontSize(9);
        
        // ----------------------
        
        doc.setFont("helvetica", "bold");
        doc.text("- TIPO DOCUMENTO:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(documento.tipodocumento_nombre), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;

        // ----------------------
        
        doc.setFont("helvetica", "bold");
        doc.text("- TIPO TRÁMITE:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        if(documento.estupa){
          PosicionY += addTextWithWrap("TUPA", col2, PosicionY, maxWidth);
        }else{
          PosicionY += addTextWithWrap("NORMAL", col2, PosicionY, maxWidth);
        }
        
        PosicionY = PosicionY-2;

        // ----------------------
        doc.setFont("helvetica", "bold");
        doc.text("- FOLIOS:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(documento.folios), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;

        // ----------------------

        if(documento.estupa){
          doc.setFont("helvetica", "bold");
          doc.text("- TIPO TRÁMITE:", col1, PosicionY);
          doc.setFont("helvetica", "normal");
          PosicionY += addTextWithWrap(checkValue(documento.tramitetupa_nombre), col2, PosicionY, maxWidth);
          PosicionY = PosicionY-2;
        }

        // ----------------------
        doc.setFont("helvetica", "bold");
        doc.text("- SERIE ENCABEZADO:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(documento.cabecera), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;

        // ----------------------
        doc.setFont("helvetica", "bold");
        doc.text("- ASUNTO:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(documento.asunto), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;

        doc.setFont("helvetica", "bold");
        doc.text("- OFICINA DESTINO:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(documento.pase_buzondestino_nombre), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;

        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, ''); // Fecha y hora sin caracteres no válidos
        const randomNum = Math.floor(Math.random() * 10000); // Número aleatorio entre 0 y 9999

        doc.setFont("helvetica", "bold");
        doc.text("- FECHA Y HORA:", col1, PosicionY);
        doc.setFont("helvetica", "normal");
        PosicionY += addTextWithWrap(checkValue(FormatFecha.convertirFecha(documento.fecharegistro)), col2, PosicionY, maxWidth);
        PosicionY = PosicionY-2;


        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        PosicionY += addTextWithWrap("* Para poder realizar seguimiento al documento registrado puede escanear el QR o ingresar al siguiente link: https://digital.muniveintiseisdeoctubre.gob.pe/tramitedocumentario/seguimiento ", col1, 135, maxWidth);
        PosicionY = PosicionY-2;


        // doc.save('Documento.pdf');
        const pdfBlob = doc.output('blob');
        const pdfURL = URL.createObjectURL(pdfBlob);
        window.open(pdfURL, "_blank");
        
       
        // formData.append('file_documentoLicencia', pdfBlob, `Documento_${documento.codigo}_${timestamp}_${randomNum}.pdf`);
        NProgress.done(); 
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

    return {
        generarPDF
    };
}