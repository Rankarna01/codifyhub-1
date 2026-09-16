import { useEffect, useRef, type ComponentRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { CAMERA } from './config'
import type { SceneMode } from './types'

export function CameraControls({ mode, reset, zoom, onInteract }: { mode: SceneMode; reset: number; zoom: number; onInteract: () => void }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const { camera, size, invalidate, gl } = useThree()
  const fitZoom = Math.min(size.width / 9.0, size.height / 6.4)
  useEffect(() => {
    camera.position.set(...CAMERA.position)
    camera.lookAt(...CAMERA.target)
    controls.current?.target.set(...CAMERA.target)
    controls.current?.update(); invalidate()
  }, [camera, reset, invalidate])
  useEffect(() => {
    camera.zoom = fitZoom * zoom; camera.updateProjectionMatrix(); invalidate()
  }, [camera, fitZoom, zoom, invalidate])
  useEffect(() => {
    // OrbitControls sets touch-action:none when connected, even while disabled.
    // Restore page scrolling outside the explicitly selected camera mode.
    gl.domElement.style.touchAction = mode === 'camera' ? 'none' : 'pan-y'
  }, [gl, mode])
  return <OrbitControls ref={controls} target={[...CAMERA.target]} enabled={mode === 'camera'}
    enablePan={false} enableZoom={false} enableDamping={false}
    minAzimuthAngle={-0.15} maxAzimuthAngle={0.98}
    minPolarAngle={0.65} maxPolarAngle={1.25} onStart={onInteract} />
}
