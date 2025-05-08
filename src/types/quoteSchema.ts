import { z } from "zod";

export const compagnyQuoteSchema = z.object({
  // Informations de l'entreprise
  compagnyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  compagnyAddress: z.string().min(1, "L'adresse de l'entreprise est requise"),
  compagnyEmail: z.string().email("Email invalide"),
  compagnyPhone: z.string().min(1, "Le téléphone est requis"),
});

export const clientQuoteSchema = z.object({
  // Informations du client
  clientName: z.string().min(1, "Le nom du client est requis"),
  clientAddress: z.string().min(1, "L'adresse du client est requise"),
  clientEmail: z.string().email("Email invalide").optional().or(z.literal("")),
  clientPhone: z.string().optional().or(z.literal("")),
});

export const quoteDetailsSchema = z.object({
  // Informations du devis
  quoteNumber: z.string().min(1, "Le numéro de devis est requis"),
  quoteDate: z.string().min(1, "La date d'émission est requise"),
  expirationDate: z.string().min(1, "La date de validité est requise"),
  taxRate: z.coerce
    .number()
    .min(0, { message: "Le taux de TVA ne peut pas être négatif" }),

  // Prestations
  services: z
    .array(
      z.object({
        description: z.string().min(1, "La description est requise"),
        quantity: z.coerce
          .number()
          .positive({ message: "La quantité doit être positive" }),
        unitPrice: z.coerce
          .number()
          .positive({ message: "Le prix unitaire doit être positif" }),
      })
    )
    .min(1, "Au moins une prestation est requise"),

  // Conditions de paiement
  paymentTerms: z.string().min(1, "Les conditions de paiement sont requises"),
});

export const fullQuoteSchema = z.object({
  quoteDetailsSchema: quoteDetailsSchema,
  compagnyQuoteInfo: compagnyQuoteSchema,
  clientQuoteInfo: clientQuoteSchema,
  amount: z.number().min(0, { message: "Le montant ne peut pas être négatif" }),
});

export type DevisInfo = z.infer<typeof fullQuoteSchema>;
