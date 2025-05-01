import { Plus } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';


export default function CallToAction({ isMobile = false }) {
    return (
      <div className='flex space-x-1'>
      <Button
        className={`
           bg-transparent text-black border-2 border-black font-medium rounded-md flex items-center
          ${isMobile ? 'w-full py-2 justify-center mt-2' : 'px-4 py-2'}
        `}
      >
        Connexion
        {!isMobile}
      </Button>
      <Button
        className={`
          bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center
          ${isMobile ? 'w-full py-2 justify-center mt-2' : 'px-4 py-2'}
        `}
      >
        S&apos;inscrire
        {!isMobile}
      </Button>
      </div>
      
    );
  }