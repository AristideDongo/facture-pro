"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInvoiceStore } from "@/hooks/invoices/useInvoiceForm"
import { clientInfoSchema, ClientInfoValues } from "@/types/invoiceSchema"

export function ClientInfoForm() {
  const { clientInfo, setClientInfo, setClientInfoValid } = useInvoiceStore()

  const form = useForm<ClientInfoValues>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: clientInfo || {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  })

  const { formState } = form

  // Mettre à jour le store quand les valeurs du formulaire changent
  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.isDirty) {
        setClientInfo(form.getValues())
      }
    })

    return () => subscription.unsubscribe()
  }, [form, setClientInfo])

  // Mettre à jour la validité du formulaire dans le store
  useEffect(() => {
    setClientInfoValid(formState.isValid)

    // Si le formulaire est valide et a été modifié, mettre à jour le store
    if (formState.isValid && formState.isDirty) {
      setClientInfo(form.getValues())
    }
  }, [formState.isValid, formState.isDirty, setClientInfoValid, setClientInfo, form])

  return (
    <Form {...form}>
      <form className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Informations Client</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom / Société *</FormLabel>
              <FormControl>
                <Input placeholder="Nom du client" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="email@exemple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse *</FormLabel>
              <FormControl>
                <Textarea placeholder="Adresse complète" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
