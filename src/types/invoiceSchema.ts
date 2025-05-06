import { z } from "zod"

export const invoiceDetailsSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Le numéro de facture est requis" }),
  issueDate: z.date({ required_error: "La date d'émission est requise" }),
  dueDate: z.date({ required_error: "La date d'échéance est requise" }),
  paymentTerms: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
  currency: z.string(),
})

export type InvoiceDetailsValues = z.infer<typeof invoiceDetailsSchema>

// Schéma de validation pour les informations de l'entreprise
export const companyInfoSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  email: z.string().email({ message: "Email invalide" }),
  website: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
  // logo: z.string().optional(),
})

export type CompanyInfoValues = z.infer<typeof companyInfoSchema>

// Schéma de validation pour les informations client
export const clientInfoSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }).optional(),
})

export type ClientInfoValues = z.infer<typeof clientInfoSchema>