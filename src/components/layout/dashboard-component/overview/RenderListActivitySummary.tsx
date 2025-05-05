import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { activitySummary } from '@/data/activity-summaryData'
import { getStatus } from '@/lib/getSatus';
import React from 'react'


export default function RenderListActivitySummary(fliteredActivitySummary : typeof activitySummary ) {
    if (fliteredActivitySummary.length === 0) {
        return (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Aucune facture ou devis disponible</p>
          </div>
        );
      }
  return (
    <div className="space-y-4">
    {fliteredActivitySummary.map((activity, i) => (
      <Card key={i} className="rounded-lg border p-6 invoice-card">
        <div className="flex items-center justify-between">
          <CardHeader className="grid gap-1">
            <CardTitle className="font-semibold">{activity.id}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{activity.client}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium">{activity.amount.toFixed(2)} Fcfa</div>
              <div className="text-sm text-muted-foreground">Échéance: <span>{activity.dueDate}</span></div>
            </div>
            <div className='bg-none'>{activity.status !== 'quote' && getStatus(activity.status)}</div>
          </CardContent>
        </div>
      </Card>
    ))}
  </div>
  )
}