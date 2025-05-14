import React from "react";
import { Button } from '@/components/ui/button';
import { CreditCard, FilePlus } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/ui/CardResume";
import { formatFCFA } from "@/lib/format";
import QuoteSummary from "@/components/layout/dashboard-component/quotes/quote-summary/QuoteSummary";
import { quote } from "@/data/quotes";
import { calculateAmount } from "@/lib/calculeAmount";

export default function page() {

  const totalAmount = quote.reduce((total, items) => {
    const { services, taxRate } = items.quoteDetailsSchema
    const servicesWithTaxRate = services.map(service => ({
      ...service,
      taxRate
    }))
      return total + calculateAmount(servicesWithTaxRate);
    }, 0);

  return (
    <div className="p-2 mt-7">
      <div className="flex mx-5 justify-between">
      <h1 className="text-3xl font-bold mb-3">Gestions des Dévis</h1>
      <Link href='/dashboard/quotes/new'>
      <Button className="flex bg-orange-400 text-black hover:bg-orange-500 cursor-pointer">
        <FilePlus className=""/>
        Nouveau Devis
      </Button>
      </Link>
      </div>
      <div className="flex justify-center items-center gap-2">
      <StatCard
          title="Devis totaux"
          value="1 500"
          color="border-t-yellow-500"
          icon={<FilePlus />}
        />
        <StatCard
          title="Montant total devis"
          value={formatFCFA(totalAmount)}
          color="border-t-orange-500"
          icon={<CreditCard />}
        />
      </div>
      <QuoteSummary/>
    </div>
  );
}
