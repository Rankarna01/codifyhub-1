import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { DataTexture, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, RGBAFormat } from 'three'

function createMaterials() {
  const pixels = new Uint8Array(64 * 64 * 4)
  let seed = 42
  for (let i = 0; i < pixels.length; i += 4) {
    seed = (seed * 16807) % 2147483647
    const value = 100 + seed % 120
    pixels[i] = pixels[i + 1] = pixels[i + 2] = value; pixels[i + 3] = 255
  }
  const noise = new DataTexture(pixels, 64, 64, RGBAFormat)
  noise.wrapS = noise.wrapT = RepeatWrapping; noise.repeat.set(7, 7); noise.needsUpdate = true
  const materials = {
    plush: new MeshPhysicalMaterial({ color: '#2351b9', roughness: 0.97, sheen: 1, sheenColor: '#7095eb', sheenRoughness: 0.85, bumpMap: noise, bumpScale: 0.013 }),
    blue: new MeshStandardMaterial({ color: '#376bd6', roughness: 0.78 }),
    navy: new MeshStandardMaterial({ color: '#133271', roughness: 0.82 }),
    ivory: new MeshStandardMaterial({ color: '#f4f0e6', roughness: 0.94 }),
    white: new MeshStandardMaterial({ color: '#fcfbf8', roughness: 0.6 }),
    wood: new MeshStandardMaterial({ color: '#d6ac77', roughness: 0.85 }),
    woodLight: new MeshStandardMaterial({ color: '#e5c89f', roughness: 0.85 }),
    woodPale: new MeshStandardMaterial({ color: '#e1c399', roughness: 0.85 }),
    metal: new MeshStandardMaterial({ color: '#565d69', metalness: 0.6, roughness: 0.42 }),
    black: new MeshPhysicalMaterial({ color: '#060d1c', metalness: 0.12, roughness: 0.23, clearcoat: 0.7 }),
    eye: new MeshStandardMaterial({ color: '#f5faff', emissive: '#a6c4ff', emissiveIntensity: 0.25, roughness: 0.45 }),
    cookie: new MeshStandardMaterial({ color: '#c98946', roughness: 1 }),
    chocolate: new MeshStandardMaterial({ color: '#5b3927', roughness: 1 }),
    lamp: new MeshStandardMaterial({ color: '#ffedc4', emissive: '#ffe4b0', emissiveIntensity: 0.35 }),
  }
  return { materials, dispose: () => { Object.values(materials).forEach(material => material.dispose()); noise.dispose() } }
}
type StudioMaterials = ReturnType<typeof createMaterials>['materials']
const Context = createContext<StudioMaterials | null>(null)
export function Materials({ children }: { children: ReactNode }) {
  const resources = useMemo(createMaterials, [])
  useEffect(() => () => resources.dispose(), [resources])
  return <Context.Provider value={resources.materials}>{children}</Context.Provider>
}
export function useMaterials() {
  const materials = useContext(Context)
  if (!materials) throw new Error('Studio material provider missing')
  return materials
}
