"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { InvoiceData, invoiceFormSchema } from "@/types/invoiceSchema"
import { generatePDF } from "@/lib/generatePDF"


type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

export function useInvoiceForm() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: "FACT-0001",
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      taxRate: 20,
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      items: [
        {
          description: "",
          quantity: 1,
          price: 0,
        },
      ],
      notes: "",
    },
  })
  
  const handleAddItem = () => {
    form.setValue("items", [
      ...form.getValues("items"),
      { description: "", quantity: 1, price: 0 },
    ])
  }
  
  const handleRemoveItem = (index: number) => {
    const currentItems = form.getValues("items")
    if (currentItems.length > 1) {
      const newItems = [...currentItems]
      newItems.splice(index, 1)
      form.setValue("items", newItems)
    }
  }
  
  const calculateSubtotal = (items: { quantity: number; price: number }[]) => {
    return items.reduce((sum, item) => {
      const quantity = item.quantity || 0
      const price = item.price || 0
      return sum + quantity * price
    }, 0)
  }
  
  const calculateTax = (subtotal: number, taxRate: number) => {
    return subtotal * (taxRate / 100)
  }
  
  const calculateTotal = (subtotal: number, tax: number) => {
    return subtotal + tax
  }
  
  const onSubmit = (data: InvoiceFormValues) => {
    const subtotal = calculateSubtotal(data.items)
    const tax = calculateTax(subtotal, data.taxRate)
    const total = calculateTotal(subtotal, tax)
    
    const completeInvoiceData: InvoiceData = {
      ...data,
      subtotal,
      tax,
      total,
    }
    
    // Stocker les données de la facture et ouvrir l'aperçu
    setInvoiceData(completeInvoiceData)
    setIsPreviewOpen(true)
    
    console.log("Invoice data:", completeInvoiceData)
  }
  
  const handleClosePreview = () => {
    setIsPreviewOpen(false)
  }
  
  // Gérer le téléchargement du PDF
  const handleDownloadPDF = () => {
    generatePDF("invoice-preview", `facture-${invoiceData?.invoiceNumber || "nouvelle"}.pdf`)
  }
  
  // Obtenir le taux de TVA actuel du formulaire
  const taxRate = form.watch("taxRate")
  
  return {
    form,
    taxRate,
    handleSubmit: form.handleSubmit(onSubmit),
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    handleAddItem,
    handleRemoveItem,
    isPreviewOpen,
    invoiceData,
    handleClosePreview,
    handleDownloadPDF,
  }
}