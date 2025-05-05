'use client'
import NavbarDashboard from '@/components/layout/navigation/dashboard-navigation/NavbarDashboard';
import SidebarDashboard from '@/components/layout/navigation/dashboard-navigation/SidebarDashboard';
import { Toaster } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {


  return (
    <div className="flex h-screen bg-orange-100">
      <SidebarDashboard />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavbarDashboard />
        <main className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {children}
          </div>
          <Toaster />
        </main>
      </div>
    </div>
  );
}