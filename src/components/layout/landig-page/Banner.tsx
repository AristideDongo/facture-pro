'use client'
import { Button } from '@/components/ui/button'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import React, { useEffect } from 'react'

const FactureBanner = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  const containerControls = useAnimation()
  const titleControls = useAnimation()
  const textControls = useAnimation()
  const buttonControls = useAnimation()

  useEffect(() => {
    if (inView) {
      containerControls.start({ opacity: 1, scale: 1, transition: { duration: 0.5 } })
      setTimeout(() => {
        titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } })
        setTimeout(() => {
          textControls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } })
          setTimeout(() => {
            buttonControls.start({
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.6, type: 'spring', stiffness: 400, damping: 10 },
            })
          }, 200)
        }, 200)
      }, 100)
    } else {
      containerControls.start({ opacity: 0, scale: 0.95 })
      titleControls.start({ opacity: 0, y: 30 })
      textControls.start({ opacity: 0, y: 30 })
      buttonControls.start({ opacity: 0, y: 30, scale: 0.9 })
    }
  }, [inView, containerControls, titleControls, textControls, buttonControls])

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-r from-orange-700 to-orange-500 text-white rounded-xl shadow-xl px-4 py-10 sm:px-6 sm:py-12 md:px-12 lg:py-16 my-8 sm:my-10 md:my-16 max-w-6xl mx-auto text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={containerControls}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={titleControls}
      >
        Simplifiez votre gestion avec notre générateur de factures et devis
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg md:text-xl mb-8 opacity-90 px-2 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={textControls}
      >
        Gagnez du temps et augmentez votre{' '}
        <motion.span
          className="text-yellow-200 font-bold"
          initial={{ color: '#fed7aa' }}
          whileInView={{
            color: ['#fed7aa', '#fef9c3', '#fed7aa'],
            transition: { repeat: Infinity, duration: 2 },
          }}
        >
          professionnalisme
        </motion.span>
        . Créez des documents commerciaux impeccables en quelques clics !
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={buttonControls}>
        <Link href="/auth/login">
          <Button className="bg-orange-300 text-orange-900 text-sm sm:text-base md:text-lg font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full uppercase transition-all duration-300 hover:bg-orange-200 transform hover:-translate-y-1 hover:shadow-lg">
            Commencer maintenant
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default FactureBanner
