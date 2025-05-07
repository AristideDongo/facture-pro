"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInvoiceStore } from "@/hooks/invoices/useInvoiceForm";
import { formatFCFA } from "@/lib/format";
import { wrapText } from "@/lib/wrapText";
import { ItemValues } from "@/types/invoiceSchema";

export function InvoicePreview() {
  const { clientInfo, companyInfo, items, invoiceDetails } = useInvoiceStore();

  // Fonction pour calculer le total d'un article
  const calculateItemTotal = (item: ItemValues) => {
    if (!item) return 0;
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = (subtotal * (item.discount || 0)) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * item.taxRate) / 100;
    return afterDiscount + taxAmount;
  };

  // Fonction pour calculer le sous-total (sans TVA)
  const calculateSubtotal = () => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const discountAmount = (subtotal * (item.discount || 0)) / 100;
      return sum + (subtotal - discountAmount);
    }, 0);
  };

  // Fonction pour calculer le total de TVA
  const calculateTotalTax = () => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const discountAmount = (subtotal * (item.discount || 0)) / 100;
      const afterDiscount = subtotal - discountAmount;
      const taxAmount = (afterDiscount * item.taxRate) / 100;
      return sum + taxAmount;
    }, 0);
  };

  // Fonction pour calculer le total général
  const calculateTotal = () => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  if (!clientInfo || !companyInfo || !items || !invoiceDetails) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        Remplissez les formulaires pour voir l&apos;aperçu de la facture
      </div>
    );
  }



  return (
    <Card className="border-dashed">
      <CardContent className="p-6">
        <div className="flex flex-col gap-8">
          {/* En-tête de la facture */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold">FACTURE</h1>
              <p className="text-lg font-semibold mt-1">
                #{invoiceDetails.invoiceDetails.invoiceNumber}
              </p>
            </div>

            {/* {companyInfo.logo && (
              <div className="flex justify-center md:justify-end">
                <img
                  src={companyInfo.logo || "/placeholder.svg"}
                  alt={`Logo ${companyInfo.name}`}
                  className="h-16 object-contain"
                />
              </div>
            )} */}
          </div>

          {/* Informations entreprise et client */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-muted-foreground mb-2">DE:</h2>
              <div className="space-y-1">
                <p className="font-bold">{companyInfo.name}</p>
                <p className="whitespace-pre-line">{companyInfo.address}</p>
                <p>{companyInfo.phone}</p>
                <p>{companyInfo.email}</p>
                {/* {companyInfo.website && <p>{companyInfo.website}</p>} */}
              </div>
            </div>

            <div className="">
              <h2 className="font-semibold text-muted-foreground mb-2">
                POUR:
              </h2>
              <div className="space-y-1">
                <p className="font-bold">{clientInfo.name}</p>
                <p className="whitespace-pre-line">{clientInfo.address}</p>
                {clientInfo.phone && <p>{clientInfo.phone}</p>}
                <p>{clientInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Dates et informations de paiement */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-orange-100 p-4 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Date d&apos;émission</p>
              <p className="font-medium">
                {invoiceDetails.invoiceDetails.issueDate
                  ? format(invoiceDetails.invoiceDetails.issueDate, "dd MMMM yyyy", {
                      locale: fr,
                    })
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date d&apos;échéance</p>
              <p className="font-medium">
                {invoiceDetails.invoiceDetails.dueDate
                  ? format(invoiceDetails.invoiceDetails.dueDate, "dd MMMM yyyy", {
                      locale: fr,
                    })
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Méthode de paiement
              </p>
              <p className="font-medium">
                {invoiceDetails.invoiceDetails.paymentMethod || "-"}
              </p>
            </div>
          </div>

          {/* Tableau des articles */}
          <div>
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow className="bg-orange-200">
                  <TableHead className="w-[25%]">Description</TableHead>
                  <TableHead className="text-left">Notes</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead className="text-right">Prix unitaire</TableHead>
                  <TableHead className="text-right">TVA</TableHead>
                  <TableHead className="text-right">Remise</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {wrapText(item.description || "-", 50)}
                    </TableCell>
                    <TableCell className="text-left whitespace-pre-line">
                      {wrapText(item.notes || "", 30)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatFCFA(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.taxRate}%
                    </TableCell>
                    <TableCell className="text-right">
                      {item.discount || 0}%
                    </TableCell>
                    <TableCell className="text-right">
                      {formatFCFA(calculateItemTotal(item))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Résumé des totaux */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex justify-between w-full max-w-xs">
              <span className="text-muted-foreground">Sous-total:</span>
              <span className="font-medium">
                {formatFCFA(calculateSubtotal())}
              </span>
            </div>
            <div className="flex justify-between w-full max-w-xs">
              <span className="text-muted-foreground">TVA:</span>
              <span className="font-medium">
                {formatFCFA(calculateTotalTax())}
              </span>
            </div>
            <Separator className="my-2 w-full bg-orange-500 max-w-xs" />
            <div className="flex justify-between w-full max-w-xs text-lg font-bold">
              <span>Total:</span>
              <span>{formatFCFA(calculateTotal())}</span>
            </div>
          </div>

          {/* Notes et conditions */}
          {(invoiceDetails.invoiceDetails.notes || invoiceDetails.invoiceDetails.terms) && (
            <div className="space-y-4 mt-4">
              {invoiceDetails.invoiceDetails.notes && (
                <div>
                  <h3 className="font-semibold mb-1">Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    {invoiceDetails.invoiceDetails.notes}
                  </p>
                </div>
              )}

              {invoiceDetails.invoiceDetails.terms && (
                <div>
                  <h3 className="font-semibold mb-1">Conditions</h3>
                  <p className="text-sm text-muted-foreground">
                    {invoiceDetails.invoiceDetails.terms}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pied de page */}
          <div className="text-center text-black text-sm mt-8">
            <p>Merci pour votre confiance !</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
