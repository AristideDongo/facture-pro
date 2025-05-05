"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, User, Building, FileText, ShoppingCart, FileCheck, Loader2 } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import { useInvoiceStore } from "@/hooks/invoices/useInvoiceForm"
import { ClientInfoForm } from "./new-invoices/ClientInfoForm"
import { CompanyInfoForm } from "./new-invoices/CompagnyInfoForm"
import { InvoiceDetailsForm } from "./new-invoices/InvoicesDeatilsForm"
import { ItemsForm } from "./new-invoices/FormInvoices"
import { toast } from 'sonner'
import { InvoicePreview } from "./new-invoices/InvoicePreview"

export function InvoiceGenerator() {
  const {
    clientInfo,
    companyInfo,
    items,
    invoiceDetails,
    isClientInfoValid,
    isCompanyInfoValid,
    areItemsValid,
    isInvoiceDetailsValid,
  } = useInvoiceStore()

  // État pour gérer l'ouverture/fermeture des sections
  const [openSections, setOpenSections] = useState({
    client: true,
    company: true,
    invoice: true,
    items: true,
    preview: true,
  })

  // Référence à l'élément d'aperçu de facture pour générer le PDF
  const invoiceRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Fonction pour afficher l'icône d'état de validation
  const getValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <span className="text-green-500 text-sm font-medium">✓ Valide</span>
    ) : (
      <span className="text-amber-500 text-sm font-medium">⚠ Incomplet</span>
    )
  }

  const handleGenerateInvoice = async () => {
    if (!isClientInfoValid || !isCompanyInfoValid || !areItemsValid || !isInvoiceDetailsValid) {
      toast.warning('Formulaire incomplet',{
        description: "Veuillez remplir correctement tous les champs requis.",
        duration: 3000
      })
      return
    }

    if (!invoiceRef.current) {
      toast.error('Erreur',{
        description: "Impossible de générer la facture. Veuillez réessayer.",
        duration: 3000
      })
      return
    }

    try {
      setIsGenerating(true)

      // S'assurer que la section d'aperçu est ouverte pour la génération du PDF
      if (!openSections.preview) {
        setOpenSections((prev) => ({ ...prev, preview: true }))
        // Attendre que le DOM soit mis à jour
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Générer le PDF
      const fileName = await generatePDF(
        invoiceRef.current,
        `Facture_${invoiceDetails?.invoiceNumber || "Sans_Numéro"}.pdf`,
      )

      toast.success('Facture générée',{
        description: `La facture a été générée avec succès: ${fileName}`,
        duration: 3000
      })
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      toast.error('Erreur',{
        description: "Une erreur est survenue lors de la génération de la facture. Veuillez réessayer.",
        duration: 3000
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Section Informations Client */}
      <Collapsible
        open={openSections.client}
        onOpenChange={() => toggleSection("client")}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium">Informations Client</h2>
            </div>
            <div className="flex items-center gap-3">
              {getValidationIcon(isClientInfoValid)}
              {openSections.client ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-card">
            <ClientInfoForm />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section Informations Entreprise */}
      <Collapsible
        open={openSections.company}
        onOpenChange={() => toggleSection("company")}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium">Informations Entreprise</h2>
            </div>
            <div className="flex items-center gap-3">
              {getValidationIcon(isCompanyInfoValid)}
              {openSections.company ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-card">
            <CompanyInfoForm />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section Détails de la Facture */}
      <Collapsible
        open={openSections.invoice}
        onOpenChange={() => toggleSection("invoice")}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium">Détails de la Facture</h2>
            </div>
            <div className="flex items-center gap-3">
              {getValidationIcon(isInvoiceDetailsValid)}
              {openSections.invoice ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-card">
            <InvoiceDetailsForm />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section Articles */}
      <Collapsible
        open={openSections.items}
        onOpenChange={() => toggleSection("items")}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium">Articles et Services</h2>
            </div>
            <div className="flex items-center gap-3">
              {getValidationIcon(areItemsValid)}
              {openSections.items ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-card">
            <ItemsForm />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Bouton de génération */}
      <div className="flex justify-end my-6">
        <Button
          onClick={handleGenerateInvoice}
          disabled={
            !isClientInfoValid || !isCompanyInfoValid || !areItemsValid || !isInvoiceDetailsValid || isGenerating
          }
          size="lg"
          className="w-full md:w-auto bg-orange-400 text-black hover:bg-orange-600"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <FileCheck className="mr-2 h-5 w-5" />
              Générer la facture
            </>
          )}
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Aperçu de la facture */}
      <Collapsible
        open={openSections.preview}
        onOpenChange={() => toggleSection("preview")}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium">Aperçu de la facture</h2>
            </div>
            <div className="flex items-center">
              {openSections.preview ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-card">
            <div ref={invoiceRef}>
              <InvoicePreview />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
