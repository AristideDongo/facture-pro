import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { invoices } from '@/data/invoices';
import { getStatus } from '@/lib/getSatus';
import { Eye, FileEdit, MoreVertical, Trash2 } from 'lucide-react';
import React from 'react';

export default function RenderListInvoiceSummary(fliteredActivitySummary: typeof invoices) {
  if (fliteredActivitySummary.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Aucune facture disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {fliteredActivitySummary.map((activity, i) => (
        <Card key={i} className="rounded-lg border p-6 invoice-card">
          <div className="flex justify-between items-start">
            
            <CardHeader className="p-0">
              <CardTitle className="font-semibold">{activity.id}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{activity.client}</CardDescription>
            </CardHeader>

            <div className="flex items-center gap-4">
              <CardContent className="p-0 text-right">
                <div className="font-medium">{activity.amount.toFixed(2)} Fcfa</div>
                <div className="text-sm text-muted-foreground">
                  Échéance: <span>{activity.dueDate}</span>
                </div>
                <div className='text-center'>{activity.status !== 'quote' && getStatus(activity.status)}</div>
              </CardContent>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 w-5 h-5" /> Voir
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileEdit className="mr-2 w-5 h-5" /> Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 w-5 h-5" /> Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
