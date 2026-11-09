import rayquaza from '../../assets/pokemon/rayquaza.gif'
import kyogre from '../../assets/pokemon/kyogre.gif'
import groudon from '../../assets/pokemon/groudon.gif'
import kyurem from '../../assets/pokemon/kyurem.gif'
import zekrom from '../../assets/pokemon/zekrom.gif'
import charizard from '../../assets/pokemon/charizard.gif'
import palkia from '../../assets/pokemon/palkia.gif'
import giratina from '../../assets/pokemon/giratina.gif'
import dialga from '../../assets/pokemon/dialga.gif'
import pikachu from '../../assets/pokemon/pikachu.gif'
import mewtwo from '../../assets/pokemon/mewtwo.gif'
import lucario from '../../assets/pokemon/lucario.gif'
import gengar from '../../assets/pokemon/gengar.gif'

// Sprites animés en pixel art (jeux Pokémon Noir et Blanc, dépôt PokeAPI/sprites). Ils regardent vers la gauche.
// `no` : numéro du Pokédex national ; `type` : type(s) ; `w`, `h` : taille d'origine du GIF en pixels.
export const POKEMON = {
  rayquaza: { name: 'Rayquaza', no: 384, type: 'Dragon · Vol', src: rayquaza, w: 110, h: 98 },
  kyogre: { name: 'Kyogre', no: 382, type: 'Eau', src: kyogre, w: 107, h: 83 },
  groudon: { name: 'Groudon', no: 383, type: 'Sol', src: groudon, w: 90, h: 75 },
  kyurem: { name: 'Kyurem', no: 646, type: 'Dragon · Glace', src: kyurem, w: 99, h: 77 },
  zekrom: { name: 'Zekrom', no: 644, type: 'Dragon · Électrik', src: zekrom, w: 104, h: 92 },
  charizard: { name: 'Dracaufeu', no: 6, type: 'Feu · Vol', src: charizard, w: 87, h: 89 },
  palkia: { name: 'Palkia', no: 484, type: 'Eau · Dragon', src: palkia, w: 86, h: 77 },
  giratina: { name: 'Giratina', no: 487, type: 'Spectre · Dragon', src: giratina, w: 102, h: 89 },
  dialga: { name: 'Dialga', no: 483, type: 'Acier · Dragon', src: dialga, w: 84, h: 89 },
  pikachu: { name: 'Pikachu', no: 25, type: 'Électrik', src: pikachu, w: 50, h: 46 },
  mewtwo: { name: 'Mewtwo', no: 150, type: 'Psy', src: mewtwo, w: 90, h: 69 },
  lucario: { name: 'Lucario', no: 448, type: 'Combat · Acier', src: lucario, w: 47, h: 63 },
  gengar: { name: 'Ectoplasma', no: 94, type: 'Spectre · Poison', src: gengar, w: 74, h: 63 },
}
