import taskly1 from '../assets/projects/taskly/taskly.webp'
import taskly2 from '../assets/projects/taskly/taskly2.webp'
import ecomap1 from '../assets/projects/ecomap/ecomap.webp'
import ecomap3 from '../assets/projects/ecomap/ecomap3.webp'
import showeather1 from '../assets/projects/showeather/showeather.webp'
import showeather2 from '../assets/projects/showeather/showeather2.webp'
import pyliza1 from '../assets/projects/pyliza/pyliza.webp'
import pyliza2 from '../assets/projects/pyliza/pyliza2.webp'
import pyliza3 from '../assets/projects/pyliza/pyliza3.webp'
import pyliza4 from '../assets/projects/pyliza/pyliza4.webp'
import pyliza5 from '../assets/projects/pyliza/pyliza5.webp'
import pyliza6 from '../assets/projects/pyliza/pyliza6.webp'
import kaiju1 from '../assets/projects/kaiju/kaiju.webp'
import tardis1 from '../assets/projects/tardis/tardis.webp'
import tardis2 from '../assets/projects/tardis/tardis2.webp'
import tardis3 from '../assets/projects/tardis/tardis3.webp'
import nextbuy1 from '../assets/projects/nextbuy/nextbuy.webp'
import nextbuy2 from '../assets/projects/nextbuy/nextbuy2.webp'
import nextbuy3 from '../assets/projects/nextbuy/nextbuy3.webp'
import nextbuy4 from '../assets/projects/nextbuy/nextbuy4.webp'
import juice1 from '../assets/projects/hackjuice/juice-shop.webp'
import juice2 from '../assets/projects/hackjuice/juice-shop2.webp'
import juice3 from '../assets/projects/hackjuice/juice-shop3.webp'

const GH = 'https://github.com/Aziz-Anakin'

