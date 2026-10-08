import { SKILLS } from './skills'

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const WIKI = 'https://upload.wikimedia.org/wikipedia/commons/thumb'

// Technologies citées dans les projets et les expériences mais absentes de la grille
// de compétences. `invert` : logo monochrome noir, à passer en blanc sur fond sombre.
const EXTRA = {
  Vite: { logo: `${DEV}/vitejs/vitejs-original.svg` },
  'Tailwind CSS': { logo: `${DEV}/tailwindcss/tailwindcss-original.svg` },
  Jest: { logo: `${DEV}/jest/jest-plain.svg` },
  'GitHub Actions': { logo: `${DEV}/githubactions/githubactions-original.svg` },
  'Chrome Extension': { logo: `${DEV}/chrome/chrome-original.svg` },
  Streamlit: { logo: `${DEV}/streamlit/streamlit-original.svg` },
  Jupyter: { logo: `${DEV}/jupyter/jupyter-original.svg` },
  Pandas: { logo: `${DEV}/pandas/pandas-original.svg`, invert: true },
  Ollama: { logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg', invert: true },
  Markdown: { logo: `${DEV}/markdown/markdown-original.svg`, invert: true },
  Nuxt: { logo: `${DEV}/nuxtjs/nuxtjs-original.svg` },
  'Next.js': { logo: `${DEV}/nextjs/nextjs-original.svg`, invert: true },
  NestJS: { logo: `${DEV}/nestjs/nestjs-original.svg` },
  'Socket.IO': { logo: `${DEV}/socketio/socketio-original.svg`, invert: true },
  Prisma: { logo: `${DEV}/prisma/prisma-original.svg`, invert: true },
  'SQL Server': { logo: `${DEV}/microsoftsqlserver/microsoftsqlserver-original.svg` },
  Windows: { logo: `${WIKI}/8/87/Windows_logo_-_2021.svg/250px-Windows_logo_-_2021.svg.png` },
  Linux: { logo: `${DEV}/linux/linux-original.svg` },
  // Sans logo : le nom s'affiche seul.
  esbuild: {},
  XGBoost: {},
  SHAP: {},
}

// name → { logo?, invert?, href? }
export const TECH = {
  ...EXTRA,
  ...Object.fromEntries(Object.values(SKILLS).flat().map((s) => [s.name, s])),
}
