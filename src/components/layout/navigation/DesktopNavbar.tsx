import CallToAction from '@/components/common/CallToAction';
import React from 'react'
import { navLink } from './navlinks';

type DesktopProps = {
    navLinks: navLink[]
}


export default function DesktopNavbar({ navLinks } : DesktopProps) {
    return (
      <header className="hidden md:flex w-full bg-white shadow-sm h-16 items-center px-6">
        <div className="flex items-center">
          <span className="ml-2 font-bold text-xl text-gray-800">FacturePro</span>
        </div>
        
        {/* Navigation au milieu */}
        <nav className="flex flex-1 justify-center">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.path}
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div>
          <CallToAction/>
        </div>
      </header>
    );
  }