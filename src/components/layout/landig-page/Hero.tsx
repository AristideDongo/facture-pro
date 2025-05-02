'use client'
import Link from 'next/link'
import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function Hero() {
  // Configuration de l'intersection observer
  const [ref, inView] = useInView({
    triggerOnce: false, // Important: permet de déclencher l'animation à chaque fois
    threshold: 0.2 // Déclenche quand 20% du composant est visible
  })

  // Controls pour animer les éléments
  const titleControls = useAnimation()
  const highlightControls = useAnimation()
  const subtitleControls = useAnimation()
  const buttonControls = useAnimation()

  // Déclenche les animations quand le composant est visible
  useEffect(() => {
    if (inView) {
      titleControls.start({ opacity: 1, y: 0 })
      
      // Animations séquentielles avec délais
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
      // Réinitialise les animations quand le composant est hors de vue
      titleControls.start({ opacity: 0, y: 20 })
      highlightControls.start({ opacity: 0, scale: 0.9 })
      subtitleControls.start({ opacity: 0, y: 20 })
      buttonControls.start({ opacity: 0, y: 20 })
    }
  }, [inView, titleControls, highlightControls, subtitleControls, buttonControls])

  return (
    <div 
      ref={ref} 
      className="flex flex-1 mt-16 w-full flex-col items-center justify-center text-center px-4 py-20"
    >
      <motion.h1 
        className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-[#FAF6E9] sm:text-7xl"
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
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
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
        className="mx-auto mt-12 max-w-xl text-lg sm:text-white-400 text-[#FAF6E9] leading-7"
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
      >
        <Link 
          className="bg-orange-600 dark:bg-gray-800 rounded-xl text-white dark:text-gray-300 font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-orange-500 dark:hover:bg-gray-600 transition inline-block"
          href="/auth/login"
        >
          Commencer gratuitement
        </Link>
      </motion.div>
    </div>
  )
}