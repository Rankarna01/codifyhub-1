import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, useAnimations, useGLTF } from '@react-three/drei'
import { Group, LatheGeometry, Shape, ShapeGeometry, Vector2 } from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import { MASCOT_ASSET } from './config'
import { StudioMachine } from './machine'
import { useMaterials } from './materials'
import { Cookie } from './Room'

function eyeGeometry() {
  const shape = new Shape()
  shape.moveTo(-0.14, 0)
  for (const [x, y] of [[-0.075, 0.12], [0.075, 0.12], [0.14, 0], [0.10, -0.045], [0.037, 0.064], [-0.037, 0.064], [-0.09, -0.038], [-0.14, 0]]) shape.lineTo(x, y)
  return new ShapeGeometry(shape)
}

/** Procedural placeholder based on the supplied reference; not an original rigged model. */
function ProceduralMascot({ machine }: { machine: StudioMachine }) {
  const m = useMaterials(), pivot = useRef<Group>(null), face = useRef<Group>(null)
  const left = useRef<Group>(null), right = useRef<Group>(null)
  const legs = useRef<Group[]>([]), eyes = useRef<Group>(null), snack = useRef<Group>(null)
  const resources = useMemo(() => {
    const profile = [[0, 0.29], [0.23, 0.30], [0.36, 0.38], [0.46, 0.56], [0.49, 0.88], [0.48, 1.16], [0.43, 1.43], [0.33, 1.62], [0.15, 1.70], [0, 1.72]]
    const body = new LatheGeometry(profile.map(([r, y]) => new Vector2(r, y)), 40)
    body.computeVertexNormals()
    return { body, eye: eyeGeometry() }
  }, [])
  useEffect(() => () => { resources.body.dispose(); resources.eye.dispose() }, [resources])

  useFrame(() => {
    const f = machine.frame, reduced = machine.getSnapshot().reduced
    const t = reduced ? 0 : f.time, p = f.pose
    const walking = f.state === 'walking' && f.stage !== 'align' && f.stage !== 'release'
    const coding = f.state === 'coding' ? p : 0
    const sleeping = f.state === 'sleeping' ? p : 0
    const eating = f.state === 'eating' ? p : 0
    const waving = f.state === 'waving' ? p : 0
    const reviewing = f.state === 'reviewing' ? p : 0
    const seated = f.seatActivity === 'coding' ? f.seatBlend : 0
    const lying = f.seatActivity === 'sleeping' ? f.seatBlend : 0
    const stride = walking && !reduced ? Math.sin(t * 9) : 0
    const breath = reduced ? 0 : Math.sin(t * (sleeping ? 1.25 : 2.3)) * (sleeping ? 0.014 : 0.006)
    if (pivot.current) {
      pivot.current.position.y = 0.9 + seated * 0.29 + lying * 0.18 + f.seatLift + Math.abs(stride) * 0.035
      pivot.current.rotation.set(seated * 0.045, 0, lying * 1.23 + stride * 0.025)
      pivot.current.scale.set(1 + breath * 0.4, 1 + breath, 1 + breath)
    }
    if (face.current) {
      face.current.rotation.y = reviewing * (reduced ? 0.13 : Math.sin(t * 0.8) * 0.18) + waving * 0.05
      face.current.rotation.z = waving * 0.045 + reviewing * (reduced ? -0.03 : Math.sin(t * 1.6) * 0.035)
    }
    if (eyes.current) {
      const blink = !reduced && t % 4.9 > 4.72 ? 0.12 : 1
      eyes.current.scale.y = sleeping ? 0.1 : blink * (1 + reviewing * 0.08)
    }
    if (left.current && right.current) {
      const typing = coding && !reduced ? Math.sin(t * 14) * 0.07 : 0
      left.current.rotation.set(-coding * 1.54 + stride * 0.30 + typing - sleeping * 0.6, 0, -0.09 - coding * 0.15 + sleeping * 0.7)
      right.current.rotation.set(-coding * 1.54 - stride * 0.30 - typing - eating * (1.3 + (reduced ? 0 : Math.sin(f.elapsed * 1.9) * 0.45)), -eating * 0.5, 0.09 + coding * 0.15 + waving * (2.4 + (reduced ? 0 : Math.sin(t * 6) * 0.24)) - sleeping * 0.55)
    }
    legs.current.forEach((leg, i) => { if (leg) leg.rotation.x = -seated * 1.2 + stride * (i ? -0.4 : 0.4) * (1 - f.seatBlend) + lying * 0.25 })
    if (snack.current) {
      snack.current.visible = eating > 0.5
      const bite = reduced ? 1 : Math.max(0.25, 1 - Math.floor(f.elapsed / 2.8) * 0.22)
      snack.current.scale.setScalar(bite)
    }
  })

  return <group ref={pivot} position={[0, 0.9, 0]}>
    <group position={[0, -0.9, 0]}>
      <mesh geometry={resources.body} scale={[1, 1, 0.81]} material={m.plush} castShadow />
      <group ref={face} position={[0, 1.37, 0.33]}>
        <RoundedBox args={[0.79, 0.41, 0.25]} radius={0.12} smoothness={4} material={m.navy} castShadow />
        <RoundedBox args={[0.74, 0.35, 0.24]} radius={0.11} smoothness={4} position={[0, 0, 0.025]} material={m.black} />
        <group ref={eyes} position={[0, 0, 0.151]}>
          {[-0.18, 0.18].map(x => <group key={x} position={[x, 0.015, 0]}>
            <mesh geometry={resources.eye} material={m.eye} />
            <RoundedBox args={[0.051, 0.122, 0.012]} radius={0.005} smoothness={2} position={[0.012, -0.059, 0]} material={m.eye} />
          </group>)}
        </group>
      </group>
      {[-1, 1].map((side, i) => <group key={side} ref={i ? right : left} position={[side * 0.445, 1.15, 0]}>
        <mesh position={[0, -0.22, 0]} rotation={[0, 0, -side * 0.12]} material={m.plush} castShadow><capsuleGeometry args={[0.143, 0.31, 5, 12]} /></mesh>
        <mesh position={[side * 0.035, -0.46, 0.025]} scale={[0.14, 0.16, 0.135]} material={m.plush} castShadow><sphereGeometry args={[1, 16, 10]} /></mesh>
        <mesh position={[-side * 0.076, -0.44, 0.095]} scale={[0.062, 0.1, 0.068]} material={m.plush}><sphereGeometry args={[1, 12, 8]} /></mesh>
        {i === 1 && <group ref={snack} position={[0.02, -0.51, 0.09]} rotation={[Math.PI / 2, 0, 0]} visible={false}><Cookie /></group>}
      </group>)}
      {[-1, 1].map((side, i) => <group key={side} ref={node => { if (node) legs.current[i] = node }} position={[side * 0.235, 0.38, 0]}>
        <mesh position={[0, -0.14, 0]} material={m.plush} castShadow><capsuleGeometry args={[0.172, 0.15, 4, 16]} /></mesh>
        <mesh position={[0, -0.25, 0.075]} scale={[0.184, 0.13, 0.24]} material={m.plush} castShadow><sphereGeometry args={[1, 18, 12]} /></mesh>
      </group>)}
    </group>
  </group>
}

