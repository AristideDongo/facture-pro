export const quote = [
  {
    quoteDetailsSchema: {
      quoteNumber: "DEV-001",
      quoteDate: "2025-05-01",
      expirationDate: "2025-06-01",
      taxRate: 0,
      services: [
        { description: "Site Web", quantity: 1, unitPrice: 100000}
      ],
      paymentTerms: "30 jours",
    },
    compagnyQuoteInfo: {
      companyName: "Ma société",
      companyAddress: "Abidjan",
      companyEmail: "societe@example.com",
      companyPhone: "0101010101",
    },
    clientQuoteInfo: {
      clientName: "Client Exemple",
      clientAddress: "Yopougon",
      clientEmail: "",
      clientPhone: "",
    },
    amount: 100000,
  },
]