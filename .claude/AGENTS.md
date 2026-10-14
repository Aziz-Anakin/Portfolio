# Guide pour les agents

Le guide complet du projet est dans [CLAUDE.md](CLAUDE.md), dans ce même dossier : architecture,
où modifier quoi, système visuel, conventions.

L'essentiel :

- Portfolio React 19 + Vite + Tailwind 3, présenté en slides plein écran (`src/components/Deck.jsx`).
- Le contenu se modifie dans `src/data/`, une slide par fichier dans `src/sections/`.
- `npm run lint` doit passer avant tout push : la CI le lance et bloque le déploiement sinon.
- Après un changement d'interface, lancer `npm run check` et regarder les captures.
- Noir et blanc pur, texte blanc, pas de boîtes grises, peu de texte.
- Ne rien pousser sans demande explicite.
