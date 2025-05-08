'use client'
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useInvoiceStore } from '@/hooks/invoices/useInvoiceForm';
import { Button } from '@/components/ui/button';
import { InvoicePDF } from './InvoicePDFGenerator';

export function PDFView() {
  const { clientInfo, compagnyInfo, items, invoiceDetails } = useInvoiceStore();
  
  if (!clientInfo || !compagnyInfo || !items || !invoiceDetails) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        Remplissez les formulaires pour télécharger la facture de la facture
      </div>
    );
  }

  const isDataComplete = clientInfo && compagnyInfo && items?.length > 0 && invoiceDetails;
  
  return (
    <div className="flex justify-end mt-6">
      {isDataComplete ? (
        <PDFDownloadLink
          document={
            <InvoicePDF
              clientInfo={clientInfo}
              compagnyInfo={compagnyInfo}
              items={items}
              invoiceDetails={invoiceDetails}
            />
          }
          fileName={`Facture-${invoiceDetails.invoiceNumber}.pdf`}
          style={{ textDecoration: 'none' }}
        >
          {({ url, loading }) => (
            <Button 
              disabled={loading} 
              variant="default"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                if (url) {
                  window.open(url, '_blank');
                }
              }}
            >
              {loading ? 'Préparation du PDF...' : 'Télécharger la facture PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      ) : (
        <Button disabled variant="default">
          Remplissez tous les champs pour générer le PDF
        </Button>
      )}
    </div>
  );
}