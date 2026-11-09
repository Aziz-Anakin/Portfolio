// Visuels — téléchargés en local pour fiabilité sur GitHub Pages.
import forza from '../assets/interests/forza-horizon.jpg'
import starCitizen from '../assets/interests/star-citizen.jpg'
import spiderman from '../assets/interests/spider-man.jpg'
import batman from '../assets/interests/batman-arkham.jpg'
import marvelRivals from '../assets/interests/marvel-rivals.jpg'
import cyberpunk from '../assets/interests/cyberpunk.jpg'
import minecraft from '../assets/interests/minecraft.jpg'
import gtav from '../assets/interests/gta-v.jpg'
import seaOfThieves from '../assets/interests/sea-of-thieves.jpg'
import phasmophobia from '../assets/interests/phasmophobia.jpg'
import animeOnePiece from '../assets/interests/anime-one-piece.jpg'
import animeSnk from '../assets/interests/anime-snk.jpg'
import animeMha from '../assets/interests/anime-mha.jpg'
import animeDemonSlayer from '../assets/interests/anime-demon-slayer.jpg'
import animeJjk from '../assets/interests/anime-jjk.jpg'
import animeHxh from '../assets/interests/anime-hunter-x-hunter.jpg'
import animeNaruto from '../assets/interests/anime-naruto.jpg'
import animeDeathNote from '../assets/interests/anime-death-note.jpg'
import animeAssassination from '../assets/interests/anime-assassination-classroom.jpg'

// Bibliothèque affichée dans le pastiche d'interface Steam.
// Le premier de la liste sert d'affiche mise en avant à l'ouverture.
export const STEAM_GAMES = [
  {
    id: 'forza',
    name: 'Forza Horizon 6',
    image: forza,
    tags: ['Course', 'Monde ouvert', 'Arcade'],
    blurb: 'Un terrain de jeu ouvert où la conduite reste nerveuse sans jamais devenir punitive. Le genre de titre qu\'on relance pour trois courses et qu\'on quitte deux heures plus tard.',
  },
  {
    id: 'star-citizen',
    name: 'Star Citizen',
    image: starCitizen,
    tags: ['Simulation spatiale', 'Multijoueur', 'Exploration'],
    blurb: 'Une simulation spatiale démesurée, à mi-chemin entre le vol technique et le jeu de rôle. On y va autant pour l\'ambiance que pour les objectifs.',
  },
  {
    id: 'spiderman',
    name: "Marvel's Spider-Man 2",
    image: spiderman,
    tags: ['Action-aventure', 'Monde ouvert', 'Super-héros'],
    blurb: 'Le déplacement en toile reste l\'un des systèmes de mouvement les plus satisfaisants du genre. Traverser la ville est déjà une récompense en soi.',
  },
  {
    id: 'batman',
    name: 'Batman: Arkham',
    image: batman,
    tags: ['Action-aventure', 'Infiltration', 'Combat'],
    blurb: 'La référence du combat en rythme et de l\'infiltration en prédateur. Une série qui a défini la façon dont on adapte un super-héros en jeu.',
  },
  {
    id: 'sea-of-thieves',
    name: 'Sea of Thieves',
    image: seaOfThieves,
    tags: ['Aventure', 'Coopération', 'Piraterie'],
    blurb: 'Manœuvrer un navire à plusieurs, où la moitié du plaisir vient de la coordination — et l\'autre moitié des naufrages.',
  },
  {
    id: 'phasmophobia',
    name: 'Phasmophobia',
    image: phasmophobia,
    tags: ['Horreur', 'Coopération', 'Enquête'],
    blurb: 'Une enquête paranormale en équipe, à collecter des indices dans le noir. Le jeu parfait pour une soirée entre amis.',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    image: minecraft,
    tags: ['Bac à sable', 'Construction', 'Survie'],
    blurb: 'Le bac à sable ultime, et une porte d\'entrée idéale vers la création de contenu : datapacks, mods et serveurs.',
  },
  {
    id: 'gta-v',
    name: 'Grand Theft Auto V',
    image: gtav,
    tags: ['Monde ouvert', 'Action', 'Multijoueur'],
    blurb: 'Un monde ouvert qui a largement dépassé son propre contenu grâce à sa scène communautaire et à ses serveurs de jeu de rôle.',
  },
  {
    id: 'marvel-rivals',
    name: 'Marvel Rivals',
    image: marvelRivals,
    tags: ['Hero shooter', 'Multijoueur', 'PvP'],
    blurb: 'Un hero shooter en équipe où la composition compte autant que la visée. Nerveux, lisible, et taillé pour les parties courtes.',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    image: cyberpunk,
    tags: ['RPG', 'Monde ouvert', 'Science-fiction'],
    blurb: 'Night City reste l\'une des directions artistiques les plus marquantes du jeu vidéo récent. Un RPG dense qu\'on prend le temps d\'explorer.',
  },
]

