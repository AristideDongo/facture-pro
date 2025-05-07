import Link from 'next/link';
import React from 'react';

export default function Faq() {
  return (
    <div id='faq' className="py-10 sm:py-16 lg:py-24">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Questions fréquentes</h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Retrouvez ici les réponses aux questions courantes sur notre générateur de factures.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">Comment créer une facture ?</p>
              <p className="mt-4 text-base text-gray-100">
                Il vous suffit de remplir les champs du formulaire (client, produits, prix) et de cliquer sur Générer la facture.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">Puis-je envoyer une facture directement à mon client ?</p>
              <p className="mt-4 text-base text-gray-100">
                Oui, une fois la facture générée, vous pouvez la télécharger au format PDF.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">Est-ce que mes données sont sécurisées ?</p>
              <p className="mt-4 text-base text-gray-100">
                Oui, nous utilisons le chiffrement pour protéger toutes vos données et assurer la confidentialité de vos factures.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">Le service est-il gratuit ?</p>
              <p className="mt-4 text-base text-gray-100">
                Une version gratuite est disponible avec les fonctionnalités de base. Des options premium permettent d’accéder à plus de personnalisation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-12 md:mt-20">
          <div className="px-8 py-4 text-center bg-gray-800 rounded-full">
            <p className="text-gray-50">
              Vous n’avez pas trouvé la réponse à votre question ?{' '}
              <Link href="#" className="text-orange-400 transition-all duration-200 hover:text-orange-500 focus:text-orange-400 hover:underline">
                Contactez notre support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
