import CallToAction from '@/components/common/CallToAction';
import React from 'react'
import { navLink } from './navlinks';
import clsx from 'clsx';
import { Fade as Hamburger } from 'hamburger-react'
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

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
          
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 bg-transparent hover:bg-transparent shadow-none focus:outline-none"
          >
            <Hamburger />
          </Button>
        </header>

        <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          key="mobile-nav"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }} 
          className=
            'bg-white shadow-md py-4 px-6 max-w-xs h-screen fixed top-14 left-0 w-3/4 z-50'
          >
            <nav>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.path}
                      className="block text-black hover:text-orange-600 hover:bg-orange-50 hover:border-b hover:border-orange-500 px-2 transition duration-300 rounded-lg font-medium py-2"
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
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    );
  }