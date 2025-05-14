export type ClientInfo = {
  id: string
  name?: string
  contact?: string
  email?: string
  phone?: string
  status: "active" | "inactive"
  invoiceCount: number
  quoteCount: number
}