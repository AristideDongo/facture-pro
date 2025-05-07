'use client'
import { DevisGenerator } from "@/components/layout/dashboard-component/quotes/QuoteGenerator";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter()
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex">
      <Button onClick={() => router.back()} className="bg-transparent shadow-none hover:scale-105 hover:bg-transparent cursor-pointer text-black">
          <ChevronLeftCircle className="w-10 h-10"/>
        </Button>
      <h1 className="text-3xl font-bold mb-8">Dévis</h1>
      </div>
      <DevisGenerator />
    </main>
  )
}
