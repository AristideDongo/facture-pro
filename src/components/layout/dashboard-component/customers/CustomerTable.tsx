import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { invoices } from "@/data/invoices"
import { quote } from "@/data/quotes"
import Link from "next/link"
import { ClientInfo } from "@/types/customerTableType"

const clients = (() => {
    const clientMap: Record<string, ClientInfo> = {}

    for (const inv of invoices) {
    const info = inv.clientInfo
    if (!info) continue

    const id = info.phone ?? info.email
    if (!id) continue

    if (!clientMap[id]) {
      clientMap[id] = {
        id: id,
        name: info.name,
        contact: info.name?.split(" ")[0],
        email: info.email,
        phone: info.phone,
        status: "active",
        invoiceCount: 0,
        quoteCount: 0,
      }
    }

    clientMap[id].invoiceCount += 1
  }

    quote.forEach((q) => {
    const { clientEmail, clientName, clientPhone } = q.clientQuoteInfo
    const id = clientPhone ?? clientName

    if (!clientMap[id]) {
      clientMap[id] = {
        id: id,
        name: clientName,
        contact: clientName.split(" ")[0],
        email: clientEmail,
        phone: clientPhone,
        status: "active",
        invoiceCount: 0,
        quoteCount: 0,
      }
    }

    clientMap[id].quoteCount += 1
  })

  return Object.values(clientMap)
})()

export default function ClientTable() {
  return (
    <div className="border bg-white rounded-t-md py-3 px-2">
      <Table>
        <TableHeader className="">
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Factures</TableHead>
            <TableHead>Devis</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.contact}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Badge className={client.status === "active" ? "bg-green-600" : "bg-red-600"}>
                  {client.status === "active" ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
              <TableCell>{client.invoiceCount}</TableCell>
              <TableCell>{client.quoteCount}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                        <Link href={`/dashboard/customers/${client.id}`}>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </DropdownMenuItem>
                        </Link>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Créer facture
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Créer devis
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
