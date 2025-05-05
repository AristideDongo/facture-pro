  // Fonction pour générer un PDF à partir d'un élément HTML
  // Note: Cette fonction est simplifiée et nécessiterait une bibliothèque comme jsPDF ou html2pdf.js
  // dans une implémentation réelle
  export function generatePDF(elementId: string, filename: string) {
    // Simuler le téléchargement d'un PDF
    // Dans une application réelle, vous utiliseriez une bibliothèque comme jsPDF ou html2pdf.js
    alert(`Le PDF de la facture ${filename} serait généré ici. Dans une application réelle, le téléchargement démarrerait.`)
    
    // Exemple de code avec html2pdf.js (à implémenter avec la bibliothèque appropriée)
    /*
    import html2pdf from 'html2pdf.js'
    
    const element = document.getElementById(elementId)
    const opt = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf().set(opt).from(element).save()
    */
  }