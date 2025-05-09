"use client";
import { features } from "@/data/featured";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";

export default function Feature() {
  // Configuration de l'intersection observer
  const [ref, inView] = useInView({
    triggerOnce: false, // Permet de déclencher l'animation à chaque fois
    threshold: 0.1, // Déclenche quand 10% du composant est visible
  });

  // Controls pour animer les éléments
  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const descriptionControls = useAnimation();
  const featuresListControls = useAnimation();
  const imageControls = useAnimation();

  // Déclenche les animations quand le composant est visible
  useEffect(() => {
    if (inView) {
      // Animation séquentielle
      titleControls.start({ opacity: 1, y: 0 });

      setTimeout(() => {
        subtitleControls.start({ opacity: 1, y: 0 });

        setTimeout(() => {
          descriptionControls.start({ opacity: 1, y: 0 });

          setTimeout(() => {
            featuresListControls.start({ opacity: 1, x: 0 });

            setTimeout(() => {
              imageControls.start({ opacity: 1, x: 0 });
            }, 300);
          }, 300);
        }, 200);
      }, 200);
    } else {
      // Réinitialise les animations quand le composant est hors de vue
      titleControls.start({ opacity: 0, y: 20 });
      subtitleControls.start({ opacity: 0, y: 20 });
      descriptionControls.start({ opacity: 0, y: 20 });
      featuresListControls.start({ opacity: 0, x: -20 });
      imageControls.start({ opacity: 0, x: 50 });
    }
  }, [
    inView,
    titleControls,
    subtitleControls,
    descriptionControls,
    featuresListControls,
    imageControls,
  ]);

  return (
    <div id="featured" ref={ref} className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <motion.h2
                className="text-base/7 font-semibold text-orange-600"
                initial={{ opacity: 0, y: 20 }}
                animate={titleControls}
                transition={{ duration: 0.7 }}
              >
                Gagnez du temps
              </motion.h2>

              <motion.p
                className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#FAF6E9] sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={subtitleControls}
                transition={{ duration: 0.7 }}
              >
                Une gestion de factures simplifiée
              </motion.p>

              <motion.p
                className="mt-6 text-lg/8 text-[#FAF6E9]"
                initial={{ opacity: 0, y: 20 }}
                animate={descriptionControls}
                transition={{ duration: 0.7 }}
              >
                Créez et envoyez vos factures en toute simplicité. Gagnez en
                efficacité et concentrez-vous sur ce qui compte vraiment : votre
                activité.
              </motion.p>

              <motion.dl
                className="mt-10 max-w-xl space-y-8 text-base/7 text-[#FAF6E9] lg:max-w-none"
                initial={{ opacity: 0, x: -20 }}
                animate={featuresListControls}
                transition={{ duration: 0.7, staggerChildren: 0.2 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className="relative pl-9"
                    initial={{ opacity: 0, x: -20 }}
                    animate={featuresListControls}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <dt className="inline font-semibold text-orange-600">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-orange-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={imageControls}
            transition={{ duration: 0.8 }}
          >
            <Image
              alt="Product screenshot"
              src='/assets/home/homeassets.jpg'
              width={2432}
              height={2642}
              className="w-[60rem] max-w-[100rem] h-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
