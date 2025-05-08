import { z } from "zod"

export const invoiceDetailsSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Le numéro de facture est requis" }),
  issueDate: z.date({ required_error: "La date d'émission est requise" }),
  dueDate: z.date({ required_error: "La date d'échéance est requise" }),
  status: z.string({}),
  paymentTerms: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
  currency: z.string(),
})

export const compagnyInfoSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  email: z.string().email({ message: "Email invalide" }),
})

export const clientInfoSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }).optional(),
})

// Schéma global combiné avec 'amount' ajouté
export const fullInvoiceSchema = z.object({
  invoiceDetails: invoiceDetailsSchema,
  compagnyInfo: compagnyInfoSchema,
  clientInfo: clientInfoSchema,
  amount: z.number().min(0, { message: "Le montant ne peut pas être négatif" }),
})


// Schéma de validation pour un article
export const itemSchema = z.object({
  description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères" }),
  quantity: z.coerce.number().positive({ message: "La quantité doit être positive" }),
  unitPrice: z.coerce.number().positive({ message: "Le prix unitaire doit être positif" }),
  taxRate: z.coerce.number().min(0, { message: "Le taux de TVA ne peut pas être négatif" }),
  discount: z.coerce.number().min(0, { message: "La remise ne peut pas être négative" }).optional(),
  notes: z.string().optional(),
})

// Schéma de validation pour la liste d'articles
export const itemsSchema = z.object({
  items: z.array(itemSchema).min(1, { message: "Au moins un article est requis" }),
})

export type ClientInfoValues = z.infer<typeof clientInfoSchema>
export type CompagnyInfoValues = z.infer<typeof compagnyInfoSchema>
export type InvoiceDetailsValues = z.infer<typeof invoiceDetailsSchema>
export type InvoiceValues = z.infer<typeof fullInvoiceSchema>

export type ItemValues = z.infer<typeof itemSchema>
export type ItemsValues = z.infer<typeof itemsSchema>
