import { SKILLS } from './skills'

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const WIKI = 'https://upload.wikimedia.org/wikipedia/commons/thumb'

// Technologies citées dans les projets et les expériences mais absentes de la grille
// de compétences. `invert` : logo monochrome noir, à passer en blanc sur fond sombre.
const EXTRA = {
  Java: { logo: `${DEV}/java/java-original.svg` },
  Bootstrap: { logo: `${DEV}/bootstrap/bootstrap-original.svg` },
  // Sans logo de marque : une icône (nom d'icône lucide, affichée par la section Compétences).
  SQL: { icon: 'Database' },
  NoSQL: { icon: 'FileJson' },
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
  'Next.js': { logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nextdotjs.svg', invert: true },
  VMware: { logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vmware.svg', invert: true },
  // Remplace le logo de skills.js (image Wikimedia qui ne se charge plus)
  VirtualBox: { logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/virtualbox.svg', invert: true },
  Supabase: { logo: 'https://cdn.simpleicons.org/supabase' },
  Vitest: { logo: 'https://cdn.simpleicons.org/vitest' },
  Zod: { logo: 'https://cdn.simpleicons.org/zod' },
  Railway: { logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/railway.svg', invert: true },
  OpenAI: { logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg', invert: true },
  NestJS: { logo: `${DEV}/nestjs/nestjs-original.svg` },
  'Socket.IO': { logo: `${DEV}/socketio/socketio-original.svg`, invert: true },
  Prisma: { logo: `${DEV}/prisma/prisma-original.svg`, invert: true },
  'SQL Server': { logo: `${DEV}/microsoftsqlserver/microsoftsqlserver-original.svg` },
  Windows: { logo: `${DEV}/windows8/windows8-original.svg` },
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
  VirtualBox: EXTRA.VirtualBox,
}
