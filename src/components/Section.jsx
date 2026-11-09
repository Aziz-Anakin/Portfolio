// Section de page : filet en haut, contenu centré. `id` sert d'ancre du menu.
function Section({ id, children }) {
  return (
    <section id={id} className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">{children}</div>
    </section>
  )
}

export default Section
