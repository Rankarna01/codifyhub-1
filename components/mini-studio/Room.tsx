import { useEffect, useMemo, type ReactNode } from 'react'
import { RoundedBox, useTexture } from '@react-three/drei'
import { CanvasTexture, SRGBColorSpace } from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import { FURNITURE } from './config'
import { useMaterials } from './materials'
import type { Activity, FurnitureConfig, FurnitureId, SceneMode } from './types'

function screenTexture(review: boolean) {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 320
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#13213a'; ctx.fillRect(0, 0, 512, 320)
  ctx.fillStyle = '#263653'; ctx.fillRect(0, 0, 512, 32)
  ctx.fillStyle = '#dce8ff'; ctx.font = '14px sans-serif'; ctx.fillText('codifyhub / studio', 18, 22)
  if (review) {
    ctx.fillStyle = '#f5f7fb'; ctx.fillRect(20, 54, 318, 238); ctx.fillRect(363, 80, 126, 213)
    ctx.fillStyle = '#3268de'; ctx.fillRect(35, 70, 288, 30); ctx.fillRect(374, 90, 103, 16)
    ctx.fillStyle = '#192941'; ctx.font = 'bold 22px sans-serif'; ctx.fillText('Ide jadi nyata.', 42, 142)
    ctx.fillStyle = '#dce6f8'; ctx.fillRect(40, 161, 156, 10); ctx.fillRect(40, 179, 117, 10)
    ctx.fillStyle = '#376bd6'; ctx.fillRect(40, 212, 85, 29); ctx.fillRect(374, 120, 103, 62)
    ctx.fillStyle = '#dae4f5'; ctx.fillRect(211, 120, 107, 127)
    for (let i = 0; i < 3; i++) { ctx.fillRect(375, 197 + i * 26, 100, 18) }
  } else {
    const lines = ['const website = {', '  desain: "rapi",', '  responsif: true,', '  bisnis: kamu,', '};', '', 'build(website);']
    ctx.font = '18px monospace'
    lines.forEach((line, i) => { ctx.fillStyle = i % 2 ? '#9dcbfc' : '#f1ce98'; ctx.fillText(line, 20, 73 + i * 29) })
    ctx.fillStyle = '#f5f7fb'; ctx.fillRect(309, 56, 183, 235)
    ctx.fillStyle = '#376bd6'; ctx.fillRect(321, 68, 159, 29); ctx.fillRect(321, 110, 159, 76)
    ctx.fillStyle = '#dbe5f8'; ctx.fillRect(321, 200, 159, 12); ctx.fillRect(321, 222, 107, 10)
    ctx.fillStyle = '#376bd6'; ctx.fillRect(321, 249, 69, 24)
  }
  const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace
  return texture
}

function Monitor({ review, laptop = false }: { review: boolean; laptop?: boolean }) {
  const m = useMaterials()
  const textures = useMemo(() => ({ code: screenTexture(false), review: screenTexture(true) }), [])
  useEffect(() => () => { textures.code.dispose(); textures.review.dispose() }, [textures])
  return <group scale={laptop ? 0.65 : 1}>
    <RoundedBox args={[1.03, 0.71, 0.085]} radius={0.035} smoothness={3} material={m.black} castShadow />
    <mesh position={[0, 0, 0.046]}>
      <planeGeometry args={[0.94, 0.59]} />
      <meshBasicMaterial map={review ? textures.review : textures.code} toneMapped={false} />
    </mesh>
    {!laptop && <>
      <RoundedBox args={[0.10, 0.29, 0.1]} radius={0.025} position={[0, -0.42, 0]} material={m.metal} />
      <RoundedBox args={[0.43, 0.045, 0.27]} radius={0.02} position={[0, -0.56, 0.02]} material={m.metal} />
    </>}
  </group>
}

