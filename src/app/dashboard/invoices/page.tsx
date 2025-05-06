import InvoicesSummary from "@/components/layout/dashboard-component/invoices/InvoicesSummary";
import React from "react";
import { Button } from '@/components/ui/button';
import { CircleDollarSign, FilePlus, FileText } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/ui/CardResume";
import { formatFCFA } from "@/lib/format-money";
import { calculateInvoiceAmount } from "@/lib/calculeInvoiceAmount";
import { invoices } from "@/data/invoices";

export default function page() {

  const totalAmount = invoices.reduce((total, items) => {
    return total + calculateInvoiceAmount(items.items);
  }, 0);

  return (
    <div className="p-2 mt-7">
      <div className="flex mx-5 justify-between">
      <h1 className="text-3xl font-semibold mb-3">Facture</h1>
      <Link href='/dashboard/invoices/new'>
      <Button className="flex bg-orange-400 text-black hover:bg-orange-500 cursor-pointer">
        <FilePlus className=""/>
        Nouvelle facture
      </Button>
      </Link>
      </div>
      <div className="flex justify-center items-center gap-2">
      <StatCard
          title="Factures totales"
          value="1 200"
          color="border-t-blue-500"
          icon={<FileText />}
        />
        <StatCard
          title="Montant total facture"
          value={formatFCFA(totalAmount)}
          color="border-t-green-500"
          icon={<CircleDollarSign />}
        />
      </div>
        <InvoicesSummary/>
    </div>
  );
}
