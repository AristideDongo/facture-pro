'use client'
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import QuotePDF from './QuotePDFGenerator';
import { useDevisStore } from '@/store/quotes/useQuoteStore';

export function PDFViewQuote() {
  const { devisInfo } = useDevisStore();
  if (!devisInfo) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        Remplissez les formulaires pour télécharger le dévis
      </div>
    );
  }
  const isDataComplete = devisInfo
  
  return (
    <div className="flex justify-center mt-6">
      {isDataComplete ? (
        <PDFDownloadLink
          document={
            <QuotePDF devisInfo={devisInfo}/>
          }
          fileName={`Facture-${devisInfo.quoteDetailsSchema.quoteNumber}.pdf`}
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
              {loading ? 'Préparation du PDF...' : 'Télécharger le dévis PDF'}
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