import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
