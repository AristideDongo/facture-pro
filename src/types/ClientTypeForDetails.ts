interface ClientType {
  id: string
  name: string
  email: string
  phone: string
  address: string
  notes: string
  invoices: {
    id: string
    date: string
    amount: number
    status: string
  }[]
  quotes: {
    id: string
    date: string
    amount: number
  }[]
}

export interface ClientDetailsProps {
  client: ClientType
}