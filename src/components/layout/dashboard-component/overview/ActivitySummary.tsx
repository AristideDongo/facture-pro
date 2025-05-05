"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderListActivitySummary from "./RenderListActivitySummary";
import { activitySummary } from "@/data/activity-summaryData";

export default function ActivitySummary({}) {
  return (
    <Tabs defaultValue="all" className="mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <TabsList className="bg-orange-200">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="paid">Payées</TabsTrigger>
          <TabsTrigger value="overdue">En retard</TabsTrigger>
          <TabsTrigger value="quote">Devis</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        {RenderListActivitySummary(activitySummary)}
      </TabsContent>
      <TabsContent value="pending">
        {RenderListActivitySummary(
          activitySummary.filter((activity) => activity.status === "pending")
        )}
      </TabsContent>
      <TabsContent value="paid">
        {RenderListActivitySummary(
          activitySummary.filter((activity) => activity.status === "paid")
        )}
      </TabsContent>
      <TabsContent value="overdue">
        {RenderListActivitySummary(
          activitySummary.filter((activity) => activity.status === "overdue")
        )}
      </TabsContent>
      <TabsContent value="quote">
        {RenderListActivitySummary(
          activitySummary.filter((item) => item.status === "quote")
        )}
      </TabsContent>
    </Tabs>
  );
}
