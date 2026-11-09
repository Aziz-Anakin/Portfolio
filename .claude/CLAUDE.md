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
  (machine à écrire), `Stack` (pile de cartes de la formation, Bachelor dessus ; le CSS d'origine est adapté : `> img`). Compétences : texte simple, sans logos ni carrousel (voir ci-dessous). Apparition au défilement : `Reveal.jsx` (motion).
- Les composants React Bits gardent leur code d'origine ; `Reveal`, `SectionTitle`, `Section`,
  `TechBadges`, `Header` sont écrits pour ce site. Barre du haut : photo de profil GitHub à gauche, à droite
  CV + LinkedIn, GitHub, mail (boutons carrés ; pas de numéro de téléphone : Yanis veut qu'il ne soit nulle part sur le site, y compris dans le CV en PDF) ; pas de menu de sections (Yanis l'a retiré).
- Univers jeu vidéo, purement décoratif (`src/components/game/`) : `SnakeGrid` (serpent qui joue seul sur la
  grille de la bannière d'accueil ; sur ordinateur dans la zone à droite du texte repérée par `data-avoid`,
  sur téléphone et tablette (< 1024 px) dans la bande sous les boutons repérée par `data-below`, grille plus
  fine ; `ShapeGrid` est fixe et a la même `cell`) et `PacBar` (bande fixe en bas : Pac-Man, points, cerise,
  fantômes ; trois tailles selon la largeur, rien ne se superpose, un fantôme mangé éclate sur place ; pas de « READY! »). Aucun score, aucun bouton, aucun bonus à ramasser, pas de croix ni de « Jouer » :
  Yanis les a retirés. Les titres de section gardent « NIVEAU 0N ». Image fixe avec `prefers-reduced-motion`.
- Références Pokémon (v3, `game/Poke.jsx`, données dans `game/pokemon.js`) : un seul Pokémon par section, tous différents, en sprites GIF 2D pixel art (jamais de 3D) posés dans la scène de la section, plus dans l'en-tête. Chaque section règle sa composition (position absolue dans le conteneur `relative` de `Section`, échelle entière `k`, `clip` pour le rogner derrière un bord, `flip`, `tilt`, `halo` losange ou bloc, `rim` pour les sprites sombres, `tag` plaquette de Pokédex) : Profil = Rayquaza (chevauche le bord de la bannière, entre par la droite), Projets = Kyogre (remonte de derrière le bord bas, passe derrière les cartes), Compétences = Mewtwo (debout sur les cartes IA, dans un losange), Expérience = Kyurem (tête qui dépasse derrière la première carte), Formation = Zekrom (en bas à gauche sur un bloc de dégradé), Intérêts = Dracaufeu (perché sur le coin de la carte Anime), Contact = Giratina (boss final, dans la place libre de la grille). Pas de Pokémon dans l'accueil (le serpent y joue). Mouvements discrets : flottement + rotation (`.poke-float`), zoom au survol, apparition au défilement ; immobile avec `prefers-reduced-motion`. Les Pokémon ne doivent jamais cacher un texte ou un bouton (vérifier ordinateur et téléphone après tout changement de mise en page). Les cartes qui passent devant un Pokémon sont en `relative` (le Pokémon est avant dans le DOM). Pas de Pokémon qui se promènent au hasard (Yanis n'a pas aimé). Disponibles en plus : Groudon, Palkia, Giratina, Dialga, Pikachu, Lucario, Ectoplasma.
- Apparition des composants (`Spawn.jsx`, remplace `Reveal` sur les composants des sections) : le vrai Steve de profil (`game/Steve.jsx` : six morceaux découpés dans la texture du skin classique MHF_Steve, via minotar.net, dans `src/assets/steve/` ; personnage de Mojang/Microsoft, simple référence de fan à la demande de Yanis) marche le long du bord haut du composant quand il entre à l'écran et pose les blocs colonne par colonne (clip-path en paliers) avec un cube de visée, puis sort et disparaît. Une seule fois par composant ; sans animation si `prefers-reduced-motion`. Le contenu reste dans le DOM pendant l'animation. `Reveal` reste pour les titres et textes.
- Projets : grille de cartes (`Projects.jsx`, un seul bouton par carte) + fenêtre `ProjectDialog.jsx` construite sur l'élément natif `<dialog>` (focus piégé, Échap, retour du focus gérés par le navigateur). Pas de composant React Bits ici, pas d'animation automatique (WCAG 2.2.2), cibles de 44 px, focus visible, `aria-labelledby/describedby`, compteur de captures annoncé (`aria-live`). Vérifié au clavier (Entrée ouvre, Tab reste dans la fenêtre, Échap ferme et rend le focus à la carte).
- Références One Piece (Yanis est fan), dessinées à la main en pixel art, aucune image officielle : `game/OnePiece.jsx` (`PixelArt` : chapeau de paille, chapeau de Chopper ; `OnePieceEggs` : taper « luffy », « onepiece », « zoro », « shanks » ou « chopper » fait pleuvoir des chapeaux de paille et affiche « Je serai le Roi des pirates ! » ; Chopper se cache au-dessus de la bande Pac-Man (seul le haut de son chapeau dépasse) et est l'assistant du portfolio (`game/ChopperAssistant.jsx`, cerveau dans `data/assistant.js`) : un clic ouvre une boîte de dialogue de jeu de rôle (portrait, texte qui s'écrit, menu de questions, champ libre) qui répond à partir des données du site par mots-clés ; ce n'est PAS un modèle d'IA (une vraie IA exigerait un serveur et une clé secrète, jamais dans le code du site, GitHub Pages étant statique) ; l'onglet devient « Reviens à bord, capitaine ! » quand on le quitte). Pas d'avis de recherche / prime « WANTED » : Yanis l'a retiré (il ne l'aimait pas). Si Yanis fournit de vraies images (Luffy, Zoro, Shanks, Sunny…), les intégrer à la place.
- Audit (2026-11-08, axe-core sur le site en ligne, zéro violation WCAG 2.2 AA après corrections) : `azure` = #3f5bf0 (contraste 5,3 avec le blanc, ne pas l'éclaircir) ; le titre garde un espace entre « Yanis » et « Mdoughy » ; `og-image.jpg` au style actuel, sans photo (à régénérer si le design change) ; `public/404.html`, repli `<noscript>` dans `index.html` ; la machine à écrire de l'accueil est chargée en différé (`lazy`). Les logos restent en liens externes (Yanis a demandé de les laisser).
- Une seule URL (demande de Yanis) : jamais de `#projects` ni de `#contact` dans l'adresse. `useCleanAnchors` (dans `App.jsx`) fait défiler les liens internes `href="#id"` sans changer l'adresse (et passe le focus à la section), et nettoie un `#id` reçu au chargement ou saisi à la main. Pas de routeur, pas de pages séparées : tout est sur une seule page. Les nouveaux liens internes s'écrivent `href="#id"` comme avant.
- Compétences (`Skills.jsx`, données dans `SKILL_GROUPS` de `data/skills.js`) : une grille de deux colonnes étiquette + liste en texte, comme sur yurri.fr (exemple donné par Yanis) ; peu de technologies, centrées sur le web, que Yanis maîtrise (Front : React, Next.js, Vue.js, TypeScript, Tailwind CSS ; Back : Node.js, NestJS, Express ; Bases de données : PostgreSQL, MongoDB ; Outils ; Aussi). Dans la grille, une ligne « IA » (Claude Code, Codex) ; sous la grille, trois cartes « Skills IA pour le web » (`AI_SKILLS` : React Bits, shadcn/ui, UI UX Pro Max, exemples à confirmer par Yanis). Pas de texte d'explication ni de justification sur l'IA (Yanis ne veut pas se « dédouaner » : il montre simplement ce qu'il utilise, jamais « je ne le cache pas » ni « vibe coding »). Ne pas rajouter de logos ni de longues listes. `SKILLS` (avec logos) ne sert plus qu'aux pastilles des projets (`tech.js`).
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
