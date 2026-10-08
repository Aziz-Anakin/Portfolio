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

// Un contact : le logo en grand, le nom en dessous. Pas de boîte : au survol, le bloc monte
// et la flèche part en diagonale.
function Item({ link, index }) {
  const { Icon } = link
  return (
    <Reveal delay={0.12 + index * 0.07}>
      <a
        href={link.href}
        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="group flex items-start gap-5 py-2 transition-transform duration-500 ease-out hover:-translate-y-1"
      >
        <Icon size={40} className="mt-1 shrink-0" />
        <span className="min-w-0">
          <span className="flex items-center gap-2 font-anton text-[clamp(1.75rem,3vw,2.75rem)] uppercase leading-none tracking-[0.01em]">
            {link.label}
            <ArrowUpRight size={20} className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
          <span className="t-data mt-2 block break-all">{link.hint}</span>
        </span>
      </a>
    </Reveal>
  )
}

function Contact({ onOpenCv }) {
  return (
    <SlideFrame title="Contact">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal as="p" delay={0.08} className="text-[clamp(1.5rem,min(2.6vw,4.2vh),2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            {PROFILE.availability}
          </Reveal>
          <Reveal delay={0.16} className="mt-7">
            <button type="button" onClick={onOpenCv} className="btn btn-primary">
              <FileIcon size={18} />
              Voir mon CV
            </button>
          </Reveal>
        </div>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
          {LINKS.map((link, i) => (
            <Item key={link.label} link={link} index={i} />
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}

export default Contact
