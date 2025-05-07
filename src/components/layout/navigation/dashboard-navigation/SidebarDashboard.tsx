'use client'
import { useState, useEffect } from 'react';
import { Menu, Home, Settings, User, FileText, HelpCircle, ChevronRight, ChevronLeft, FilePlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  className?: string;
}

export default function SidebarDashboard({ className = '' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    // Vérification initiale
    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    
    // Nettoyage de l'écouteur d'événement
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { icon: <Home size={20} />, title: 'Tableau de bord', path: '/dashboard/overview' },
    { icon: <FileText size={20} />, title: 'Facture', path: '/dashboard/invoices' },
    { icon: <FilePlus size={20} />, title: 'Devis', path: '/dashboard/quotes' },
    { icon: <User size={20} />, title: 'Client', path: '/dashboard/customers' },
    { icon: <Settings size={20} />, title: 'Paramètres', path: '/dashboard/settings' },
    { icon: <HelpCircle size={20} />, title: 'Aide', path: '/' },
  ];

  return (
    <>
      {/* Overlay pour mobile*/}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed md:relative z-50 overflow-hidden
          h-full bg-gradient-to-b from-orange-600 to-red-500 text-white
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-0 md:w-16'} 
          ${isMobile && !isOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          ${className}
        `}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {isOpen && (
            <h2 className="text-xl font-bold overflow-hidden whitespace-nowrap">
              FacturePro
            </h2>
          )}
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md bg-transparent hover:bg-black text-black hover:text-white"
            aria-label={isOpen ? "Fermer la sidebar" : "Ouvrir la sidebar"}
          >
            {isOpen ? 
              <ChevronLeft size={30} /> : 
              <ChevronRight size={30} className="mx-auto" />
            }
          </Button>
        </div>

        <nav className="mt-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`
                    flex items-center px-4 py-3 hover:bg-black/45
                    ${isOpen ? 'justify-start' : 'justify-center md:justify-center'}
                  `}
                >
                  <span className="inline-flex">{item.icon}</span>
                  {isOpen && (
                    <span className="ml-4 overflow-hidden whitespace-nowrap">
                      {item.title}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Bouton hamburger pour mobile */}
      {isMobile && !isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} />
        </Button>
      )}
    </>
  );
}