import { invoices } from "@/data/invoices"
import { quote } from "@/data/quotes"
import ClientDetailsComponent from "./ClientDetailsPage"

interface Props {
  params: { id: string }
}

export default async function Page({ params }: Props) {
    const clientId = params.id

  // Trouver les infos du client depuis invoices ou quote
  const clientInvoices = invoices.filter(inv => {
    const id = inv.clientInfo?.email ?? inv.clientInfo?.phone
    return id === clientId
  })

  const clientQuotes = quote.filter(q => {
    const id = q.clientQuoteInfo?.clientEmail ?? q.clientQuoteInfo?.clientPhone
    return id === clientId
  })

  const client = {
    id: clientId,
    name: clientInvoices[0]?.clientInfo?.name || clientQuotes[0]?.clientQuoteInfo?.clientName,
    contact: clientInvoices[0]?.clientInfo?.name?.split(" ")[0],
    email: clientInvoices[0]?.clientInfo?.email || clientQuotes[0]?.clientQuoteInfo?.clientEmail,
    phone: clientInvoices[0]?.clientInfo?.phone || clientQuotes[0]?.clientQuoteInfo?.clientPhone,
    address: clientInvoices[0]?.clientInfo?.address || clientQuotes[0]?.clientQuoteInfo?.clientAddress,
    notes: "",
    invoices: clientInvoices.map((inv, i) => ({
      id: `FACT-${i + 1}`,
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