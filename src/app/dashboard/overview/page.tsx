import ActivitySummary from "@/components/layout/dashboard-component/overview/ActivitySummary";
import StatCard from "@/components/ui/CardResume";
import { invoices } from "@/data/invoices";
import { calculateInvoiceAmount } from "@/lib/calculeAmount";
import { formatFCFA } from "@/lib/format";
import { CircleDollarSign, CreditCard, FilePlus, FileText } from "lucide-react";
import React from "react";

export default function page() {
    const totalAmount = invoices.reduce((total, items) => {
      return total + calculateInvoiceAmount(items.items);
    }, 0);
  return (
    <div className="p-2 mt-7">
      <h1 className="text-3xl font-semibold mb-3">Tableau de bord</h1>
      <div className="flex gap-3">
        <StatCard
          title="Factures totales"
          value="1 200"
          color="border-t-blue-500"
          icon={<FileText />}
        />
        <StatCard
          title="Devis totaux"
          value="1 500"
          color="border-t-yellow-500"
          icon={<FilePlus />}
        />
        <StatCard
          title="Montant total facture"
          value={formatFCFA(totalAmount)}
          color="border-t-green-500"
          icon={<CircleDollarSign />}
        />
        <StatCard
          title="Montant total devis"
          value={formatFCFA(700000)}
          color="border-t-orange-500"
          icon={<CreditCard />}
        />
      </div>
      <ActivitySummary />
    </div>
  );
}
