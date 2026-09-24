/* eslint-disable react/no-unknown-property */
// React Bits « Lanyard » (https://reactbits.dev/components/lanyard), adapté :
// - le recto et le verso de la carte sont dessinés dans un canvas (drawFront / drawBack),
// - des zones cliquables (liens) sont détectées sur la carte, un clic sans glisser les ouvre,
// - sur écran tactile, seul un appui SUR la carte bloque le défilement de la page,
// - la simulation s'arrête quand la carte n'est pas à l'écran.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import cardGLB from '../../assets/lanyard/card.glb'
import { CARD_W, CARD_H } from './cardSize.js'

extend({ MeshLineGeometry, MeshLineMaterial })

// Le recto est mappé sur la moitié GAUCHE de l'atlas de texture, le verso sur la moitié DROITE.
const FACES = {
  front: { x: 0, y: 0, w: 0.5, h: 0.755 },
  back: { x: 0.5, y: 0, w: 0.5, h: 0.757 },
}


const CLICK_TOLERANCE = 6

// Renvoie la face touchée et la position (0..1) sur cette face, à partir des UV.
function locate(uv) {
  if (!uv) return null
  for (const [face, r] of Object.entries(FACES)) {
    const x = (uv.x - r.x) / r.w
    const y = (uv.y - r.y) / r.h
    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) return { face, x, y }
  }
  return null
}

function hitZone(zones, spot) {
  if (!spot) return null
  return (zones[spot.face] || []).find((z) => spot.x >= z.x && spot.x <= z.x + z.w && spot.y >= z.y && spot.y <= z.y + z.h) || null
}

export default function Lanyard({
  position = [0, 0, 11],
  gravity = [0, -40, 0],
  fov = 20,
  drawFront,
  drawBack,
  zones = {},
  onLink,
  lanyardImage,
  lanyardWidth = 1,
  active = true,
  className = '',
}) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className={`relative w-full ${className}`}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: true }}
        frameloop={active ? 'always' : 'never'}
        style={{ touchAction: 'pan-y' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} paused={!active}>
          <Band
            isMobile={isMobile}
            drawFront={drawFront}
            drawBack={drawBack}
            zones={zones}
            onLink={onLink}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile, drawFront, drawBack, zones, onLink, lanyardImage, lanyardWidth }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
  const cardMesh = useRef()
  const cardGroup = useRef()
  const downAt = useRef(null)
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }
  const { nodes, materials } = useGLTF(cardGLB)
  const texture = useTexture(lanyardImage)
  const { gl, camera, raycaster } = useThree()

  // Dessine le recto / verso dans l'atlas de la carte (le reste de l'atlas garde les tranches d'origine).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map
    const baseImg = baseMap.image
    const W = baseImg.width
    const H = baseImg.height
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return baseMap
    ctx.drawImage(baseImg, 0, 0, W, H)

    const paint = (draw, r) => {
      if (!draw) return
      ctx.save()
      ctx.translate(r.x * W, r.y * H)
      ctx.beginPath()
      ctx.rect(0, 0, r.w * W, r.h * H)
      ctx.clip()
      ctx.scale((r.w * W) / CARD_W, (r.h * H) / CARD_H)
      draw(ctx)
      ctx.restore()
    }
    paint(drawFront, FACES.front)
    paint(drawBack, FACES.back)

    const composite = new THREE.CanvasTexture(canvas)
    composite.colorSpace = THREE.SRGBColorSpace
    composite.flipY = baseMap.flipY
    composite.anisotropy = 16
    composite.needsUpdate = true
    return composite
  }, [drawFront, drawBack, materials.base.map])

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    c.curveType = 'chordal'
    return c
  })
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)
  const [overLink, setOverLink] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ])

  useEffect(() => {
    if (!hovered) return undefined
    document.body.style.cursor = dragged ? 'grabbing' : overLink ? 'pointer' : 'grab'
    return () => void (document.body.style.cursor = 'auto')
  }, [hovered, dragged, overLink])

  // Tactile : on ne bloque le défilement que si le doigt se pose sur la carte.
  useEffect(() => {
    const el = gl.domElement
    const ndc = new THREE.Vector2()
    const onTouchStart = (e) => {
      const t = e.touches[0]
      if (!t || !cardGroup.current) return
      const rect = el.getBoundingClientRect()
      ndc.set(((t.clientX - rect.left) / rect.width) * 2 - 1, -((t.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.intersectObject(cardGroup.current, true).length) e.preventDefault()
    }
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    return () => el.removeEventListener('touchstart', onTouchStart)
  }, [gl, camera, raycaster])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  useEffect(() => {
    // Réglage de la texture du cordon (objet three.js, pas un état React).
    // eslint-disable-next-line react-hooks/immutability
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.needsUpdate = true
  }, [texture])

  const zoneAt = (e) => (e.object === cardMesh.current ? hitZone(zones, locate(e.uv)) : null)

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            ref={cardGroup}
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => {
              hover(false)
              setOverLink(false)
            }}
            onPointerMove={(e) => setOverLink(Boolean(zoneAt(e)))}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
              const start = downAt.current
              downAt.current = null
              if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) < CLICK_TOLERANCE) {
                const zone = zoneAt(e)
                if (zone) onLink?.(zone.id)
              }
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId)
              downAt.current = { x: e.clientX, y: e.clientY }
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            }}
          >
            <mesh ref={cardMesh} geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  )
}
