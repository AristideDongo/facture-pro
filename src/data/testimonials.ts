interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
  }

  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Claire Dupuis",
      role: "Indépendante",
      content:
        "Ce générateur de factures m’a simplifié la vie. Je peux créer et envoyer mes factures en quelques secondes, sans me prendre la tête.",
    },
    {
      id: 2,
      name: "Marc Lambert",
      role: "Gérant de PME",
      content:
        "Enfin une solution simple et efficace pour gérer mes factures. Tout est automatisé et je gagne un temps précieux chaque mois.",
    },
    {
      id: 3,
      name: "Nadia Kone",
      role: "Consultante freelance",
      content:
        "L’outil est clair, rapide et intuitif. En plus, mes clients reçoivent leurs factures directement par email. Je recommande sans hésiter.",
    },
    {
      id: 4,
      name: "Ali Traoré",
      role: "Comptable",
      content:
        "C’est une solution fiable qui respecte les normes comptables. Idéale pour les indépendants comme pour les petites entreprises.",
    },
    {
      id: 5,
      name: "Julie Morel",
      role: "Co-fondatrice d'une startup",
      content:
        "Depuis qu’on utilise ce générateur, notre facturation est fluide et sans erreurs. On peut se concentrer sur notre croissance.",
    },
  ];  