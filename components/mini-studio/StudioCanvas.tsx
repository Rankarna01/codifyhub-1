import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PCFSoftShadowMap } from 'three'
import { CAMERA } from './config'
import { StudioMachine } from './machine'
import { CameraControls } from './CameraControls'
import { Mascot } from './Mascot'
import { Materials } from './materials'
import { Room } from './Room'
import type { Activity, FurnitureId, SceneMode } from './types'

export interface StudioCanvasProps {
  machine: StudioMachine
  visible: boolean
  mobile: boolean
  mode: SceneMode
  reset: number
  zoom: number
  onReady: () => void
  onFailure: () => void
  onHover: (id: FurnitureId | 'mascot' | null) => void
  onActivity: (activity: Activity) => void
}

function Clock({ machine, visible }: { machine: StudioMachine; visible: boolean }) {
  const { invalidate } = useThree()
  useEffect(() => machine.subscribe(() => { if (visible) invalidate() }), [machine, visible, invalidate])
  useEffect(() => { if (visible) invalidate() }, [visible, invalidate])
  useFrame((_, dt) => { if (visible) machine.step(dt) }, -2)
  return null
}

function Ready({ onReady }: { onReady: () => void }) {
  const done = useRef(false)
  useFrame(() => { if (!done.current) { done.current = true; onReady() } })
  return null
}

function ContextLoss({ onFailure }: { onFailure: () => void }) {
  const gl = useThree(state => state.gl)
  useEffect(() => {
    const canvas = gl.domElement
    const onLost = (event: Event) => { event.preventDefault(); onFailure() }
    canvas.addEventListener('webglcontextlost', onLost)
    return () => canvas.removeEventListener('webglcontextlost', onLost)
  }, [gl, onFailure])
  return null
}

export default function StudioCanvas(props: StudioCanvasProps) {
  const { machine, visible, mobile, mode, reset, zoom, onReady, onFailure, onHover, onActivity } = props
  const snapshot = useSyncExternalStore(machine.subscribe, machine.getSnapshot, machine.getSnapshot)
  const [hovered, setHovered] = useState<FurnitureId | 'mascot' | null>(null)
  const hover = (id: FurnitureId | 'mascot' | null) => { setHovered(id); onHover(id) }
  const quiet = snapshot.paused || snapshot.reduced
  return <Canvas orthographic camera={{ position: [...CAMERA.position], zoom: CAMERA.zoom, near: 0.1, far: 50 }}
    dpr={mobile ? 1 : [1, 1.5]} shadows={{ type: PCFSoftShadowMap }}
    gl={{ antialias: !mobile, alpha: true, powerPreference: 'low-power' }}
    frameloop={!visible ? 'never' : quiet ? 'demand' : 'always'}
    style={{ touchAction: mode === 'camera' ? 'none' : 'pan-y', cursor: mode === 'camera' ? 'grab' : mode === 'direct' ? 'crosshair' : hovered ? 'pointer' : 'auto' }}
    fallback={null}>
    <Clock machine={machine} visible={visible} />
    <ContextLoss onFailure={onFailure} />
    <ambientLight intensity={1.2} />
    <hemisphereLight args={['#eaf2ff', '#c2a580', 1.5]} />
    <directionalLight position={[-3, 7, 5]} intensity={3.0} color="#fff0d8" castShadow
      shadow-mapSize={[mobile ? 512 : 1024, mobile ? 512 : 1024]}
      shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={5} shadow-camera-bottom={-5}
      shadow-camera-near={0.5} shadow-camera-far={20} shadow-bias={-0.0005} shadow-normalBias={0.03} />
    <directionalLight position={[4, 3, -2]} intensity={0.65} color="#d9e5ff" />
    <Suspense fallback={null}>
      <Materials>
        <Room activity={snapshot.activity} active={snapshot.stage === 'active'} mode={mode} hovered={hovered}
          onHover={hover} onActivity={onActivity} onFloor={point => machine.direct(point)} />
        <Mascot machine={machine} interactive={mode !== 'camera'} onHover={value => hover(value ? 'mascot' : null)} onWave={() => onActivity('waving')} />
      </Materials>
      <Ready onReady={onReady} />
    </Suspense>
    <CameraControls mode={mode} reset={reset} zoom={zoom} onInteract={() => machine.interact()} />
  </Canvas>
}
