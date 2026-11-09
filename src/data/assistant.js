import { PROFILE } from './profile'
import { PROJECTS } from './projects'
import { SKILL_GROUPS } from './skills'
import { AI_SKILLS } from './aiSkills'
import { PARCOURS } from './parcours'
import cvPdf from '../assets/documents/CV_Yanis_Mdoughy.pdf'

// Cerveau de l'assistant Chopper : il ne devine rien, il répond à partir des données du site (profil, projets,
// compétences, parcours). Ce n'est PAS un modèle d'IA : il reconnaît des mots-clés. Pour brancher une vraie IA plus
// tard, remplacer `answer()` par un appel à un petit serveur (la clé secrète ne doit jamais être dans le code du site).
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const has = (q, words) => words.some((w) => q.includes(w))

// Questions proposées dans le menu : `q` est le texte envoyé à `answer()`.
export const MENU = [
  { label: 'Qui est Yanis ?', q: 'profil' },
  { label: 'Ses projets', q: 'projets' },
  { label: 'Ses compétences', q: 'competences' },
  { label: 'Sa disponibilité', q: 'disponibilite' },
  { label: 'Sa formation', q: 'formation' },
  { label: 'Ses expériences', q: 'experience' },
  { label: 'Le contacter', q: 'contact' },
]

export const GREETING = { text: 'Salut ! Je suis Chopper, le docteur de bord. Je réponds à tes questions sur Yanis. Choisis une question, ou écris la tienne.' }

export function answer(question) {
  const q = norm(question)
  const formations = PARCOURS.filter((p) => p.kind === 'Formation')
  const experiences = PARCOURS.filter((p) => p.kind === 'Expérience')

  // Un projet précis, cité par son nom.
  const project = PROJECTS.find((p) => norm(p.title).split(' ').some((w) => w.length > 2 && q.includes(w)) || q.includes(norm(p.id)))
  if (project) {
    const role = project.role ? ` ${project.role}` : ''
    return {
      text: `${project.title} (${project.kind}). ${project.pitch}${role} Technologies : ${project.stack.join(', ')}.`,
      links: [{ label: 'Voir les projets', href: '#projects' }, ...(project.links.demo ? [{ label: 'Démo', href: project.links.demo }] : [])],
    }
  }
  if (has(q, ['bonjour', 'salut', 'coucou', 'hello', 'hey'])) return GREETING
  if (has(q, ['merci', 'thanks'])) return { text: 'Ça me fait pas plaisir, imbécile ! (Mais de rien.)' }
  if (has(q, ['dispo', 'stage', 'alternance', 'recrut', 'embauch', 'cherche', 'quand'])) {
    return { text: `${PROFILE.availability}.`, links: [{ label: 'Le contacter', href: '#contact' }] }
  }
  if (has(q, ['contact', 'mail', 'email', 'joindre', 'telephone', 'tel', 'appeler', 'numero', 'linkedin', 'github'])) {
    return {
      text: `Le plus simple : lui écrire à ${PROFILE.email}, ou le trouver sur LinkedIn et GitHub. Son numéro n’est pas public : il te répondra par mail.`,
      links: [
        { label: 'Email', href: `mailto:${PROFILE.email}` },
        { label: 'LinkedIn', href: PROFILE.linkedin.href },
        { label: 'GitHub', href: PROFILE.github.href },
      ],
    }
  }
  if (has(q, ['cv', 'curriculum'])) return { text: 'Voici son CV en PDF.', links: [{ label: 'Ouvrir le CV', href: cvPdf }] }
  if (has(q, ['projet', 'realisation', 'portfolio', 'travaux'])) {
    return { text: `${PROJECTS.length} projets web : ${PROJECTS.map((p) => p.title).join(', ')}. Cite-moi un nom pour en savoir plus.`, links: [{ label: 'Voir les projets', href: '#projects' }] }
  }
  if (q.split(/\W+/).includes('ia') || has(q, ['vibe', 'intelligence artificielle', 'claude', 'chatgpt', 'copilot', 'automatis'])) {
    return { text: `Il utilise l'IA au quotidien : Claude Code et Codex, et des skills pour agents IA comme ${AI_SKILLS.slice(0, 6).map((s) => s.name).join(', ')}.`, links: [{ label: 'Voir les skills IA', href: '#ai-skills' }] }
  }
  if (has(q, ['competence', 'techno', 'stack', 'langage', 'outil', 'react', 'node', 'typescript', 'python', 'savoir faire'])) {
    return {
      text: SKILL_GROUPS.map((g) => `${g.label} : ${g.items.join(', ')}`).join(' ; ') + '.',
      links: [{ label: 'Voir les compétences', href: '#skills' }],
    }
  }
  if (has(q, ['formation', 'ecole', 'epitech', 'etude', 'diplome', 'bachelor'])) {
    return { text: formations.map((f) => `${f.title} (${f.place}, ${f.years})`).join(' ; ') + '.', links: [{ label: 'Voir la formation', href: '#formation' }] }
  }
  if (has(q, ['experience', 'entreprise', 'travail', 'star invest'])) {
    return { text: experiences.map((e) => `${e.title} chez ${e.place} (${e.years}${e.meta ? `, ${e.meta.toLowerCase()}` : ''})`).join(' ; ') + '.', links: [{ label: "Voir l'expérience", href: '#experience' }] }
  }
  if (has(q, ['qui', 'yanis', 'profil', 'presente', 'toi'])) {
    return { text: `${PROFILE.name}, ${PROFILE.role.toLowerCase()} à ${PROFILE.city}. Bachelor Informatique à Epitech Paris, spécialité applications web, cloud et blockchain. Il construit des applications complètes, du besoin à la mise en ligne.` }
  }
  if (has(q, ['one piece', 'onepiece', 'luffy', 'zoro', 'shanks', 'chopper', 'pirate'])) {
    return { text: 'Yanis est fan de One Piece ! Essaie de taper « luffy » sur la page, tu verras. Moi, je suis le docteur : pas de la viande, merci !' }
  }
  if (has(q, ['pokemon', 'pacman', 'minecraft', 'steve', 'jeu'])) {
    return { text: 'Yanis adore les jeux vidéo : Pac-Man tourne en bas de la page, des Pokémon veillent sur chaque titre, et Steve construit les cartes.' }
  }
  return { text: "Hmm, ça, je ne sais pas… Je ne connais que ce qui est sur ce portfolio. Essaie une des questions du menu !" }
}
