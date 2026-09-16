'use client'

import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { ArrowUpRight, Code2, Cookie, Hand, MonitorCheck, Moon, MousePointer2, Move3D, Pause, Play, RotateCcw, Minus, Plus } from 'lucide-react'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import { ACTIVITIES, ACTIVITY_ORDER, FURNITURE, MASCOT_ASSET } from './config'
import { StudioMachine } from './machine'
import type { Activity, FurnitureId, SceneMode } from './types'
import styles from './mini-studio.module.css'

const StudioCanvas = lazy(() => import('./StudioCanvas'))
const icons = { coding: Code2, reviewing: MonitorCheck, eating: Cookie, sleeping: Moon, waving: Hand }

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

export interface MiniStudioHeroProps {
  placement?: 'hero' | 'section'
  onConsult?: () => void
  consultationHref?: string
  portfolioHref?: string
}

export default function MiniStudioHero({ placement = 'hero', onConsult, consultationHref = 'https://wa.me/6282275373233', portfolioHref = '#portofolio' }: MiniStudioHeroProps) {
  const Heading = placement === 'section' ? 'h2' : 'h1'
  const StudioHeading = placement === 'section' ? 'h3' : 'h2'
  const [machine] = useState(() => new StudioMachine())
  const snapshot = useSyncExternalStore(machine.subscribe, machine.getSnapshot, machine.getSnapshot)
  const container = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false), [load, setLoad] = useState(false)
  const [mobile, setMobile] = useState(false), [ready, setReady] = useState(false), [failed, setFailed] = useState(false)
  const [systemReduced, setSystemReduced] = useState(false), [userReduced, setUserReduced] = useState(false)
  const [mode, setMode] = useState<SceneMode>('interact')
  const [reset, setReset] = useState(0), [zoom, setZoom] = useState(1)
  const [hover, setHover] = useState<FurnitureId | 'mascot' | null>(null)
  const reduced = systemReduced || userReduced
  const onReady = useCallback(() => setReady(true), [])
  const onFailure = useCallback(() => { setFailed(true); setReady(false); machine.setPaused(true) }, [machine])
  const onActivity = useCallback((activity: Activity) => { machine.request(activity); setHover(null) }, [machine])

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)'), compact = matchMedia('(max-width: 767px)')
    const sync = () => { setSystemReduced(motion.matches); setMobile(compact.matches) }
    sync(); motion.addEventListener('change', sync); compact.addEventListener('change', sync)
    let intersecting = false
    const updateVisibility = () => setVisible(intersecting && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; updateVisibility() }, { threshold: 0.01 })
    if (container.current) observer.observe(container.current)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', updateVisibility); motion.removeEventListener('change', sync); compact.removeEventListener('change', sync) }
  }, [])

  useEffect(() => { machine.setReduced(reduced) }, [machine, reduced])
  useEffect(() => {
    if (!visible || load || failed) return
    // Copy, CTA, and the reference portrait are already painted before importing Three.js.
    const timer = window.setTimeout(() => {
      try {
        const canvas = document.createElement('canvas'), context = canvas.getContext('webgl2')
        if (!context) { onFailure(); return }
        context.getExtension('WEBGL_lose_context')?.loseContext()
        setLoad(true)
      } catch { onFailure() }
    }, 150)
    return () => window.clearTimeout(timer)
  }, [visible, load, failed, onFailure])

  const setSceneMode = (next: SceneMode) => { setMode(current => current === next ? 'interact' : next); setHover(null); machine.interact() }
  const hoverLabel = hover === 'mascot' ? 'Maskot · Sapa Kamu' : FURNITURE.find(item => item.id === hover)?.label
  const hint = mode === 'direct' ? 'Klik lantai kosong untuk berjalan.' : mode === 'camera' ? 'Geser untuk memutar. Pilih Putar lagi untuk selesai.' : 'Klik furnitur atau pilih aktivitas di bawah.'
  const disabled = !ready || failed

  return <section id="mini-studio" className={`${styles.hero} ${placement === 'section' ? styles.section : ''}`} aria-labelledby="mini-studio-heading" data-reduced-motion={reduced}>
    <div className={styles.layout}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span aria-hidden="true" />WEB DEVELOPMENT STUDIO</p>
        <Heading id="mini-studio-heading" className={styles.title}>Website yang bekerja untuk <span>bisnis kamu.</span></Heading>
        <p className={styles.description}>Dari company profile, ecommerce, hingga aplikasi web custom. CodifyHub membantu mewujudkan kebutuhan bisnismu melalui desain yang rapi dan pengembangan yang terarah.</p>
        <div className={styles.ctas}>
          {onConsult ? <button type="button" className={styles.primary} onClick={onConsult}>Konsultasikan Proyek <ArrowUpRight size={19} aria-hidden="true" /></button> :
            <a className={styles.primary} href={consultationHref}>Konsultasikan Proyek <ArrowUpRight size={19} aria-hidden="true" /></a>}
          <a className={styles.secondary} href={portfolioHref}>Lihat Portofolio</a>
        </div>
        <p className={styles.invitation}><Hand size={19} aria-hidden="true" />Kenalan dengan maskot kami.<br className={styles.mobileBreak} /> Pilih aktivitasnya!</p>
      </div>

      <div className={styles.studio}>
        <div className={styles.studioHeading}><StudioHeading>CodifyHub Mini Studio</StudioHeading><span>Ruang ide kami.</span></div>
        <div ref={container} className={styles.viewport} data-mode={mode} aria-label="Studio mini interaktif CodifyHub">
          {!ready && <div className={styles.fallback}>
            <div className={styles.portrait}>
              {/* A CSS crop of the supplied pose sheet preserves the original mascot exactly. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mini-studio/mascot-reference.webp" alt="Maskot biru CodifyHub dengan wajah hitam dan mata khas logo" width={1402} height={1122} loading={placement === 'section' ? 'lazy' : 'eager'} />
            </div>
            <p>{failed ? 'Studio 3D belum tersedia di perangkat ini.' : 'Menyiapkan studio…'}</p>
          </div>}
          {load && !failed && <div className={styles.canvas} aria-hidden="true" data-testid="studio-canvas">
            <SceneBoundary onFailure={onFailure}>
              <Suspense fallback={null}>
                <StudioCanvas machine={machine} visible={visible} mobile={mobile} mode={mode} reset={reset} zoom={zoom}
                  onReady={onReady} onFailure={onFailure} onHover={setHover} onActivity={onActivity} />
              </Suspense>
            </SceneBoundary>
          </div>}
          {ready && <div className={styles.status} role="status" aria-live="polite" aria-atomic="true"><span className={styles.statusMark} aria-hidden="true" />{snapshot.status}</div>}
          {ready && <p className={styles.hoverLabel} aria-hidden="true">{hoverLabel || (snapshot.reduced ? 'Gerak tenang' : snapshot.paused ? 'Dijeda' : snapshot.automatic ? 'Aktivitas otomatis' : 'Pilihan kamu')}</p>}
        </div>

        <div className={styles.activities} role="group" aria-label="Pilih aktivitas maskot" aria-describedby="studio-instructions">
          {ACTIVITY_ORDER.map(activity => {
            const Icon = icons[activity]
            return <button type="button" key={activity} disabled={disabled} aria-pressed={snapshot.activity === activity} onClick={() => onActivity(activity)}>
              <Icon size={17} aria-hidden="true" /><span>{ACTIVITIES[activity].label}</span>
            </button>
          })}
        </div>
        <div className={styles.controls}>
          <div className={styles.modes} role="group" aria-label="Mode interaksi studio">
            <button type="button" disabled={disabled} aria-pressed={mode === 'direct'} onClick={() => setSceneMode('direct')}><MousePointer2 size={16} aria-hidden="true" />Arahkan</button>
            <button type="button" disabled={disabled} aria-pressed={mode === 'camera'} onClick={() => setSceneMode('camera')}><Move3D size={17} aria-hidden="true" />Putar</button>
          </div>
          <div className={styles.cameraTools} role="group" aria-label="Kontrol kamera dan animasi">
            <button type="button" disabled={disabled || zoom <= 0.85} aria-label="Perkecil studio" title="Perkecil" onClick={() => { setZoom(value => Math.max(0.85, value - 0.1)); machine.interact() }}><Minus size={17} /></button>
            <button type="button" disabled={disabled || zoom >= 1.2} aria-label="Perbesar studio" title="Perbesar" onClick={() => { setZoom(value => Math.min(1.2, value + 0.1)); machine.interact() }}><Plus size={17} /></button>
            <button type="button" disabled={disabled} aria-label="Reset sudut pandang" title="Reset sudut pandang" onClick={() => { setReset(value => value + 1); setZoom(1); setMode('interact'); machine.interact() }}><RotateCcw size={16} /></button>
            <button type="button" disabled={disabled} aria-label={snapshot.paused ? 'Lanjutkan semua animasi' : 'Jeda semua animasi'} aria-pressed={snapshot.paused} title={snapshot.paused ? 'Lanjutkan' : 'Jeda'} onClick={() => { machine.interact(); machine.setPaused(!snapshot.paused) }}>{snapshot.paused ? <Play size={16} /> : <Pause size={16} />}</button>
          </div>
        </div>
        <div className={styles.preferences}>
          <p id="studio-instructions">{failed ? 'Kamu tetap bisa konsultasi dan melihat portofolio.' : hint}</p>
          <label><input type="checkbox" checked={reduced} disabled={systemReduced} onChange={event => setUserReduced(event.target.checked)} />Gerak tenang{systemReduced ? ' (sistem)' : ''}</label>
        </div>
        {!MASCOT_ASSET.url && <details className={styles.modelNote}><summary>Model maskot sementara</summary><p>Model 3D sederhana mengikuti referensi CodifyHub. Bentuk dan material dapat disempurnakan dengan model GLB asli; gambar referensi 2D bukan model 3D siap animasi.</p></details>}
      </div>
    </div>
  </section>
}
