'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatFCFA } from "@/lib/format"
import { ClientDetailsProps } from "@/types/ClientTypeForDetails"
import { ArrowLeft, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ClientDetailsComponent({ client }: ClientDetailsProps) {
  const router = useRouter()

  const back = () => {
    router.back()
  }

  return (
    <div className="mx-5 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={back} variant="outline" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Détails Client</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom du Client</p>
              <p>{client.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p>{client.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p>{client.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Notes</p>
              <p>{client.notes}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Factures</CardTitle>
                <CardDescription>Historique des factures</CardDescription>
              </div>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Nouvelle Facture
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {client.invoices.map((invoice) => (
                  <li key={invoice.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatFCFA(invoice.amount)}</p>
                      <p className="text-sm text-muted-foreground capitalize">{invoice.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Devis</CardTitle>
                <CardDescription>Historique des devis</CardDescription>
              </div>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Nouveau Devis
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {client.quotes.map((quote) => (
                  <li key={quote.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{quote.id}</p>
                      <p className="text-sm text-muted-foreground">{quote.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatFCFA(quote.amount)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}