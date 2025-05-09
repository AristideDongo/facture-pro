import { StyleSheet } from "@react-pdf/renderer";


// Définition des couleurs
const colors = {
    orange100: '#fff7ed',
    orange200: '#fed7aa',
    orange500: '#f97316',
    muted: '#00000020',
    black: '#000000',
    white: '#ffffff',
  };

export const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      fontSize: 10,
      backgroundColor: colors.white,
    },
    
    // En-tête du devis
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 40,
    },
    companyInfo: {
      flexDirection: 'column',
    },
    companyName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    companyAddress: {
      marginBottom: 5,
    },
    companyContact: {
      marginBottom: 2,
    },
    
    // Partie devis à droite
    devisDetails: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    devisTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    devisInfo: {
      marginBottom: 2,
    },
    
    // Informations du client
    clientSection: {
      marginBottom: 40,
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    clientName: {
      fontWeight: 'medium',
      marginBottom: 5,
    },
    clientInfo: {
      marginBottom: 2,
    },
    
    // Tableau des prestations
    table: {
      width: '100%',
      marginBottom: 40,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: colors.black,
      borderCollapse: 'collapse',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableHeaderRow: {
      backgroundColor: colors.orange200,
    },
    tableHeaderCell: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.black,
      borderBottomStyle: 'solid',
      borderRightWidth: 1,
      borderRightColor: colors.black,
      borderRightStyle: 'solid',
      fontWeight: 'bold',
    },
    tableHeaderCellLeft: {
      width: '50%',
      textAlign: 'left',
    },
    tableHeaderCellCenter: {
      width: '15%',
      textAlign: 'center',
    },
    tableHeaderCellRight: {
      width: '17.5%',
      textAlign: 'right',
    },
    tableCell: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.black,
      borderBottomStyle: 'solid',
      borderRightWidth: 1,
      borderRightColor: colors.black,
      borderRightStyle: 'solid',
    },
    tableCellLeft: {
      width: '50%',
      textAlign: 'left',
    },
    tableCellCenter: {
      width: '15%',
      textAlign: 'center',
    },
    tableCellRight: {
      width: '17.5%',
      textAlign: 'right',
    },
    
    // Footer du tableau (totaux)
    tableFooterRow: {
      flexDirection: 'row',
    },
    tableFooterLabelCell: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.black,
      borderBottomStyle: 'solid',
      borderRightWidth: 1,
      borderRightColor: colors.black,
      borderRightStyle: 'solid',
      width: '82.5%', // 3 colonnes combinées
      textAlign: 'right',
    },
    tableFooterAmountCell: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.black,
      borderBottomStyle: 'solid',
      width: '17.5%',
      textAlign: 'right',
    },
    
    // Ligne Total TTC
    totalTTCRow: {
      backgroundColor: colors.orange200,
    },
    totalTTCLabel: {
      fontWeight: 'bold',
    },
    totalTTCAmount: {
      fontWeight: 'bold',
    },
    
    // Conditions de paiement
    paymentTerms: {
      marginBottom: 40,
    },
    
    // Signature
    signatureSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 60,
    },
    signatureBlock: {
      width: '48%',
    },
    signatureCompanyBlock: {
      width: '48%',
      alignItems: 'center',
    },
    signatureTitle: {
      fontWeight: 'medium',
      marginBottom: 4,
    },
    signatureSubtitle: {
      fontSize: 8,
      marginBottom: 40,
    },
  })