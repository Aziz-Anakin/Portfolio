import { useEffect, useState } from 'react'
import Lanyard from './Lanyard.jsx'
import { createBandImage, createCardArt } from './idCardArt.js'
import photo from '../../assets/images/photo.jpg'

const PORTFOLIO_URL = 'https://aziz-anakin.github.io/Portfolio/'

const LINKS = {
  email: 'mailto:Yanis.mdoughy@outlook.fr',
  phone: 'tel:+33662679122',
  linkedin: 'https://linkedin.com/in/yanis-mdoughy-558a1028b/',
  github: 'https://github.com/Aziz-Anakin',
}

// Charge le dessin de la carte puis affiche le Lanyard (chargé à part : three.js est lourd).
export default function LanyardCard({ onOpenCv, active, className }) {
  const [art, setArt] = useState(null)

  useEffect(() => {
    let alive = true
    createCardArt({ photoSrc: photo, portfolioUrl: PORTFOLIO_URL }).then((result) => {
      if (alive) setArt({ ...result, band: createBandImage() })
    })
    return () => {
      alive = false
    }
  }, [])

  const onLink = (id) => {
    if (id === 'cv') return onOpenCv?.()
    const href = LINKS[id]
    if (!href) return
    if (href.startsWith('http')) window.open(href, '_blank', 'noopener,noreferrer')
    else window.location.href = href
  }

  if (!art) return <div className={className} />

  return (
    <Lanyard
      className={className}
      drawFront={art.drawFront}
      drawBack={art.drawBack}
      zones={art.zones}
      lanyardImage={art.band}
      onLink={onLink}
      active={active}
    />
  )
}
