'use client'
import { InvoiceGenerator } from "@/components/layout/dashboard-component/invoices/InvoiceGenerator";

export default function InvoicePage() {
  return (
    <div className="container mx-5 py-10">
      <h1 className="text-xl font-bold mb-8">Générateur de Factures</h1>
      <InvoiceGenerator />
    </div>
  )
}
