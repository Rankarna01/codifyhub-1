export type Point = readonly [number, number] // floor coordinates: x, z
export type Activity = 'coding' | 'reviewing' | 'eating' | 'sleeping' | 'waving'
export type MascotState = 'idle' | 'walking' | Activity
export type Stage = 'active' | 'release' | 'exit' | 'travel' | 'dock' | 'align'
export type SceneMode = 'interact' | 'direct' | 'camera'
export type Rect = { minX: number; maxX: number; minZ: number; maxZ: number }
export type FurnitureId = 'desk' | 'chair' | 'monitor' | 'beanbag' | 'snacks'
export interface FurnitureConfig {
  id: FurnitureId
  position: readonly [number, number, number]
  label: string
  activity: Activity
  interactionArea: readonly [number, number, number]
  destination: Point
  dock?: Point
  yaw: number
  collider?: Rect
}
export interface ActivityConfig {
  label: string
  status: string
  duration: number
  weight: number
  furniture?: FurnitureId
}
export interface StudioFrame {
  position: [number, number]
  yaw: number
  state: MascotState
  stage: Stage
  pose: number
  time: number
  elapsed: number
  seatActivity: 'coding' | 'sleeping' | null
  seatBlend: number
  seatLift: number
}
export interface StudioSnapshot {
  state: MascotState
  activity: Activity | null
  stage: Stage
  status: string
  paused: boolean
  reduced: boolean
  automatic: boolean
}