function OriginalMascot({ machine, url }: { machine: StudioMachine; url: string }) {
  const gltf = useGLTF(url), group = useRef<Group>(null)
  const scene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { actions, mixer } = useAnimations(gltf.animations, group)
  const current = useRef('')
  useFrame(() => {
    const snapshot = machine.getSnapshot(), state = machine.frame.state
    const name = MASCOT_ASSET.clips[state]
    if (name !== current.current) {
      actions[current.current]?.fadeOut(0.25)
      actions[name]?.reset().fadeIn(0.25).play()
      current.current = name
    }
    mixer.timeScale = snapshot.paused || snapshot.reduced ? 0 : 1
  })
  return <group ref={group}><primitive object={scene} /></group>
}

export function Mascot({ machine, onHover, onWave, interactive }: {
  machine: StudioMachine; onHover: (hover: boolean) => void; onWave: () => void; interactive: boolean
}) {
  const root = useRef<Group>(null)
  useFrame(() => {
    if (!root.current) return
    const f = machine.frame
    root.current.position.set(f.position[0], 0.04, f.position[1]); root.current.rotation.y = f.yaw
  })
  return <group ref={root} scale={MASCOT_ASSET.scale}
    onPointerOver={e => { e.stopPropagation(); if (interactive) onHover(true) }}
    onPointerOut={() => onHover(false)}
    onClick={e => { e.stopPropagation(); if (interactive && e.delta < 6) onWave() }}>
    <Suspense fallback={<ProceduralMascot machine={machine} />}>
      {MASCOT_ASSET.url ? <OriginalMascot machine={machine} url={MASCOT_ASSET.url} /> : <ProceduralMascot machine={machine} />}
    </Suspense>
  </group>
}
