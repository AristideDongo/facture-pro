import { create } from 'zustand';
import { ItemValues, ClientInfoValues, CompagnyInfoValues, InvoiceDetailsValues } from '@/types/invoiceSchema';

interface InvoiceStore {
  // Données du formulaire
  clientInfo: ClientInfoValues | null;
  compagnyInfo: CompagnyInfoValues | null;
  items: ItemValues[] | null;
  invoiceDetails: InvoiceDetailsValues | null;

  isClientInfoValid: boolean;
  iscompagnyInfoValid: boolean;
  areItemsValid: boolean;
  isInvoiceDetailsValid: boolean;

  // Actions
  setClientInfo: (clientInfo: ClientInfoValues) => void;
  setcompagnyInfo: (compagnyInfo: CompagnyInfoValues) => void;
  setItems: (items: ItemValues[]) => void;
  setInvoiceDetails: (invoiceDetails: InvoiceDetailsValues) => void;

  setClientInfoValid: (isValid: boolean) => void;
  setcompagnyInfoValid: (isValid: boolean) => void;
  setItemsValid: (isValid: boolean) => void;
  setInvoiceDetailsValid: (isValid: boolean) => void;

  resetStore: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  clientInfo: null,
  compagnyInfo: null,
  items: null,
  invoiceDetails: null,

  isClientInfoValid: false,
  iscompagnyInfoValid: false,
  areItemsValid: false,
  isInvoiceDetailsValid: false,

  // Actions pour mettre à jour les données
  setClientInfo: (clientInfo) => set({ clientInfo }),
  setcompagnyInfo: (compagnyInfo) => set({ compagnyInfo }),
  setItems: (items) => set({ items }),
  setInvoiceDetails: (invoiceDetails) => set({ invoiceDetails }),

  // Actions pour mettre à jour l'état de validation
  setClientInfoValid: (isValid) => set({ isClientInfoValid: isValid }),
  setcompagnyInfoValid: (isValid) => set({ iscompagnyInfoValid: isValid }),
  setItemsValid: (isValid) => set({ areItemsValid: isValid }),
  setInvoiceDetailsValid: (isValid) => set({ isInvoiceDetailsValid: isValid }),

  resetStore: () =>
    set({
      clientInfo: null,
      compagnyInfo: null,
      items: null,
      invoiceDetails: null,
      isClientInfoValid: false,
      iscompagnyInfoValid: false,
      areItemsValid: false,
      isInvoiceDetailsValid: false,
    }),
}));
