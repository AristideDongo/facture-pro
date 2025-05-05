import { z } from "zod"

// Schéma de validation pour un élément de facture
export const invoiceItemSchema = z.object({
  description: z.string().min(1, "La description est requise"),
  quantity: z.number().min(1, "La quantité minimum est 1"),
  price: z.number().min(0, "Le prix ne peut pas être négatif"),
})

// Schéma de validation
export const invoiceFormSchema = z.object({
  // Informations de la facture
  invoiceNumber: z.string().min(1, "Le numéro de facture est requis").regex(/^[A-Z0-9-]+$/, "Le numéro de facture doit être alphanumérique avec des tirets"),
  invoiceDate: z.string().refine(date => !isNaN(Date.parse(date)), "La date de facture doit être une date valide"),
  dueDate: z.string().refine(date => Date.parse(date) > Date.now(), "La date d'échéance ne peut pas être dans le passé"),
  taxRate: z.number().min(0, "Le taux de taxe ne peut pas être négatif").max(100, "Le taux de taxe ne peut pas dépasser 100%"),
  
  // Informations de l'entreprise
  compagnyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  compagnyEmail: z.string().email("Format d'email invalide"),
  compagnyAddress: z.string().min(1, "L'adresse de l'entreprise est requise"),
  compagnyPhone: z.string({message: 'Le numéro de téléphone de la compagny est requis'}).min(10, "Le numéro de téléphone de la compagny doit être minumum de 10 chiffres").max(10, 'Le numéro de téléphone de la compagny doit être de maximum 10 chiffres'),
  
  // Informations du client
  clientName: z.string().min(1, "Le nom du client est requis"),
  clientEmail: z.string().email("Format d'email invalide"),
  clientAddress: z.string().min(1, "L'adresse du client est requise"),
  clientPhone: z.string({message: 'Le numéro de téléphone du client est requis'}).min(10, "Le numéro de téléphone du client doit être minumum de 10 chiffres").max(10, 'Le numéro de téléphone du client doit être de maximum 10 chiffres'),
  
  // Articles
  items: z.array(invoiceItemSchema).min(1, "Au moins un article est requis"),
  
  // Notes
  notes: z.string().optional(),
  
  // Calculs
  subtotal: z.number().min(0, "Le sous-total ne peut pas être négatif"),
  tax: z.number().min(0, "Le montant de la taxe ne peut pas être négatif"),
  total: z.number().min(0, "Le total ne peut pas être négatif"),
})

export type InvoiceItem = z.infer<typeof invoiceItemSchema>
export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

export type InvoiceData = InvoiceFormValues & {
  subtotal: number
  tax: number
  total: number
}
