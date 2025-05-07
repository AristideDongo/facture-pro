import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatFCFA } from "@/lib/format"
import { DevisInfo } from "@/types/quoteSchema"

interface DevisPreviewProps {
  devisInfo: DevisInfo
}

export function DevisPreview({ devisInfo }: DevisPreviewProps) {
  const totalHT = devisInfo.quoteDetailsSchema.services.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  const tva = totalHT * devisInfo.quoteDetailsSchema.taxRate / 100
  const totalTTC = totalHT + tva

  return (
    <div className="border rounded-md p-6 bg-white text-sm">
      {/* En-tête du devis */}
      <div className="flex flex-col sm:flex-row justify-between mb-8">
        <div>
          <h3 className="font-bold text-xl">{devisInfo.compagnyQuoteInfo.companyName}</h3>
          <p className="whitespace-pre-line">{devisInfo.compagnyQuoteInfo.companyAddress}</p>
          <p>{devisInfo.compagnyQuoteInfo.companyEmail}</p>
          <p>{devisInfo.compagnyQuoteInfo.companyPhone}</p>
        </div>

        <div className="mt-4 sm:mt-0 sm:text-right">
          <h3 className="font-bold text-xl">DEVIS</h3>
          <p>N° {devisInfo.quoteDetailsSchema.quoteNumber}</p>
          <p>Date: {new Date(devisInfo.quoteDetailsSchema.quoteDate).toLocaleDateString()}</p>
          <p>Validité: {new Date(devisInfo.quoteDetailsSchema.expirationDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Informations du client */}
      <div className="mb-8">
        <h4 className="font-semibold mb-2">Client:</h4>
        <p className="font-medium">{devisInfo.clientQuoteInfo.clientName || "[Nom du client]"}</p>
        <p className="whitespace-pre-line">{devisInfo.clientQuoteInfo.clientAddress || "[Adresse du client]"}</p>
        {devisInfo.clientQuoteInfo.clientEmail && <p>{devisInfo.clientQuoteInfo.clientEmail}</p>}
        {devisInfo.clientQuoteInfo.clientPhone && <p>{devisInfo.clientQuoteInfo.clientPhone}</p>}
      </div>

      {/* Tableau des prestations */}
      <div className="mb-8 overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-orange-200">
              <TableHead className="border p-2 text-left">Description</TableHead>
              <TableHead className="border p-2 text-center">Quantité</TableHead>
              <TableHead className="border p-2 text-right">Prix unitaire</TableHead>
              <TableHead className="border p-2 text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devisInfo.quoteDetailsSchema.services.map((prestation, index) => (
              <TableRow key={index}>
                <TableCell className="border p-2">{prestation.description || "[Description]"}</TableCell>
                <TableCell className="border p-2 text-center">{prestation.quantity}</TableCell>
                <TableCell className="border p-2 text-right">{prestation.unitPrice.toFixed(2)} €</TableCell>
                <TableCell className="border p-2 text-right">
                  {(prestation.quantity * prestation.unitPrice).toFixed(2)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="border bg-white p-2 text-right font-medium">
                Total HT
              </TableCell>
              <TableCell className="border bg-white p-2 text-right font-medium">{formatFCFA(totalHT)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="border bg-white p-2 text-right">
                TVA ({devisInfo.quoteDetailsSchema.taxRate}%)
              </TableCell>
              <TableCell className="border p-2 bg-white text-right">{formatFCFA(tva)}</TableCell>
            </TableRow>
            <TableRow className="bg-orange-200">
              <TableCell colSpan={3} className="border p-2 text-right font-bold">
                Total TTC
              </TableCell>
              <TableCell className="border p-2 text-right font-bold">{formatFCFA(totalTTC)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Conditions de paiement */}
      <div className="mb-8">
        <h4 className="font-semibold mb-2">Conditions de paiement:</h4>
        <p>{devisInfo.quoteDetailsSchema.paymentTerms}</p>
      </div>

      {/* Signature */}
      <div className="grid grid-cols-2 gap-4 mt-12">
        <div>
          <p className="font-medium">Bon pour accord</p>
          <p className="text-xs mt-1">Date et signature du client</p>
          <div className="h-20 border-b mt-8"></div>
        </div>

        <div className="text-right">
          <p className="font-medium">{devisInfo.compagnyQuoteInfo.companyName}</p>
          <div className="h-20 border-b mt-8"></div>
        </div>
      </div>
    </div>
  )
}