// Études de cas. Le contenu vient des README des dépôts : rien n'est inventé.
//
// Un projet :
//   color    couleur de la tuile du mur (texte blanc dessus)
//   kind     catégorie courte (étiquette)
//   period   date, si connue
//   pitch    ce que fait le projet, en une phrase
//   role     ce que j'ai fait dans le projet (optionnel : affiché seulement s'il est renseigné)
//   points   2 faits techniques, chacun avec son étiquette
//   stack    noms de technologies (voir data/tech.js)
//   links    code obligatoire, demo optionnel
//   visual   { type: 'shots', images }                 captures d'écran, la première en tête
//            { type: 'list', title, items }                à défaut de capture
//
// Pour ajouter un projet : copier un bloc, le remplir, déposer les captures en .webp
// dans src/assets/projects/<nom>/.
export const PROJECTS = [
  {
    id: 'kaiju',
    color: '#b91c1c',
    title: 'Kaiju',
    kind: 'Application temps réel',
    pitch: 'Gestion de crise en temps réel pour une ville fictive : chaque quartier réserve, partage et transfère ses ressources critiques.',
    points: [
      { label: 'Architecture', text: 'Front React et shadcn/ui, API REST NestJS documentée, PostgreSQL avec Prisma. Socket.IO met à jour tous les écrans dès que quelqu’un agit.' },
      { label: 'Point technique', text: 'Quatre rôles aux droits distincts, et des transferts entre quartiers voisins ou via un quartier de transit, ouverts selon le niveau de crise.' },
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'Socket.IO', 'PostgreSQL', 'Prisma', 'Docker', 'Jest'],
    links: { code: `${GH}/Kaiju` },
    visual: { type: 'shots', images: [kaiju1] },
  },
  {
    id: 'taskly',
    color: '#1d4ed8',
    title: 'Taskly',
    kind: 'Application full-stack',
    period: 'Novembre 2025',
    pitch: 'Gestion de tâches avec comptes utilisateurs : inscription, connexion, puis création, édition, statut et suppression de ses tâches.',
    points: [
      { label: 'Architecture', text: 'API Express 5 et Mongoose protégée par JWT et bcrypt. Front React 19 avec édition directe dans la liste, sans fenêtre modale.' },
      { label: 'Point technique', text: 'Se lance sans base à installer : MongoDB en mémoire en développement, Atlas en production. Middleware d’authentification testé avec Jest.' },
    ],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Jest', 'Docker'],
    links: { code: `${GH}/Taskly` },
    visual: { type: 'shots', images: [taskly1, taskly2] },
  },
  {
    id: 'ecomap',
    color: '#15803d',
    title: 'EcoMap',
    kind: 'Extension Chrome',
    pitch: 'Extension pour Google Maps : elle détecte la commune affichée sur la carte et lui attribue un éco-score à partir de données environnementales publiques.',
    points: [
      { label: 'Architecture', text: 'TypeScript en trois couches (api, core, ui), partagées par le script injecté dans Google Maps et par la popup de l’extension.' },
      { label: 'Point technique', text: 'Croise geo.api.gouv.fr pour retrouver la commune et Open-Meteo pour la qualité de l’air, puis calcule le score dans le navigateur.' },
    ],
    stack: ['TypeScript', 'Chrome Extension', 'esbuild'],
    links: { code: `${GH}/Ecomap` },
    visual: { type: 'shots', images: [ecomap3, ecomap1] },
  },
  {
    id: 'showeather',
    color: '#0369a1',
    title: 'Showeather',
    kind: 'Application web',
    pitch: 'La météo d’une ville en temps réel et ses prévisions sur cinq jours, sans backend ni clé d’API.',
    points: [
      { label: 'Architecture', text: 'Vue 3 découpé en composants (recherche, météo actuelle, prévisions). Tout s’exécute dans le navigateur.' },
      { label: 'Point technique', text: 'Deux appels Open-Meteo enchaînés, géocodage puis météo. Déployé sur GitHub Pages par GitHub Actions, après lint et build.' },
    ],
    stack: ['Vue.js', 'Vite', 'Tailwind CSS', 'GitHub Actions'],
    links: { code: `${GH}/Showeather`, demo: 'https://aziz-anakin.github.io/Showeather/' },
    visual: { type: 'shots', images: [showeather1, showeather2] },
  },
  {
    id: 'pyliza',
    color: '#7e22ce',
    title: 'PyLiza',
    kind: 'Bot Discord',
    pitch: 'Un bot Discord pour apprendre Python : leçons, quiz chronométrés et un assistant IA qui tourne en local.',
    points: [
      { label: 'Architecture', text: 'Discord.js v14 et commandes slash (/ask, /lesson, /quiz). Leçons et quiz sont des fichiers JSON chargés automatiquement.' },
      { label: 'Point technique', text: 'L’IA est un modèle Phi-3 Mini servi par Ollama, sans service externe. Une seule commande Docker Compose lance le bot et le modèle.' },
    ],
    stack: ['Node.js', 'Discord.js', 'Ollama', 'Docker'],
    links: { code: `${GH}/Pyliza` },
    visual: { type: 'shots', images: [pyliza3, pyliza4, pyliza2, pyliza5, pyliza1, pyliza6] },
  },
  {
    id: 'tardis',
    color: '#c2410c',
    title: 'Tardis',
    kind: 'Data science',
    pitch: 'Analyse des retards SNCF et prédiction du retard d’un trajet entre deux gares.',
    points: [
      { label: 'Architecture', text: 'Un pipeline en trois étapes, où chacune produit le fichier dont la suivante a besoin.' },
      { label: 'Point technique', text: 'Le modèle est exporté avec la liste de ses colonnes : le dashboard reconstruit ainsi une entrée alignée sur l’entraînement.' },
    ],
    stack: ['Python', 'Jupyter', 'Streamlit', 'Docker'],
    links: { code: `${GH}/Tardis` },
    visual: { type: 'shots', images: [tardis1, tardis2, tardis3] },
  },
  {
    id: 'nextbuy',
    color: '#be185d',
    title: 'NextBuy',
    kind: 'Machine learning',
    pitch: 'Prédit la probabilité qu’un client rachète un produit à sa prochaine commande, à partir de son historique d’achats.',
    points: [
      { label: 'Architecture', text: 'Modèle XGBoost entraîné sur le jeu de données Instacart, servi dans un dashboard Streamlit à plusieurs pages.' },
      { label: 'Point technique', text: 'Chaque prédiction est expliquée en clair, et une analyse SHAP dans le notebook montre le poids de chaque variable.' },
    ],
    stack: ['Python', 'XGBoost', 'Streamlit', 'Pandas', 'SHAP', 'Docker'],
    links: { code: `${GH}/NextBuy` },
    visual: { type: 'shots', images: [nextbuy1, nextbuy2, nextbuy3, nextbuy4] },
  },
  {
    id: 'hack-and-juice',
    color: '#b45309',
    title: 'Hack & Juice',
    kind: 'Sécurité web',
    period: 'Décembre 2025',
    pitch: 'Les failles web les plus courantes, étudiées par la pratique sur l’application volontairement vulnérable OWASP Juice Shop.',
    points: [
      { label: 'Méthode', text: 'Une fiche par catégorie : comment la faille apparaît, quel risque elle fait courir, comment la corriger.' },
      { label: 'Cadre', text: 'Tests menés uniquement sur un environnement d’entraînement, avec Burp Suite.' },
    ],
    stack: ['Burp Suite', 'Bash', 'Markdown'],
    links: { code: `${GH}/Hack-and-Juice` },
    visual: { type: 'shots', images: [juice1, juice2, juice3] },
  },
]
