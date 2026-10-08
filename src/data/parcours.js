import epitech from '../assets/schools/epitech.svg'
import saintJean from '../assets/schools/saint-jean.png'
import starInvest from '../assets/schools/star-invest.png'
import interfaceFormation from '../assets/schools/interface-formation.png'

// Parcours : expériences et formations sur une seule frise, la plus récente en haut.
// Source : le CV (src/assets/documents). `stack` renvoie aux noms de data/tech.js.
//
//   kind     'Formation' ou 'Expérience'
//   current  étape en cours (point plein sur la frise)
//   logo     logo de l'école (formations) ; sans logo, le nom de l'école sert de logotype
//   logoWide     logo en largeur (affiché bas et large) plutôt que carré
//   logoOnLight  logo foncé : affiché sur une pastille blanche
//   points   précisions courtes, optionnelles
export const PARCOURS = [
  {
    kind: 'Formation',
    years: '2025 – 2028',
    current: true,
    title: 'Bachelor Informatique',
    place: 'Epitech Paris',
    logo: epitech,
    href: 'https://www.epitech.eu/ecole-informatique-paris/',
    points: ['Titre RNCP niveau 6, pédagogie par projets', 'Spécialité de 2ᵉ année : applications web, cloud et blockchain'],
  },
  {
    kind: 'Expérience',
    years: '2026',
    title: 'Développeur web',
    place: 'Star Invest',
    logo: starInvest,
    logoWide: true,
    href: 'https://www.starinvest.fr/',
    meta: 'Stage · 1 mois',
    points: [
      'Modernisation d’outils internes et évolution de projets web existants, dont l’intranet',
      'Migration de requêtes Microsoft Access vers SQL Server (T-SQL)',
      'Travail en équipe Agile : suivi hebdomadaire, priorisation, préparation des tests',
    ],
    stack: ['Vue.js', 'Nuxt', 'NestJS', 'SQL Server'],
  },
  {
    kind: 'Expérience',
    years: '2023 – 2024',
    title: 'Maintenance informatique',
    place: 'Association Interface Formation',
    logo: interfaceFormation,
    href: 'https://www.interface-formation.net/',
    meta: 'Stage · 2 mois',
    points: [
      'Maintenance du siège social et des différents sites',
      'Gestion du parc : postes utilisateurs, pilotes, périphériques',
      'Assistance aux utilisateurs et guides d’utilisation sur Canva',
      'Maintenance du site WordPress de l’association',
    ],
    stack: ['Windows', 'Linux', 'WordPress', 'Canva'],
  },
  {
    kind: 'Formation',
    years: '2023 – 2024',
    title: 'Mention complémentaire Services numériques aux organisations',
    place: 'Saint-Jean de Montmartre, Paris',
    logo: saintJean,
    logoOnLight: true,
    points: ['Niveau 4, mention assez bien'],
  },
  {
    kind: 'Formation',
    years: '2022 – 2023',
    title: 'Bac pro Métiers du commerce et de la vente',
    place: 'Saint-Jean de Montmartre, Paris',
    logo: saintJean,
    logoOnLight: true,
    points: ['Mention assez bien'],
  },
]
