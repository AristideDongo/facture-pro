import ClientSearch from "@/components/layout/dashboard-component/customers/CustomerSearch";
import ClientTable from "@/components/layout/dashboard-component/customers/CustomerTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="mx-5 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Button className="bg-orange-400 hover:bg-orange-600 text-black">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Client
        </Button>
      </div>

      <ClientSearch />
      <ClientTable />
    </div>
  );
}
