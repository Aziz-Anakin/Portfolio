# Portfolio Yanis Mdoughy

Portfolio personnel présenté comme une suite de slides plein écran. Contenu en français.
Déployé sur GitHub Pages : https://aziz-anakin.github.io/Portfolio/ (`base: '/Portfolio/'`).

## Stack

- React 19 (JSX, pas de TypeScript), Vite 8, Tailwind CSS 3
- `motion` (animations), `ogl` (fond étoilé), `gsap` et `qrcode` (page QR)
- Lint : oxlint. Tests navigateur : `playwright-core` avec le navigateur Edge installé. Node >= 22.12.

## Commandes

```bash
npm run dev      # serveur de développement
npm run build    # build dans dist/
npm run lint     # oxlint, lancé aussi par la CI (un échec bloque le déploiement)
npm run check    # contrôle dans un vrai navigateur, serveur de dev lancé (voir plus bas)
```

## Architecture

Deux pages Vite : le portfolio (`index.html` → `src/main.jsx` → `src/App.jsx`) et la page
QR code (`qr/index.html` → `src/qr/`).

```text
src/
├── App.jsx           liste des slides, fond étoilé, fenêtre CV
├── components/
│   ├── Deck.jsx      système de slides : DeckProvider (état, molette, clavier, tactile, ancres)
│   │                 et DeckStage (transition entre slides)
│   ├── SlideFrame.jsx  cadre commun : titre en haut à gauche, repère à droite, contenu centré
│   ├── Header.jsx    menu (une entrée par slide), CV, QR, partage, menu mobile
│   ├── Reveal.jsx, TechList.jsx, Icons.jsx
│   ├── DriftWall.jsx, LogoLoop.jsx, Particles.jsx   composants React Bits adaptés
│   ├── Lightbox.jsx, CvModal.jsx, SteamWindow.jsx, AdnWindow.jsx   fenêtres
│   ├── Error30k.jsx  clin d'œil : taper « 30k »
│   └── TextType.jsx, TiltedCard.jsx, DepthText.jsx   page QR uniquement
├── sections/         une slide par fichier : Hero, Profile, Projects, Skills, Experience,
│                     Formation, Interests, Contact
├── data/             profile.js (identité, liens, menu), projects.js, parcours.js,
│                     skills.js, tech.js (logos), interests.js
├── hooks/            useModal, useShare, useMediaQuery
├── styles/index.css  système visuel (voir plus bas)
└── assets/           images, CV, captures des projets en .webp
```

### Slides

- L'ordre et les noms des slides sont dans `App.jsx`. `id` sert d'ancre (`#projects`).
- La page ne défile jamais (`html, body { overflow: hidden }`). Une slide plus haute que
  l'écran défile dans son cadre, puis on passe à la suivante.
- Les liens `href="#id"` changent de slide : c'est `Deck.jsx` qui les intercepte.
- Une fenêtre ouverte (`role="dialog"`) suspend la navigation entre slides.

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Ajouter ou modifier un projet | `src/data/projects.js`, captures en `.webp` dans `src/assets/projects/<nom>/` |
| Expériences et formations | `src/data/parcours.js` |
| Compétences | `src/data/skills.js` |
| Logo d'une technologie citée ailleurs | `src/data/tech.js` |
| Nom, email, liens, menu | `src/data/profile.js` |
| Ordre ou titre d'une slide | `src/App.jsx` |
| Tailles, polices, boutons | `src/styles/index.css` |
| CV | `src/assets/documents/` (PDF, et aperçu `.webp` à régénérer) |

## Système visuel

- Noir et blanc pur : fond `#04050a`, texte toujours en blanc franc. Pas de texte gris, pas de
  cartes ni de boîtes grises, pas de couleur d'accent. La couleur vient des logos et des captures.
- Trois polices : Anton (titres), Space Grotesk (texte), Space Mono (étiquettes et données).
- Classes de `index.css` : `t-display`, `t-title`, `t-heading`, `t-lead`, `t-text`, `t-small`,
  `t-label`, `t-data`, `container-page`, `btn btn-primary`, `link`.
- Peu de texte : préférer un composant à un paragraphe.
- Les carrousels ne s'arrêtent pas au survol de la souris.

## Vérifier un changement

`npm run check` ouvre le site dans Edge en quatre tailles d'écran, parcourt les slides, teste
menu, fenêtre CV, fiches projet et captures, et enregistre une capture par slide dans un dossier
temporaire. Regarder les captures avant de considérer un changement d'interface comme terminé.

## Conventions

- Code et commentaires en français. Messages de commit en français.
- Contenu des projets tiré des README des dépôts : ne rien inventer.
- Les composants React Bits gardent leur style de code d'origine : ne pas les reformater.
- Respecter `prefers-reduced-motion` et la compatibilité Safari iOS.
