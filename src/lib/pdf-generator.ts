import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function generatePDF(element: HTMLElement, fileName: string): Promise<string> {
  // Créer un canvas à partir de l'élément HTML
  const canvas = await html2canvas(element, {
    scale: 2, // Augmenter la qualité
    useCORS: true, // Permettre le chargement d'images cross-origin
    logging: false,
    backgroundColor: "#FFFFFF", // Fond blanc
  })

  // Calculer les dimensions
  const imgWidth = 210 // Largeur A4 en mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  const pdf = new jsPDF("p", "mm", "a4")

  // Ajouter l'image au PDF
  const imgData = canvas.toDataURL("image/png")
  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

  // Si la hauteur de l'image est supérieure à la hauteur de la page A4 (297mm)
  let heightLeft = imgHeight
  let position = 0
  const pageHeight = 297 // Hauteur A4 en mm

  // Si le contenu tient sur une seule page, simplement sauvegarder
  if (heightLeft < pageHeight) {
    pdf.save(fileName)
    return fileName
  }

  // Sinon, gérer les pages multiples
  pdf.addPage()
  heightLeft -= pageHeight
  position = -pageHeight

  while (heightLeft > 0) {
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    position -= pageHeight

    if (heightLeft > 0) {
      pdf.addPage()
    }
  }

  // Sauvegarder le PDF
  pdf.save(fileName)
  return fileName
}
