"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderListInvoiceSummary from "./RenderListInvoicesSummary";
import { invoices } from "@/data/invoices";

export default function InvoicesSummary({}) {
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
      <TabsContent value="all">
        {RenderListInvoiceSummary(invoices)}
      </TabsContent>
      <TabsContent value="pending">
        {RenderListInvoiceSummary(
          invoices.filter((inv) => inv.invoiceDetails.status === "pending")
        )}
      </TabsContent>
      <TabsContent value="paid">
      {RenderListInvoiceSummary(
          invoices.filter((inv) => inv.invoiceDetails.status === "paid")
        )}
      </TabsContent>
      <TabsContent value="overdue">
      {RenderListInvoiceSummary(
          invoices.filter((inv) => inv.invoiceDetails.status === "overdue")
        )}
      </TabsContent>
    </Tabs>
  );
}
