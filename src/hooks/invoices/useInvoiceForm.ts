import { create } from 'zustand';
import { ItemValues, ClientInfoValues, CompanyInfoValues, InvoiceValues } from '@/types/invoiceSchema';

interface InvoiceStore {
  // Données du formulaire
  clientInfo: ClientInfoValues | null;
  companyInfo: CompanyInfoValues | null;
  items: ItemValues[] | null;
  invoiceDetails: InvoiceValues | null;

  isClientInfoValid: boolean;
  isCompanyInfoValid: boolean;
  areItemsValid: boolean;
  isInvoiceDetailsValid: boolean;

  // Actions
  setClientInfo: (clientInfo: ClientInfoValues) => void;
  setCompanyInfo: (companyInfo: CompanyInfoValues) => void;
  setItems: (items: ItemValues[]) => void;
  setInvoiceDetails: (invoiceDetails: InvoiceValues) => void;

  setClientInfoValid: (isValid: boolean) => void;
  setCompanyInfoValid: (isValid: boolean) => void;
  setItemsValid: (isValid: boolean) => void;
  setInvoiceDetailsValid: (isValid: boolean) => void;

  resetStore: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  clientInfo: null,
  companyInfo: null,
  items: null,
  invoiceDetails: null,

  isClientInfoValid: false,
  isCompanyInfoValid: false,
  areItemsValid: false,
  isInvoiceDetailsValid: false,

  // Actions pour mettre à jour les données
  setClientInfo: (clientInfo) => set({ clientInfo }),
  setCompanyInfo: (companyInfo) => set({ companyInfo }),
  setItems: (items) => set({ items }),
  setInvoiceDetails: (invoiceDetails) => set({ invoiceDetails }),

  // Actions pour mettre à jour l'état de validation
  setClientInfoValid: (isValid) => set({ isClientInfoValid: isValid }),
  setCompanyInfoValid: (isValid) => set({ isCompanyInfoValid: isValid }),
  setItemsValid: (isValid) => set({ areItemsValid: isValid }),
  setInvoiceDetailsValid: (isValid) => set({ isInvoiceDetailsValid: isValid }),

  resetStore: () =>
    set({
      clientInfo: null,
      companyInfo: null,
      items: null,
      invoiceDetails: null,
      isClientInfoValid: false,
      isCompanyInfoValid: false,
      areItemsValid: false,
      isInvoiceDetailsValid: false,
    }),
}));
