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
npm run check    # OBSOLÈTE : scripts/check.mjs teste l'ancienne interface (slides), à réécrire
```

## Design actuel (v2, 2026-11-07)

Page unique qui défile : bannières en dégradé, fond indigo sombre, angles droits partout, filets fins. L'ancienne version (slides plein écran, fond étoilé, noir et blanc pur) n'existe plus.

- Couleurs (`tailwind.config.js`) : mélange bleu · violet · rose sur fond indigo sombre. `brand` violet
  #7c3aed, `bright` lavande #b9a4ff (texte sur fond sombre), `pink` #ff5fb7 (curseurs), `azure`
  #4f6bff, `ink` #14111f (page), `panel` #1c1830 (cartes), `line` #352d55 (filets). Dégradé
  `bg-brand-gradient` (bleu → violet → rose) pour les bannières, `.text-gradient` pour les grands chiffres.
  Palette choisie pour se distinguer d'Epitech et d'autres portfolios : ne pas la rapprocher d'un site existant.
- Polices : Anton (titres et grands chiffres, à plat, sans effet 3D), Space Mono (étiquettes et
  boutons, en capitales), Space Grotesk (texte).
- Aucun arrondi (pas de `rounded-*`). Boutons : rectangles plats, capitales mono. Étiquettes : petit
  carré rose + texte. Titres de section : repère « NIVEAU 0N · SECTION » + titre Anton.
- À ne pas faire : crochets `< ÉTIQUETTE />`, curseur `_` clignotant après les titres ou sur les
  boutons, ni rien d'autre qui rappelle l'intranet MyEpitech (Yanis veut se distinguer).
- Pas de photo de Yanis sur le site.
- Composants shadcn-style dans `src/components/ui/` (`button` avec cva, `card`, `badge`) ; `cn()` dans
  `src/lib/utils.js`. Icônes : `lucide-react` (pas d'icônes de marques : voir `Icons.jsx`).
- Effets React Bits (peu, sobres) : `ShapeGrid` (grille de la bannière), `TextType`
  (machine à écrire), `Stack` (pile de cartes de la formation, Bachelor dessus ; le CSS d'origine est adapté : `> img`). Compétences : `LogoLoop` (carrousel de logos) ; Skills IA : `Stack` comme la formation (voir ci-dessous). Apparition au défilement : `Reveal.jsx` (motion).
- Les composants React Bits gardent leur code d'origine ; `Reveal`, `SectionTitle`, `Section`,
  `TechBadges`, `Header` sont écrits pour ce site. Barre du haut : photo de profil GitHub à gauche, à droite
  CV + LinkedIn, GitHub, mail (boutons carrés ; pas de numéro de téléphone : Yanis veut qu'il ne soit nulle part sur le site, y compris dans le CV en PDF) ; pas de menu de sections (Yanis l'a retiré).
- Univers jeu vidéo, purement décoratif (`src/components/game/`) : `SnakeGrid` (serpent qui joue seul sur la
  grille de la bannière d'accueil ; sur ordinateur dans la zone à droite du texte repérée par `data-avoid`,
  sur téléphone et tablette (< 1024 px) dans la bande sous les boutons repérée par `data-below`, grille plus
  fine ; `ShapeGrid` est fixe et a la même `cell`) et `PacBar` (bande fixe en bas : Pac-Man, points, cerise,
  fantômes ; trois tailles selon la largeur, rien ne se superpose, un fantôme mangé éclate sur place ; pas de « READY! »). Aucun score, aucun bouton, aucun bonus à ramasser, pas de croix ni de « Jouer » :
  Yanis les a retirés. Les titres de section gardent « NIVEAU 0N ». Image fixe avec `prefers-reduced-motion`.
- Références Pokémon (v4, `game/Poke.jsx`, données dans `game/pokemon.js`, rendu par `SectionTitle` via la prop `poke`, un seul nom) : un seul Pokémon par section, tous différents, en sprites GIF 2D pixel art (jamais de 3D), posé juste à droite du titre de la section, sur sa ligne de base ; il dépasse vers le haut sans pousser le contenu (boîte de hauteur nulle). Face au titre (les sprites regardent à gauche). Échelle `--k` : 0,75 sur téléphone (pour ne pas toucher le repère « NIVEAU 0N ») et 2 dès 768 px. Profil = Rayquaza, Projets = Kyogre, Compétences = Mewtwo, Skills IA = Kyurem, Expérience = Groudon, Formation = Zekrom (éclairci par `light`, il est presque noir), Intérêts = Dracaufeu, Contact = Giratina. Pas dans l'accueil. Mouvements discrets : flottement + rotation (`.poke-float`), zoom au survol, apparition au défilement ; immobile avec `prefers-reduced-motion`. `Poke` sait aussi se placer en absolu (`className`, `clip`, `flip`, `halo`, `tag`) si on veut un placement libre. Pas de Pokémon qui se promènent au hasard (Yanis n'a pas aimé). Disponibles en plus : Palkia, Dialga, Pikachu, Lucario, Ectoplasma, Dracaufeu.
- Apparition des composants (`Spawn.jsx`, remplace `Reveal` sur les composants des sections) : le vrai Steve de profil (`game/Steve.jsx` : six morceaux découpés dans la texture du skin classique MHF_Steve, via minotar.net, dans `src/assets/steve/` ; personnage de Mojang/Microsoft, simple référence de fan à la demande de Yanis) marche le long du bord haut du composant quand il entre à l'écran et pose les blocs colonne par colonne (clip-path en paliers) avec un cube de visée, puis sort et disparaît. Une seule fois par composant ; sans animation si `prefers-reduced-motion`. Le contenu reste dans le DOM pendant l'animation. `Reveal` reste pour les titres et textes.
- Projets : grille de cartes (`Projects.jsx`, un seul bouton par carte) + fenêtre `ProjectDialog.jsx` construite sur l'élément natif `<dialog>` (focus piégé, Échap, retour du focus gérés par le navigateur). Pas de composant React Bits ici, pas d'animation automatique (WCAG 2.2.2), cibles de 44 px, focus visible, `aria-labelledby/describedby`, compteur de captures annoncé (`aria-live`). Vérifié au clavier (Entrée ouvre, Tab reste dans la fenêtre, Échap ferme et rend le focus à la carte).
- Références One Piece (Yanis est fan), dessinées à la main en pixel art, aucune image officielle : `game/OnePiece.jsx` (`PixelArt` : chapeau de paille, chapeau de Chopper ; `OnePieceEggs` : taper « luffy », « onepiece », « zoro », « shanks » ou « chopper » fait pleuvoir des chapeaux de paille et affiche « Je serai le Roi des pirates ! » ; Chopper se cache au-dessus de la bande Pac-Man (seul le haut de son chapeau dépasse) et est l'assistant du portfolio (`game/ChopperAssistant.jsx`, cerveau dans `data/assistant.js`) : un clic ouvre une boîte de dialogue de jeu de rôle (portrait, texte qui s'écrit, menu de questions, champ libre) qui répond à partir des données du site par mots-clés ; ce n'est PAS un modèle d'IA (une vraie IA exigerait un serveur et une clé secrète, jamais dans le code du site, GitHub Pages étant statique) ; l'onglet devient « Reviens à bord, capitaine ! » quand on le quitte). Pas d'avis de recherche / prime « WANTED » : Yanis l'a retiré (il ne l'aimait pas). Si Yanis fournit de vraies images (Luffy, Zoro, Shanks, Sunny…), les intégrer à la place.
- Audit (2026-11-08, axe-core sur le site en ligne, zéro violation WCAG 2.2 AA après corrections) : `azure` = #3f5bf0 (contraste 5,3 avec le blanc, ne pas l'éclaircir) ; le titre garde un espace entre « Yanis » et « Mdoughy » ; `og-image.jpg` au style actuel, sans photo (à régénérer si le design change) ; `public/404.html`, repli `<noscript>` dans `index.html` ; la machine à écrire de l'accueil est chargée en différé (`lazy`). Les logos restent en liens externes (Yanis a demandé de les laisser).
- Une seule URL (demande de Yanis) : jamais de `#projects` ni de `#contact` dans l'adresse. `useCleanAnchors` (dans `App.jsx`) fait défiler les liens internes `href="#id"` sans changer l'adresse (et passe le focus à la section), et nettoie un `#id` reçu au chargement ou saisi à la main. Pas de routeur, pas de pages séparées : tout est sur une seule page. Les nouveaux liens internes s'écrivent `href="#id"` comme avant.
- Compétences (`Skills.jsx`, données dans `SKILL_GROUPS` de `data/skills.js`) : carrousel de logos (React Bits `LogoLoop`, `components/LogoLoop.jsx` + `.css`, code d'origine) sur deux rangées qui défilent en sens inverse, tout seul, glisser possible, pause au survol, nom sous chaque logo ; Yanis a demandé de revenir à un carrousel (il avait testé des cartes en grille, abandonnées). Rangée 1 : Front et Back ; rangée 2 : Bases de données, Infra, Aussi, IA. Logos via `TECH` de `tech.js` (`invert` : logo noir passé en blanc ; icône lucide pour SQL et NoSQL, champ `icon`). Liste donnée par Yanis le 2026-11-13 : Front : React, Next.js, Nuxt, Vue.js, TypeScript, Tailwind CSS, Bootstrap ; Back : Node.js, NestJS, Express, Java, PHP, Prisma ; Bases de données : SQL, MySQL, PostgreSQL, NoSQL, MongoDB ; Infra : Docker, GitHub Actions, Git, GitHub, Vercel ; Aussi : Python, Figma ; IA : Claude Code, Codex. Ne pas la rallonger sans lui demander.
- Skills IA (`sections/AiSkills.jsx`, niveau 04, Kyurem) : pile de cartes React Bits `Stack`, exactement comme la formation (compteur « 01 / 15 » et nom à gauche, pile à droite, on touche ou on fait glisser la carte du dessus). Yanis a refusé le slider WebGL « Flex Carousel » (ne pas le remettre). Cartes = `AI_SKILLS` dans `data/aiSkills.js` (logo de marque ou icône lucide, domaine, nom, description, éditeur, lien « Voir le skill » seulement sur la carte du dessus) : skills et serveurs MCP utiles à un full-stack (front, back, base de données, tests, sécurité, déploiement ; dépôts vérifiés le 2026-11-13, liste à confirmer par Yanis). Liste de liens `sr-only` pour les lecteurs d'écran. Niveaux des sections : Profil 1, Projets 2, Compétences 3, Skills IA 4, Expérience 5, Formation 6, Intérêts 7, Contact 8. Pas de texte d'explication ni de justification sur l'IA (Yanis ne veut pas se « dédouaner » : il montre simplement ce qu'il utilise, jamais « je ne le cache pas » ni « vibe coding »).
- Boutons : bleu uni (`azure`), jamais de dégradé violet dessus ; le dégradé est réservé aux bannières.
- Projets : seulement Kaiju, Maison Atlas, MDT et My Codii, tous des projets web que Yanis héberge sur
  Vercel pour un accès de test (`links.demo`). Les quatre sont renseignés : Kaiju (6 captures), Maison Atlas (4), MDT (3), My Codii (1).
  Maison Atlas n'a pas de `role` (sa fiche ne dit pas qui l'a développé : ne pas écrire « seul » sans l'accord de Yanis). Les dépôts
  de MDT, Maison Atlas et My Codii sont privés : pas de `links.code`. Le champ `role` ne dit « conçu et
  développé seul » que si c'est exact (My Codii : dépôt partagé à deux, voir sa fiche). Captures :
  déposer les images dans `src/assets/projects/<nom>/` (`shotsOf('<nom>')` les charge toutes, triées par
  nom) ; sans image, un visuel provisoire s'affiche.

