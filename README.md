# **FACTURE-PRO**

<img src="/public/FactureProCapture.png" alt="Description de l'image" width="1100" />

#  Générateur de Factures et Devis avec Tableau de Bord

Application web construite avec **Next.js** et **pnpm** permettant de créer, gérer et exporter des **devis** et **factures**, tout en offrant un petit **tableau de bord** pour le suivi.

---

##  Fonctionnalités principales

### 📄 Devis & Factures
- Création de devis et de factures
- Export PDF des documents
- Calcul automatique des totaux (HT, TVA, TTC)
- Numérotation automatique
- Gestion des échéances et des statuts (payée, en attente, en retard)

###  Gestion des clients
- Ajout, édition et recherche de clients

---

##  Tableau de bord

- Vue d’ensemble des devis/factures créés
- Montants facturés et reçus
- Liste des dernières activités (devis/factures récents)
- Filtres : client, période, statut

---

##  Stack technique

- **Framework** : [Next.js](https://nextjs.org/)
- **Langage** : TypeScript
- **Package Manager** : [pnpm](https://pnpm.io/)
- **Form** : `react-hook-form` + `zod`
- **PDF** : `react-pdf/renderer`
- **i18n** : `i18n-iso-countries` pour la sélection des pays
- **State Management**: `zustand`

---

##  Installation

```bash
# Cloner le repo
git clone https://github.com/AristideDongo/facture-pro.git
cd facture-pro

# Installer les dépendances
pnpm install

# Lancer le projet en développement
pnpm run dev
