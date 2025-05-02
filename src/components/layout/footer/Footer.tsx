import React from 'react'
import Link from 'next/link'
import { BsFacebook, BsInstagram, BsTwitterX } from 'react-icons/bs'

export default function Footer() {
  return (
    <section className="py-12 bg-transparent border-t border-[#FAF6E9]">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
          <div className="xl:flex xl:items-center xl:justify-start">
            <p className="text-2xl font-bold text-white mx-auto xl:ml-0">FacturePro</p>
            <p className="mt-5 text-sm text-white xl:ml-6 xl:mt-0">© Copyright 2025 FacturePro</p>
          </div>

          <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
              <li><Link href="/" className="text-sm text-white hover:text-orange-500 transition-all duration-200">Accueil</Link></li>
              <li><Link href="/services" className="text-sm text-white hover:text-orange-500 transition-all duration-200">Services</Link></li>
              <li><Link href="/confidentialite" className="text-sm text-white hover:text-orange-500 transition-all duration-200">Confidentialité</Link></li>
              <li><Link href="/conditions" className="text-sm text-white hover:text-orange-500 transition-all duration-200">Conditions</Link></li>
              <li><Link href="/support" className="text-sm text-white hover:text-orange-500 transition-all duration-200">Support</Link></li>
            </ul>

            <ul className="flex items-center justify-center space-x-8 xl:justify-end">
              <li>
                <Link href="#" className="block text-white hover:text-gray-700 transition-all duration-200">
                  <BsTwitterX className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link href="#" className="block text-white hover:text-blue-600 transition-all duration-200">
                  <BsFacebook className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link href="#" className="block text-white hover:text-pink-500 transition-all duration-200">
                  <BsInstagram className="w-6 h-6" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}