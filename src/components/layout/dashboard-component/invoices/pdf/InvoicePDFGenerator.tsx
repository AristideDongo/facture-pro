import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { styles } from './invoice-style-pdf';
import { ClientInfoValues, CompagnyInfoValues, InvoiceDetailsValues, ItemValues } from '@/types/invoiceSchema';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { wrapText } from '@/lib/wrapText';
import { formatFCFA } from '@/lib/format';

type InvoicePDFProps = {
  clientInfo: ClientInfoValues;
  compagnyInfo: CompagnyInfoValues;
  items: ItemValues[];
  invoiceDetails: InvoiceDetailsValues;
};

export const InvoicePDF= ({clientInfo, compagnyInfo, items, invoiceDetails} : InvoicePDFProps) => {

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

  if (!clientInfo || !compagnyInfo || !items || !invoiceDetails) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        Remplissez les formulaires pour télécharger la facture de la facture
      </div>
    );
  }
  return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.card}>
        {/* En tête de la facture */}
        <View style={styles.header}>
        <View>
          <Text style={styles.title}>FACTURE</Text>
          <Text style={styles.invoiceNumber}>#{invoiceDetails.invoiceNumber}</Text>
        </View>
        </View>

        {/* Info entreprise et client  */}
        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>DE:</Text>
            <View style={styles.infoConentWrapper}>
              <Text style={[styles.infoContent, styles.boldText]}>{compagnyInfo.name}</Text>
              <Text style={styles.infoContent}>{compagnyInfo.address}</Text>
              <Text style={styles.infoContent}>{compagnyInfo.phone}</Text>
              <Text style={styles.infoContent}>{compagnyInfo.email}</Text>
            </View>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>POUR:</Text>
            <View>
              <Text style={[styles.infoContent, styles.boldText]}>{clientInfo.name}</Text>
              <Text style={styles.infoContent}>{clientInfo.address}</Text>
              <Text style={styles.infoContent}>{clientInfo.phone}</Text>
              <Text style={styles.infoContent}>{clientInfo.email}</Text>
            </View>
          </View>
        </View>

        {/* Dates et informations de paiement */}
        <View style={styles.datesContainer}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Date d&apos;émission</Text>
              <Text style={styles.dateValue}>
                {invoiceDetails.issueDate
                  ? format(invoiceDetails.issueDate, "dd MMMM yyyy", {
                      locale: fr,
                    })
                  : "-"}
              </Text>
            </View>

            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Date d&apos;échéance</Text>
              <Text style={styles.dateValue}>
                {invoiceDetails.dueDate
                  ? format(invoiceDetails.dueDate, "dd MMMM yyyy", {
                      locale: fr,
                    })
                  : "-"}
              </Text>
            </View>

            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Méthode de paiement</Text>
              <Text style={styles.dateValue}>
                {invoiceDetails?.paymentMethod || "-"}
              </Text>
            </View>
          </View>

          {/* Tableau des articles */}
          <View style={styles.table}>
            {/* En-tête du tableau */}
            <View style={styles.tableHeader}>
              <View style={styles.descriptionCol}>
                <Text style={styles.tableHeaderText}>Description</Text>
              </View>
              <View style={styles.notesCol}>
                <Text style={styles.tableHeaderText}>Notes</Text>
              </View>
              <View style={styles.quantityCol}>
                <Text style={[styles.tableHeaderText, styles.textRight]}>Quantité</Text>
              </View>
              <View style={styles.priceCol}>
                <Text style={[styles.tableHeaderText, styles.textRight]}>Prix unitaire</Text>
              </View>
              <View style={styles.taxCol}>
                <Text style={[styles.tableHeaderText, styles.textRight]}>TVA</Text>
              </View>
              <View style={styles.discountCol}>
                <Text style={[styles.tableHeaderText, styles.textRight]}>Remise</Text>
              </View>
              <View style={styles.totalCol}>
                <Text style={[styles.tableHeaderText, styles.textRight]}>Total</Text>
              </View>
            </View>

            {/* Corps du tableau */}
            {items?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.descriptionCol}>
                  <Text style={styles.tableCell}>
                    {wrapText(item.description || "-", 50)}
                  </Text>
                </View>
                <View style={styles.quantityCol}>
                  <Text style={[styles.tableCell, styles.textRight]}>
                    {item.quantity}
                  </Text>
                </View>
                <View style={styles.priceCol}>
                  <Text style={[styles.tableCell, styles.textRight]}>
                    {formatFCFA(item.unitPrice)}
                  </Text>
                </View>
                <View style={styles.taxCol}>
                  <Text style={[styles.tableCell, styles.textRight]}>
                    {item.taxRate}%
                  </Text>
                </View>
                <View style={styles.discountCol}>
                  <Text style={[styles.tableCell, styles.textRight]}>
                    {item.discount || 0}%
                  </Text>
                </View>
                <View style={styles.totalCol}>
                  <Text style={[styles.tableCell, styles.textRight]}>
                    {formatFCFA(calculateItemTotal(item))}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Résumé des totaux */}
          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Sous-total:</Text>
              <Text style={styles.totalValue}>
                {formatFCFA(calculateSubtotal())}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TVA:</Text>
              <Text style={styles.totalValue}>
                {formatFCFA(calculateTotalTax())}
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.grandTotalRow}>
              <Text>Total:</Text>
              <Text>{formatFCFA(calculateTotal())}</Text>
            </View>
          </View>

          {/* Notes et conditions */}
          {(invoiceDetails?.notes || invoiceDetails?.terms) && (
            <View style={styles.notesSection}>
              {invoiceDetails.notes && (
                <View style={styles.section}>
                  <Text style={styles.notesTitle}>Notes</Text>
                  <Text style={styles.notesText}>
                    {invoiceDetails.notes}
                  </Text>
                </View>
              )}

              {invoiceDetails.terms && (
                <View style={styles.section}>
                  <Text style={styles.notesTitle}>Conditions</Text>
                  <Text style={styles.notesText}>
                    {invoiceDetails.terms}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Pied de page */}
          <View style={styles.footer}>
            <Text>Merci pour votre confiance !</Text>
          </View>

      </View>
    </Page>
  </Document>
  )
}
