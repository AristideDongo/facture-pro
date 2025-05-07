export type Item = {
    description: string
    quantity: number
    unitPrice: number
    discount?: number // en pourcentage
    taxRate: number // en pourcentage
  }
  
  export function calculateInvoiceAmount(items: Item[]): number {
    if (!items || items.length === 0) return 0
  
    return items.reduce((total, item) => {
      const subtotal = item.quantity * item.unitPrice
      const discount = (subtotal * (item.discount || 0)) / 100
      const afterDiscount = subtotal - discount
      const tax = (afterDiscount * item.taxRate) / 100
      return total + afterDiscount + tax
    }, 0)
  }
  