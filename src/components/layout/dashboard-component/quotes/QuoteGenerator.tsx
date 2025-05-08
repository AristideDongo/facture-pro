"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DevisForm } from "./new-quotes/QuoteForm"
import { DevisPreview } from "./new-quotes/QuotePreview"
// import { DevisActions } from "./QuoteActions"
import { DevisInfo } from "@/types/quoteSchema"

export const defaultQuote: DevisInfo = {
  compagnyQuoteInfo: {
    compagnyName: "Your compagny",
    compagnyAddress: "123 Business Street, 75000 Paris",
    compagnyEmail: "contact@yourcompagny.com",
    compagnyPhone: "01 23 45 67 89",
  },
  
  clientQuoteInfo: {
    clientName: "Client par défaut",
    clientAddress: "Adresse du client",
    clientEmail: "",
    clientPhone: "",
  },
  
  quoteDetailsSchema: {
    quoteNumber: `QUOTE-${new Date().getFullYear()}-001`,
    quoteDate: new Date().toISOString().split("T")[0],
    taxRate: 20,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    services: [{ description: "Prestation par défaut", quantity: 1, unitPrice: 0 }],
    paymentTerms: "Payment within 30 days after receiving the signed quote.",
  },
  
  amount: 0
}
  

export function DevisGenerator() {
  // État pour stocker les informations du devis
  const [devisInfo, setDevisInfo] = useState<DevisInfo>(defaultQuote)

  // Fonction pour mettre à jour les informations du devis
  const updateDevisInfo = (newInfo: DevisInfo) => {
    setDevisInfo(newInfo)
  }

  // Fonction pour réinitialiser le devis
  // const resetDevis = () => {
  //   setDevisInfo({
  //     ...defaultQuote,
  //     quoteDetailsSchema: {
  //       ...defaultQuote.quoteDetailsSchema,
  //       quoteNumber: `QUOTE-${new Date().getFullYear()}-001`,
  //       quoteDate: new Date().toISOString().split("T")[0],
  //       expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  //     }
  //   })
  // }

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
            <DevisPreview devisInfo={devisInfo} />
          </div>
        </Card>

        <Card className="p-6">
          {/* <DevisActions devisInfo={devisInfo} resetDevis={resetDevis} /> */}
        </Card>
      </div>
    </div>
  )
}
