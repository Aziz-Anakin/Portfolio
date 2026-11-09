import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../components/Icons.jsx'
import { PROFILE } from '../data/profile'
import Poke from '../components/game/Poke.jsx'
import Reveal from '../components/Reveal.jsx'
import Spawn from '../components/Spawn.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import cvPdf from '../assets/documents/CV_Yanis_Mdoughy.pdf'

const LINKS = [
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, Icon: Mail },
  { label: 'LinkedIn', value: PROFILE.linkedin.label, href: PROFILE.linkedin.href, Icon: LinkedInIcon, external: true },
  { label: 'GitHub', value: PROFILE.github.label, href: PROFILE.github.href, Icon: GitHubIcon, external: true },
  { label: 'CV', value: 'Télécharger (PDF)', href: cvPdf, Icon: FileText, external: true, download: 'CV_Yanis_Mdoughy.pdf' },
]

// Contact : grande bannière bleue, un lien par rectangle.
function Contact() {
  return (
    <section id="contact" className="relative overflow-x-clip bg-brand-gradient">
      <div className="relative mx-auto max-w-6xl px-5 pb-48 pt-20 md:py-28">
        {/* Le boss final se dresse en bas à droite, dans la place laissée libre par la grille. */}
        <Poke name="giratina" from="right" tilt={-3} halo="diamond" tag onGradient className="bottom-8 -right-4 md:bottom-12 md:right-0" />
        <SectionTitle kicker="Boss final · Contact" level={7} onGradient>Contact</SectionTitle>
        <Reveal as="p" className="mb-10 max-w-2xl font-mono text-sm uppercase tracking-wider">
          {PROFILE.availability}
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map(({ label, value, href, Icon, external, download }, i) => (
            <Spawn key={label} delay={i * 0.1} size={40} block={28} className="h-full">
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                {...(download ? { download } : {})}
                className="group flex h-full flex-col justify-between gap-6 border border-white/50 p-5 transition-colors duration-200 hover:bg-white hover:text-brand"
              >
                <span className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Icon size={16} />{label}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="break-all font-anton text-2xl uppercase tracking-wide">{value}</span>
              </a>
            </Spawn>
          ))}
        </div>
        <p className="mt-16 font-mono text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
      </div>
    </section>
  )
}

export default Contact
