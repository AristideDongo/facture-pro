"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, RefreshCw } from "lucide-react"
import { DevisInfo } from "@/types/quoteSchema"

interface DevisActionsProps {
  devisInfo: DevisInfo
  resetDevis: () => void
}

export function DevisActions({ 
  // devisInfo, 
  resetDevis 
}: DevisActionsProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  // Fonction pour générer le PDF
  const generatePDF = async () => {
    try {
      setIsGenerating(true)
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
