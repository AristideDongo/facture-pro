import ClientSearch from "@/components/layout/dashboard-component/customers/CustomerSearch";
import ClientTable from "@/components/layout/dashboard-component/customers/CustomerTable";

export default function ClientsPage() {
  return (
    <div className="mx-5 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
      </div>

      <ClientSearch />
      <ClientTable />
    </div>
  );
}
