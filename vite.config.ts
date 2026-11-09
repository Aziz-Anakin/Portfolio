import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  // PostCSS configuré ici (plus de postcss.config.js) : Tailwind lit tailwind.config.ts tout seul.
  css: { postcss: { plugins: [tailwindcss(), autoprefixer()] } },
  base: '/Portfolio/',
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      // Deux pages : le portfolio et la page QR code (/Portfolio/qr/).
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        qr: resolve(import.meta.dirname, 'qr/index.html'),
      },
    },
  },
})
