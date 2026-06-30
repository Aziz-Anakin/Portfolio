// Visuels (style Steam) — téléchargés en local pour fiabilité sur GitHub Pages.
import forza from '../assets/interests/forza-horizon.jpg'
import starCitizen from '../assets/interests/star-citizen.jpg'
import spiderman from '../assets/interests/spider-man.jpg'
import batman from '../assets/interests/batman-arkham.jpg'
import marvelRivals from '../assets/interests/marvel-rivals.jpg'
import cyberpunk from '../assets/interests/cyberpunk.jpg'
import minecraft from '../assets/interests/minecraft.jpg'
import fivem from '../assets/interests/fivem.jpg'
import seaOfThieves from '../assets/interests/sea-of-thieves.jpg'
import phasmophobia from '../assets/interests/phasmophobia.jpg'
import animeOnePiece from '../assets/interests/anime-one-piece.jpg'
import animeSnk from '../assets/interests/anime-snk.jpg'
import animeMha from '../assets/interests/anime-mha.jpg'
import animeDemonSlayer from '../assets/interests/anime-demon-slayer.jpg'
import animeJjk from '../assets/interests/anime-jjk.jpg'

// Centres d'intérêt — chaque catégorie ouvre une modale avec ses visuels en premier plan.
// `icon` = clé d'icône SVG (résolue dans Interests.jsx). `image` optionnel : sans image, tuile de repli.
export const INTERESTS = [
  {
    id: 'games',
    title: 'Jeux vidéo',
    icon: 'gamepad',
    blurb: 'Course, exploration spatiale et action-aventure.',
    cover: forza,
    items: [
      { name: 'Forza Horizon 6', image: forza },
      { name: 'Star Citizen', image: starCitizen },
      { name: "Marvel's Spider-Man 2", image: spiderman },
      { name: 'Batman: Arkham', image: batman },
      { name: 'Sea of Thieves', image: seaOfThieves },
      { name: 'Phasmophobia', image: phasmophobia },
    ],
  },
  {
    id: 'modding',
    title: 'Dev & modding de jeux',
    icon: 'code',
    blurb: 'Créer du contenu sur des plateformes de jeu existantes.',
    cover: cyberpunk,
    items: [
      { name: 'Minecraft', image: minecraft },
      { name: 'FiveM (GTA V)', image: fivem },
      { name: 'Mods Marvel Rivals', image: marvelRivals },
      { name: 'Mods Cyberpunk 2077', image: cyberpunk },
    ],
  },
  {
    id: 'anime',
    title: 'Anime / Manga',
    icon: 'tv',
    blurb: 'Shōnen et grandes sagas — je suis les sorties depuis des années.',
    cover: animeOnePiece,
    items: [
      { name: 'One Piece', image: animeOnePiece },
      { name: "L'Attaque des Titans", image: animeSnk },
      { name: 'My Hero Academia', image: animeMha },
      { name: 'Demon Slayer', image: animeDemonSlayer },
      { name: 'Jujutsu Kaisen', image: animeJjk },
    ],
  },
]