## Architecture

Deux pages Vite : le portfolio (`index.html` → `src/main.jsx` → `src/App.jsx`) et la page
QR code (`qr/index.html` → `src/qr/`).

```text
src/
├── App.jsx           Header + sections dans l'ordre de la page
├── sections/         Hero, Profile, Projects, Skills, Experience, Formation, Interests, Contact
├── components/
│   ├── ui/           button, card, badge (style shadcn)
│   ├── game/         animations décoratives : PacBar, SnakeGrid, sprites
│   ├── ProjectDialog.jsx   fenêtre d'un projet (captures, fiche, projet précédent/suivant)
│   ├── Header.jsx, Section.jsx, SectionTitle.jsx, Reveal.jsx, TechBadges.jsx, Icons.jsx
│   ├── ShapeGrid, TextType, Stack
│   ├── SteamWindow, AdnWindow   fenêtres des centres d'intérêt (pastiches Steam et ADN, dans `Interests`)   composants React Bits
│   └── Particles, TiltedCard, DepthText         page QR uniquement
├── data/             profile.js (identité, liens, menu), projects.js, parcours.js,
│                     skills.js, tech.js (logos), interests.js
├── hooks/            useShare (page QR), useModal, useMediaQuery
├── lib/utils.js      cn()
├── qr/               page QR code, qui garde son ancien style (importe styles/index.css)
├── styles/site.css   styles du site (polices, base, tokens) ; index.css : page QR seulement
└── assets/           images, CV, captures des projets en .webp
```

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Ajouter ou modifier un projet | `src/data/projects.js`, captures en `.webp` dans `src/assets/projects/<nom>/` |
| Expériences et formations | `src/data/parcours.js` |
| Compétences | `src/data/skills.js` |
| Logo d'une technologie citée ailleurs | `src/data/tech.js` |
| Nom, email, liens, menu | `src/data/profile.js` |
| Ordre des sections | `src/App.jsx` |
| Couleurs | `tailwind.config.js` |
| CV | `src/assets/documents/` (PDF, et aperçu `.webp` à régénérer) |

## Conventions

- Code et commentaires en français. Messages de commit en français.
- Contenu des projets tiré des README des dépôts : ne rien inventer.
- Les composants React Bits (page QR) gardent leur style de code d'origine : ne pas les reformater.
- Commits signés par Yanis Mdoughy avec l'adresse noreply de son compte GitHub (Aziz-Anakin@users.noreply.github.com : GitHub refuse les commits qui exposent son email privé), sans ligne `Co-Authored-By` ni mention de Claude, ni dans les messages ni dans l'auteur.
- Une seule branche : `main`, avec un seul commit « Initial commit » (auteur Yanis, sans Claude), remplacé à chaque modification : après un changement, `git add -A`, `git commit --amend --no-edit` (ou recréer le commit unique), puis `git push --force origin main`. Ne jamais créer d'autre branche. Un push déclenche le déploiement.
- Respecter `prefers-reduced-motion` et la compatibilité Safari iOS.
