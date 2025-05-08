export function getStatus(status: string) {
    const baseStyle = "rounded-md px-2 py-1 text-xs font-medium text-white";
  
    switch (status) {
      case "pending":
        return <div className={`${baseStyle} bg-amber-500`}>En attente</div>;
      case "paid":
        return <div className={`${baseStyle} bg-green-600`}>Payée</div>;
      case "overdue":
        return <div className={`${baseStyle} bg-red-600`}>En retard</div>;
      default:
        return null
    }
  }
