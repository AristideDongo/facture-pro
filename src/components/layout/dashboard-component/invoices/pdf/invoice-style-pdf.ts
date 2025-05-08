import { StyleSheet } from '@react-pdf/renderer';

// Définition des couleurs
const colors = {
  orange100: '#fff7ed',
  orange200: '#fed7aa',
  orange500: '#f97316',
  muted: '#6b7280',
  black: '#000000',
  white: '#ffffff',
};

export const styles = StyleSheet.create({
  // Conteneur principal
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.black,
  },
  
  // Conteneur de la carte
  card: {
    padding: 24,
  },
  
  // Section principale avec espacement
  section: {
    marginBottom: 20,
  },
  
  // En-tête de la facture
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  invoiceNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  
  // Conteneur pour les infos de l'entreprise et du client
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  infoConentWrapper:  {
    marginTop: 4
  },
  
  infoColumn: {
    width: '48%',
  },
  
  infoLabel: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  
  infoContent: {
    marginBottom: 4,
  },
  
  boldText: {
    fontWeight: 'bold',
  },
  
  // Conteneur des dates et infos de paiement
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.orange100,
    padding: 16,
    borderRadius: 4,
    marginBottom: 24,
  },
  
  dateColumn: {
    width: '30%',
  },
  
  dateLabel: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 4,
  },
  
  dateValue: {
    fontWeight: 'medium',
  },
  
  // Tableau des articles
  table: {
    display: 'flex',
    width: 'auto',
    marginBottom: 24,
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.orange200,
    alignItems: 'center',
    height: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
  },
  
  tableCell: {
    padding: 5,
    fontSize: 9,
  },
  
  descriptionCol: {
    width: '25%',
  },
  
  notesCol: {
    width: '24%',
  },
  
  quantityCol: {
    width: '8%',
    textAlign: 'right',
  },
  
  priceCol: {
    width: '12%',
    textAlign: 'right',
  },
  
  taxCol: {
    width: '8%',
    textAlign: 'right',
  },
  
  discountCol: {
    width: '8%',
    textAlign: 'right',

  },
  
  totalCol: {
    width: '15%',
    textAlign: 'right',
  },
  
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  
  // Résumé des totaux
  totalsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  
  totalRow: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  
  totalLabel: {
    color: colors.muted,
  },
  
  totalValue: {
    fontWeight: 'medium',
  },
  
  separator: {
    width: 150,
    height: 1,
    backgroundColor: colors.orange500,
    marginVertical: 8,
  },
  
  grandTotalRow: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // Notes et conditions
  notesSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  
  notesTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  notesText: {
    fontSize: 9,
    color: colors.muted,
  },
  
  // Pied de page
  footer: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 32,
  },
  
  textRight: {
    textAlign: 'right',
  },
  
  textCenter: {
    textAlign: 'center',
  },
});