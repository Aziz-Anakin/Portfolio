/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './qr/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Trois polices, un rôle chacune (voir src/styles/index.css).
      fontFamily: {
        anton: ['"Anton"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        code: ['"Space Mono"', 'monospace'],
      },
      // Palette bleu · violet · rose, sur un fond indigo très sombre (voir src/styles/site.css).
      colors: {
        brand: '#7c3aed',   // violet : boutons, pastilles
        bright: '#b9a4ff',  // lavande : texte et filets sur fond sombre (le violet franc y manque de contraste)
        pink: '#ff5fb7',    // rose : curseurs, accents
        azure: '#3f5bf0',   // bleu : boutons et début des dégradés (contraste 5,3 avec le blanc)
        ink: '#14111f',     // fond de page
        panel: '#1c1830',   // cartes et panneaux
        line: '#352d55',    // filets
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2f45ff 0%, #7c3aed 52%, #e44fb0 100%)',
      },
      maxWidth: {
        content: '86rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        blink: 'blink 1.1s steps(1) infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'zoom-in': 'zoomIn 0.25s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
