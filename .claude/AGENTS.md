# Guide pour les agents

Le guide complet du projet est dans [CLAUDE.md](CLAUDE.md), dans ce même dossier.

L'essentiel :

- Portfolio React 19 + Vite + Tailwind 3 : page unique, bleu et charcoal, angles droits, composants
  shadcn-style + quelques effets React Bits.
- Le contenu se modifie dans `src/data/`, une section par fichier dans `src/sections/`.
- La page QR (`src/qr/`) garde son style et ses effets.
- `npm run lint` doit passer avant tout push : la CI le lance et bloque le déploiement sinon.
- Travailler et pousser sur `main` (demande de Yanis).
