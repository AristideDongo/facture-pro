import ButtonMoreActionSummary from '@/components/common/ButtonMoreActionSummary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { getStatus } from '@/lib/getSatus';
import { DevisInfo } from '@/types/quoteSchema';
import React from 'react';

interface props {
  filteredQuoteSummary: DevisInfo[]
}

export default function RenderListInvoiceSummary({filteredQuoteSummary}: props) {
  if (filteredQuoteSummary.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Aucune facture disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredQuoteSummary.map((quote, i) => (
        <Card key={i} className="rounded-lg border p-6 invoice-card">
          <div className="flex justify-between items-start">
            
            <CardHeader className="p-0">
              <CardTitle className="font-semibold">{quote.quoteDetailsSchema.quoteNumber}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{quote.clientQuoteInfo.clientName}</CardDescription>
            </CardHeader>

            <div className="flex items-center gap-4">
              <CardContent className="p-0 text-right">
                <div className="font-medium">{quote.amount.toFixed(2)} Fcfa</div>
                <div className="text-sm text-muted-foreground">
                  Échéance: <span>{quote.quoteDetailsSchema.expirationDate}</span>
                </div>
                {/* <div className='text-center'>{quote.quoteDetailsSchema.status !== 'quote' && getStatus(invoice.invoiceDetails.status)}</div> */}
              </CardContent>

              <ButtonMoreActionSummary/>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
