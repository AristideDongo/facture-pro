"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ClientSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher un client..."
          className="pl-8 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-full sm:w-[180px] bg-white">
          <SelectValue placeholder="Filtrer par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les clients</SelectItem>
          <SelectItem value="active">Clients actifs</SelectItem>
          <SelectItem value="inactive">Clients inactifs</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
