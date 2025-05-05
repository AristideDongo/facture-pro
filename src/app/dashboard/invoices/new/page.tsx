"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvoiceForm } from "@/components/layout/dashboard-component/invoices/new-invoices/FormInvoices"


export default function NewInvoicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 mx-3 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/invoices">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Retour</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Nouvelle facture</h1>
          </div>
        </div>
        
        <InvoiceForm />
      </main>
    </div>
  )
}