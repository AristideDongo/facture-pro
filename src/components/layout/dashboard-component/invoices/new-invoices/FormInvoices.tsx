"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

// Type pour les éléments de facture
type InvoiceItem = {
  description: string
  quantity: number
  price: number
  total: number
}

export default function InvoiceForm() {
  const [items, setItems] = useState<InvoiceItem[]>([{ description: "", quantity: 1, price: 0, total: 0 }])

  // État pour les informations de base de la facture
  const [invoiceInfo, setInvoiceInfo] = useState({
    number: "FACT-0001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  })

  // État pour les informations client
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    address: "",
  })

  // Ajouter un nouvel élément à la facture
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0, total: 0 }])
  }

  // Supprimer un élément de la facture
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items]
      newItems.splice(index, 1)
      setItems(newItems)
    }
  }

  // Mettre à jour un élément de facture
  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items]

    // Convertir en nombre si nécessaire
    const numValue = field === "description" ? value : Number(value)

    // Mettre à jour le champ
    newItems[index] = {
      ...newItems[index],
      [field]: numValue,
    }

    // Recalculer le total si quantité ou prix change
    if (field === "quantity" || field === "price") {
      newItems[index].total = Number(newItems[index].quantity) * Number(newItems[index].price)
    }

    setItems(newItems)
  }

  // Calculer le sous-total
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)

  // Calculer la TVA (20%)
  const taxRate = 20
  const tax = subtotal * (taxRate / 100)

  // Calculer le total
  const total = subtotal + tax

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Afficher les données (dans une application réelle, vous les enverriez à une API)
    console.log({
      invoiceInfo,
      clientInfo,
      items,
      subtotal,
      tax,
      total,
    })

    // Rediriger vers la liste des factures (simulation)
    alert("Facture créée avec succès!")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-10">

        <div className="grid gap-8 md:grid-cols-2">
          {/* Informations de la facture */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Informations de la facture</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="invoice-number">Numéro de facture</Label>
                  <Input
                    id="invoice-number"
                    value={invoiceInfo.number}
                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, number: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invoice-date">Date de facture</Label>
                  <Input
                    id="invoice-date"
                    type="date"
                    value={invoiceInfo.date}
                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due-date">Date d'échéance</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={invoiceInfo.dueDate}
                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, dueDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tax-rate">Taux de TVA (%)</Label>
                  <Select defaultValue="20">
                    <SelectTrigger id="tax-rate">
                      <SelectValue placeholder="Sélectionnez un taux" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5.5">5.5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="20">20%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations du client */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Informations du client</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="client-name">Nom du client</Label>
                  <Input
                    id="client-name"
                    placeholder="Nom du client ou de l'entreprise"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="client@example.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-address">Adresse</Label>
                  <Textarea
                    id="client-address"
                    placeholder="Adresse complète"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles de la facture */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Articles</h2>

            {items.map((item, index) => (
              <div key={index} className="grid gap-4 p-4 border rounded-md mb-4">
                <div className="grid gap-2">
                  <Label htmlFor={`item-description-${index}`}>Description</Label>
                  <Input
                    id={`item-description-${index}`}
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    placeholder="Description de l'article ou du service"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`item-quantity-${index}`}>Quantité</Label>
                    <Input
                      id={`item-quantity-${index}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`item-price-${index}`}>Prix unitaire (€)</Label>
                    <Input
                      id={`item-price-${index}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`item-total-${index}`}>Total (€)</Label>
                    <Input id={`item-total-${index}`} type="number" value={item.total.toFixed(2)} disabled />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Supprimer l'article</span>
                </Button>
              </div>
            ))}

            <Button variant="outline" className="w-full mb-6" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un article
            </Button>

            {/* Totaux */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>TVA ({taxRate}%):</span>
                <span>{tax.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary">{total.toFixed(2)} €</span>
              </div>
            </div>

            {/* Notes */}
            <div className="grid gap-2 mt-6">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Conditions de paiement, notes supplémentaires..." />
            </div>
          </CardContent>
        </Card>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-4 mt-8">
          <Link href="/dashboard/invoices">
            <Button variant="outline">Annuler</Button>
          </Link>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Enregistrer la facture
          </Button>
        </div>
      </main>
    </div>
  )
}
