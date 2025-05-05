"use client"

import { ItemValues } from "@/components/layout/dashboard-component/invoices/new-invoices/FormInvoices"
import { ClientInfoValues, CompanyInfoValues, InvoiceDetailsValues } from "@/types/invoiceSchema"
import { create } from "zustand"


interface InvoiceStore {
  // Données du formulaire
  clientInfo: ClientInfoValues | null
  companyInfo: CompanyInfoValues | null
  items: ItemValues[] | null
  invoiceDetails: InvoiceDetailsValues | null

  // État de validation des formulaires
  isClientInfoValid: boolean
  isCompanyInfoValid: boolean
  areItemsValid: boolean
  isInvoiceDetailsValid: boolean

  // Actions
  setClientInfo: (clientInfo: ClientInfoValues) => void
  setCompanyInfo: (companyInfo: CompanyInfoValues) => void
  setItems: (items: ItemValues[]) => void
  setInvoiceDetails: (invoiceDetails: InvoiceDetailsValues) => void

  setClientInfoValid: (isValid: boolean) => void
  setCompanyInfoValid: (isValid: boolean) => void
  setItemsValid: (isValid: boolean) => void
  setInvoiceDetailsValid: (isValid: boolean) => void

  resetStore: () => void
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  // Données initiales
  clientInfo: null,
  companyInfo: null,
  items: null,
  invoiceDetails: null,

  // État de validation initial
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

  // Réinitialiser le store
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
}))
