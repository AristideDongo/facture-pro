import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, MoreVertical, Trash2 } from 'lucide-react';

type Props = {}

export default function ButtonMoreActionSummary({}) {
  return (
    <div>
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
  )
}