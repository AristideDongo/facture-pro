import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (element: HTMLElement, filename: string) => {
  if (!element) {
    throw new Error("Élément DOM non trouvé");
  }

  try {
    // Capture l'élément DOM comme image
    const canvas = await html2canvas(element, {
      scale: 2, // Meilleure qualité
      useCORS: true,
      logging: false,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Définir les dimensions du PDF (A4)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Ajouter l'image au PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Enregistrer le PDF
    pdf.save(filename);
    
    return filename;
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    throw error;
  }
};