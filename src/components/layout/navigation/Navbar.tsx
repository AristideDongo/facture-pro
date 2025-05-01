'use client'
import React, { useState } from 'react'
import { navLinks } from './navlinks';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (
      <div className="w-full">
        {/* Desktop Navbar */}
        <DesktopNavbar navLinks={navLinks} />
        
        {/* Mobile Navbar */}
        <MobileNavbar
          navLinks={navLinks} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />
      </div>
    )
}