// Séries affichées dans le pastiche d'interface ADN (Animation Digital Network).
// La première sert de bannière à l'ouverture.
export const ADN_ANIMES = [
  {
    id: 'one-piece',
    name: 'One Piece',
    image: animeOnePiece,
    tags: ['Shōnen', 'Aventure', 'Piraterie'],
    blurb: 'La plus longue aventure que je suis. Un monde qui s\'agrandit à chaque arc sans jamais perdre le fil.',
  },
  {
    id: 'snk',
    name: "L'Attaque des Titans",
    image: animeSnk,
    tags: ['Shōnen', 'Action', 'Drame'],
    blurb: 'Un scénario qui se retourne à chaque saison. Impossible de deviner où il va.',
  },
  {
    id: 'mha',
    name: 'My Hero Academia',
    image: animeMha,
    tags: ['Shōnen', 'Super-héros', 'Action'],
    blurb: 'Des super-héros à l\'école. Les seconds rôles sont aussi soignés que les héros.',
  },
  {
    id: 'demon-slayer',
    name: 'Demon Slayer',
    image: animeDemonSlayer,
    tags: ['Shōnen', 'Action', 'Surnaturel'],
    blurb: 'La plus belle animation de combats que j\'aie vue. Un régal à chaque épisode.',
  },
  {
    id: 'jjk',
    name: 'Jujutsu Kaisen',
    image: animeJjk,
    tags: ['Shōnen', 'Action', 'Surnaturel'],
    blurb: 'Des pouvoirs clairs et des affrontements bien mis en scène. Efficace du début à la fin.',
  },
  {
    id: 'hunter-x-hunter',
    name: 'Hunter x Hunter',
    image: animeHxh,
    tags: ['Shōnen', 'Aventure', 'Stratégie'],
    blurb: 'Un système de pouvoirs pensé comme un vrai jeu de règles. Les combats se gagnent autant à la tête qu\'à la force.',
  },
  {
    id: 'naruto',
    name: 'Naruto',
    image: animeNaruto,
    tags: ['Shōnen', 'Action', 'Ninja'],
    blurb: 'Le classique avec lequel j\'ai commencé. Un univers ninja immense et des personnages qu\'on suit sur des années.',
  },
  {
    id: 'death-note',
    name: 'Death Note',
    image: animeDeathNote,
    tags: ['Thriller', 'Psychologique', 'Surnaturel'],
    blurb: 'Un duel d\'intelligence entre deux esprits qui anticipent chaque coup. Tendu du premier au dernier épisode.',
  },
  {
    id: 'assassination-classroom',
    name: 'Assassination Classroom',
    image: animeAssassination,
    tags: ['Shōnen', 'Comédie', 'Action'],
    blurb: 'Une classe qui doit éliminer son propre professeur. Drôle en surface, étonnamment touchant sur la fin.',
  },
]
