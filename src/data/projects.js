
const GH = 'https://github.com/Aziz-Anakin'

// Captures d'un projet : toutes les images du dossier src/assets/projects/<nom>/ (webp de préférence),
// triées par nom. Il suffit de les déposer dans le dossier, sans toucher au code. Sans image, la fiche
// affiche un visuel provisoire.
const SHOTS = import.meta.glob('../assets/projects/*/*.{webp,png,jpg,jpeg}', { eager: true, import: 'default' })
const shotsOf = (name) =>
  Object.entries(SHOTS)
    .filter(([path]) => path.includes(`/projects/${name}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)

// Projets affichés, dans cet ordre : Kaiju, Maison Atlas (site vitrine), MDT, My Codii. Chacun est hébergé sur
// Vercel pour un accès de test : renseigner `links.demo`.
// Le contenu vient des README des dépôts : rien n'est inventé.
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
    role: 'Projet personnel, conçu et développé seul, de la conception au code.',
    points: [
      { label: 'Architecture', text: 'Front React et shadcn/ui, API REST NestJS documentée, PostgreSQL avec Prisma. Socket.IO met à jour tous les écrans dès que quelqu’un agit.' },
      { label: 'Point technique', text: 'Quatre rôles aux droits distincts, et des transferts entre quartiers voisins ou via un quartier de transit, ouverts selon le niveau de crise.' },
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'Socket.IO', 'PostgreSQL', 'Prisma', 'Docker', 'Jest'],
    links: { code: `${GH}/Kaiju` },
    visual: { type: 'shots', images: shotsOf('kaiju') },
  },
  {
    id: 'maison-atlas',
    title: 'Maison Atlas',
    kind: 'Site vitrine et back-office',
    pitch: 'Site de location longue durée d’appartements meublés au Maroc : multi-villes, en quatre langues (français, anglais, espagnol, darija en RTL), prix en MAD par mois. Un site public et un back-office complet pour le propriétaire.',
    points: [
      { label: 'Site public', text: 'Liste d’appartements filtrable (ville, disponibilité), fiches avec galerie, carte et équipements, statuts façon Booking (disponible, bientôt disponible, réservé, loué). Contact WhatsApp, assistant IA de chat, SEO complet (sitemap multilingue, JSON-LD) et pages légales conformes à la loi marocaine.' },
      { label: 'Back-office', text: 'Tableau de bord, appartements, locataires avec documents privés, calendrier, tâches en Kanban, facturation avec export PDF, visiteurs en ligne en direct, assistant IA admin, et calcul de la rentabilité par locataire.' },
      { label: 'Sécurité', text: 'RLS sur toutes les tables, session admin qui expire après 30 min d’inactivité, limitation des tentatives de connexion, en-têtes de sécurité, bucket privé pour les pièces d’identité des locataires.' },
      { label: 'Mode démo et performance', text: 'Sans Supabase, le site tourne avec une fausse base en mémoire, pratique pour tester. Animations riches seulement sur grand écran avec souris, pages statiques régénérées toutes les 5 minutes, mises à jour en direct via Supabase Realtime.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'PostgreSQL', 'Zod', 'OpenAI', 'Railway'],
    links: {}, // dépôt privé : pas de lien Code. Ajouter `demo: 'https://….vercel.app'` une fois hébergé.
    visual: { type: 'shots', images: shotsOf('maison-atlas') },
  },
  {
    id: 'mdt',
    title: 'MDT',
    kind: 'Application web',
    pitch: 'Terminal de police pour du jeu de rôle (Los Santos PD) : citoyens, véhicules, dispatch, enquêtes, rapports, mandats, preuves et administration. Toutes les données sont fictives.',
    role: 'Projet personnel, conçu et développé seul, de la conception au code.',
    points: [
      { label: 'Sécurité côté base', text: 'RLS sur toutes les tables, permissions par rôle (citizens.read, warrants.read…), aucune inscription publique, clé service_role jamais exposée. 15 migrations SQL, journal d’audit, multi-organisations.' },
      { label: 'Temps réel', text: 'Mises à jour en direct du dispatch et de la présence des agents. Une Edge Function (discord-dispatch) relaie les alertes vers un webhook Discord.' },
      { label: 'CI/CD', text: 'Tests (Vitest, PGlite et Postgres/PostgREST réels), lint et build automatiques ; migrations appliquées par GitHub Actions. Déploiement sur Vercel et Supabase.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'PostgreSQL', 'Vitest', 'Docker', 'GitHub Actions', 'Vercel'],
    links: {}, // dépôt privé : pas de lien Code. Ajouter `demo: 'https://….vercel.app'` une fois hébergé.
    visual: { type: 'shots', images: shotsOf('mdt') },
  },
  {
    id: 'mycodii',
    title: 'My Codii',
    kind: 'Application web, PWA',
    pitch: 'Application de gestion pour un professeur CODii (cours de code) : cours, heures, rémunération, factures et taux de change. Installable comme une application.',
    role: 'Dépôt partagé entre deux personnes, chacune avec son propre site, sa base et ses clés.',
    points: [
      { label: 'Architecture partagée', text: 'Le dossier shared/ regroupe la config métier, les services d’accès à la base et la validation Zod, utilisés par le serveur et par l’interface.' },
      { label: 'Sécurité', text: 'Application mono-utilisateur : un seul compte GitHub autorisé (OAuth), session par cookie signé en HMAC, aucune donnée personnelle dans le code.' },
      { label: 'PWA complète', text: 'Installable, utilisable hors ligne, avec une notification push 30 minutes avant chaque cours.' },
      { label: 'Logique métier', text: 'Calcul de la rémunération selon la charte CODii, conversion shekel vers euro, fuseaux horaires (heure de Paris), factures PDF au taux du jour. Un assistant IA (OpenAI) peut créer des cours et des factures.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Zod', 'OpenAI', 'Railway'],
    links: {}, // dépôt privé : pas de lien Code. Ajouter `demo: 'https://….vercel.app'` une fois hébergé.
    visual: { type: 'shots', images: shotsOf('mycodii') },
  },
  // ── Modèle pour ajouter un projet : copier, remplir, décommenter ──
  // Dépôt privé : pas de `links.code` (le lien ne mènerait nulle part), seulement `demo`.
  // {
  //   id: 'mon-projet',
  //   title: 'Nom du projet',
  //   kind: 'Application web',
  //   pitch: 'Ce que fait le projet, en une phrase.',
  //   role: 'Ce que j’ai fait.',   // facultatif
  //   points: [{ label: 'Architecture', text: '…' }],
  //   stack: ['React', 'Node.js'],
  //   links: { demo: 'https://….vercel.app' },        // code : lien GitHub, si le dépôt est public
  //   visual: { type: 'shots', images: shotsOf('mon-projet') },  // images dans src/assets/projects/mon-projet/
  // },
]
