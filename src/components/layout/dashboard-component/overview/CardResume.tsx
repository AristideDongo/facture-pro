import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
    title: string
    value: string | number
    color: string
    icon: React.ReactNode
  }
  
  const StatCard = ({ title, value, color, icon }: StatCardProps) => (
    <Card className={`w-[310px] border-t-4 ${color}`}>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className='text-2xl font-bold'>{value}</CardContent>
    </Card>
  )

  export default StatCard