import useViewCounter from '../hooks/useViewCounter'

function Footer() {
  const views = useViewCounter()

  return (
    <footer className="bg-white dark:bg-slate-950">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-6 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          <span className="font-code font-semibold text-slate-500 dark:text-slate-400">Mdoughy Yanis</span>
          {' — Étudiant en informatique à Epitech Paris'}
        </p>

        {views !== null && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="font-code tabular-nums">{views.toLocaleString('fr-FR')}</span>
            vues
          </p>
        )}
      </div>
    </footer>
  )
}

export default Footer
