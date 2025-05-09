import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './quoteStylePdf';
import { formatFCFA } from '@/lib/format';
import { DevisInfo } from '@/types/quoteSchema';


interface PDFQuote {
  devisInfo: DevisInfo
}

const QuotePDF = ({ devisInfo }: PDFQuote) => {
  const totalHT = devisInfo.quoteDetailsSchema.services.reduce(
    (total, item) => total + item.quantity * item.unitPrice, 0
  );
  const tva = totalHT * devisInfo.quoteDetailsSchema.taxRate / 100;
  const totalTTC = totalHT + tva;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête du devis */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{devisInfo.compagnyQuoteInfo.compagnyName}</Text>
            <Text style={styles.companyAddress}>{devisInfo.compagnyQuoteInfo.compagnyAddress}</Text>
            <Text style={styles.companyContact}>{devisInfo.compagnyQuoteInfo.compagnyEmail}</Text>
            <Text style={styles.companyContact}>{devisInfo.compagnyQuoteInfo.compagnyPhone}</Text>
          </View>

          <View style={styles.devisDetails}>
            <Text style={styles.devisTitle}>DEVIS</Text>
            <Text style={styles.devisInfo}>N° {devisInfo.quoteDetailsSchema.quoteNumber}</Text>
            <Text style={styles.devisInfo}>
              Date: {new Date(devisInfo.quoteDetailsSchema.quoteDate).toLocaleDateString()}
            </Text>
            <Text style={styles.devisInfo}>
              Validité: {new Date(devisInfo.quoteDetailsSchema.expirationDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Informations du client */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionTitle}>Client:</Text>
          <Text style={styles.clientName}>{devisInfo.clientQuoteInfo.clientName || "[Nom du client]"}</Text>
          <Text style={styles.clientInfo}>{devisInfo.clientQuoteInfo.clientAddress || "[Adresse du client]"}</Text>
          {devisInfo.clientQuoteInfo.clientEmail && (
            <Text style={styles.clientInfo}>{devisInfo.clientQuoteInfo.clientEmail}</Text>
          )}
          {devisInfo.clientQuoteInfo.clientPhone && (
            <Text style={styles.clientInfo}>{devisInfo.clientQuoteInfo.clientPhone}</Text>
          )}
        </View>

        {/* Tableau des prestations */}
        <View style={styles.table}>
          {/* En-tête du tableau */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <View style={[styles.tableHeaderCell, styles.tableHeaderCellLeft]}>
              <Text>Description</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.tableHeaderCellCenter]}>
              <Text>Quantité</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.tableHeaderCellRight]}>
              <Text>Prix unitaire</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.tableHeaderCellRight]}>
              <Text>Total</Text>
            </View>
          </View>

          {/* Corps du tableau */}
          {devisInfo.quoteDetailsSchema.services.map((prestation, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellLeft]}>
                <Text>{prestation.description || "[Description]"}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellCenter]}>
                <Text>{prestation.quantity}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellRight]}>
                <Text>{prestation.unitPrice.toFixed(2)}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellRight]}>
                <Text>{(prestation.quantity * prestation.unitPrice).toFixed(2)}</Text>
              </View>
            </View>
          ))}

          {/* Pied du tableau (totaux) */}
          <View style={styles.tableFooterRow}>
            <View style={[styles.tableFooterLabelCell]}>
              <Text>Total HT</Text>
            </View>
            <View style={[styles.tableFooterAmountCell]}>
              <Text>{formatFCFA(totalHT)}</Text>
            </View>
          </View>

          <View style={styles.tableFooterRow}>
            <View style={[styles.tableFooterLabelCell]}>
              <Text>TVA ({devisInfo.quoteDetailsSchema.taxRate}%)</Text>
            </View>
            <View style={[styles.tableFooterAmountCell]}>
              <Text>{formatFCFA(tva)}</Text>
            </View>
          </View>

          <View style={[styles.tableFooterRow, styles.totalTTCRow]}>
            <View style={[styles.tableFooterLabelCell, styles.totalTTCLabel]}>
              <Text>Total TTC</Text>
            </View>
            <View style={[styles.tableFooterAmountCell, styles.totalTTCAmount]}>
              <Text>{formatFCFA(totalTTC)}</Text>
            </View>
          </View>
        </View>

        {/* Conditions de paiement */}
        <View style={styles.paymentTerms}>
          <Text style={styles.sectionTitle}>Conditions de paiement:</Text>
          <Text>{devisInfo.quoteDetailsSchema.paymentTerms}</Text>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureTitle}>Bon pour accord</Text>
            <Text style={styles.signatureSubtitle}>Date et signature du client</Text>
            <View style={styles.signatureLine} />
          </View>

          <View style={styles.signatureCompanyBlock}>
            <Text style={styles.signatureTitle}>{devisInfo.compagnyQuoteInfo.compagnyName}</Text>
            <View style={styles.signatureLine} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default QuotePDF;