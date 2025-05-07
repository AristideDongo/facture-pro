"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, RefreshCw } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { DevisInfo } from "@/types/quoteSchema"

interface DevisActionsProps {
  devisInfo: DevisInfo
  resetDevis: () => void
}

export function DevisActions({ devisInfo, resetDevis }: DevisActionsProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  // Fonction pour générer le PDF
  const generatePDF = async () => {
    try {
      setIsGenerating(true)

      // Sélectionner l'élément qui contient l'aperçu du devis
      const element = document.querySelector(".devis-preview") as HTMLElement
      if (!element) {
        console.error("Élément d'aperçu non trouvé")
        return
      }

      // Créer une copie de l'élément pour le PDF
      const clone = element.cloneNode(true) as HTMLElement
      clone.style.width = "800px"
      clone.style.padding = "20px"
      clone.style.position = "absolute"
      clone.style.left = "-9999px"
      document.body.appendChild(clone)

      // Convertir l'élément en canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      // Supprimer la copie
      document.body.removeChild(clone)

      // Créer un nouveau document PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Ajouter l'image du canvas au PDF
      const imgData = canvas.toDataURL("image/png")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 10

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      // Télécharger le PDF
      pdf.save(`Devis_${devisInfo.quoteDetailsSchema.quoteNumber}.pdf`)
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      alert("Une erreur est survenue lors de la génération du PDF.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Actions</h2>

      <div className="flex flex-wrap gap-4">
        <Button onClick={generatePDF} disabled={isGenerating} className="flex bg-orange-400 text-black hover:bg-orange-600 items-center">
          <FileDown className="mr-2 h-4 w-4" />
          {isGenerating ? "Génération en cours..." : "Générer le PDF"}
        </Button>

        <Button variant="outline" onClick={resetDevis} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Réinitialiser
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mt-2">
        <p>Pour générer le PDF, remplissez le formulaire et cliquez sur le bouton Générer le PDF.</p>
      </div>
    </div>
  )
}
