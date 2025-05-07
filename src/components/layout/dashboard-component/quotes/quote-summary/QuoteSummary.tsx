"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderListQuoteSummary from "./RenderListQuoteSummary";
import { quote } from '@/data/quotes';

export default function QuoteSummary({}) {
  return (
    <Tabs defaultValue="all" className="mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <TabsList className="bg-orange-200">
          <TabsTrigger value="all">Tous</TabsTrigger>
          {/* <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="paid">Payées</TabsTrigger>
          <TabsTrigger value="overdue">En retard</TabsTrigger>
          <TabsTrigger value="quote">Devis</TabsTrigger> */}
        </TabsList>
      </div>
      <TabsContent value="all">
        <RenderListQuoteSummary filteredQuoteSummary={quote}/>
      </TabsContent>
      {/* <TabsContent value="pending">
        {RenderListQuoteSummary(
          quote.filter((quo) => quo.status === "pending")
        )}
      </TabsContent>
      <TabsContent value="paid">
        {RenderListQuoteSummary(
          quote.filter((quo) => quo.status === "paid")
        )}
      </TabsContent>
      <TabsContent value="overdue">
        {RenderListQuoteSummary(
          quote.filter((quo) => quo.status === "overdue")
        )}
      </TabsContent>
      <TabsContent value="quote">
        {RenderListQuoteSummary(
          quote.filter((item) => item.status === "quote")
        )}
      </TabsContent> */}
    </Tabs>
  );
}
