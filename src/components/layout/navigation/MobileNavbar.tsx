import CallToAction from '@/components/common/CallToAction';
import { Menu, X } from 'lucide-react';
import React from 'react'
import { navLink } from './navlinks';

type MobileNavbarProps = {
    navLinks: navLink[];
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };


export default function MobileNavbar({ navLinks, isMenuOpen, setIsMenuOpen }: MobileNavbarProps) {
    return (
      <div className="md:hidden">
        <header className="flex justify-between items-center bg-white shadow-sm h-16 px-4">
          <div className="flex items-center">
            <span className="ml-2 font-bold text-lg text-gray-800">FacturePro</span>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>
        
        {isMenuOpen && (
          <div className="bg-white shadow-md py-4 px-6 absolute w-full z-10">
            <nav>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.path}
                      className="block text-gray-600 hover:text-blue-600 font-medium py-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <CallToAction isMobile={true}/>
                </div>
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }