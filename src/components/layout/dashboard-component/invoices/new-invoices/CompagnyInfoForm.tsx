"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInvoiceStore } from "@/store/invoices/useInvoiceStore"
import { compagnyInfoSchema, CompagnyInfoValues } from "@/types/invoiceSchema"

export function CompagnyInfoForm() {
  const { compagnyInfo, setcompagnyInfo, setcompagnyInfoValid } = useInvoiceStore()

  const form = useForm<CompagnyInfoValues>({
    resolver: zodResolver(compagnyInfoSchema),
    defaultValues: compagnyInfo || {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
  })

  const { formState } = form

  // Mettre à jour le store quand les valeurs du formulaire changent
  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.isDirty) {
        setcompagnyInfo(form.getValues())
      }
    })

    return () => subscription.unsubscribe()
  }, [form, setcompagnyInfo])

  // Mettre à jour la validité du formulaire dans le store
  useEffect(() => {
    setcompagnyInfoValid(formState.isValid)

    // Si le formulaire est valide et a été modifié, mettre à jour le store
    if (formState.isValid && formState.isDirty) {
      setcompagnyInfo(form.getValues())
    }
  }, [formState.isValid, formState.isDirty, setcompagnyInfoValid, setcompagnyInfo, form])

  return (
    <Form {...form}>
      <form className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Informations Entreprise</h2>

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;entreprise *</FormLabel>
              <FormControl>
                <Input placeholder="Nom de votre entreprise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone *</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="email@entreprise.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
{/* 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site web</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.entreprise.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        {/* <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL du logo</FormLabel>
              <FormControl>
                <Input placeholder="https://exemple.com/logo.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </Form>
  )
}
