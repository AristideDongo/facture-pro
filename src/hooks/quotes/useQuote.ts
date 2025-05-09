// store/useDevisStore.ts
import { create } from "zustand";
import { DevisInfo } from "@/types/quoteSchema";

export const defaultQuote: DevisInfo = {
  compagnyQuoteInfo: {
    compagnyName: "Your compagny",
    compagnyAddress: "123 Business Street, 75000 Paris",
    compagnyEmail: "contact@yourcompagny.com",
    compagnyPhone: "01 23 45 67 89",
  },
  clientQuoteInfo: {
    clientName: "Client par défaut",
    clientAddress: "Adresse du client",
    clientEmail: "",
    clientPhone: "",
  },
  quoteDetailsSchema: {
    quoteNumber: `QUOTE-${new Date().getFullYear()}-`,
    quoteDate: new Date().toISOString().split("T")[0],
    taxRate: 20,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    services: [{ description: "Prestation par défaut", quantity: 1, unitPrice: 0 }],
    paymentTerms: "Payment within 30 days after receiving the signed quote.",
  },
  amount: 0
};

type DevisStore = {
  devisInfo: DevisInfo;
  updateDevisInfo: (newInfo: DevisInfo) => void;
  resetDevis: () => void;
};

export const useDevisStore = create<DevisStore>((set) => ({
  devisInfo: defaultQuote,

  updateDevisInfo: (newInfo) => set({ devisInfo: newInfo }),

  resetDevis: () =>
    set(() => ({
      devisInfo: {
        ...defaultQuote,
        quoteDetailsSchema: {
          ...defaultQuote.quoteDetailsSchema,
          quoteNumber: `QUOTE-${new Date().getFullYear()}-`,
          quoteDate: new Date().toISOString().split("T")[0],
          expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
      },
    })),
}));
