import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import DecryptText from '../components/DecryptText.jsx'
import { PROFILE } from '../data/profile'

function Profile() {
  return (
    <SlideFrame title="Profil" start>
      <Reveal as="p" delay={0.08} className="t-heading">
        {PROFILE.role}
      </Reveal>
      <DecryptText
        text="Étudiant en deuxième année de Bachelor Informatique à Epitech Paris. Ma première année m’a fait découvrir l’ensemble des domaines du métier (web, cybersécurité, DevOps, intelligence artificielle et data) et je poursuis aujourd’hui dans ma spécialité : conception d’applications web, cloud et blockchain. J’aime construire des applications complètes, du besoin de départ jusqu’à la mise en ligne, et je recherche un stage de quatre mois (avril à juillet 2027), puis une alternance pour l’année 2027-2028, afin de mettre cette énergie au service d’une équipe et de projets qui servent vraiment leurs utilisateurs."
        className="t-lead mt-6 max-w-4xl text-[clamp(1.125rem,min(2vw,3.2vh),1.5rem)]"
      />
    </SlideFrame>
  )
}

export default Profile
