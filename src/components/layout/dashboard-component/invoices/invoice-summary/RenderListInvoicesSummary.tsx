import ButtonMoreActionSummary from '@/components/common/ButtonMoreActionSummary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFCFA } from '@/lib/format';
import { getStatus } from '@/lib/getSatus';
import { InvoiceValues } from '@/types/invoiceSchema';
import React from 'react';

interface props {
  filteredInvoiceSummary: InvoiceValues[]
}

export default function RenderListInvoiceSummary({filteredInvoiceSummary}: props) {
  if (filteredInvoiceSummary.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Aucune facture disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredInvoiceSummary.map((invoice, i) => (
        <Card key={i} className="rounded-lg border p-6 invoice-card">
          <div className="flex justify-between items-start">
            
            <CardHeader className="p-0">
              <CardTitle className="font-semibold">{invoice.invoiceDetails.invoiceNumber}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{invoice.clientInfo.name}</CardDescription>
            </CardHeader>

            <div className="flex items-center gap-4">
              <CardContent className="p-0 text-right">
                <div className="font-medium">{formatFCFA(invoice.amount)}</div>
                <div className="text-sm text-muted-foreground">
                  Échéance: <span>{invoice.invoiceDetails.dueDate}</span>
                </div>
                <div className='text-center'>{invoice.invoiceDetails.status !== 'quote' && getStatus(invoice.invoiceDetails.status)}</div>
              </CardContent>

              <ButtonMoreActionSummary/>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
