import InvoicesSummary from "@/components/layout/dashboard-component/invoices/InvoicesSummary";
import React from "react";
import { Button } from '@/components/ui/button';
import { FilePlus } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="p-2 mt-7">
      <div className="flex justify-between">
      <h1 className="text-xl font-semibold mb-3">Facture</h1>
      <Link href='/dashboard/invoices/new'>
      <Button className="flex bg-orange-400 text-black hover:bg-orange-500 cursor-pointer">
        <FilePlus className=""/>
        Nouvelle facture
      </Button>
      </Link>
      </div>
      <main>
        <InvoicesSummary/>
      </main>
    </div>
  );
}
