"use client"
import { Card } from "@/components/ui/card"
import { DevisForm } from "./new-quotes/QuoteForm"
import { DevisPreview } from "./new-quotes/QuotePreview"
import { DevisActions } from "./QuoteActions"
import { useDevisStore } from "@/store/quotes/useQuoteStore"

export function DevisGenerator() {
  const { devisInfo, updateDevisInfo, resetDevis } = useDevisStore();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Informations du devis</h2>
        <DevisForm defaultValues={devisInfo} onSubmit={updateDevisInfo} />
      </Card>
      <div className="flex flex-col gap-6">
        <Card className="p-6 flex-grow">
          <h2 className="text-xl font-semibold mb-4">Aperçu du devis</h2>
          <div className="devis-preview">
            <DevisPreview />
          </div>
        </Card>
        <Card className="p-6">
          <DevisActions devisInfo={devisInfo} resetDevis={resetDevis} />
        </Card>
      </div>
    </div>
  )
}