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
      compagnyName: "Ma société",
      compagnyAddress: "Abidjan",
      compagnyEmail: "societe@example.com",
      compagnyPhone: "0101010102",
    },
    clientQuoteInfo: {
      clientName: "Client Exemple",
      clientAddress: "Yopougon",
      clientEmail: "client@gmail.com",
      clientPhone: "0101010102",
    },
    amount: 100000,
  },
]