"use client"

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import { InvoiceData } from "@/types/invoiceSchema"
import { formatCurrency, formatDate } from "@/lib/utils2"

interface InvoicePreviewProps {
  isOpen: boolean
  onClose: () => void
  invoiceData: InvoiceData | null
  onDownload: () => void
}

export function InvoicePreview({ 
  isOpen, 
  onClose, 
  invoiceData, 
  onDownload,
}: InvoicePreviewProps) {
    console.log("InvoicePreview rendering", { isOpen, invoiceData });

    if (!invoiceData) {
      return null;
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center mb-4">
            <span className="gradient-text">Aperçu de la facture</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 border rounded-lg bg-white" id="invoice-preview">
          {/* En-tête de la facture */}
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">FACTURE</h2>
              <p className="text-lg font-medium">{invoiceData.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p><strong>Date de facture:</strong> {formatDate(invoiceData.invoiceDate)}</p>
              <p><strong>Date d'échéance:</strong> {formatDate(invoiceData.dueDate)}</p>
            </div>
          </div>
          
          {/* Info client et vendeur */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Facturé à:</h3>
              <p className="font-medium">{invoiceData.clientName}</p>
              <p className="text-gray-600">{invoiceData.clientEmail}</p>
              <p className="whitespace-pre-line text-gray-600">{invoiceData.clientAddress}</p>
              <p className="text-gray-600">{invoiceData.clientPhone}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">De:</h3>
              <p className="font-medium">{invoiceData.compagnyName}</p>
              <p className="text-gray-600">{invoiceData.compagnyEmail}</p>
              <p className="text-gray-600">{invoiceData.compagnyAddress}</p>
              <p className="text-gray-600">{invoiceData.compagnyPhone}</p>
            </div>
          </div>
          
          {/* Tableau des articles */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-right">Quantité</th>
                  <th className="border p-2 text-right">Prix unitaire</th>
                  <th className="border p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="border-x p-2">{item.description}</td>
                    <td className="border-x p-2 text-right">{item.quantity}</td>
                    <td className="border-x p-2 text-right">{formatCurrency(item.price)}</td>
                    <td className="border-x p-2 text-right">
                      {formatCurrency(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Résumé des totaux */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Sous-total:</span>
                <span>{formatCurrency(invoiceData.subtotal)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>TVA ({invoiceData.taxRate}%):</span>
                <span>{formatCurrency(invoiceData.tax)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg border-t mt-2">
                <span>Total:</span>
                <span className="text-primary">{formatCurrency(invoiceData.total)}</span>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          {invoiceData.notes && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Notes:</h3>
              <p className="text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'édition
          </Button>
          <div className="flex">
            <Button 
              onClick={onDownload}
              className="bg-orange-400 text-black hover:bg-orange-500"
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger PDF
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}