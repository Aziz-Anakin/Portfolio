import { PROFILE } from '../data/profile'
import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowUpRight, FileIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '../components/Icons.jsx'

const LINKS = [
  { label: 'Email', hint: PROFILE.email, href: `mailto:${PROFILE.email}`, Icon: MailIcon },
  { label: 'LinkedIn', hint: PROFILE.linkedin.label, href: PROFILE.linkedin.href, external: true, Icon: LinkedInIcon },
  { label: 'GitHub', hint: PROFILE.github.label, href: PROFILE.github.href, external: true, Icon: GitHubIcon },
  { label: 'Téléphone', hint: PROFILE.phone.label, href: PROFILE.phone.href, Icon: PhoneIcon },
]

// Un contact : le logo, le nom en dessous, puis la donnée. Pas de boîte : au survol, le bloc monte
// et la flèche part en diagonale.
function Item({ link, index }) {
  const { Icon } = link
  return (
    <Reveal delay={0.1 + index * 0.07}>
      <a
        href={link.href}
        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="group flex flex-col items-start gap-5 transition-transform duration-500 ease-out hover:-translate-y-1.5"
      >
        <Icon size={44} />
        <span className="flex items-center gap-2 font-anton text-[clamp(1.75rem,2.8vw,2.75rem)] uppercase leading-none tracking-[0.01em]">
          {link.label}
          <ArrowUpRight size={20} className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
        </span>
        <span className="t-data -mt-2 break-all">{link.hint}</span>
      </a>
    </Reveal>
  )
}

function Contact({ onOpenCv }) {
  return (
    <SlideFrame title="Contact">
      <div className="flex flex-1 flex-col gap-12">
        {/* Les quatre liens, en ligne, au milieu de la slide */}
        <div className="flex flex-1 items-center">
          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {LINKS.map((link, i) => (
              <Item key={link.label} link={link} index={i} />
            ))}
          </div>
        </div>

        {/* Disponibilité : en bas à gauche, le CV en bas à droite */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.4} className="flex items-center gap-4">
            <span aria-hidden="true" className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
            </span>
            <span>
              <span className="t-data block uppercase tracking-widest">Disponible</span>
              <span className="mt-1 block font-anton text-[clamp(1.25rem,1.9vw,1.75rem)] uppercase leading-none tracking-[0.01em]">
                {PROFILE.availability}
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.46}>
            <button type="button" onClick={onOpenCv} className="btn btn-primary">
              <FileIcon size={18} />
              Voir mon CV
            </button>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}

export default Contact
