"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useInvoiceStore } from "@/hooks/invoices/useInvoiceForm"
import { formatFCFA } from "@/lib/format"
import { itemsSchema, ItemsValues, ItemValues } from "@/types/invoiceSchema"

export function ItemsForm() {
  const { items, setItems, setItemsValid } = useInvoiceStore()

  const form = useForm<ItemsValues>({
    resolver: zodResolver(itemsSchema),
    defaultValues: {
      items:
        items && items.length > 0
          ? items
          : [{ description: "", quantity: 1, unitPrice: 0, taxRate: 20, discount: 0, notes: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const { formState } = form

  // Mettre à jour le store quand les valeurs du formulaire changent
  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.isDirty) {
        setItems(form.getValues().items)
      }
    })

    return () => subscription.unsubscribe()
  }, [form, setItems])

  // Mettre à jour la validité du formulaire dans le store
  useEffect(() => {
    setItemsValid(formState.isValid)

    // Si le formulaire est valide et a été modifié, mettre à jour le store
    if (formState.isDirty) {
      setItems(form.getValues().items)
    }
  }, [formState.isValid, formState.isDirty, setItemsValid, setItems, form])

  // Calculer le total
  const calculateItemTotal = (item: ItemValues) => {
    const subtotal = item.quantity * item.unitPrice
    const discountAmount = (subtotal * (item.discount || 0)) / 100
    const afterDiscount = subtotal - discountAmount
    const taxAmount = (afterDiscount * item.taxRate) / 100
    return afterDiscount + taxAmount
  }

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                description: "",
                quantity: 1,
                unitPrice: 0,
                taxRate: 20,
                discount: 0,
                notes: "",
              })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un article
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Article {index + 1}</h3>
                  {fields.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description de l'article ou service" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantité *</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" step="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix unitaire (XOF) *</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.taxRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taux de TVA (%) *</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.discount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remise (%)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="100" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col justify-end">
                    <span className="text-sm font-medium mb-2">Total</span>
                    <div className="h-10 px-3 py-2 border rounded-md flex items-center font-medium">
                      {form.watch(`items.${index}`)
                        ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(
                            calculateItemTotal(form.watch(`items.${index}`)),
                          )
                        : "0,00 XOF"}
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name={`items.${index}.notes`}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Notes supplémentaires" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {form.formState.errors.items?.message && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.items?.message}</p>
        )}

        {fields.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Récapitulatif</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead className="text-right">Prix unitaire</TableHead>
                  <TableHead className="text-right">TVA</TableHead>
                  <TableHead className="text-right">Remise</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {form.watch("items").map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.description || "-"}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatFCFA(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right">{item.taxRate}%</TableCell>
                    <TableCell className="text-right">{item.discount || 0}%</TableCell>
                    <TableCell className="text-right">
                      {formatFCFA(
                        calculateItemTotal(item),
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatFCFA(
                      form.watch("items").reduce((sum, item) => sum + calculateItemTotal(item), 0),
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </form>
    </Form>
  )
}
