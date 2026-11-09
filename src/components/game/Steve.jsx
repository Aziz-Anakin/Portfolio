import head from '../../assets/steve/head.png'
import body from '../../assets/steve/body.png'
import arm from '../../assets/steve/arm.png'
import armBack from '../../assets/steve/arm-back.png'
import leg from '../../assets/steve/leg.png'
import legBack from '../../assets/steve/leg-back.png'

// Le vrai Steve, de profil : les six morceaux viennent de la texture de son skin classique (celle de MHF_Steve, via
// minotar.net) : tête, torse, bras et jambes vus de côté, assemblés ici. Les bras et les jambes balancent par paliers
// quand il marche (classes .steve-* dans site.css). Personnage de Mojang Studios / Microsoft, utilisé ici comme
// simple référence de fan, comme les Pokémon.
function Steve({ height = 64 }) {
  const u = height / 32 // taille d'un pixel de la texture
  const piece = (src, x, y, w, h, className = '') => (
    <img src={src} alt="" draggable={false} className={`absolute block ${className}`} style={{ left: x * u, top: y * u, width: w * u, height: h * u, imageRendering: 'pixelated' }} />
  )
  return (
    <div aria-hidden="true" className="steve relative" style={{ width: 8 * u, height: 32 * u }}>
      {piece(armBack, 2, 8, 4, 12, 'steve-arm-b')}
      {piece(legBack, 2, 20, 4, 12, 'steve-leg-b')}
      {piece(body, 2, 8, 4, 12)}
      {piece(head, 0, 0, 8, 8)}
      {piece(leg, 2, 20, 4, 12, 'steve-leg-f')}
      {piece(arm, 2, 8, 4, 12, 'steve-arm-f')}
    </div>
  )
}

export default Steve
