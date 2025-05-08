"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useInvoiceStore } from "@/hooks/invoices/useInvoiceForm"
import { invoiceDetailsSchema, InvoiceDetailsValues } from "@/types/invoiceSchema"

export function InvoiceDetailsForm() {
  const { invoiceDetails ,setInvoiceDetails, setInvoiceDetailsValid } = useInvoiceStore()

  const form = useForm<InvoiceDetailsValues>({
    resolver: zodResolver(invoiceDetailsSchema),
    defaultValues: invoiceDetails || {
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
        issueDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        status: "payé",
        currency: "XOF",
        paymentTerms: "30 jours",
        paymentMethod: "Virement bancaire",
        notes: "",
        terms: "Paiement à réception de la facture. Tout retard de paiement entraînera des pénalités.",
  }
})

  const { formState } = form

  // Mettre à jour le store quand les valeurs du formulaire changent
  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.isDirty) {
        setInvoiceDetails(form.getValues())
      }
    })

    return () => subscription.unsubscribe()
  }, [form, setInvoiceDetails])

  // Mettre à jour la validité du formulaire dans le store
  useEffect(() => {
    setInvoiceDetailsValid(formState.isValid)

    // Si le formulaire est valide et a été modifié, mettre à jour le store
    if (formState.isValid && formState.isDirty) {
      setInvoiceDetails(form.getValues())
    }
  }, [formState.isValid, formState.isDirty, setInvoiceDetailsValid, setInvoiceDetails, form])

  return (
    <Form {...form}>
      <form className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Détails de la Facture</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name='invoiceNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de facture *</FormLabel>
                <FormControl>
                  <Input placeholder="INV-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='currency'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Devise *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une devise" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value="XOF">XOF (XOF)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satut *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="pending">En Attente</SelectItem>
                  <SelectItem value="overdue">En Retard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name='issueDate'
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date d&apos;émission *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dueDate'
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date d&apos;échéance *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name='paymentTerms'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conditions de paiement</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 30 jours" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='paymentMethod'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Méthode de paiement</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une méthode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Virement bancaire">Virement bancaire</SelectItem>
                    <SelectItem value="Carte bancaire">Carte bancaire</SelectItem>
                    <SelectItem value="Chèque">Chèque</SelectItem>
                    <SelectItem value="Espèces">Espèces</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Notes supplémentaires pour le client" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='terms'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conditions générales</FormLabel>
              <FormControl>
                <Textarea placeholder="Conditions générales de vente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
