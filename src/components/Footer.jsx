function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-6 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          <span className="font-code font-semibold text-slate-500 dark:text-slate-400">Mdoughy Yanis</span>
          {' — Étudiant en informatique à Epitech Paris'}
        </p>
        <a
          href={`${import.meta.env.BASE_URL}qr/`}
          className="inline-flex items-center gap-1.5 mt-2 text-xs text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
          </svg>
          QR code du portfolio
        </a>
      </div>
    </footer>
  )
}

export default Footer
