'use client'
import { InvoiceGenerator } from "@/components/layout/dashboard-component/invoices/InvoiceGenerator";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvoicePage() {
  const router = useRouter()
  return (
    <div className="container mx-2 py-10">
      <div className="flex">
        <Button onClick={() => router.back()} className="bg-transparent shadow-none text-black">
          <ChevronLeftCircle className="w-10 h-10"/>
        </Button>
      <h1 className="text-xl font-bold mb-8">Générateur de Factures</h1>
      </div>
      <InvoiceGenerator />
    </div>
  )
}
