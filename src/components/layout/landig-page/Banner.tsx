'use client'
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import React, { useEffect } from 'react';

const FactureBanner = () => {
  // Configuration de l'intersection observer
  const [ref, inView] = useInView({
    triggerOnce: false, // Permet de déclencher l'animation à chaque fois
    threshold: 0.2 // Déclenche quand 20% du composant est visible
  });

  // Controls pour animer les éléments
  const containerControls = useAnimation();
  const titleControls = useAnimation();
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  // Déclenche les animations quand le composant est visible
  useEffect(() => {
    if (inView) {
      // Animation du conteneur
      containerControls.start({ 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 } 
      });
      
      // Animation séquentielle des éléments internes
      setTimeout(() => {
        titleControls.start({ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6 } 
        });
        
        setTimeout(() => {
          textControls.start({ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 } 
          });
          
          setTimeout(() => {
            buttonControls.start({ 
              opacity: 1, 
              y: 0,
              scale: 1,
              transition: { 
                duration: 0.6,
                type: "spring",
                stiffness: 400,
                damping: 10
              } 
            });
          }, 200);
        }, 200);
      }, 100);
    } else {
      // Réinitialise les animations quand le composant est hors de vue
      containerControls.start({ opacity: 0, scale: 0.95 });
      titleControls.start({ opacity: 0, y: 30 });
      textControls.start({ opacity: 0, y: 30 });
      buttonControls.start({ opacity: 0, y: 30, scale: 0.9 });
    }
  }, [inView, containerControls, titleControls, textControls, buttonControls]);

  return (
    <motion.div 
      ref={ref}
      className="bg-gradient-to-r from-orange-700 to-orange-500 text-white rounded-lg shadow-xl p-8 my-12 max-w-5xl mx-auto text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={containerControls}
    >
      <motion.h2 
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={titleControls}
      >
        Simplifiez votre gestion avec notre générateur de factures et devis
      </motion.h2>
      
      <motion.p 
        className="text-lg mb-8 opacity-90"
        initial={{ opacity: 0, y: 30 }}
        animate={textControls}
      >
        Gagnez du temps et augmentez votre <motion.span 
          className="text-yellow-200 font-bold"
          initial={{ color: "#fed7aa" }}
          whileInView={{ 
            color: ["#fed7aa", "#fef9c3", "#fed7aa"],
            transition: { 
              repeat: Infinity, 
              duration: 2 
            }
          }}
        >
          professionnalisme
        </motion.span>.
        Créez des documents commerciaux impeccables en quelques clics !
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={buttonControls}
      >
        <Link href="/auth/login">
          <Button
            className="bg-orange-300 text-orange-900 text-lg font-bold py-4 px-8 rounded-full
                     uppercase transition-all duration-300 hover:bg-orange-200
                     transform hover:-translate-y-1 hover:shadow-lg"
          >
            Commencer maintenant
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FactureBanner;