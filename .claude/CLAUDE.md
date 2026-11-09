# Portfolio Yanis Mdoughy

Portfolio personnel présenté comme une suite de slides plein écran. Contenu en français.
Déployé sur GitHub Pages : https://aziz-anakin.github.io/Portfolio/ (`base: '/Portfolio/'`).

## Stack

- React 19 en TypeScript strict (`.ts` / `.tsx`, `tsconfig.json`), Vite 8, Tailwind CSS 3
- `motion` (animations), `ogl` (grille de la bannière), `gsap` (machine à écrire) et `qrcode` (page QR)
- Lint : oxlint. Tests navigateur : `playwright-core` avec le navigateur Edge installé. Node >= 22.12.

## Commandes

```bash
npm run dev      # serveur de développement
npm run typecheck # tsc --noEmit (strict) ; lancé aussi par `npm run build`
npm run build    # vérification des types puis build dans dist/
npm run lint     # oxlint, lancé aussi par la CI (un échec bloque le déploiement)
```

## Design actuel (v2, 2026-11-07)

Page unique qui défile : bannières en dégradé, fond indigo sombre, angles droits partout, filets fins. L'ancienne version (slides plein écran, fond étoilé, noir et blanc pur) n'existe plus.

- Couleurs (`tailwind.config.ts`) : mélange bleu · violet · rose sur fond indigo sombre. `brand` violet
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
  `src/lib/utils.ts`. Icônes : `lucide-react` (pas d'icônes de marques : voir `Icons.tsx`).
- Effets React Bits (peu, sobres) : `ShapeGrid` (grille de la bannière), `TextType`
  (machine à écrire), `Stack` (pile de cartes de la formation, Bachelor dessus ; le CSS d'origine est adapté : `> img`). Compétences : `LogoLoop` (carrousel de logos) ; Skills IA : `Stack` comme la formation (voir ci-dessous). Apparition au défilement : `Reveal.tsx` (motion).
- Tout le code est en TypeScript : les composants React Bits viennent de leurs versions TS officielles (registre `reactbits.dev/r/<Nom>-TS-CSS.json`) quand le code est resté d'origine ; `TextType`, qu'on a gardé dans une ancienne version, est typé à la main. Plus aucun fichier JavaScript dans le projet (PostCSS est configuré dans `vite.config.ts`, l'ancien script de test `scripts/check.mjs` est supprimé).
- Les composants React Bits gardent leur code d'origine ; `Reveal`, `SectionTitle`, `Section`,
  `TechBadges`, `Header` sont écrits pour ce site. Barre du haut : photo de profil GitHub à gauche, à droite
  CV + QR code (lien vers `/Portfolio/qr/`) + LinkedIn, GitHub, mail (boutons carrés ; pas de numéro de téléphone : Yanis veut qu'il ne soit nulle part sur le site, y compris dans le CV en PDF) ; pas de menu de sections (Yanis l'a retiré).
- Univers jeu vidéo, purement décoratif (`src/components/game/`) : `SnakeGrid` (serpent qui joue seul sur la
  grille de la bannière d'accueil ; sur ordinateur dans la zone à droite du texte repérée par `data-avoid`,
  sur téléphone et tablette (< 1024 px) dans la bande sous les boutons repérée par `data-below`, grille plus
  fine ; `ShapeGrid` est fixe et a la même `cell`) et `PacBar` (bande fixe en bas : Pac-Man, points, cerise,
  fantômes ; trois tailles selon la largeur, rien ne se superpose, un fantôme mangé éclate sur place ; pas de « READY! »). Aucun score, aucun bouton, aucun bonus à ramasser, pas de croix ni de « Jouer » :
  Yanis les a retirés. Les titres de section gardent « NIVEAU 0N ». Image fixe avec `prefers-reduced-motion`.
- Pokémon et Steve de Minecraft : supprimés le 2026-11-19 à la demande de Yanis. Ne pas les remettre. `Reveal` et `Spawn` n'existent plus.
- « Le site se construit » (`src/build/engine.ts` + `BuildLayer.tsx`, styles `.bd-*` dans `site.css`), inspiré de la vidéo de Ravi Paribrajak (« I Built a Website That Builds Itself »), réécrit à la façon du site, sans son code : quand un élément de `<main>` entre à l'écran, 5 curseurs collaboratifs (pastilles layout / texte / couleur / code / pixels) tracent d'abord son cadre de sélection (4 poignées, taille « L × H » en direct), puis le remplissent : texte tapé lettre par lettre (les lettres sont remises dans leurs nœuds d'origine à la fin, le texte du DOM ne change jamais), boîtes avec clic puis apparition, parents avant enfants. Rien n'est bloqué ni défilé tout seul : déclenché par le défilement, une seule fois par élément, sans son ni barre de contrôle. Repérage automatique (texte direct, images) + attribut `data-build` : `box` (cartes, boutons ; `Card` et `Button` l'ont déjà), `solid` (bloc d'un seul tenant : carrousel, pile de cartes), `skip` (jamais touché : machine à écrire, compteurs). Hors `<main>` (en-tête, Pac-Man, Chopper, fenêtres ouvertes plus tard) rien n'est construit. Seulement sur ordinateur (largeur ≥ 1024 px et écran avec survol) : Yanis a jugé le rendu mauvais sur téléphone et tablette, où la page s'affiche directement finie (ne pas le remettre là). Aussi fini avec `prefers-reduced-motion` ou `?static` dans l'adresse. Garde-fou : un élément jamais resté caché plus de 7 s. Cadre en azur, étiquettes mono, angles droits.
- Projets : grille de cartes (`Projects.tsx`, un seul bouton par carte) + fenêtre `ProjectDialog.tsx` construite sur l'élément natif `<dialog>` (focus piégé, Échap, retour du focus gérés par le navigateur). Pas de composant React Bits ici, pas d'animation automatique (WCAG 2.2.2), cibles de 44 px, focus visible, `aria-labelledby/describedby`, compteur de captures annoncé (`aria-live`). Vérifié au clavier (Entrée ouvre, Tab reste dans la fenêtre, Échap ferme et rend le focus à la carte).
- Références One Piece (Yanis est fan), dessinées à la main en pixel art, aucune image officielle : `game/OnePiece.tsx` (`PixelArt` : chapeau de paille, chapeau de Chopper ; `OnePieceEggs` : taper « luffy », « onepiece », « zoro », « shanks » ou « chopper » fait pleuvoir des chapeaux de paille et affiche « Je serai le Roi des pirates ! » ; Chopper se cache au-dessus de la bande Pac-Man (seul le haut de son chapeau dépasse) et est l'assistant du portfolio (`game/ChopperAssistant.tsx`, cerveau dans `data/assistant.ts`) : un clic ouvre une boîte de dialogue de jeu de rôle (portrait, texte qui s'écrit, menu de questions, champ libre) qui répond à partir des données du site par mots-clés ; ce n'est PAS un modèle d'IA (une vraie IA exigerait un serveur et une clé secrète, jamais dans le code du site, GitHub Pages étant statique) ; l'onglet devient « Reviens à bord, capitaine ! » quand on le quitte). Pas d'avis de recherche / prime « WANTED » : Yanis l'a retiré (il ne l'aimait pas). Si Yanis fournit de vraies images (Luffy, Zoro, Shanks, Sunny…), les intégrer à la place.
- Audit (2026-11-08, axe-core sur le site en ligne, zéro violation WCAG 2.2 AA après corrections) : `azure` = #3f5bf0 (contraste 5,3 avec le blanc, ne pas l'éclaircir) ; le titre garde un espace entre « Yanis » et « Mdoughy » ; `og-image.jpg` au style actuel, sans photo (à régénérer si le design change) ; `public/404.html`, repli `<noscript>` dans `index.html` ; la machine à écrire de l'accueil est chargée en différé (`lazy`). Les logos restent en liens externes (Yanis a demandé de les laisser).
- Une seule URL (demande de Yanis) : jamais de `#projects` ni de `#contact` dans l'adresse. `useCleanAnchors` (dans `App.tsx`) fait défiler les liens internes `href="#id"` sans changer l'adresse (et passe le focus à la section), et nettoie un `#id` reçu au chargement ou saisi à la main. Pas de routeur, pas de pages séparées : tout est sur une seule page. Les nouveaux liens internes s'écrivent `href="#id"` comme avant.
- Compétences (`Skills.tsx`, données dans `SKILL_GROUPS` de `data/skills.ts`) : carrousel de logos (React Bits `LogoLoop`, `components/LogoLoop.tsx` + `.css`, code d'origine) sur deux rangées qui défilent en sens inverse, tout seul, glisser possible, pause au survol, nom sous chaque logo ; Yanis a demandé de revenir à un carrousel (il avait testé des cartes en grille, abandonnées). Rangée 1 : Front et Back ; rangée 2 : Bases de données, Infra, Aussi, IA. Logos via `TECH` de `tech.ts` (`invert` : logo noir passé en blanc ; icône lucide pour SQL et NoSQL, champ `icon`). Liste donnée par Yanis le 2026-11-13 : Front : React, Next.js, Nuxt, Vue.js, TypeScript, Tailwind CSS, Bootstrap ; Back : Node.js, NestJS, Express, Java, PHP, Prisma ; Bases de données : SQL, MySQL, PostgreSQL, NoSQL, MongoDB ; Infra : Docker, GitHub Actions, Git, GitHub, Vercel ; Aussi : Python, Figma ; IA : Claude Code, Codex. Ne pas la rallonger sans lui demander.
- Skills IA (`sections/AiSkills.tsx`, niveau 04) : pile de cartes React Bits `Stack`, exactement comme la formation (compteur « 01 / 15 » et nom à gauche, pile à droite, on touche ou on fait glisser la carte du dessus). Yanis a refusé le slider WebGL « Flex Carousel » (ne pas le remettre). Cartes = `AI_SKILLS` dans `data/aiSkills.ts` (logo de marque ou icône lucide, domaine, nom, description, éditeur, lien « Voir le skill » seulement sur la carte du dessus) : skills et serveurs MCP utiles à un full-stack (front, back, base de données, tests, sécurité, déploiement ; dépôts vérifiés le 2026-11-13, liste à confirmer par Yanis). Liste de liens `sr-only` pour les lecteurs d'écran. Niveaux des sections : Profil 1, Projets 2, Compétences 3, Skills IA 4, Expérience 5, Formation 6, Intérêts 7, Contact 8. Pas de texte d'explication ni de justification sur l'IA (Yanis ne veut pas se « dédouaner » : il montre simplement ce qu'il utilise, jamais « je ne le cache pas » ni « vibe coding »).
- Boutons : bleu uni (`azure`), jamais de dégradé violet dessus ; le dégradé est réservé aux bannières.
- Projets : seulement Kaiju, Maison Atlas, MDT et My Codii, tous des projets web que Yanis héberge sur
  Vercel pour un accès de test (`links.demo`). Les quatre sont renseignés : Kaiju (6 captures), Maison Atlas (4), MDT (3), My Codii (1).
  Maison Atlas n'a pas de `role` (sa fiche ne dit pas qui l'a développé : ne pas écrire « seul » sans l'accord de Yanis). Les dépôts
  de MDT, Maison Atlas et My Codii sont privés : pas de `links.code`. Le champ `role` ne dit « conçu et
  développé seul » que si c'est exact (My Codii : dépôt partagé à deux, voir sa fiche). Captures :
  déposer les images dans `src/assets/projects/<nom>/` (`shotsOf('<nom>')` les charge toutes, triées par
  nom) ; sans image, un visuel provisoire s'affiche.

## Architecture

Deux pages Vite : le portfolio (`index.html` → `src/main.tsx` → `src/App.tsx`) et la page
QR code (`qr/index.html` → `src/qr/`).

```text
src/
├── App.tsx           Header + sections dans l'ordre de la page
├── sections/         Hero, Profile, Projects, Skills, Experience, Formation, Interests, Contact
├── components/
│   ├── ui/           button, card, badge (style shadcn)
│   ├── game/         animations décoratives : PacBar, SnakeGrid, OnePiece, ChopperAssistant, sprites
│   ├── ProjectDialog.tsx   fenêtre d'un projet (captures, fiche, projet précédent/suivant)
│   ├── Header.tsx, Section.tsx, SectionTitle.tsx, Reveal.tsx, TechBadges.tsx, Icons.tsx
│   ├── ShapeGrid, TextType, Stack
│   ├── SteamWindow, AdnWindow   fenêtres des centres d'intérêt (pastiches Steam et ADN, dans `Interests`)   composants React Bits
├── data/             profile.ts (identité, liens, menu), projects.ts, parcours.ts,
│                     skills.ts, tech.ts (logos), interests.ts
├── hooks/            useShare (page QR), useModal, useMediaQuery
├── lib/utils.ts      cn()
├── qr/               page QR code (`QrPage.tsx`), au design du site : bannière en dégradé, grille, titre « Niveau bonus » avec Pikachu, QR blanc à ombre franche, boutons plats ; l'ancienne version 3D (étoiles, carte qui pivote, texte extrudé) est supprimée
├── styles/site.css   styles du site (polices, base, tokens), utilisés par les deux pages
└── assets/           images, CV, captures des projets en .webp
```

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Ajouter ou modifier un projet | `src/data/projects.ts`, captures en `.webp` dans `src/assets/projects/<nom>/` |
| Expériences et formations | `src/data/parcours.ts` |
| Compétences | `src/data/skills.ts` |
| Logo d'une technologie citée ailleurs | `src/data/tech.ts` |
| Nom, email, liens, menu | `src/data/profile.ts` |
| Ordre des sections | `src/App.tsx` |
| Couleurs | `tailwind.config.ts` |
| CV | `src/assets/documents/` (PDF, et aperçu `.webp` à régénérer) |

## Conventions

- Code et commentaires en français. Messages de commit en français.
- Contenu des projets tiré des README des dépôts : ne rien inventer.
- Les composants React Bits gardent leur style de code d'origine : ne pas les reformater.
- Commits signés par Yanis Mdoughy avec l'adresse noreply de son compte GitHub (Aziz-Anakin@users.noreply.github.com : GitHub refuse les commits qui exposent son email privé), sans ligne `Co-Authored-By` ni mention de Claude, ni dans les messages ni dans l'auteur.
- Une seule branche : `main`, avec un seul commit « Initial commit » (auteur Yanis, sans Claude), remplacé à chaque modification : après un changement, `git add -A`, `git commit --amend --no-edit` (ou recréer le commit unique), puis `git push --force origin main`. Ne jamais créer d'autre branche. Un push déclenche le déploiement.
- Respecter `prefers-reduced-motion` et la compatibilité Safari iOS.
