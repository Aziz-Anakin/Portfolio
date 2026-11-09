# Portfolio de Yanis Mdoughy

Mon portfolio personnel : une page unique qui défile, pensée comme une suite de niveaux de jeu vidéo.
Étudiant en Bachelor Informatique à Epitech Paris (spécialité web, cloud et blockchain), je cherche un stage puis une alternance.

**En ligne : <https://aziz-anakin.github.io/Portfolio/>**

## Aperçu

Le site se parcourt de haut en bas, un « niveau » par section :

| Niveau | Section | Contenu |
| ------ | ------- | ------- |
| 00 | Accueil | Bannière en dégradé avec une grille animée et un serpent qui joue tout seul |
| 01 | Profil | Qui je suis, ma formation, ce que je cherche |
| 02 | Projets | Kaiju, Maison Atlas, MDT et My Codii : fiche, captures et technologies dans une fenêtre dédiée |
| 03 | Compétences | Carrousel de logos : front, back, bases de données, infra et outils |
| 04 | Skills IA | Pile de cartes des skills et serveurs MCP que j'utilise pour le web |
| 05 | Expérience | Mes stages |
| 06 | Formation | Mon parcours, en pile de cartes |
| 07 | Intérêts | Jeux vidéo et anime, dans des fenêtres inspirées de Steam et d'ADN |
| 08 | Contact | E-mail, LinkedIn, GitHub et CV |

Le site se construit sous tes yeux : en défilant, des curseurs façon outil de design tracent chaque élément puis le remplissent (texte tapé, cadres de sélection). Rien ne s'anime avec « réduire les animations ».

Quelques clins d'œil de fan : un serpent qui joue tout seul sur la bannière, une bande Pac-Man en bas de page et
un assistant One Piece (Chopper) qui répond aux questions sur mon parcours.

La page QR code (`/Portfolio/qr/`) est une seconde page, au même design, accessible depuis le bouton QR de la barre du haut.

## Technologies

**Base**

- [React 19](https://react.dev/) avec [TypeScript](https://www.typescriptlang.org/) en mode strict
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)

**Interface et animations**

- [React Bits](https://reactbits.dev/) : `ShapeGrid` (grille de l'accueil), `TextType` (machine à écrire), `Stack` (piles de cartes de la formation et des skills IA), `LogoLoop` (carrousel de compétences)
- [motion](https://motion.dev/) : animations d'apparition et de glissement
- [ogl](https://github.com/oframe/ogl) : rendu WebGL de la grille
- [GSAP](https://gsap.com/) : machine à écrire ; [qrcode](https://github.com/soldair/node-qrcode) : page QR
- [lucide-react](https://lucide.dev/) : icônes
- Composants dans le style [shadcn/ui](https://ui.shadcn.com/) (`class-variance-authority`, `clsx`, `tailwind-merge`, Radix Slot)

**Design**

- Polices : Anton (titres), Space Mono (étiquettes), Space Grotesk (texte)
- Dégradé bleu · violet · rose sur fond indigo sombre, angles droits et filets fins
- Logos de technologies : [devicon](https://devicon.dev/) et [Simple Icons](https://simpleicons.org/)

**Qualité et déploiement**

- [oxlint](https://oxc.rs/docs/guide/usage/linter) pour le lint
- [Playwright](https://playwright.dev/) (`playwright-core`) pour les tests dans le navigateur
- Hébergement sur [GitHub Pages](https://pages.github.com/), déployé par GitHub Actions à chaque push sur `main` (lint puis build)
- Accessibilité : respect de `prefers-reduced-motion`, navigation au clavier, fenêtres basées sur l'élément natif `<dialog>`

## Lancer le projet

Prérequis : Node.js 22.12 ou plus récent.

```bash
npm install
npm run dev
```

Le site est alors disponible sur <http://localhost:5173/Portfolio/>.

## Scripts

| Commande            | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Démarre le serveur de développement          |
| `npm run typecheck` | Vérifie les types (TypeScript)               |
| `npm run build`     | Vérifie les types puis compile dans `dist/`  |
| `npm run preview`   | Prévisualise le build de production          |
| `npm run lint`      | Lance oxlint                                 |

## Structure

```text
src/
├── App.jsx        Page unique : en-tête et sections dans l'ordre
├── sections/      Accueil, Profil, Projets, Compétences, Skills IA, Expérience, Formation, Intérêts, Contact
├── components/    Composants partagés (interface, effets React Bits, animations de jeu, fenêtres)
├── data/          Contenu du site : profil, projets, parcours, compétences, skills IA
├── hooks/         Hooks réutilisables
├── styles/        Styles et couleurs du site
├── qr/            Page QR code
└── assets/        Images, CV, captures des projets, sprites
```

Pour modifier le contenu, tout se passe dans `src/data/` : `projects.js` (projets et captures dans
`src/assets/projects/`), `parcours.js` (expériences et formations), `skills.js` (compétences),
`aiSkills.js` (skills IA) et `profile.js` (nom, liens).

## Crédits

Pac-Man, Steam, ADN et One Piece appartiennent à leurs ayants droit : ils apparaissent ici
uniquement comme références de fan, sans but commercial.
