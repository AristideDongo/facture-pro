'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Hero() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 })

  const titleControls = useAnimation()
  const highlightControls = useAnimation()
  const subtitleControls = useAnimation()
  const buttonControls = useAnimation()

  useEffect(() => {
    if (inView) {
      titleControls.start({ opacity: 1, y: 0 })
      setTimeout(() => {
        highlightControls.start({ opacity: 1 })
        setTimeout(() => {
          highlightControls.start({ scale: 1 })
          subtitleControls.start({ opacity: 1, y: 0 })
          setTimeout(() => {
            buttonControls.start({ opacity: 1, y: 0 })
          }, 200)
        }, 200)
      }, 400)
    } else {
      titleControls.start({ opacity: 0, y: 20 })
      highlightControls.start({ opacity: 0, scale: 0.9 })
      subtitleControls.start({ opacity: 0, y: 20 })
      buttonControls.start({ opacity: 0, y: 20 })
    }
  }, [inView, ref, titleControls, highlightControls, subtitleControls, buttonControls])

  return (
    <div 
      ref={ref} 
      className="flex flex-col items-center justify-center text-center px-4 py-20 sm:px-6 lg:px-8 mt-10 sm:mt-16 w-full"
    >
      <motion.h1 
        className="max-w-4xl font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#FAF6E9]"
        initial={{ opacity: 0, y: 20 }}
        animate={titleControls}
        transition={{ duration: 0.8 }}
      >
        Créez vos factures et devis <br />
        <motion.span 
          className="relative whitespace-nowrap text-orange-500 dark:text-orange-300"
          initial={{ opacity: 0 }}
          animate={highlightControls}
          transition={{ duration: 0.8 }}
        >
          <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-500 dark:fill-orange-300/60" preserveAspectRatio="none">
            <path d="...Z"></path>
          </svg>
          <motion.span 
            className="relative"
            initial={{ scale: 0.9 }}
            animate={highlightControls}
            transition={{ duration: 0.5 }}
          >
            en quelques secondes
          </motion.span>
        </motion.span>
      </motion.h1>
      
      <motion.h2 
        className="mt-6 sm:mt-10 max-w-2xl text-base sm:text-lg md:text-xl text-[#FAF6E9]"
        initial={{ opacity: 0, y: 20 }}
        animate={subtitleControls}
        transition={{ duration: 0.8 }}
      >
        Créez et envoyez facilement des devis et des factures professionnels. Gérez vos documents commerciaux rapidement, sans prise de tête.
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={buttonControls}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 sm:mt-10"
      >
        <Link 
          className="w-full sm:w-auto bg-orange-600 dark:bg-gray-800 rounded-xl text-white dark:text-gray-300 font-medium px-6 py-3 hover:bg-orange-500 dark:hover:bg-gray-600 transition"
          href="/auth/login"
        >
          Commencer gratuitement
        </Link>
      </motion.div>
    </div>
  )
}
