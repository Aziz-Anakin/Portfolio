# Portfolio

Réalisé avec React, Vite et Tailwind CSS.

Projet réalisé dans le cadre de mes études, durant mon année à Epitech Paris.

## Stack

- React 19
- Vite 7
- Tailwind CSS 3
- [React Bits](https://reactbits.dev/) — inspirations de composants UI

## Fonctionnalités

- Design responsive (mobile, tablette, desktop)
- Mode clair / sombre
- Animations (carrousel de compétences, effet machine à écrire, apparition au scroll)

## Lancer le projet

```bash
npm install
npm run dev
```

## Scripts

| Commande          | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Démarre le serveur de développement    |
| `npm run build`   | Compile le projet pour la production   |
| `npm run preview` | Prévisualise le build de production    |
| `npm run lint`    | Lance ESLint                           |

## Structure

```text
src/
├── components/   # Header, Footer, SectionHeading, Typewriter
├── sections/     # Home, About, Projects, Skills, Experience, Formation, Contact
├── data/         # Données statiques (compétences)
├── styles/       # Point d'entrée Tailwind (index.css)
└── assets/       # Images, CV, SVG
```