export function Cookie() {
  const m = useMaterials()
  return <group>
    <mesh material={m.cookie} castShadow><cylinderGeometry args={[0.09, 0.09, 0.034, 16]} /></mesh>
    {[[-0.035, 0.02], [0.03, 0.04], [0.035, -0.025], [-0.04, -0.035]].map(([x, z], i) => <mesh key={i} position={[x, 0.02, z]} material={m.chocolate}><sphereGeometry args={[0.015, 6, 5]} /></mesh>)}
  </group>
}

function Desk() {
  const m = useMaterials()
  return <>
    <RoundedBox args={[2.55, 0.15, 1]} radius={0.065} smoothness={3} position={[0, 1.04, 0]} material={m.wood} castShadow receiveShadow />
    {[-1.03, 1.03].flatMap(x => [-0.32, 0.32].map(z => <mesh key={`${x}-${z}`} position={[x, 0.51, z]} material={m.wood} castShadow><cylinderGeometry args={[0.064, 0.09, 0.99, 10]} /></mesh>))}
    <group position={[-0.1, 1.32, 0.25]} rotation={[-0.16, 0, 0]}><Monitor review={false} laptop /></group>
    <RoundedBox args={[0.76, 0.045, 0.48]} radius={0.02} position={[-0.1, 1.13, 0.46]} material={m.metal} />
    {Array.from({ length: 4 }, (_, i) => <RoundedBox key={i} args={[0.55, 0.012, 0.03]} radius={0.005} position={[-0.1, 1.159, 0.36 + i * 0.065]} material={m.black} />)}
    <group position={[-1.05, 1.16, -0.25]}>
      <mesh material={m.navy} castShadow><cylinderGeometry args={[0.16, 0.19, 0.065, 20]} /></mesh>
      <mesh position={[0, 0.29, 0]} rotation={[0, 0, -0.22]} material={m.navy}><cylinderGeometry args={[0.024, 0.024, 0.56, 8]} /></mesh>
      <group position={[0.08, 0.58, 0]} rotation={[0, 0, -0.38]}>
        <mesh material={m.blue} castShadow><coneGeometry args={[0.2, 0.2, 20, 1, true]} /></mesh>
        <mesh material={m.lamp} position={[0, -0.075, 0]}><sphereGeometry args={[0.074, 10, 8]} /></mesh>
      </group>
    </group>
  </>
}

function Chair() {
  const m = useMaterials()
  return <>
    <RoundedBox args={[0.67, 0.15, 0.66]} radius={0.065} position={[0, 0.43, 0]} material={m.blue} castShadow />
    <RoundedBox args={[0.65, 0.56, 0.11]} radius={0.045} position={[0, 0.75, 0.31]} rotation={[-0.1, 0, 0]} material={m.blue} castShadow />
    {[-0.24, 0.24].flatMap(x => [-0.24, 0.24].map(z => <mesh key={`${x}-${z}`} position={[x, 0.21, z]} material={m.wood}><cylinderGeometry args={[0.033, 0.044, 0.42, 8]} /></mesh>))}
  </>
}

function Beanbag() {
  const m = useMaterials()
  return <>
    <mesh position={[0, 0.25, 0]} scale={[0.72, 0.34, 0.65]} material={m.blue} castShadow receiveShadow><sphereGeometry args={[1, 24, 16]} /></mesh>
    <mesh position={[0, 0.4, -0.34]} scale={[0.62, 0.35, 0.36]} material={m.blue} castShadow><sphereGeometry args={[1, 24, 16]} /></mesh>
    <RoundedBox args={[0.43, 0.16, 0.4]} radius={0.075} position={[-0.4, 0.51, -0.04]} rotation={[0.1, 0.2, -0.12]} material={m.ivory} castShadow />
  </>
}

