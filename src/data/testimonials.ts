interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
  }

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Directrice Marketing",
    content: "Ce service a complètement transformé notre approche marketing. Les résultats sont impressionnants et immédiats.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "Thomas Legrand",
    role: "Entrepreneur",
    content: "Grâce à cette solution, j'ai pu augmenter mes ventes de 35% en seulement deux mois. Je recommande vivement !",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "Sophie Martin",
    role: "Responsable RH",
    content: "L'implémentation a été simple et l'équipe support est toujours disponible. Un vrai plaisir de travailler avec eux.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 4,
    name: "Jean Dubois",
    role: "Directeur Technique",
    content: "La qualité technique est irréprochable. Nous avons enfin trouvé une solution fiable et performante.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 5,
    name: "Lucie Moreau",
    role: "E-commerce Manager",
    content: "Notre taux de conversion a doublé depuis que nous utilisons ce service. C'est un investissement rentable.",
    avatar: "/api/placeholder/40/40"
  }
];