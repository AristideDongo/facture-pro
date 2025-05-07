import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';


export default function CallToAction({ isMobile = false }) {
    return (
      <div className='flex space-x-1'>
        <Link href='/auth/login'>
      <Button
        className={`
           bg-transparent text-black border-2 cursor-pointer hover:bg-orange-100 border-black font-medium rounded-md flex items-center transition-colors duration-300
          ${isMobile ? 'w-full py-2 justify-center mt-2' : 'px-4 py-2'}
        `}
      >
        Connexion
        {!isMobile}
      </Button>
        </Link>

        <Link href='/auth/signup'>
      <Button
        className={`
          bg-orange-600 hover:bg-orange-500 cursor-pointer text-white font-medium rounded-md flex items-center transition-colors duration-300
          ${isMobile ? 'w-full py-2 justify-center mt-2' : 'px-4 py-2'}
        `}
      >
        S&apos;inscrire
        {!isMobile}
      </Button>
        </Link>
      </div>

    );
  }