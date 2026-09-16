import type { Activity, ActivityConfig, FurnitureConfig, Point, Rect } from './types'

export const ROOM: Rect = { minX: -3.2, maxX: 3.2, minZ: -2.35, maxZ: 2.35 }
export const MASCOT_RADIUS = 0.48
export const START_POSITION: Point = [0.1, 1.15]
export const AUTO_RESUME_SECONDS = 32
export const FURNITURE = [
  {
    id: 'desk', position: [-1.45, 0, -1.45], label: 'Laptop · Ngoding', activity: 'coding',
    interactionArea: [2.5, 1.6, 1], destination: [-0.55, -0.35], dock: [-1.55, -0.4], yaw: Math.PI,
    collider: { minX: -2.75, maxX: -0.15, minZ: -1.97, maxZ: -0.93 },
  },
  {
    id: 'chair', position: [-1.55, 0, -0.4], label: 'Kursi · Ngoding', activity: 'coding',
    interactionArea: [0.65, 0.9, 0.65], destination: [-0.55, -0.35], dock: [-1.55, -0.4], yaw: Math.PI,
    collider: { minX: -1.89, maxX: -1.21, minZ: -0.76, maxZ: -0.06 },
  },
  {
    id: 'monitor', position: [-0.77, 1.55, -1.62], label: 'Monitor · Cek Website', activity: 'reviewing',
    interactionArea: [1, 0.8, 0.2], destination: [-0.2, -0.12], yaw: -2.8,
  },
  {
    id: 'beanbag', position: [1.65, 0, -1.05], label: 'Beanbag · Istirahat', activity: 'sleeping',
    interactionArea: [1.45, 0.75, 1.3], destination: [1.62, 0.25], dock: [1.62, -0.87], yaw: 0.3,
    collider: { minX: 0.96, maxX: 2.34, minZ: -1.72, maxZ: -0.4 },
  },
  {
    id: 'snacks', position: [2.6, 0, 1.03], label: 'Camilan · Makan', activity: 'eating',
    interactionArea: [0.7, 0.95, 0.7], destination: [1.68, 1.03], yaw: Math.PI / 2,
    collider: { minX: 2.25, maxX: 2.95, minZ: 0.68, maxZ: 1.38 },
  },
] satisfies FurnitureConfig[]

export const ACTIVITIES: Record<Activity, ActivityConfig> = {
  coding: { label: 'Ngoding', status: 'Lagi merapikan website…', duration: 18, weight: 5, furniture: 'chair' },
  reviewing: { label: 'Cek Website', status: 'Cek desktop, cek mobile. Rapi!', duration: 12, weight: 4, furniture: 'monitor' },
  eating: { label: 'Makan', status: 'Isi energi dulu, ya.', duration: 9, weight: 1, furniture: 'snacks' },
  sleeping: { label: 'Istirahat', status: 'Istirahat sebentar, ya.', duration: 13, weight: 1, furniture: 'beanbag' },
  waving: { label: 'Sapa Kamu', status: 'Halo! Mau bikin apa bareng kami?', duration: 6, weight: 1 },
}
export const ACTIVITY_ORDER = Object.keys(ACTIVITIES) as Activity[]
export const CAMERA = { position: [7.6, 6.5, 9.2] as const, target: [0, 0.7, 0] as const, zoom: 74 }

// Set to a public GLB URL after the original rig is available. See docs/mini-studio.md.
export const MASCOT_ASSET: { url: string | null; scale: number; clips: Record<string, string> } = {
  url: null, scale: 0.78,
  clips: { idle: 'Idle', walking: 'Walk', coding: 'Code', reviewing: 'Review', eating: 'Eat', sleeping: 'Sleep', waving: 'Wave' },
}
