import DepthText from './DepthText.jsx'

function Footer() {
  return (
    <footer className="relative z-10 bg-transparent">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-6 text-center">
        <DepthText
          text="Mdoughy Yanis"
          as="p"
          layers={16}
          depth={1.2}
          tilt={5}
          orbitSpeed={0.15}
          fontSize="0.95rem"
          fontWeight={700}
          letterSpacing="0.02em"
          className="font-code"
        />
        <p className="mt-1 text-xs text-slate-600 dark:text-white">
          Étudiant en informatique à Epitech Paris
        </p>
      </div>
    </footer>
  )
}

export default Footer
