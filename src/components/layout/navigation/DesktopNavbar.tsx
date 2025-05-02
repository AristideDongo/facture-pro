import CallToAction from '@/components/common/CallToAction';
import React from 'react'
import { navLink } from './navlinks';
import Link from 'next/link';

type DesktopProps = {
    navLinks: navLink[]
}


export default function DesktopNavbar({ navLinks } : DesktopProps) {
    return (
      <header className="hidden md:flex w-full fixed z-50 bg-orange-50 shadow-sm h-16 items-center px-6">
        <div className="flex items-center">
          <span className="ml-2 font-bold text-xl text-gray-800">FacturePro</span>
        </div>
        
        <nav className="flex flex-1 justify-center">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-black hover:text-orange-600 hover:bg-orange-50 hover:border-b hover:border-orange-500 py-3 px-2 transition duration-300 rounded-lg font-medium"
                >
                  {link.name}
                </Link>
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