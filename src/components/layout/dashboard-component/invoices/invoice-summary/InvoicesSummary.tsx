"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invoices } from "@/data/invoices";
import RenderListInvoiceSummary from "./RenderListInvoicesSummary";

export default function InvoicesSummary() {
  return (
    <Tabs defaultValue="all" className="mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <TabsList className="bg-orange-200">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="paid">Payées</TabsTrigger>
          <TabsTrigger value="overdue">En retard</TabsTrigger>
        </TabsList>
      </div>

      {/* All invoices */}
      <TabsContent value="all">
        <RenderListInvoiceSummary filteredInvoiceSummary={invoices} />
      </TabsContent>

      {/* Pending invoices */}
      <TabsContent value="pending">
        <RenderListInvoiceSummary
          filteredInvoiceSummary={invoices.filter((inv) => inv.invoiceDetails.status === "pending")}
        />
      </TabsContent>

      {/* Paid invoices */}
      <TabsContent value="paid">
        <RenderListInvoiceSummary
          filteredInvoiceSummary={invoices.filter((inv) => inv.invoiceDetails.status === "paid")}
        />
      </TabsContent>

      {/* Overdue invoices */}
      <TabsContent value="overdue">
        <RenderListInvoiceSummary
          filteredInvoiceSummary={invoices.filter((inv) => inv.invoiceDetails.status === "overdue")}
        />
      </TabsContent>
    </Tabs>
  );
}
