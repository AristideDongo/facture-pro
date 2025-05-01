export type navLink = {
    path: string
    name: string
}

export const navLinks: navLink[] = [
    {path: '/', name:'Accueil'},
    {path: '/featured', name: 'Fonctionnalités'},
    // {path: '/pricing', name: 'tarifs'},
    {path: '/testimonials', name: 'Témoignages'},
    {path: '/faq', name: 'FAQ'}
]