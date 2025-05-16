export const invoices = [
  {
    clientInfo: {
      name: "Client 1",
      address: "123 Rue de la Paix\nAbidjan, Côte d'Ivoire",
      phone: "0123456700",
      email: "client1@example.com",
    },
    compagnyInfo: {
      name: "Ma Société SARL",
      address: "456 Avenue des Affaires\nAbidjan, Côte d'Ivoire",
      phone: "+225 07 89 01 23",
      email: "contact@masociete.ci",
    },
    items: [
      {
        description: "Service A",
        quantity: 1,
        unitPrice: 1000,
        discount: 0,
        taxRate: 0,
      },
    ],
    invoiceDetails: {
      invoiceNumber: "FACT-0001",
      issueDate: new Date("2025-05-01"),
      dueDate: new Date("2025-05-15"),
      paymentMethod: "Virement bancaire",
      currency: "XOF",
      status: "pending",
      notes: "Merci de votre confiance.",
      terms: "Paiement sous 15 jours.",
    },
    amount: 1000,
  },
  {
    clientInfo: {
      name: "Client 2",
      address: "456 Rue Marchande\nYamoussoukro, Côte d'Ivoire",
      phone: "0234567800",
      email: "client2@example.com",
    },
    compagnyInfo: {
      name: "Ma Société SARL",
      address: "456 Avenue des Affaires\nAbidjan, Côte d'Ivoire",
      phone: "+225 07 89 01 23",
      email: "contact@masociete.ci",
    },
    items: [
      {
        description: "Produit B",
        quantity: 2,
        unitPrice: 1000,
        discount: 0,
        taxRate: 0,
      },
    ],
    invoiceDetails: {
      invoiceNumber: "FACT-0002",
      issueDate: new Date("2025-05-01"),
      dueDate: new Date("2025-05-15"),
      paymentMethod: "Espèces",
      currency: "XOF",
      status: "paid",
      notes: "",
      terms: "",
    },
    amount: 2000,
  },
  {
    clientInfo: {
      name: "Client 3",
      address: "456 Rue Marchande\nYamoussoukro, Côte d'Ivoire",
      phone: "0002345678",
      email: "client2@example.com",
    },
    compagnyInfo: {
      name: "Ma Société SARL",
      address: "456 Avenue des Affaires\nAbidjan, Côte d'Ivoire",
      phone: "+225 07 89 01 23",
      email: "contact@masociete.ci",
    },
    items: [
      {
        description: "Produit B",
        quantity: 2,
        unitPrice: 1000,
        discount: 0,
        taxRate: 0,
      },
    ],
    invoiceDetails: {
      invoiceNumber: "FACT-0002",
      issueDate: new Date("2025-05-01"),
      dueDate: new Date("2025-05-15"),
      paymentMethod: "Espèces",
      currency: "XOF",
      status: "overdue",
      notes: "",
      terms: "",
    },
    amount: 2000,
  },
];