function SnackTable({ eating }: { eating: boolean }) {
  const m = useMaterials()
  return <>
    <mesh position={[0, 0.64, 0]} material={m.woodLight} castShadow receiveShadow><cylinderGeometry args={[0.39, 0.39, 0.1, 24]} /></mesh>
    <mesh position={[0, 0.32, 0]} material={m.wood}><cylinderGeometry args={[0.085, 0.11, 0.62, 12]} /></mesh>
    <mesh position={[0, 0.05, 0]} material={m.wood}><cylinderGeometry args={[0.24, 0.28, 0.065, 20]} /></mesh>
    <mesh position={[-0.14, 0.71, 0.06]} material={m.white} receiveShadow><cylinderGeometry args={[0.18, 0.15, 0.035, 24]} /></mesh>
    <group position={[-0.15, 0.75, 0.06]}>{!eating && <Cookie />}</group>
    <group position={[0.13, 0.72, -0.1]}>
      <mesh position={[0, 0.085, 0]} material={m.ivory} castShadow><cylinderGeometry args={[0.098, 0.076, 0.18, 20]} /></mesh>
      <mesh position={[0, 0.177, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.chocolate}><circleGeometry args={[0.081, 20]} /></mesh>
      <mesh position={[0.1, 0.09, 0]} material={m.ivory}><torusGeometry args={[0.059, 0.018, 8, 16]} /></mesh>
    </group>
  </>
}

interface RoomProps {
  activity: Activity | null
  active: boolean
  mode: SceneMode
  hovered: FurnitureId | 'mascot' | null
  onHover: (id: FurnitureId | null) => void
  onActivity: (activity: Activity) => void
  onFloor: (point: readonly [number, number]) => void
}

export function Room({ activity, active, mode, hovered, onHover, onActivity, onFloor }: RoomProps) {
  const m = useMaterials(), logo = useTexture('/images/logo.png')
  const interactive = (item: FurnitureConfig, children: ReactNode) => (
    <group key={item.id} position={[...item.position]}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); if (mode !== 'camera') onHover(item.id) }}
      onPointerOut={() => onHover(null)}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); if (mode !== 'camera' && e.delta < 6) onActivity(item.activity) }}>
      {children}
      {hovered === item.id && <RoundedBox args={[...item.interactionArea]} radius={0.06} position={[0, item.id === 'monitor' ? 0 : item.interactionArea[1] / 2, 0]} raycast={() => null}>
        <meshBasicMaterial color="#73a4ff" transparent opacity={0.1} depthWrite={false} />
      </RoundedBox>}
    </group>
  )
  return <group>
    <RoundedBox args={[6.65, 0.3, 5.05]} radius={0.13} smoothness={3} position={[0, -0.18, 0]} material={m.ivory} receiveShadow castShadow />
    <group onClick={e => { e.stopPropagation(); if (mode === 'direct' && e.delta < 6) onFloor([e.point.x, e.point.z]) }}>
      {Array.from({ length: 16 }, (_, i) => <mesh key={i} position={[-3 + i * 0.4, -0.007, 0]} receiveShadow material={i % 3 ? m.woodLight : m.woodPale}>
        <boxGeometry args={[0.392, 0.065, 4.76]} />
      </mesh>)}
    </group>
    <RoundedBox args={[6.55, 2.45, 0.16]} radius={0.07} position={[0, 1.225, -2.43]} material={m.ivory} receiveShadow castShadow />
    <RoundedBox args={[0.16, 2.45, 2.48]} radius={0.07} position={[-3.25, 1.225, -1.26]} material={m.ivory} receiveShadow castShadow />
    <RoundedBox args={[6.4, 0.12, 0.05]} radius={0.01} position={[0, 0.08, -2.32]} material={m.wood} />
    <group position={[0.26, 1.87, -2.325]}>
      <RoundedBox args={[0.62, 0.63, 0.07]} radius={0.03} material={m.blue} castShadow />
      <mesh position={[0, 0, 0.041]}><planeGeometry args={[0.43, 0.43]} /><meshBasicMaterial map={logo} transparent toneMapped={false} /></mesh>
    </group>
    {FURNITURE.map(item => interactive(item,
      item.id === 'desk' ? <Desk /> : item.id === 'chair' ? <Chair /> : item.id === 'monitor' ? <Monitor review={activity === 'reviewing'} /> : item.id === 'beanbag' ? <Beanbag /> : <SnackTable eating={active && activity === 'eating'} />
    ))}
  </group>
}
