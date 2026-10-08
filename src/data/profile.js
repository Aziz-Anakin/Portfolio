// Identité et liens : une seule source pour l'en-tête, l'accueil, le contact et le pied de page.
export const PROFILE = {
  name: 'Yanis Mdoughy',
  role: 'Développeur web full-stack',
  city: 'Paris',
  email: 'yanis.mdoughy@outlook.fr',
  phone: { label: '06 62 67 91 22', href: 'tel:+33662679122' },
  github: { label: 'Aziz-Anakin', href: 'https://github.com/Aziz-Anakin' },
  linkedin: { label: 'yanis-mdoughy', href: 'https://linkedin.com/in/yanis-mdoughy-558a1028b/' },
  school: { label: 'Epitech Paris', href: 'https://www.epitech.eu/ecole-informatique-paris/' },
  availability: 'Stage de 4 mois, avril à juillet 2027',
  // Technologies mises en avant sur l'accueil (noms définis dans data/tech.js).
  mainStack: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'Python'],
}

// Menu : `id` est l'identifiant de la slide visée.
export const NAV = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'Profil' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Expérience' },
  { id: 'formation', label: 'Formation' },
  { id: 'interests', label: 'Intérêts' },
  { id: 'contact', label: 'Contact' },
]

// Slides absentes du menu, rattachées à une entrée voisine pour l'indicateur actif.
export const NAV_GROUP = {}
