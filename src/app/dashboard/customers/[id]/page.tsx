import { invoices } from "@/data/invoices"
import { quote } from "@/data/quotes"
import ClientDetailsComponent from "./ClientDetailsPage"

interface Props {
  params: Promise<{ id: string }> | { id: string }
}

export default async function Page({ params }: Props) {
  // Attendre les paramètres avant de les utiliser
  const resolvedParams = await params
  const clientId = resolvedParams.id

  if (!clientId) {
    throw new Error("Client ID is required")
  }

  // Trouver les infos du client depuis invoices ou quote
  const clientInvoices = invoices.filter((inv) => {
    const id = inv.clientInfo?.phone
    return id === clientId
  })

  const clientQuotes = quote.filter((q) => {
    const id = q.clientQuoteInfo?.clientPhone
    return id === clientId
  })

  // Si aucune donnée client n'est trouvée, gérer l'erreur
  if (clientInvoices.length === 0 && clientQuotes.length === 0) {
    throw new Error(`No client found with ID: ${clientId}`)
  }

  const client = {
    id: clientId,
    name: clientInvoices[0]?.clientInfo?.name || clientQuotes[0]?.clientQuoteInfo?.clientName,
    email: clientInvoices[0]?.clientInfo?.email || clientQuotes[0]?.clientQuoteInfo?.clientEmail,
    phone: clientInvoices[0]?.clientInfo?.phone || clientQuotes[0]?.clientQuoteInfo?.clientPhone,
    address: clientInvoices[0]?.clientInfo?.address || clientQuotes[0]?.clientQuoteInfo?.clientAddress,
    notes: "",
    invoices: clientInvoices.map((inv) => ({
      id: inv.invoiceDetails.invoiceNumber,
      date: inv.invoiceDetails.dueDate,
      amount: inv.amount,
      status: inv.invoiceDetails.status,
    })),
    quotes: clientQuotes.map((q, i) => ({
      id: q.quoteDetailsSchema.quoteNumber || `DEV-${i + 1}`,
      date: q.quoteDetailsSchema.quoteDate,
      amount: q.amount,
    })),
  }

  return <ClientDetailsComponent client={client} />
}
